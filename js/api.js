// Ghana CX Index — API Abstraction Layer

import { CONFIG } from "./config.js";

/**
 * Unified API client for communicating with Google Apps Script backend
 * Provides abstraction layer between frontend and backend
 * Can be replaced with REST API later without frontend changes
 */

class APIClient {
  constructor(config) {
    this.baseUrl = config.appsScriptUrl;
    this.timeout = 30000; // 30 seconds
    this.sessionToken = this.loadSessionToken();
  }

  // Session management
  loadSessionToken() {
    return sessionStorage.getItem("gcxi_session_token");
  }

  saveSessionToken(token) {
    sessionStorage.setItem("gcxi_session_token", token);
    this.sessionToken = token;
  }

  clearSessionToken() {
    sessionStorage.removeItem("gcxi_session_token");
    this.sessionToken = null;
  }

  isAuthenticated() {
    return !!this.sessionToken;
  }

  // Core request method
  async request(endpoint, method = "POST", data = null) {
    const url = new URL(this.baseUrl);
    const payload = {
      endpoint,
      method,
      ...(data && { data }),
      ...(this.sessionToken && { sessionToken: this.sessionToken }),
    };

    try {
      const response = await Promise.race([
        fetch(url.toString(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), this.timeout)
        ),
      ]);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();

      // Handle authentication errors
      if (result.error === "UNAUTHORIZED") {
        this.clearSessionToken();
        window.location.href = "/admin?redirect=login";
        return null;
      }

      if (result.error) {
        console.error(`API Error: ${result.error}`, result.message);
        throw new Error(result.message || result.error);
      }

      return result.data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // ============================================================
  // PUBLIC ENDPOINTS
  // ============================================================

  // Health check
  async health() {
    try {
      const result = await fetch(this.baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: "/api/health" }),
      });
      return result.ok;
    } catch {
      return false;
    }
  }

  // Get active industries
  async getIndustries() {
    return this.request("/api/respondent/industries", "GET");
  }

  // Get institutions by industry
  async getInstitutions(industryId) {
    return this.request("/api/respondent/institutions", "POST", { industryId });
  }

  // Get single institution config
  async getInstitution(institutionSlug) {
    return this.request("/api/respondent/institution", "POST", { slug: institutionSlug });
  }

  // Get assessment model
  async getAssessmentModel(institutionId) {
    return this.request("/api/respondent/assessment-model", "POST", { institutionId });
  }

  // Create respondent profile
  async createRespondent(profileData) {
    return this.request("/api/respondent/create", "POST", profileData);
  }

  // Save assessment progress (autosave)
  async saveAssessmentProgress(respondentId, institutionId, answers) {
    return this.request("/api/respondent/save-progress", "POST", {
      respondentId,
      institutionId,
      answers,
      timestamp: new Date().toISOString(),
    });
  }

  // Submit final assessment (idempotent)
  async submitAssessment(respondentId, institutionId, answers, consentData, submissionKey) {
    return this.request("/api/respondent/submit", "POST", {
      respondentId,
      institutionId,
      answers,
      consent: consentData,
      submissionKey, // For idempotency
      timestamp: new Date().toISOString(),
    });
  }

  // Get assessment result
  async getAssessmentResult(submissionId) {
    return this.request("/api/respondent/result", "POST", { submissionId });
  }

  // Authentication
  async requestOTP(email) {
    return this.request("/api/auth/request-otp", "POST", { email });
  }

  async verifyOTP(email, otp) {
    const result = await this.request("/api/auth/verify-otp", "POST", { email, otp });
    if (result && result.sessionToken) {
      this.saveSessionToken(result.sessionToken);
    }
    return result;
  }

  async logout() {
    await this.request("/api/auth/logout", "POST");
    this.clearSessionToken();
  }

  // ============================================================
  // ADMIN ENDPOINTS (require authentication)
  // ============================================================

  // Get admin dashboard data
  async getAdminDashboard(filters = {}) {
    return this.request("/api/admin/dashboard", "POST", filters);
  }

  // Get complaints list
  async getComplaints(filters = {}) {
    return this.request("/api/admin/complaints", "POST", filters);
  }

  // Get complaint detail
  async getComplaintDetail(complaintId) {
    return this.request("/api/admin/complaints/detail", "POST", { complaintId });
  }

  // Publish complaint (super admin)
  async publishComplaint(complaintId, moderationNotes = "") {
    return this.request("/api/admin/complaints/publish", "POST", {
      complaintId,
      moderationNotes,
    });
  }

  // Acknowledge complaint (institution admin)
  async acknowledgeComplaint(complaintId, note = "") {
    return this.request("/api/admin/complaints/acknowledge", "POST", {
      complaintId,
      note,
    });
  }

  // Record action (institution admin)
  async recordAction(complaintId, actionNote, status = "IN_ACTION") {
    return this.request("/api/admin/complaints/action", "POST", {
      complaintId,
      actionNote,
      status,
    });
  }

  // Get reports data
  async getReports(reportType = "quarterly", filters = {}) {
    return this.request("/api/admin/reports", "POST", { type: reportType, ...filters });
  }

  // Get analytics/dashboard data
  async getAnalytics(chartType = "overview", filters = {}) {
    return this.request("/api/admin/analytics", "POST", { type: chartType, ...filters });
  }
}

// Create and export singleton instance
export const API = new APIClient(CONFIG);

// Utility: Generate idempotent submission key
export function generateSubmissionKey(respondentId, institutionId) {
  const timestamp = new Date().toDateString();
  const str = `${respondentId}-${institutionId}-${timestamp}`;
  // Simple hash (production should use crypto)
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `sub-${Math.abs(hash)}`;
}

// Utility: Check API health on startup
export async function checkAPIHealth() {
  try {
    return await API.health();
  } catch {
    console.warn("API health check failed");
    return false;
  }
}

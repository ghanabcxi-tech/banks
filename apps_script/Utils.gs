function getSs_() { return SpreadsheetApp.getActiveSpreadsheet(); }
function getSheet_(name) { return getSs_().getSheetByName(name); }
function nowIso_() { return new Date().toISOString(); }
function uuid_() { return Utilities.getUuid(); }
function cleanEmail_(email) { return String(email || '').trim().toLowerCase(); }
function cleanText_(value, maxLen) {
  let s = String(value == null ? '' : value).trim();
  if (maxLen && s.length > maxLen) s = s.slice(0,maxLen);
  return s;
}
function bool_(v) { return v === true || String(v).toLowerCase() === 'true' || String(v) === '1'; }
function jsonParse_(s, fallback) { try { return JSON.parse(s); } catch(e) { return fallback; } }
function safeJson_(v) { return JSON.stringify(v == null ? null : v); }
function assert_(condition, message) { if (!condition) throw new Error(message); }
function normalizePhone_(phone) { return cleanText_(phone,40).replace(/[^0-9+()\-\s]/g,''); }
function rowsToObjects_(values) {
  if (!values || values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1).filter(r => r.some(v => String(v).trim() !== '')).map(r => {
    const o={}; headers.forEach((h,i)=>o[h]=r[i]); return o;
  });
}
function getObjects_(sheetName) {
  const sh=getSheet_(sheetName); if(!sh || sh.getLastRow()<2) return [];
  return rowsToObjects_(sh.getDataRange().getValues());
}
function appendRowsLocked_(sheetName, rows) {
  if (!rows || !rows.length) return;
  const lock=LockService.getScriptLock(); lock.waitLock(30000);
  try {
    const sh=getSheet_(sheetName); assert_(sh,'Missing sheet: '+sheetName);
    sh.getRange(sh.getLastRow()+1,1,rows.length,rows[0].length).setValues(rows);
  } finally { lock.releaseLock(); }
}
function findObjectBy_(sheetName, field, value) {
  return getObjects_(sheetName).find(o => String(o[field]) === String(value)) || null;
}
function updateRowById_(sheetName, idField, idValue, patch) {
  const sh=getSheet_(sheetName); assert_(sh,'Missing sheet: '+sheetName);
  const data=sh.getDataRange().getValues(); if(data.length<2) return false;
  const headers=data[0].map(String); const idIdx=headers.indexOf(idField); assert_(idIdx>=0,'Missing id field');
  const lock=LockService.getScriptLock(); lock.waitLock(30000);
  try {
    for(let r=1;r<data.length;r++) {
      if(String(data[r][idIdx])===String(idValue)) {
        Object.keys(patch).forEach(k=>{
          const c=headers.indexOf(k); if(c>=0) sh.getRange(r+1,c+1).setValue(patch[k]);
        });
        return true;
      }
    }
  } finally { lock.releaseLock(); }
  return false;
}
function logActivity_(actorType, actorId, action, entityType, entityId, metadata) {
  appendRowsLocked_(BCXI.SHEETS.ACTIVITY_LOG, [[uuid_(),actorType||'',actorId||'',action||'',entityType||'',entityId||'',safeJson_(metadata||{}),nowIso_()]]);
}
function maskEmail_(email) {
  email=cleanEmail_(email); if(!email.includes('@')) return '';
  const [a,b]=email.split('@'); return (a.slice(0,2)||'*')+'***@'+b;
}
function maskPhone_(phone) {
  const s=String(phone||''); return s.length>4 ? '***'+s.slice(-4) : '***';
}

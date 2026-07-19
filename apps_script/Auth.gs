function requestAdminOtp(email) {
  email=cleanEmail_(email); assert_(email,'Enter an authorised admin email.');
  const admin=getObjects_(BCXI.SHEETS.ADMIN_USERS).find(a=>cleanEmail_(a.email)===email&&bool_(a.active)); assert_(admin,'This email is not authorised for the admin portal.');
  const code=String(Math.floor(100000+Math.random()*900000)); const key='otp:'+Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,email)).slice(0,24);
  CacheService.getScriptCache().put(key,code,600);
  MailApp.sendEmail({to:email,subject:'Your BCXI-Ghana admin verification code',htmlBody:'<p>Your verification code is <strong style="font-size:22px">'+code+'</strong>.</p><p>It expires in 10 minutes.</p>',name:getConfigValue_('EMAIL_SENDER_NAME','BCXI-Ghana')});
  logActivity_('ADMIN',email,'REQUEST_OTP','AUTH','',{email}); return {ok:true,message:'Verification code sent.'};
}

function verifyAdminOtp(email,code) {
  email=cleanEmail_(email); code=cleanText_(code,12); const key='otp:'+Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,email)).slice(0,24); const cache=CacheService.getScriptCache();
  assert_(cache.get(key)===code,'Invalid or expired verification code.'); cache.remove(key);
  const admin=getObjects_(BCXI.SHEETS.ADMIN_USERS).find(a=>cleanEmail_(a.email)===email&&bool_(a.active)); assert_(admin,'Admin account is not active.');
  const token=Utilities.base64EncodeWebSafe(uuid_()+':'+uuid_()); const session={adminId:admin.adminId,email,name:admin.name,role:admin.role,institutionIds:jsonParse_(admin.institutionIdsJson,[])};
  cache.put('admin:'+token,safeJson_(session),21600); logActivity_('ADMIN',admin.adminId,'LOGIN','AUTH','',{email}); return {ok:true,token,profile:session};
}

function requireAdmin_(token) {
  const raw=CacheService.getScriptCache().get('admin:'+String(token||'')); assert_(raw,'Admin session expired. Please sign in again.'); return jsonParse_(raw,null);
}

function requireSuperAdmin_(token) {
  const session=requireAdmin_(token);
  assert_(session.role==='SUPER_ADMIN'||session.role==='DEVELOPER_ADMIN','Access denied. Super Admin privileges required.');
  return session;
}

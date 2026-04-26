/* ── AUTH & ADMIN (Firebase Google Sign-In) ── */
const ADMIN_EMAIL = 'devanshup416@gmail.com';

/* Track brand-new sign-ins (not page-reload restorations) */
let _fbNewSignIn = false;

/* Single source of truth — fires on login, logout, and page reload */
_auth.onAuthStateChanged(user => {
  updateNavAuth(user);
  // Security: Validate admin access on every auth state change
  validateAdminAccess();
});

/* Sync read of the current Firebase user */
function getCurrentUser(){
  return _auth.currentUser;
}

/* Security: Validate admin panel access */
function validateAdminAccess(){
  const adminPage = document.getElementById('page-admin');
  const user = getCurrentUser();
  
  // If admin page is active but user is not authorized, redirect
  if(adminPage && adminPage.classList.contains('active')){
    if(!user || user.email !== ADMIN_EMAIL){
      console.warn('Unauthorized admin access attempt blocked');
      showPage('home');
      showToast('Unauthorized access. Admin privileges required.');
    }
  }
}

/* Security: Check if current user is admin */
function isAdmin(){
  const user = getCurrentUser();
  return user && user.email === ADMIN_EMAIL;
}

/* ── Google Sign-In popup ── */
async function signInWithGoogle(){
  const btn = document.getElementById('googleSignInBtn');
  const err = document.getElementById('authErr');
  if(err){ err.style.display='none'; }
  if(btn){ btn.classList.add('loading'); btn.innerHTML='<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style="width:20px;height:20px;"> Signing in…'; }
  try{
    _fbNewSignIn = true;
    const result = await _auth.signInWithPopup(_gProvider);
    showPage('home');
    const name = result.user.displayName ? result.user.displayName.split(' ')[0] : 'there';
    showToast(`Welcome${result.additionalUserInfo?.isNewUser ? '' : ' back'}, ${name}!`);
  } catch(e) {
    _fbNewSignIn = false;
    // Security: Log detailed error to console, show generic message to user
    console.error('Firebase sign-in error:', e);
    if(err){
      if(e.code==='auth/popup-closed-by-user'||e.code==='auth/cancelled-popup-request'){
        err.textContent='Sign-in cancelled. Try again when ready.';
      } else if(e.code==='auth/network-request-failed'){
        err.textContent='Network error. Check your connection and retry.';
      } else {
        // Generic error message (don't expose internal details)
        err.textContent='Sign-in failed. Please try again or contact support.';
      }
      err.style.display='block';
    }
    if(btn){ btn.classList.remove('loading'); btn.innerHTML='<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" style="width:20px;height:20px;"> Continue with Google'; }
  }
}

/* ── Sign out ── */
async function signOut(){
  try{
    await _auth.signOut();
    showPage('home');
    showToast('Signed out successfully.');
  } catch(e){
    console.error('Sign-out error:', e);
    showToast('Sign-out failed. Please try again.');
  }
}

/* ── Update nav UI + admin gate based on auth state ── */
function updateNavAuth(user){
  if(user === undefined) user = getCurrentUser(); // fallback
  const nav = document.getElementById('navAuth');
  const mobileNav = document.getElementById('mobileNavAuth');
  const adminBtn = document.getElementById('adminBlogBtn');
  const adminPage = document.getElementById('page-admin');
  if(!nav) return;

  if(user){
    const isAdminUser = user.email === ADMIN_EMAIL;
    const firstName = (user.displayName||'User').split(' ')[0];
    // Show Google profile photo if available, fallback to initial avatar
    const photoHTML = user.photoURL
      ? `<img src="${user.photoURL}" referrerpolicy="no-referrer" alt="avatar"
             style="width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0;"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
         <div class="nav-avatar" style="display:none">${firstName.charAt(0).toUpperCase()}</div>`
      : `<div class="nav-avatar">${firstName.charAt(0).toUpperCase()}</div>`;

    // Desktop navigation
    nav.innerHTML=`<div class="nav-user">
      ${photoHTML}
      <span class="nav-username">${firstName}</span>
      ${isAdminUser?`<span class="admin-badge" onclick="showPage('admin')">Admin</span>`:''}
      <button class="btn-signout" onclick="signOut()">Sign Out</button>
    </div>`;

    // Mobile navigation
    if(mobileNav) {
      mobileNav.innerHTML = `
        <div class="flex items-center gap-3 p-4 bg-matcha-50 border-2 border-matcha-200 rounded-xl mb-4">
          ${photoHTML}
          <div class="flex-1">
            <div class="text-gray-900 font-bold text-sm">${firstName}</div>
            ${isAdminUser ? `<div class="text-xs text-matcha-700 font-semibold">Admin Access</div>` : `<div class="text-xs text-gray-600">Signed In</div>`}
          </div>
        </div>
        ${isAdminUser ? `<button class="w-full bg-purple-600 text-white py-3 px-4 rounded-xl text-sm font-bold mb-3 transition-all duration-200 hover:bg-purple-700 shadow-lg" onclick="showPage('admin'); closeMobileMenu();">🔧 Admin Panel</button>` : ''}
        <button class="w-full bg-red-500 text-white py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 hover:bg-red-600 shadow-lg" onclick="signOut(); closeMobileMenu();">🚪 Sign Out</button>
      `;
    }

    // Security: Only show admin UI elements for authorized users
    if(adminBtn) adminBtn.style.display = isAdminUser ? 'block' : 'none';
    if(adminPage) {
      adminPage.classList.toggle('admin-unlocked', isAdminUser);
      // Show admin panel only for admin user
      if(isAdminUser) {
        adminPage.style.display = 'block';
      }
    }

    // Send EmailJS notification for genuine new sign-ins only (not page reloads)
    if(_fbNewSignIn){
      _fbNewSignIn = false;
      // Security: Only send notification, don't expose sensitive data
      loadEmailJS().then(() => {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          name:'IndiaKaAI System', email:ADMIN_EMAIL,
          title:'Google Sign-In on IndiaKaAI',
          message:`User signed in via Google!\n\nName: ${user.displayName||'—'}\nEmail: ${user.email}\nUID: ${user.uid}\nTime: ${new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})}`
        }).catch(err => {
          // Security: Log error but don't expose to user
          console.error('EmailJS notification failed:', err);
        });
      });
    }
  } else {
    // User signed out - hide all admin elements
    nav.innerHTML=`<button class="btn-signin" onclick="showPage('signin')">Sign In</button>`;
    
    // Mobile navigation - signed out state
    if(mobileNav) {
      mobileNav.innerHTML = `
        <button class="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl text-sm font-semibold font-outfit cursor-pointer transition-all duration-150 hover:border-matcha-600 hover:text-matcha-700 hover:bg-matcha-50 mb-3" onclick="showPage('signin'); closeMobileMenu();">Sign In</button>
        <button class="w-full bg-matcha-600 text-white border-none py-3 px-4 rounded-xl text-sm font-bold font-outfit cursor-pointer transition-all duration-200 hover:bg-matcha-700 shadow-lg" onclick="showPage('signup'); closeMobileMenu();">Sign Up</button>
      `;
    }
    
    if(adminBtn) adminBtn.style.display='none';
    if(adminPage){
      // Security: If admin page is active, redirect to home
      if(adminPage.classList.contains('active')) showPage('home');
      adminPage.classList.remove('admin-unlocked');
      // Hide admin panel on logout
      adminPage.style.display = 'none';
    }
  }
}

# 🔥 Firebase Security Rules

## Overview
These security rules should be configured in your Firebase Console to protect your backend data.

---

## 📍 Where to Configure

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **indiakaai-98aa5**
3. Navigate to **Firestore Database** → **Rules** (if using Firestore)
4. Navigate to **Storage** → **Rules** (if using Storage)

---

## 🔒 Firestore Security Rules

### Basic Setup (If You Add Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function: Check if user is admin
    function isAdmin() {
      return request.auth != null 
             && request.auth.token.email == 'devanshup416@gmail.com';
    }
    
    // Helper function: Check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Default: Deny all access
    match /{document=**} {
      allow read, write: if false;
    }
    
    // User profiles (if you create this collection)
    match /users/{userId} {
      // Anyone can read user profiles
      allow read: if true;
      // Only admin can create/update/delete
      allow write: if isAdmin();
    }
    
    // AI Tools (if you migrate from Supabase to Firestore)
    match /ai_tools/{toolId} {
      // Anyone can read tools
      allow read: if true;
      // Only admin can modify
      allow create, update, delete: if isAdmin();
    }
    
    // Blog Posts (if you migrate from localStorage to Firestore)
    match /blog_posts/{postId} {
      // Anyone can read blogs
      allow read: if true;
      // Only admin can modify
      allow create, update, delete: if isAdmin();
    }
    
    // Contact Form Submissions (if you want to store them)
    match /contact_submissions/{submissionId} {
      // Only admin can read submissions
      allow read: if isAdmin();
      // Authenticated users can create submissions
      allow create: if isAuthenticated();
      // No one can update or delete
      allow update, delete: if false;
    }
  }
}
```

---

## 🗄️ Firebase Storage Rules

### If You Add File Upload Features

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Helper function: Check if user is admin
    function isAdmin() {
      return request.auth != null 
             && request.auth.token.email == 'devanshup416@gmail.com';
    }
    
    // Default: Deny all access
    match /{allPaths=**} {
      allow read, write: if false;
    }
    
    // Tool logos/images (if you add upload feature)
    match /tool_images/{imageId} {
      // Anyone can read images
      allow read: if true;
      // Only admin can upload
      allow write: if isAdmin();
    }
    
    // Blog images
    match /blog_images/{imageId} {
      // Anyone can read images
      allow read: if true;
      // Only admin can upload
      allow write: if isAdmin();
    }
    
    // User avatars (if you add custom avatar upload)
    match /avatars/{userId}/{fileName} {
      // Anyone can read avatars
      allow read: if true;
      // Users can only upload their own avatar
      allow write: if request.auth != null 
                   && request.auth.uid == userId
                   && request.resource.size < 2 * 1024 * 1024  // Max 2MB
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

## 🔐 Authentication Configuration

### Google Sign-In Setup

1. **Enable Google Provider**
   - Go to: **Authentication** → **Sign-in method**
   - Click **Google** → **Enable**
   - Add support email: `devanshup416@gmail.com`

2. **Add Authorized Domains**
   - In the same section, scroll to **Authorized domains**
   - Add:
     - `indiakaai.com`
     - `indiakaai-*.vercel.app` (or specific Vercel URLs)
     - `localhost` (for local development)

3. **Configure OAuth Consent Screen** (if prompted)
   - Go to Google Cloud Console
   - Select project: **indiakaai-98aa5**
   - Navigate to **APIs & Services** → **OAuth consent screen**
   - Add authorized domains and configure branding

---

## 🧪 Testing Security Rules

### Test in Firebase Console

1. Go to **Firestore Database** → **Rules**
2. Click **Rules Playground** tab
3. Test scenarios:

```javascript
// Test 1: Anonymous user trying to read tools (should ALLOW)
Location: /ai_tools/tool123
Auth: Unauthenticated
Operation: get
Expected: ALLOW

// Test 2: Anonymous user trying to write tools (should DENY)
Location: /ai_tools/tool123
Auth: Unauthenticated
Operation: create
Expected: DENY

// Test 3: Admin trying to write tools (should ALLOW)
Location: /ai_tools/tool123
Auth: Authenticated (email: devanshup416@gmail.com)
Operation: create
Expected: ALLOW

// Test 4: Non-admin authenticated user trying to write (should DENY)
Location: /ai_tools/tool123
Auth: Authenticated (email: other@gmail.com)
Operation: create
Expected: DENY
```

---

## 📊 Monitoring & Logging

### Enable Audit Logs

1. Go to **Firestore Database** → **Usage**
2. Monitor:
   - Read/Write operations
   - Denied requests (security violations)
   - Bandwidth usage

### Set Up Alerts

1. Go to **Cloud Console** → **Monitoring**
2. Create alerts for:
   - Unusual spike in denied requests
   - High number of write operations
   - Bandwidth threshold exceeded

---

## 🚨 Security Best Practices

### ✅ DO
- Always validate user authentication before writes
- Use admin email check for privileged operations
- Limit file upload sizes
- Validate file types for uploads
- Enable audit logging
- Test rules in playground before deploying
- Use least-privilege principle (deny by default)

### ❌ DON'T
- Never allow unauthenticated writes
- Don't expose admin credentials in client code
- Don't trust client-side validation alone
- Don't allow unlimited file uploads
- Don't skip testing security rules

---

## 🔄 Migration from Current Setup

### If You Want to Move from Supabase to Firestore

1. **Export data from Supabase**
   ```sql
   COPY (SELECT * FROM ai_tools) TO '/tmp/ai_tools.csv' CSV HEADER;
   ```

2. **Import to Firestore**
   - Use Firebase Admin SDK or Firestore import tool
   - Apply security rules before importing

3. **Update client code**
   - Replace `_sb.from('ai_tools')` with Firestore queries
   - Update auth checks to use Firebase Auth tokens

---

## 📞 Support

If you encounter issues:
1. Check Firebase Console → **Authentication** → **Users** (verify admin email)
2. Review **Firestore** → **Rules** → **Logs** (see denied requests)
3. Test rules in **Rules Playground**
4. Check browser console for detailed error messages

---

**Last Updated:** April 24, 2026
**Firebase Project:** indiakaai-98aa5
**Admin Email:** devanshup416@gmail.com

# 🛡️ Supabase Row Level Security (RLS) Policies

## Overview
These RLS policies should be configured in your Supabase Dashboard to protect your database.

---

## 📍 Where to Configure

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select project: **lnedatdaewcfukaqupze** (India region)
3. Navigate to **Authentication** → **Policies**
4. Or use **SQL Editor** to run the policies below

---

## 🔒 Enable RLS on Tables

### Step 1: Enable RLS

```sql
-- Enable Row Level Security on ai_tools table
ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;

-- Enable Row Level Security on blog_posts table (if you create it)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
```

---

## 📖 AI Tools Table Policies

### Policy 1: Public Read Access

```sql
-- Allow anyone to view AI tools
CREATE POLICY "Anyone can view AI tools"
ON ai_tools
FOR SELECT
USING (true);
```

### Policy 2: Admin Write Access

```sql
-- Only admin can insert new tools
CREATE POLICY "Only admin can insert tools"
ON ai_tools
FOR INSERT
WITH CHECK (
  auth.jwt() ->> 'email' = 'devanshup416@gmail.com'
);

-- Only admin can update tools
CREATE POLICY "Only admin can update tools"
ON ai_tools
FOR UPDATE
USING (
  auth.jwt() ->> 'email' = 'devanshup416@gmail.com'
)
WITH CHECK (
  auth.jwt() ->> 'email' = 'devanshup416@gmail.com'
);

-- Only admin can delete tools
CREATE POLICY "Only admin can delete tools"
ON ai_tools
FOR DELETE
USING (
  auth.jwt() ->> 'email' = 'devanshup416@gmail.com'
);
```

### Alternative: Combined Write Policy

```sql
-- Simpler version: One policy for all write operations
CREATE POLICY "Only admin can modify tools"
ON ai_tools
FOR ALL
USING (
  auth.jwt() ->> 'email' = 'devanshup416@gmail.com'
)
WITH CHECK (
  auth.jwt() ->> 'email' = 'devanshup416@gmail.com'
);
```

---

## 📝 Blog Posts Table Policies (If You Create It)

### Create Table First

```sql
-- Create blog_posts table
CREATE TABLE blog_posts (
  id BIGINT PRIMARY KEY,
  tag TEXT NOT NULL,
  emoji TEXT DEFAULT '🤖',
  bg TEXT,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  date TEXT,
  read TEXT DEFAULT '5 min read',
  url TEXT,
  author TEXT DEFAULT 'IndiaKaAI Team',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
```

### Policy 1: Public Read Access

```sql
-- Allow anyone to view blog posts
CREATE POLICY "Anyone can view blog posts"
ON blog_posts
FOR SELECT
USING (true);
```

### Policy 2: Admin Write Access

```sql
-- Only admin can modify blog posts
CREATE POLICY "Only admin can modify blog posts"
ON blog_posts
FOR ALL
USING (
  auth.jwt() ->> 'email' = 'devanshup416@gmail.com'
)
WITH CHECK (
  auth.jwt() ->> 'email' = 'devanshup416@gmail.com'
);
```

---

## 📧 Contact Submissions Table (Optional)

### Create Table

```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type TEXT NOT NULL,
  from_name TEXT,
  reply_to TEXT,
  subject TEXT,
  message TEXT,
  tool_name TEXT,
  tool_url TEXT,
  company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_email TEXT,
  user_id UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
```

### Policies

```sql
-- Only admin can view submissions
CREATE POLICY "Only admin can view submissions"
ON contact_submissions
FOR SELECT
USING (
  auth.jwt() ->> 'email' = 'devanshup416@gmail.com'
);

-- Authenticated users can create submissions
CREATE POLICY "Authenticated users can submit"
ON contact_submissions
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL
);

-- No one can update or delete submissions
-- (Implicit: no policy = no access)
```

---

## 🔐 Supabase Auth Configuration

### Enable Google OAuth

1. **Get Google OAuth Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select project: **indiakaai-98aa5**
   - Navigate to **APIs & Services** → **Credentials**
   - Create OAuth 2.0 Client ID (Web application)
   - Add authorized redirect URIs:
     ```
     https://lnedatdaewcfukaqupze.supabase.co/auth/v1/callback
     ```

2. **Configure in Supabase**
   - Go to Supabase Dashboard → **Authentication** → **Providers**
   - Enable **Google**
   - Add Client ID and Client Secret from Google Console
   - Add authorized redirect URLs:
     - `https://indiakaai.com`
     - `https://indiakaai-*.vercel.app`

3. **Update Client Code** (if switching from Firebase to Supabase Auth)
   ```javascript
   // Replace Firebase auth with Supabase auth
   const { data, error } = await _sb.auth.signInWithOAuth({
     provider: 'google',
     options: {
       redirectTo: 'https://indiakaai.com'
     }
   });
   ```

---

## 🧪 Testing RLS Policies

### Test in Supabase SQL Editor

```sql
-- Test 1: Anonymous read (should work)
SELECT * FROM ai_tools LIMIT 5;

-- Test 2: Try to insert as anonymous (should fail)
INSERT INTO ai_tools (id, name, cat, pricing, description, icon, color, url)
VALUES (999999, 'Test Tool', 'Writing', 'Free', 'Test', '🤖', '#FF6B00', 'https://test.com');
-- Expected: Error - new row violates row-level security policy

-- Test 3: Check current user
SELECT auth.jwt();
-- Should return null if not authenticated

-- Test 4: Simulate admin user (in SQL Editor with admin privileges)
-- This requires setting up a test user with admin email
```

### Test from Client Code

```javascript
// Test 1: Read as anonymous (should work)
const { data, error } = await _sb.from('ai_tools').select('*').limit(5);
console.log('Read test:', data ? 'SUCCESS' : 'FAILED', error);

// Test 2: Write as anonymous (should fail)
const { data: writeData, error: writeError } = await _sb
  .from('ai_tools')
  .insert({ name: 'Test', cat: 'Writing', pricing: 'Free', description: 'Test' });
console.log('Write test:', writeError ? 'BLOCKED (correct)' : 'ALLOWED (wrong!)');

// Test 3: Write as admin (should work after signing in)
// First sign in with admin account, then try insert
```

---

## 📊 Monitoring & Logging

### Enable Audit Logs

1. Go to **Database** → **Logs**
2. Monitor:
   - Failed RLS policy checks
   - Unauthorized access attempts
   - Query performance

### Set Up Webhooks (Optional)

```sql
-- Create function to log security violations
CREATE OR REPLACE FUNCTION log_security_violation()
RETURNS TRIGGER AS $$
BEGIN
  -- Log to a separate table or send webhook
  INSERT INTO security_logs (table_name, operation, user_email, timestamp)
  VALUES (TG_TABLE_NAME, TG_OP, auth.jwt() ->> 'email', NOW());
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger (optional)
-- This would require additional setup
```

---

## 🚨 Security Best Practices

### ✅ DO
- Always enable RLS on all tables
- Test policies with different user roles
- Use `auth.jwt() ->> 'email'` for admin checks
- Monitor failed policy checks
- Use `SECURITY DEFINER` carefully
- Validate data in policies
- Use separate policies for read/write when needed

### ❌ DON'T
- Never disable RLS in production
- Don't use `USING (true)` for write operations
- Don't trust client-side validation alone
- Don't expose service role key in frontend
- Don't skip testing policies
- Don't use overly permissive policies

---

## 🔄 Migration Steps

### If Currently Using localStorage

1. **Create Supabase tables**
   ```sql
   -- Run the CREATE TABLE statements above
   ```

2. **Migrate data**
   ```javascript
   // Export from localStorage
   const tools = JSON.parse(localStorage.getItem('ikaiAITools'));
   
   // Import to Supabase (as admin)
   const { data, error } = await _sb
     .from('ai_tools')
     .insert(tools);
   ```

3. **Update client code**
   ```javascript
   // Replace localStorage with Supabase
   // Before: localStorage.getItem('ikaiAITools')
   // After: await _sb.from('ai_tools').select('*')
   ```

4. **Enable RLS policies**
   ```sql
   -- Run the policy statements above
   ```

---

## 🔍 Troubleshooting

### Common Issues

**Issue 1: "new row violates row-level security policy"**
- **Cause:** User doesn't have permission to insert/update
- **Solution:** Check if user is authenticated and has admin email

**Issue 2: Policies not working**
- **Cause:** RLS not enabled on table
- **Solution:** Run `ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`

**Issue 3: Admin can't write**
- **Cause:** JWT doesn't contain email claim
- **Solution:** Ensure Google OAuth is configured correctly

**Issue 4: Anonymous users can write**
- **Cause:** No write policies defined (default allow)
- **Solution:** Create explicit write policies with admin check

### Debug Queries

```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- View all policies
SELECT * FROM pg_policies WHERE tablename = 'ai_tools';

-- Check current user
SELECT auth.uid(), auth.jwt();

-- Test policy manually
SELECT * FROM ai_tools WHERE (
  -- Your policy condition here
  auth.jwt() ->> 'email' = 'devanshup416@gmail.com'
);
```

---

## 📞 Support

If you encounter issues:
1. Check Supabase Dashboard → **Database** → **Logs**
2. Review **Authentication** → **Users** (verify admin email)
3. Test policies in **SQL Editor**
4. Check browser console for detailed error messages
5. Review [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)

---

**Last Updated:** April 24, 2026
**Supabase Project:** lnedatdaewcfukaqupze (India region)
**Admin Email:** devanshup416@gmail.com
**Anon Key:** Safe to expose (protected by RLS)

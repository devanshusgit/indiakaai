# PHASE 3: QUICK SETUP GUIDE

Follow these steps to activate all Phase 3 features.

---

## Step 1: Set Up Supabase (Tool Ratings)

### 1.1 Go to Supabase Dashboard
```
https://supabase.com/dashboard/project/lnedatdaewcfukaqupze
```

### 1.2 Create the `tool_ratings` Table

1. Click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy and paste this SQL:

```sql
-- Create tool_ratings table
CREATE TABLE tool_ratings (
  id BIGSERIAL PRIMARY KEY,
  tool_id INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tool_id, user_id)
);

-- Create indexes for performance
CREATE INDEX idx_tool_ratings_tool_id ON tool_ratings(tool_id);
CREATE INDEX idx_tool_ratings_user_id ON tool_ratings(user_id);

-- Enable Row Level Security
ALTER TABLE tool_ratings ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can read ratings
CREATE POLICY "Anyone can read ratings"
  ON tool_ratings
  FOR SELECT
  USING (true);

-- RLS Policy: Authenticated users can insert their own ratings
CREATE POLICY "Users can insert their own ratings"
  ON tool_ratings
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- RLS Policy: Users can update their own ratings
CREATE POLICY "Users can update their own ratings"
  ON tool_ratings
  FOR UPDATE
  USING (auth.uid()::text = user_id);

-- RLS Policy: Users can delete their own ratings
CREATE POLICY "Users can delete their own ratings"
  ON tool_ratings
  FOR DELETE
  USING (auth.uid()::text = user_id);
```

4. Click **Run** (or press F5)
5. You should see: "Success. No rows returned"

### 1.3 Verify the Table

1. Click **Table Editor** in the left sidebar
2. You should see `tool_ratings` in the list
3. Click on it to view the empty table

### 1.4 Test with Sample Data (Optional)

```sql
-- Insert a test rating
INSERT INTO tool_ratings (tool_id, user_id, rating)
VALUES (1, 'test_user_123', 5);

-- Query the rating
SELECT * FROM tool_ratings WHERE tool_id = 1;

-- Calculate average
SELECT AVG(rating) as average, COUNT(*) as count
FROM tool_ratings
WHERE tool_id = 1;

-- Delete test data
DELETE FROM tool_ratings WHERE user_id = 'test_user_123';
```

---

## Step 2: Set Up Firebase Firestore (Bookmarks)

### 2.1 Go to Firebase Console
```
https://console.firebase.google.com/project/indiakaai-98aa5
```

### 2.2 Enable Firestore Database

1. Click **Firestore Database** in the left sidebar
2. Click **Create database**
3. Choose **Start in production mode**
4. Select location: **asia-south1 (Mumbai)**
5. Click **Enable**

### 2.3 Update Security Rules

1. Click the **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Bookmarks collection
    match /bookmarks/{userId} {
      // Users can only read their own bookmarks
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Users can only write their own bookmarks
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **Publish**

### 2.4 Test Firestore (Optional)

1. Click the **Data** tab
2. Click **Start collection**
3. Collection ID: `bookmarks`
4. Document ID: `test_user_123`
5. Add fields:
   - Field: `toolIds` | Type: array | Value: `[1, 2, 3]`
   - Field: `updatedAt` | Type: timestamp | Value: (click "Set to current time")
6. Click **Save**
7. Delete the test document

---

## Step 3: Deploy to Vercel

### 3.1 Commit Changes

```bash
git add .
git commit -m "Phase 3: Product Features - Tool of Week, Recently Added, Bookmarks, Ratings, Improved Search"
git push origin main
```

### 3.2 Deploy

```bash
vercel --prod
```

Or wait for automatic deployment if you have Vercel GitHub integration.

---

## Step 4: Test All Features

### 4.1 Test Tool of the Week
1. Go to homepage
2. Scroll down below the hero section
3. You should see a large green card featuring "Cursor"
4. Click "Try Cursor" → Opens Cursor website
5. Click "Learn More" → Opens tool preview modal

### 4.2 Test Recently Added
1. Scroll down below Tool of the Week
2. You should see "Recently Added" section with 5 tools
3. Click any tool → Opens tool preview modal

### 4.3 Test Bookmarks
1. **Without signing in:**
   - Click any bookmark icon (☆)
   - Should show: "⚠️ Please sign in to bookmark tools"
   - Should redirect to sign-in page

2. **After signing in:**
   - Click any bookmark icon (☆)
   - Icon should change to filled star (⭐)
   - Should show: "⭐ Tool bookmarked!"
   - Click again to remove bookmark
   - Should show: "🗑️ Bookmark removed"

3. **Verify Firebase sync:**
   - Go to Firebase Console → Firestore Database
   - You should see a document with your user ID
   - Field `toolIds` should contain bookmarked tool IDs

### 4.4 Test Ratings
1. **Without signing in:**
   - Click any star rating
   - Should show: "⚠️ Please sign in to rate tools"
   - Should redirect to sign-in page

2. **After signing in:**
   - Click a star rating (1-5)
   - Should show: "⭐ Rated X stars!"
   - Rating display should update
   - Try rating the same tool again (should update)

3. **Verify Supabase data:**
   - Go to Supabase Dashboard → Table Editor → tool_ratings
   - You should see your rating
   - Columns: tool_id, user_id, rating, created_at, updated_at

### 4.5 Test Improved Search
1. Go to homepage
2. Type in search box: "free"
3. Wait 300ms (debounce)
4. Should show only free tools
5. Try: "coding" → Shows coding tools
6. Try: "chatgpt" → Shows ChatGPT
7. Try: "image generation" → Shows image tools

---

## Step 5: Monitor & Verify

### 5.1 Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Should see no errors
4. Should see: "🔥 Firebase initialized"
5. Should see: "✅ Supabase connected"

### 5.2 Check Network Tab
1. Open DevTools → Network tab
2. Bookmark a tool
3. Should see Firebase Firestore request
4. Rate a tool
5. Should see Supabase API request

### 5.3 Check localStorage
1. Open DevTools → Application tab
2. Go to Local Storage → your domain
3. Should see: `ikaai_bookmarks_[user_id]`
4. Value should be array of tool IDs

---

## Troubleshooting

### Issue: Ratings not loading
**Solution:**
- Check Supabase table exists
- Check RLS policies are enabled
- Check browser console for errors
- Verify Supabase URL and anon key in `js/api.js`

### Issue: Bookmarks not saving
**Solution:**
- Check Firestore is enabled
- Check security rules are published
- Check user is signed in
- Check browser console for errors
- Verify Firebase config in `js/firebase.js`

### Issue: Search not working
**Solution:**
- Check browser console for errors
- Verify `improvedSearch()` function exists
- Check search input has correct `oninput` handler
- Clear browser cache and reload

### Issue: Tool of the Week not showing
**Solution:**
- Check `toolOfWeekContainer` div exists in HTML
- Check `renderToolOfTheWeek()` is called in INIT
- Check `TOOL_OF_THE_WEEK` constant is defined
- Check tool ID 46 (Cursor) exists in AI_TOOLS array

### Issue: Recently Added not showing
**Solution:**
- Check `recentlyAddedContainer` div exists in HTML
- Check `renderRecentlyAdded()` is called in INIT
- Check `RECENTLY_ADDED_IDS` constant is defined
- Check tool IDs exist in AI_TOOLS array

---

## Performance Checklist

- [ ] Ratings load asynchronously (don't block UI)
- [ ] Bookmarks save instantly (localStorage)
- [ ] Search has 300ms debounce
- [ ] No console errors
- [ ] Page loads in < 2 seconds
- [ ] Mobile responsive
- [ ] All features work on mobile

---

## Security Checklist

- [ ] Supabase RLS policies enabled
- [ ] Firebase security rules published
- [ ] User authentication required for bookmarks
- [ ] User authentication required for ratings
- [ ] Rating values validated (1-5)
- [ ] No sensitive data in console logs

---

## Success Metrics to Track

### Week 1:
- Total bookmarks created
- Total ratings submitted
- Tool of the Week clicks
- Recently Added clicks
- Search usage

### Week 2-4:
- Bookmark retention rate
- Average ratings per tool
- Most bookmarked tools
- Most rated tools
- Search success rate

---

## Next Steps After Setup

1. **Monitor user engagement:**
   - Track bookmark usage
   - Track rating submissions
   - Track search queries

2. **Optimize based on data:**
   - Update Tool of the Week weekly
   - Add more recently added tools
   - Improve search algorithm

3. **Plan Phase 4:**
   - My Bookmarks page
   - Tool comparison feature
   - User reviews
   - Advanced filters

---

**Setup Time:** ~15 minutes
**Difficulty:** Easy
**Prerequisites:** Supabase account, Firebase account

**Need Help?** Check the detailed documentation in `PHASE3_DATABASE_SCHEMA.md`

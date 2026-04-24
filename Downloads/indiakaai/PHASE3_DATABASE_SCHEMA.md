# PHASE 3: DATABASE SCHEMA

## Supabase Tables

### 1. `tool_ratings` Table

This table stores user ratings for AI tools.

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

-- Create index for faster queries
CREATE INDEX idx_tool_ratings_tool_id ON tool_ratings(tool_id);
CREATE INDEX idx_tool_ratings_user_id ON tool_ratings(user_id);

-- Enable Row Level Security (RLS)
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

### Table Structure:

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGSERIAL | Primary key (auto-increment) |
| `tool_id` | INTEGER | ID of the AI tool being rated |
| `user_id` | TEXT | Firebase UID of the user |
| `rating` | INTEGER | Rating value (1-5 stars) |
| `created_at` | TIMESTAMP | When the rating was first created |
| `updated_at` | TIMESTAMP | When the rating was last updated |

### Constraints:
- `UNIQUE(tool_id, user_id)` - Each user can only rate a tool once
- `CHECK (rating >= 1 AND rating <= 5)` - Rating must be between 1-5

---

## Firebase Firestore Collections

### 1. `bookmarks` Collection

This collection stores user bookmarks for AI tools.

**Document Structure:**

```javascript
{
  // Document ID = Firebase user UID
  "userId": "firebase_user_uid",
  "toolIds": [1, 13, 45, 46, 100], // Array of bookmarked tool IDs
  "updatedAt": Timestamp // Server timestamp
}
```

### Firestore Security Rules:

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

---

## Setup Instructions

### Supabase Setup:

1. **Go to Supabase Dashboard:**
   - URL: https://supabase.com/dashboard/project/lnedatdaewcfukaqupze

2. **Create the `tool_ratings` table:**
   - Go to: SQL Editor
   - Copy and paste the SQL schema above
   - Click "Run"

3. **Verify RLS Policies:**
   - Go to: Authentication → Policies
   - Ensure all 4 policies are active

4. **Test the table:**
   ```sql
   -- Insert a test rating
   INSERT INTO tool_ratings (tool_id, user_id, rating)
   VALUES (1, 'test_user_123', 5);
   
   -- Query ratings for a tool
   SELECT AVG(rating) as average, COUNT(*) as count
   FROM tool_ratings
   WHERE tool_id = 1;
   ```

### Firebase Setup:

1. **Go to Firebase Console:**
   - URL: https://console.firebase.google.com/project/indiakaai-98aa5

2. **Enable Firestore:**
   - Go to: Firestore Database
   - Click "Create database"
   - Choose "Start in production mode"
   - Select region: `asia-south1` (Mumbai)

3. **Update Security Rules:**
   - Go to: Firestore Database → Rules
   - Copy and paste the security rules above
   - Click "Publish"

4. **Test Firestore:**
   - Go to: Firestore Database → Data
   - Create a test document in `bookmarks` collection
   - Document ID: `test_user_123`
   - Field: `toolIds` (array): `[1, 2, 3]`
   - Field: `updatedAt` (timestamp): `now`

---

## API Usage Examples

### Rating a Tool:

```javascript
// Submit a rating
await rateTool(46, 5); // Rate Cursor 5 stars

// Get tool rating
const rating = await getToolRating(46);
console.log(rating); // { average: "4.8", count: 125 }
```

### Bookmarking a Tool:

```javascript
// Toggle bookmark
await toggleBookmark(46); // Bookmark Cursor

// Check if bookmarked
const isBookmarked = isBookmarked(46); // true/false

// Get all user bookmarks
const bookmarks = getUserBookmarks(); // [1, 13, 45, 46, 100]
```

---

## Data Flow

### Ratings Flow:
1. User clicks star rating (1-5)
2. `rateTool()` function called
3. Data sent to Supabase `tool_ratings` table
4. RLS policy checks if user is authenticated
5. Rating saved/updated (upsert)
6. UI refreshed to show new average rating

### Bookmarks Flow:
1. User clicks bookmark icon (☆/⭐)
2. `toggleBookmark()` function called
3. Data saved to localStorage (instant)
4. Data synced to Firebase Firestore (background)
5. UI refreshed to show bookmark status

---

## Security Considerations

### Supabase RLS:
- ✅ Anyone can read ratings (public data)
- ✅ Only authenticated users can rate
- ✅ Users can only modify their own ratings
- ✅ Rating values validated (1-5 only)

### Firebase Security:
- ✅ Users can only read their own bookmarks
- ✅ Users can only write their own bookmarks
- ✅ Document ID must match user UID
- ✅ No public access to bookmarks

### Client-Side Validation:
- ✅ Check user authentication before actions
- ✅ Validate rating values (1-5)
- ✅ Prevent duplicate ratings (upsert)
- ✅ Handle errors gracefully

---

## Performance Optimization

### Ratings:
- Indexed by `tool_id` for fast queries
- Indexed by `user_id` for user history
- Cached in UI after initial load
- Async loading (doesn't block UI)

### Bookmarks:
- Stored in localStorage (instant access)
- Synced to Firestore (background)
- No network calls for read operations
- Cross-device sync via Firestore

---

## Monitoring & Analytics

### Track These Metrics:
- Total ratings submitted
- Average rating per tool
- Most rated tools
- User engagement (ratings + bookmarks)
- Rating distribution (1-5 stars)

### Supabase Queries:

```sql
-- Most rated tools
SELECT tool_id, COUNT(*) as rating_count, AVG(rating) as avg_rating
FROM tool_ratings
GROUP BY tool_id
ORDER BY rating_count DESC
LIMIT 10;

-- Rating distribution
SELECT rating, COUNT(*) as count
FROM tool_ratings
GROUP BY rating
ORDER BY rating;

-- Recent ratings
SELECT tool_id, user_id, rating, created_at
FROM tool_ratings
ORDER BY created_at DESC
LIMIT 20;
```

---

**Status:** ✅ Schema Ready for Implementation
**Next Step:** Run SQL commands in Supabase Dashboard

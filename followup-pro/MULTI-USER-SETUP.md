# Multi-User Setup Guide for FollowUpPro

This guide will help you set up FollowUpPro to support multiple users with secure authentication and user-specific data.

## 🚀 Quick Setup

### Step 1: Enable Authentication in Supabase

1. **Go to your Supabase dashboard**
   - Navigate to [supabase.com](https://supabase.com)
   - Select your project

2. **Enable Authentication**
   - Go to Authentication → Settings
   - Enable "Enable email confirmations" (recommended)
   - Enable "Enable phone confirmations" (optional)

3. **Configure Email Templates** (Optional)
   - Go to Authentication → Email Templates
   - Customize the confirmation and reset password emails

### Step 2: Set Up Database Schema

1. **Open SQL Editor**
   - Go to SQL Editor in your Supabase dashboard

2. **Run the Database Setup Script**
   - Copy and paste the contents of `database-setup.sql`
   - Click "Run" to execute the script

3. **Verify Setup**
   - Go to Table Editor → jobs
   - You should see a new `user_id` column
   - Go to Authentication → Policies to see the new RLS policies

### Step 3: Configure OAuth (Optional)

1. **Google OAuth Setup**
   - Go to Authentication → Providers
   - Enable Google provider
   - Add your Google OAuth credentials

2. **Other Providers**
   - You can also enable GitHub, Discord, etc.

### Step 4: Update Environment Variables

Make sure your `.env` file has the correct Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 🔒 Security Features

### Row Level Security (RLS)
- Users can only see, edit, and delete their own jobs
- Automatic user_id assignment on job creation
- Secure database policies

### Authentication
- Email/password authentication
- Google OAuth support
- Secure session management
- Automatic logout on session expiry

### Data Isolation
- Each user's data is completely isolated
- No cross-user data access
- Automatic cleanup when users are deleted

## 📊 Database Schema

### Jobs Table Structure
```sql
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT DEFAULT 'applied',
  applied_at DATE,
  last_contacted_at DATE,
  recruiter_email TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Key Features
- **user_id**: Links jobs to specific users
- **CASCADE DELETE**: Jobs are automatically deleted when users are deleted
- **Indexes**: Optimized for fast queries
- **RLS Policies**: Secure access control

## 🎯 User Experience

### New Users
1. **Sign Up**: Create account with email/password or Google
2. **Email Confirmation**: Verify email address (if enabled)
3. **First Login**: Welcome message and onboarding
4. **Start Using**: Add their first job application

### Existing Users
1. **Sign In**: Quick login with email/password or Google
2. **Persistent Sessions**: Stay logged in across browser sessions
3. **Data Sync**: All data automatically syncs across devices

### User Management
- **Profile**: Users can see their email and sign out
- **Data Privacy**: Complete data isolation
- **Account Deletion**: Users can delete their account and all data

## 🔧 Advanced Configuration

### Custom Email Templates
```sql
-- Example: Custom welcome email
UPDATE auth.config 
SET email_template_welcome = 'Welcome to FollowUpPro!'
WHERE id = 1;
```

### Custom User Metadata
```sql
-- Add custom fields to user profiles
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS job_title TEXT;
```

### Analytics and Monitoring
```sql
-- Track user activity
CREATE TABLE user_activity (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🚨 Troubleshooting

### Common Issues

1. **"Permission denied" errors**
   - Check that RLS policies are correctly set up
   - Verify user authentication is working

2. **Users can't see their jobs**
   - Ensure `user_id` is being set correctly
   - Check the RLS policies

3. **Authentication not working**
   - Verify Supabase URL and keys
   - Check email confirmation settings

4. **Google OAuth not working**
   - Verify OAuth credentials in Supabase
   - Check redirect URLs

### Debug Commands
```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'jobs';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'jobs';

-- Check user data
SELECT * FROM auth.users LIMIT 5;
```

## 📈 Performance Optimization

### Database Indexes
- `user_id` index for fast user-specific queries
- `created_at` index for sorting
- Composite indexes for complex queries

### Query Optimization
- Use the provided database functions
- Leverage RLS for automatic filtering
- Use realtime subscriptions for live updates

## 🔄 Deployment

### Environment Variables
Make sure to set these in your deployment platform:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Database Migration
1. Run the `database-setup.sql` script in production
2. Test authentication flow
3. Verify RLS policies are working

## 📞 Support

If you encounter issues:
1. Check the Supabase logs
2. Verify your database schema
3. Test authentication flow
4. Review RLS policies

---

Your FollowUpPro application is now ready for multiple users! 🎉 
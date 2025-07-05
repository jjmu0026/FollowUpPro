# 🚀 Quick Setup Reference - FollowUpPro Multi-User

## 📋 Essential Steps (5 minutes)

### 1. 🔐 Enable Authentication in Supabase
- Go to: https://supabase.com/dashboard
- Select your project
- **Authentication → Settings**
- ✅ Enable "Enable email confirmations"
- Save changes

### 2. 🗄️ Run Database Setup
- **SQL Editor** in Supabase dashboard
- Copy ALL content from `database-setup.sql`
- Paste and click **"Run"**
- ✅ Should see "Success" message

### 3. 🔑 Get Your API Keys
- **Settings → API** in Supabase
- Copy:
  - **Project URL** (starts with `https://`)
  - **anon public** key (starts with `eyJ`)
- Update your `.env` file with these values

### 4. 🧪 Test the Setup
```bash
npm run dev
```
- Open http://localhost:5173
- Try signing up with a new email
- Add a test job application
- Verify it works!

## 🔧 Your .env File Should Look Like:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🎯 What This Enables:
- ✅ User registration and login
- ✅ Secure data isolation (users only see their own jobs)
- ✅ Google OAuth (optional)
- ✅ Automatic user assignment
- ✅ Row Level Security

## 🚨 Common Issues:
- **"Permission denied"**: Make sure you ran the database setup script
- **"Invalid API key"**: Check your .env file values
- **"Table doesn't exist"**: Run the database setup script first

## 📞 Need Help?
- Check `MULTI-USER-SETUP.md` for detailed instructions
- Verify your Supabase project is active
- Test with a fresh browser session

---
**Time to complete: ~5 minutes** ⏱️ 
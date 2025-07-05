# 🔐 Quick Google OAuth Setup

## 🚨 Problem: "Continue with Google" doesn't work

**Solution**: Google OAuth needs to be configured in Supabase.

## ⚡ Quick Fix (5 minutes)

### 1. Create Google OAuth Credentials
1. Go to: https://console.cloud.google.com/
2. Create new project or select existing
3. Enable "Google Identity" API
4. Create OAuth 2.0 credentials (Web application)
5. Add redirect URIs:
   ```
   https://your-project-id.supabase.co/auth/v1/callback
   http://localhost:5173/auth/callback
   ```

### 2. Configure Supabase
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Authentication → Providers → Enable Google
4. Add Client ID and Client Secret from Google Cloud Console

### 3. Test
1. Restart dev server: `npm run dev`
2. Try "Continue with Google" button
3. Should redirect to Google consent screen

## 🔧 Your Credentials Needed:
- **Client ID**: From Google Cloud Console
- **Client Secret**: From Google Cloud Console
- **Supabase URL**: From Supabase Settings → API

## 📋 Redirect URIs to Add:
```
https://your-project-id.supabase.co/auth/v1/callback
http://localhost:5173/auth/callback
```

## 🚨 Common Errors:
- **"OAuth provider not configured"** → Enable Google in Supabase
- **"Invalid redirect URI"** → Check redirect URIs match exactly
- **"API not enabled"** → Enable Google Identity API

## 📖 Full Guide:
See `GOOGLE-OAUTH-SETUP.md` for detailed instructions.

---
**Time to fix: ~5 minutes** ⏱️ 
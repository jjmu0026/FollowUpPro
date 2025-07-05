# 🔐 Google OAuth Setup for FollowUpPro

## 🚨 Why Google Sign-in Isn't Working

The "Continue with Google" button isn't working because Google OAuth hasn't been configured in your Supabase project. Here's how to fix it using the modern Google Identity Services approach:

## 🚀 Step-by-Step Setup

### Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project** (or select existing)
   - Click on the project dropdown at the top
   - Click "New Project"
   - Name it "FollowUpPro" or similar
   - Click "Create"

3. **Enable Google Identity Services**
   - Go to "APIs & Services" → "Library"
   - Search for **"Google Identity Services"** or **"Google Identity"
   - Click on it and click "Enable"
   - This is the modern replacement for deprecated APIs

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Name: "FollowUpPro Web Client"

5. **Add Authorized Redirect URIs**
   - Add these URLs (replace with your actual Supabase URL):
   ```
   https://vfoazaxtdqgjyqrwbsoy.supabase.co/auth/v1/callback
   http://localhost:5174/auth/callback
   ```
   - Click "Create"

6. **Copy Your Credentials**
   - Note down your **Client ID** and **Client Secret**
   - You'll need these for Supabase

### Step 2: Configure Supabase

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Enable Google Provider**
   - Go to "Authentication" → "Providers"
   - Find "Google" and click the toggle to enable it

3. **Add Google Credentials**
   - Click on "Google" to expand the settings
   - Enter your **Client ID** from Google Cloud Console
   - Enter your **Client Secret** from Google Cloud Console
   - Save the changes

### Step 3: Update Redirect URLs

1. **Get Your Supabase URL**
   - Go to "Settings" → "API"
   - Copy your Project URL (starts with `https://`)

2. **Update Google Cloud Console**
   - Go back to Google Cloud Console
   - Go to "APIs & Services" → "Credentials"
   - Edit your OAuth 2.0 Client ID
   - Add your Supabase callback URL:
   ```
   https://vfoazaxtdqgjyqrwbsoy.supabase.co
   ```

### Step 4: Test the Setup

1. **Restart your development server**
   ```bash
   npm run dev
   ```

2. **Test Google Sign-in**
   - Go to http://localhost:5173
   - Click "Continue with Google"
   - You should be redirected to Google's consent screen
   - After approval, you should be signed in

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid redirect URI"**
   - Make sure the redirect URI in Google Cloud Console matches exactly
   - Include the full path: `https://vfoazaxtdqgjyqrwbsoy.supabase.co/auth/v1/callback`

2. **"OAuth provider not configured"**
   - Check that Google provider is enabled in Supabase
   - Verify Client ID and Secret are correct

3. **"Redirect URI mismatch"**
   - Double-check the redirect URIs in Google Cloud Console
   - Make sure there are no extra spaces or characters

4. **"API not enabled"**
   - Make sure **Google Identity Services** API is enabled
   - This is the modern replacement for deprecated APIs

### Debug Steps:

1. **Check Browser Console**
   - Press F12 and look for errors
   - Check the Network tab for failed requests

2. **Check Supabase Logs**
   - Go to Supabase Dashboard → Logs
   - Look for authentication errors

3. **Verify URLs**
   - Make sure all URLs are HTTPS (except localhost)
   - Check for typos in project IDs

## 📱 Production Setup

### For Production Deployment:

1. **Update Redirect URIs**
   - Add your production domain to Google Cloud Console
   - Example: `https://yourdomain.com/auth/callback`

2. **Environment Variables**
   - Make sure your production environment has the correct Supabase URL
   - Update any hardcoded URLs in your code

3. **Test in Production**
   - Deploy your app and test Google sign-in
   - Make sure redirects work correctly

## 🔒 Security Best Practices

1. **Keep Credentials Secure**
   - Never commit Client Secret to version control
   - Use environment variables in production

2. **Restrict OAuth Scopes**
   - Only request necessary permissions
   - Default scopes are usually sufficient

3. **Monitor Usage**
   - Check Google Cloud Console for usage statistics
   - Monitor Supabase logs for authentication issues

## 🎯 Quick Checklist

- [ ] Google Cloud Console project created
- [ ] **Google Identity Services** API enabled
- [ ] OAuth 2.0 credentials created
- [ ] Redirect URIs configured correctly
- [ ] Supabase Google provider enabled
- [ ] Client ID and Secret added to Supabase
- [ ] Tested sign-in flow
- [ ] Production URLs updated (if applicable)

## 📞 Need Help?

If you're still having issues:

1. **Check the error message** in browser console
2. **Verify all URLs** match exactly
3. **Test with a fresh browser session**
4. **Check Supabase documentation**: https://supabase.com/docs/guides/auth/social-login/auth-google

## 🔍 Google Identity Landscape

Here's the current state of Google's identity APIs:

### ✅ **Currently Available & Recommended:**

1. **Google Identity Services (GIS)**
   - Modern, lightweight OAuth solution
   - Perfect for simple authentication needs
   - What we're using for FollowUpPro

2. **Google Identity Platform**
   - Comprehensive CIAM solution
   - Advanced features like multi-factor auth
   - More complex but more powerful

### ❌ **Deprecated/Unavailable:**

1. **Google+ API**
   - Shut down in March 2019
   - No longer available for new applications

2. **Google Identity Toolkit**
   - Deprecated predecessor to Identity Platform
   - Replaced by Google Identity Platform
   - No longer available for new projects

3. **Google Sign-In JavaScript Library**
   - Deprecated in favor of Google Identity Services
   - Should migrate to GIS for new projects

### 🎯 **For FollowUpPro:**

**Google Identity Services** is the perfect choice because:
- Simple OAuth authentication
- Works seamlessly with Supabase
- Modern, maintained API
- No complex enterprise features needed

## 🚀 Alternative: Google Identity Platform

If you need more advanced features, consider **Google Identity Platform**:

- Comprehensive CIAM solution
- Supports multiple authentication methods
- Advanced user management features
- Multi-factor authentication
- More complex setup but more powerful

For most applications like FollowUpPro, **Google Identity Services** with Supabase is sufficient.

---

Once configured, your Google OAuth will work seamlessly with FollowUpPro! 🎉 
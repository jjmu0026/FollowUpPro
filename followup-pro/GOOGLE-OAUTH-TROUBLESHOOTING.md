# 🔧 Google OAuth Troubleshooting Guide

## 🎯 Current Issue: Account Selection Works, But Login Fails

If you can see the Google account selection screen but login fails after selecting an account, here's how to fix it:

## 🔍 Step 1: Check Browser Console for Errors

1. **Open Developer Tools**
   - Press `F12` or right-click → "Inspect"
   - Go to the **Console** tab

2. **Try to sign in with Google**
   - Click "Continue with Google"
   - Select your account
   - When it fails, check the console for error messages

3. **Look for these common errors:**
   ```
   Error: redirect_uri_mismatch
   Error: invalid_client
   Error: OAuth provider not configured
   ```

## 🔧 Step 2: Verify Redirect URI Configuration

### In Google Cloud Console:

1. **Go to your OAuth 2.0 Client ID**
   - Google Cloud Console → APIs & Services → Credentials
   - Click on your OAuth 2.0 Client ID

2. **Check Authorized Redirect URIs**
   - Make sure you have EXACTLY these URLs:
   ```
   https://vfoazaxtdqgjyqrwbsoy.supabase.co/auth/v1/callback
   http://localhost:5174/auth/callback
   ```

3. **Common Issues:**
   - Missing `https://` or `http://`
   - Wrong project ID in the URL
   - Extra spaces or characters
   - Missing `/auth/v1/callback` path

### In Supabase Dashboard:

1. **Check your project URL**
   - Go to Settings → API
   - Copy your Project URL (starts with `https://`)

2. **Verify Google Provider Settings**
   - Go to Authentication → Providers
   - Click on "Google" to expand
   - Make sure it's enabled
   - Check that Client ID and Secret are correct

## 🔧 Step 3: Test with Correct Redirect URI

### For Development (localhost):

1. **Update Google Cloud Console**
   - Add this exact redirect URI:
   ```
   http://localhost:5174/auth/callback
   ```

2. **Update Supabase Settings**
   - Go to Authentication → URL Configuration
   - Set Site URL to: `http://localhost:5174`
   - Set Redirect URLs to include: `http://localhost:5174/auth/callback`

### For Production:

1. **Update Google Cloud Console**
   - Add your production domain:
   ```
   https://yourdomain.com/auth/callback
   ```

2. **Update Supabase Settings**
   - Set Site URL to your production domain
   - Add production redirect URLs

## 🔧 Step 4: Check Supabase Logs

1. **Go to Supabase Dashboard**
   - Select your project
   - Go to Logs

2. **Look for Authentication Errors**
   - Filter by "Authentication" or "Error"
   - Look for Google OAuth related errors

3. **Common Error Messages:**
   ```
   "OAuth provider not configured"
   "Invalid redirect URI"
   "Client ID not found"
   ```

## 🔧 Step 5: Verify OAuth Scopes

1. **Check Default Scopes**
   - Google OAuth should request these scopes by default:
   ```
   openid
   email
   profile
   ```

2. **If Custom Scopes Are Set**
   - Make sure they include at least `email` and `profile`
   - Remove any unnecessary scopes that might cause issues

## 🔧 Step 6: Test with Fresh Browser Session

1. **Clear Browser Data**
   - Clear cookies and cache for your domain
   - Or use an incognito/private window

2. **Try Again**
   - Go to your app
   - Try Google sign-in again

## 🔧 Step 7: Check Network Tab

1. **Open Developer Tools**
   - Go to Network tab
   - Try Google sign-in

2. **Look for Failed Requests**
   - Look for requests to Google or Supabase that failed
   - Check the response status codes
   - Look for error messages in responses

## 🚨 Common Solutions

### Solution 1: Redirect URI Mismatch
```
Error: redirect_uri_mismatch
```
**Fix:** Make sure the redirect URI in Google Cloud Console exactly matches what Supabase expects.

### Solution 2: OAuth Provider Not Configured
```
Error: OAuth provider not configured
```
**Fix:** Enable Google provider in Supabase and add correct Client ID/Secret.

### Solution 3: Invalid Client
```
Error: invalid_client
```
**Fix:** Check that Client ID and Secret are correct in Supabase settings.

### Solution 4: CORS Issues
```
Error: CORS policy blocked
```
**Fix:** Make sure your domain is properly configured in both Google and Supabase.

## 🔍 Debug Checklist

- [ ] Browser console checked for errors
- [ ] Redirect URIs match exactly
- [ ] Supabase Google provider enabled
- [ ] Client ID and Secret are correct
- [ ] Supabase logs checked for errors
- [ ] Fresh browser session tested
- [ ] Network requests examined
- [ ] OAuth scopes are correct

## 📞 Still Having Issues?

If you're still experiencing problems:

1. **Share the exact error message** from browser console
2. **Share the Supabase log entries** (without sensitive data)
3. **Confirm your redirect URIs** are exactly as shown above
4. **Check if you're using the correct Supabase project**

## 🎯 Quick Test

Try this quick test to isolate the issue:

1. **Create a simple test page** with just Google sign-in
2. **Use the same OAuth credentials**
3. **Test if it works there**

If it works on the test page but not in your app, the issue is in your app configuration, not the OAuth setup.

---

Most Google OAuth issues are related to redirect URI configuration. Double-check those URLs! 🔍 
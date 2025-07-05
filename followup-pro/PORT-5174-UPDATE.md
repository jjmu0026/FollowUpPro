# 🔧 Port Update Required: 5174

## 🚨 Your development server is now running on port 5174

The WebSocket connection error is because your browser is trying to connect to the wrong port.

## ✅ **Quick Fix:**

### 1. **Access your app at the correct URL:**
```
http://localhost:5174
```

### 2. **Update Google Cloud Console:**
Go to your OAuth 2.0 Client ID and update:

**Authorized JavaScript origins:**
```
http://localhost:5174
https://vfoazaxtdqgjyqrwbsoy.supabase.co
```

**Authorized redirect URIs:**
```
https://vfoazaxtdqgjyqrwbsoy.supabase.co/auth/v1/callback
http://localhost:5174/auth/callback
```

### 3. **Update Supabase Settings:**
- Go to **Authentication → URL Configuration**
- Set **Site URL** to: `http://localhost:5174`
- Add **Redirect URLs**: `http://localhost:5174/auth/callback`

## 🔍 **Why the port changed:**
Vite automatically found port 5174 because 5173 was already in use by another process.

## 🎯 **After updating:**
1. Go to **http://localhost:5174**
2. Sign in with Google
3. The WebSocket error should be gone
4. Your app should work properly

---

**Note:** If you restart your dev server and it uses a different port again, just update the URLs accordingly. 
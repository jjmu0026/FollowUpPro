# Deployment Guide for FollowUpPro

This guide will walk you through deploying your FollowUpPro application to various platforms.

## 🚀 Quick Start (Multiple Options)

### Option 1: Use the Deployment Script (Easiest)
```bash
cd followup-pro
./deploy.sh
```

This script will guide you through all deployment options!

### Option 2: Vercel (Recommended) ⭐

**If you get permission errors, use npx instead:**

```bash
cd followup-pro
npm run build
npx vercel
```

**Follow the prompts:**
- Link to existing project or create new
- Set build command: `npm run build`
- Set output directory: `dist`
- Set install command: `npm install`

### Option 3: GitHub Pages (No Account Required for Basic Setup)

```bash
cd followup-pro
npm run deploy
```

**Then configure GitHub Pages:**
1. Go to your GitHub repository
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `gh-pages`
5. Save

### Option 4: Netlify (Free)

```bash
cd followup-pro
npm run build
npx netlify-cli deploy --prod --dir=dist
```

### Option 5: Surge.sh (Free, No Account Required)

```bash
cd followup-pro
npm run build
npx surge dist
```

## 🔧 Fixing Permission Issues

### Problem: `EACCES: permission denied` when installing global packages

**Solution 1: Use npx (Recommended)**
```bash
# Instead of: npm install -g vercel
# Use: npx vercel
npx vercel
```

**Solution 2: Fix npm permissions**
```bash
# Create a directory for global installations
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Add to your shell profile (~/.zshrc or ~/.bash_profile)
export PATH=~/.npm-global/bin:$PATH

# Reload your shell
source ~/.zshrc
```

**Solution 3: Use sudo (Not recommended but works)**
```bash
sudo npm install -g vercel
```

## 🌐 Deployment Options

### Vercel
- **Pros**: Best for React/Vite, automatic deployments, great performance
- **Cons**: Requires account
- **Setup**: `npx vercel`

### Netlify
- **Pros**: Great free tier, drag-and-drop deployment
- **Cons**: Requires account
- **Setup**: `npx netlify-cli deploy --prod --dir=dist`

### GitHub Pages
- **Pros**: Free, integrated with GitHub
- **Cons**: Limited to public repositories (unless you have GitHub Pro)
- **Setup**: `npm run deploy`

### Surge.sh
- **Pros**: Free, no account required, simple
- **Cons**: Basic features, temporary URLs
- **Setup**: `npx surge dist`

### Firebase Hosting
- **Pros**: Google's infrastructure, good performance
- **Cons**: Requires Google account
- **Setup**: `npx firebase-tools deploy`

## 🔧 Environment Variables

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 📝 Pre-deployment Checklist

- [ ] Test your application locally (`npm run dev`)
- [ ] Build your application (`npm run build`)
- [ ] Test the production build (`npm run preview`)
- [ ] Set up environment variables in your deployment platform
- [ ] Configure your Supabase project for production
- [ ] Test the deployed application

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive keys to your repository
2. **Supabase RLS**: Enable Row Level Security in your Supabase project
3. **CORS**: Configure CORS settings in Supabase for your domain
4. **HTTPS**: Ensure your deployment uses HTTPS

## 🎯 Post-deployment

1. **Test all features** on the live site
2. **Set up monitoring** (if needed)
3. **Configure custom domain** (optional)
4. **Set up analytics** (optional)

## 🆘 Troubleshooting

### Common Issues:

1. **Build fails**: Check your Node.js version (v18+ required)
2. **Environment variables not working**: Ensure they're prefixed with `VITE_`
3. **Supabase connection issues**: Check CORS settings and API keys
4. **Routing issues**: Configure your platform for SPA routing
5. **Permission errors**: Use `npx` instead of global installations

### Getting Help:
- Check the platform's documentation
- Review the main README.md
- Open an issue on GitHub

## 🚀 Quick Commands Reference

```bash
# Build project
npm run build

# Deploy to GitHub Pages
npm run deploy

# Deploy to Vercel
npx vercel

# Deploy to Netlify
npx netlify-cli deploy --prod --dir=dist

# Deploy to Surge
npx surge dist

# Run deployment script
./deploy.sh
```

---

Your FollowUpPro application should now be live and accessible to users worldwide! 🌍 
# Deployment Guide for FollowUpPro

This guide will walk you through deploying your FollowUpPro application to various platforms.

## 🚀 Quick Start (Vercel - Recommended)

Vercel is the easiest option for React/Vite applications:

### Step 1: Prepare Your Project
```bash
cd followup-pro
npm install
npm run build
```

### Step 2: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Step 3: Follow the Prompts
- Link to existing project or create new
- Set build command: `npm run build`
- Set output directory: `dist`
- Set install command: `npm install`

### Step 4: Set Environment Variables (if using Supabase)
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `VITE_SUPABASE_URL` = your_supabase_url
   - `VITE_SUPABASE_ANON_KEY` = your_supabase_anon_key

## 🌐 Other Deployment Options

### Netlify
```bash
# Build your project
npm run build

# Deploy via CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
# Add GitHub Pages dependency
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize
firebase login
firebase init hosting

# Deploy
npm run build
firebase deploy
```

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

### Getting Help:
- Check the platform's documentation
- Review the main README.md
- Open an issue on GitHub

---

Your FollowUpPro application should now be live and accessible to users worldwide! 🌍 
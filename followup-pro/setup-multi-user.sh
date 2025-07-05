#!/bin/bash

echo "🚀 FollowUpPro Multi-User Setup"
echo "================================"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Supabase Configuration
# Replace these with your actual Supabase project credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Add other environment variables as needed
# VITE_APP_TITLE=FollowUpPro
# VITE_APP_VERSION=1.0.0
EOF
    echo "✅ Created .env file"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🔧 Supabase Setup Instructions:"
echo "================================"
echo ""

echo "1. 📊 Go to your Supabase Dashboard:"
echo "   https://supabase.com/dashboard"
echo ""

echo "2. 🔐 Enable Authentication:"
echo "   - Click on your project"
echo "   - Go to Authentication → Settings"
echo "   - Enable 'Enable email confirmations' (recommended)"
echo "   - Save changes"
echo ""

echo "3. 🗄️ Set up Database Schema:"
echo "   - Go to SQL Editor in your Supabase dashboard"
echo "   - Copy the contents of database-setup.sql"
echo "   - Paste and run the script"
echo ""

echo "4. 🔑 Get Your Credentials:"
echo "   - Go to Settings → API"
echo "   - Copy your Project URL and anon public key"
echo "   - Update your .env file with these values"
echo ""

echo "5. 🌐 Configure OAuth (Optional):"
echo "   - Go to Authentication → Providers"
echo "   - Enable Google provider"
echo "   - Add your Google OAuth credentials"
echo ""

echo "6. 🧪 Test the Setup:"
echo "   - Run: npm run dev"
echo "   - Try signing up with a new account"
echo "   - Verify data isolation works"
echo ""

echo "📋 Current .env file contents:"
echo "================================"
if [ -f .env ]; then
    cat .env
else
    echo "No .env file found"
fi

echo ""
echo "🔍 Database Setup Script Location:"
echo "================================"
echo "File: database-setup.sql"
echo ""

echo "📖 Detailed Instructions:"
echo "================================"
echo "For complete setup instructions, see: MULTI-USER-SETUP.md"
echo ""

echo "🎯 Quick Commands:"
echo "================================"
echo "npm run dev          # Start development server"
echo "npm run build        # Build for production"
echo "npm run deploy       # Deploy to GitHub Pages"
echo "./deploy.sh          # Run deployment script"
echo ""

echo "✅ Setup instructions completed!"
echo "Follow the steps above to enable multi-user support." 
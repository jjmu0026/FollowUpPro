#!/bin/bash

echo "🚀 FollowUpPro Deployment Script"
echo "================================"

# Build the project first
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "Choose your deployment option:"
echo "1. GitHub Pages (Free, requires GitHub account)"
echo "2. Netlify (Free, requires Netlify account)"
echo "3. Vercel (Free, requires Vercel account)"
echo "4. Surge.sh (Free, no account required)"
echo "5. Just build (no deployment)"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo "🚀 Deploying to GitHub Pages..."
        npm run deploy
        echo "✅ Deployed to GitHub Pages!"
        echo "📝 Don't forget to:"
        echo "   - Go to your GitHub repository settings"
        echo "   - Enable GitHub Pages"
        echo "   - Select 'gh-pages' branch as source"
        ;;
    2)
        echo "🚀 Deploying to Netlify..."
        npx netlify-cli deploy --prod --dir=dist
        ;;
    3)
        echo "🚀 Deploying to Vercel..."
        npx vercel --prod
        ;;
    4)
        echo "🚀 Deploying to Surge.sh..."
        npx surge dist
        ;;
    5)
        echo "✅ Build completed. Your files are in the 'dist' folder."
        echo "📁 You can manually upload the 'dist' folder to any hosting service."
        ;;
    *)
        echo "❌ Invalid choice!"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!" 
# FollowUpPro

A smart, stress-free job application tracking and follow-up assistant that helps you manage your job search process with intelligent timing and AI-powered email generation. **Now with multi-user support and secure authentication!**

## 🚀 Features

### 🔐 Secure Multi-User Authentication
- **User Registration & Login**: Secure email/password authentication
- **Google OAuth**: One-click sign-in with Google
- **Session Management**: Persistent login across browser sessions
- **Data Isolation**: Each user's data is completely private and secure
- **Account Management**: Users can sign out and manage their accounts

### 📊 Smart Job Tracking
- **Comprehensive Application Management**: Track all your job applications in one place
- **Status Tracking**: Monitor applications through various stages (Applied, Interviewing, Phone Screen, Final Interview, Waiting, Rejected, Offer, Ghosted)
- **Recruiter Information**: Store recruiter emails and contact details
- **Notes & Context**: Add personal notes and context for each application

### ⏰ Intelligent Follow-up Timing
- **Smart Notifications**: Get notified when it's the perfect time to follow up
- **Status-Based Timing**: Different follow-up schedules based on application status:
  - Applied: 7 days
  - Interviewing: 3 days
  - Phone Screen: 4 days
  - Final Interview: 5 days
  - Waiting: 5 days
  - Ghosted: 10 days
  - Offer: 2 days
- **Weekday Awareness**: Only suggests follow-ups on business days

### ✉️ AI-Powered Email Generator
- **Context-Aware Messages**: Generate personalized emails based on job status and company
- **Multiple Message Types**:
  - Post-interview follow-ups
  - Cold outreach messages
  - Response to rejection emails
- **Professional Templates**: Pre-written, professional email templates
- **One-Click Copy**: Easy copy-to-clipboard functionality

### 📈 Dashboard Analytics
- **Application Overview**: See all your applications at a glance
- **Status Distribution**: Visual breakdown of your application statuses
- **Follow-up Suggestions**: Prioritized list of applications needing follow-up

## 🛠️ Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Row Level Security
- **Deployment**: Vite build system

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account (free tier available)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FollowUpPro/followup-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase (Required for multi-user support)**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run the database setup script from `database-setup.sql`
   - Enable authentication in your Supabase dashboard
   - Update the Supabase credentials in `src/supabaseClient.js`

4. **Configure Environment Variables**
   Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=https://vfoazaxtdqgjyqrwbsoy.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Multi-User Setup

For detailed instructions on setting up multi-user support, see [MULTI-USER-SETUP.md](./MULTI-USER-SETUP.md).

### Quick Multi-User Setup:
1. **Enable Authentication** in Supabase dashboard
2. **Run Database Setup** script (`database-setup.sql`)
3. **Configure OAuth** (optional - Google, GitHub, etc.)
4. **Test Authentication** flow

## 🌐 Deployment

FollowUpPro can be deployed to various platforms. Here are the most popular options:

### Option 1: Vercel (Recommended) ⭐

Vercel is the easiest option for React/Vite applications with automatic deployments.

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd followup-pro
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Set install command: `npm install`

4. **Environment Variables** (Required for Supabase):
   - Go to your Vercel dashboard
   - Add environment variables for Supabase URL and key

### Option 2: Netlify

1. **Build your project**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify UI**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `dist` folder
   - Or connect your GitHub repository for automatic deployments

3. **Deploy via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

### Option 3: GitHub Pages

1. **Add GitHub Pages dependency**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json** (add these scripts):
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**:
   - Go to your repository settings
   - Enable GitHub Pages
   - Select `gh-pages` branch as source

### Option 4: Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure**:
   - Select your project
   - Set public directory: `dist`
   - Configure as single-page app: `Yes`
   - Don't overwrite index.html

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Option 5: Surge.sh

1. **Install Surge**
   ```bash
   npm install -g surge
   ```

2. **Deploy**
   ```bash
   npm run build
   surge dist
   ```

### Environment Variables for Production

If you're using Supabase, make sure to set up environment variables in your deployment platform:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Update your `supabaseClient.js` to use environment variables:

```javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

### Custom Domain Setup

Most platforms support custom domains:

- **Vercel**: Add domain in dashboard → Settings → Domains
- **Netlify**: Add domain in dashboard → Domain management
- **GitHub Pages**: Add CNAME file in repository
- **Firebase**: Add domain in Firebase console

## 🎯 Usage Guide

### Getting Started
1. **Sign Up**: Create an account with email/password or Google
2. **Verify Email**: Check your email for confirmation (if enabled)
3. **Add Your First Job**: Start tracking your job applications
4. **Get Follow-up Reminders**: Receive smart notifications

### Adding a New Job Application
1. Click the "Add Job" button
2. Fill in the required information:
   - Company name
   - Role/position
   - Application status
   - Applied date
   - Last contacted date (optional)
   - Recruiter email (optional)
   - Notes (optional)
3. Click "Add Job" to save

### Managing Applications
- **Edit**: Click the edit icon on any job card
- **Delete**: Click the delete icon to remove an application
- **Update Status**: Change the status dropdown to reflect current progress

### Generating Follow-up Messages
1. Select a job from your list
2. Choose the message type (follow-up, cold outreach, or rejection response)
3. Click "Generate Message"
4. Copy the generated message to your clipboard
5. Personalize and send via your email client

### Dashboard Overview
- View all your applications in a clean, organized layout
- See follow-up suggestions highlighted at the top
- Monitor your application status distribution

### User Management
- **Profile**: See your email in the header
- **Sign Out**: Click the sign out button to log out
- **Data Privacy**: Your data is completely isolated from other users

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### Project Structure
```
src/
├── components/
│   ├── Auth.jsx              # Authentication component
│   ├── DashboardStats.jsx    # Dashboard analytics component
│   ├── JobForm.jsx          # Add/edit job form
│   ├── JobList.jsx          # Job applications list
│   └── MessageGenerator.jsx # AI email generator
├── App.jsx                  # Main application component
├── main.jsx                 # Application entry point
├── supabaseClient.js        # Supabase configuration
└── index.css               # Global styles
```

## 🔒 Security Features

- **Row Level Security (RLS)**: Users can only access their own data
- **Secure Authentication**: Email/password and OAuth support
- **Data Isolation**: Complete separation between users
- **Automatic Cleanup**: Data is deleted when users are removed
- **HTTPS Only**: All communications are encrypted

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and Vite for fast development
- Styled with Tailwind CSS for beautiful, responsive design
- Powered by Supabase for reliable data storage and authentication
- Icons provided by Lucide React

## 📞 Support

If you have any questions or need help with FollowUpPro, please open an issue on GitHub or contact the development team.

---

**FollowUpPro** - Making your job search journey smarter and more organized! 🎯


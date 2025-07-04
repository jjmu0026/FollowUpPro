# FollowUpPro

A smart, stress-free job application tracking and follow-up assistant that helps you manage your job search process with intelligent timing and AI-powered email generation.

## 🚀 Features

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
- **Deployment**: Vite build system

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

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

3. **Set up Supabase (Optional - for data persistence)**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Create a `jobs` table with the following schema:
     ```sql
     CREATE TABLE jobs (
       id SERIAL PRIMARY KEY,
       company TEXT NOT NULL,
       role TEXT NOT NULL,
       status TEXT DEFAULT 'applied',
       applied_at DATE,
       last_contacted_at DATE,
       recruiter_email TEXT,
       notes TEXT,
       created_at TIMESTAMP DEFAULT NOW()
     );
     ```
   - Update the Supabase credentials in `src/supabaseClient.js`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage Guide

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

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── components/
│   ├── DashboardStats.jsx    # Dashboard analytics component
│   ├── JobForm.jsx          # Add/edit job form
│   ├── JobList.jsx          # Job applications list
│   └── MessageGenerator.jsx # AI email generator
├── App.jsx                  # Main application component
├── main.jsx                 # Application entry point
├── supabaseClient.js        # Supabase configuration
└── index.css               # Global styles
```

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
- Powered by Supabase for reliable data storage
- Icons provided by Lucide React

## 📞 Support

If you have any questions or need help with FollowUpPro, please open an issue on GitHub or contact the development team.

---

**FollowUpPro** - Making your job search journey smarter and more organized! 🎯


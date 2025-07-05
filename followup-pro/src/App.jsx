import { useState, useEffect } from 'react'
import { Plus, Mail, Clock, CheckCircle, XCircle, AlertCircle, LogOut, User } from 'lucide-react'
import JobForm from './components/JobForm'
import JobList from './components/JobList'
import MessageGenerator from './components/MessageGenerator'
import DashboardStats from './components/DashboardStats'
import Auth from './components/Auth'

import { supabase } from './supabaseClient';

function App() {
  const [jobs, setJobs] = useState([])
  const [showJobForm, setShowJobForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [started, setStarted] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      // Restore page state from localStorage
      const savedStarted = localStorage.getItem('followupPro_started')
      if (savedStarted === 'true' && session?.user) {
        setStarted(true)
      }
      
      setLoading(false)
    }
    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchJobs(session.user.id)
      } else {
        setJobs([])
        // Clear page state when user signs out
        localStorage.removeItem('followupPro_started')
        setStarted(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchJobs = async (userId) => {
    console.log('Fetching jobs for user:', userId);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase fetch error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return;
      }
      
      console.log('Fetched jobs:', data);
      if (data && Array.isArray(data)) {
        setJobs(data.map(job => ({
          ...job,
          appliedAt: job.applied_at,
          lastContactedAt: job.last_contacted_at,
          recruiterEmail: job.recruiter_email,
        })));
      } else {
        console.error('Data is not an array:', data);
        setJobs([]);
      }
    } catch (err) {
      console.error('Error in fetchJobs:', err);
      setJobs([]);
    }
  };

  // Add Job
  const addJob = async (job) => {
    if (!user) return;
    
    const { data, error } = await supabase.from('jobs').insert([{
      user_id: user.id,
      company: job.company,
      role: job.role,
      status: job.status,
      applied_at: job.appliedAt,
      last_contacted_at: job.lastContactedAt,
      recruiter_email: job.recruiterEmail,
      notes: job.notes,
    }]).select();
    
    if (error) {
      console.error('Supabase insert error:', error);
      return;
    }
    setJobs([data[0], ...jobs].map(job => ({
      ...job,
      appliedAt: job.applied_at,
      lastContactedAt: job.last_contacted_at,
      recruiterEmail: job.recruiter_email,
    })));
    setShowJobForm(false);
  };

  // Update Job
  const updateJob = async (updatedJob) => {
    if (!user) return;
    
    const { data, error } = await supabase.from('jobs')
      .update({
        company: updatedJob.company,
        role: updatedJob.role,
        status: updatedJob.status,
        applied_at: updatedJob.appliedAt,
        last_contacted_at: updatedJob.lastContactedAt,
        recruiter_email: updatedJob.recruiterEmail,
        notes: updatedJob.notes,
      })
      .eq('id', updatedJob.id)
      .eq('user_id', user.id) // Ensure user can only update their own jobs
      .select();
    
    if (error) {
      console.error('Supabase update error:', error);
      return;
    }
    setJobs(jobs.map(job =>
      job.id === updatedJob.id
        ? { ...data[0], appliedAt: data[0].applied_at, lastContactedAt: data[0].last_contacted_at, recruiterEmail: data[0].recruiter_email }
        : job
    ));
  };

  // Delete Job
  const deleteJob = async (jobId) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId)
      .eq('user_id', user.id); // Ensure user can only delete their own jobs
    
    if (error) {
      console.error('Supabase delete error:', error);
      return;
    }
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out error:', error)
    } else {
      // Clear page state when signing out
      localStorage.removeItem('followupPro_started')
      setStarted(false)
    }
  }

  // Smarter follow-up logic with reason
  const getFollowUpSuggestions = () => {
    const now = new Date();
    const isWeekday = now.getDay() >= 1 && now.getDay() <= 5; // 1=Mon, 5=Fri
    return jobs
      .filter(job => job.lastContactedAt && job.status !== 'rejected')
      .map(job => {
        const daysSinceContact = Math.floor((now - new Date(job.lastContactedAt)) / (1000 * 60 * 60 * 24));
        let threshold = null;
        let reason = '';
        switch (job.status) {
          case 'applied':
            threshold = 7;
            reason = `${daysSinceContact} days since application`;
            break;
          case 'interviewing':
            threshold = 3;
            reason = `${daysSinceContact} days since last interview contact`;
            break;
          case 'phone screen':
            threshold = 4;
            reason = `${daysSinceContact} days since phone screen`;
            break;
          case 'final interview':
            threshold = 5;
            reason = `${daysSinceContact} days since final interview`;
            break;
          case 'waiting':
            threshold = 5;
            reason = `${daysSinceContact} days waiting for response`;
            break;
          case 'ghosted':
            threshold = 10;
            reason = `${daysSinceContact} days since last contact (ghosted)`;
            break;
          case 'offer':
            threshold = 2;
            reason = `${daysSinceContact} days since offer`;
            break;
          default:
            threshold = null;
        }
        if (threshold !== null && daysSinceContact >= threshold && isWeekday) {
          return { job, reason };
        }
        return null;
      })
      .filter(Boolean);
  };

  const suggestions = getFollowUpSuggestions();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading FollowUpPro...</p>
        </div>
      </div>
    )
  }

  // Show auth if no user
  if (!user) {
    return <Auth onAuthChange={setUser} />
  }

  // Debug: Show error if something goes wrong
  if (started && !user) {
    console.error('Started is true but no user!');
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error: No user found</h2>
          <button
            onClick={() => setStarted(false)}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 flex flex-col">
      {/* Hero Section */}
      {!started && (
        <>
          <header className="py-12 px-4 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full shadow bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">FP</span>
              </div>
              <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">FollowUpPro</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl text-center mb-8">
              Welcome back, {user.email}! The smart, stress-free way to track your job applications and follow up with recruiters at the perfect time.
            </p>
            <button
              onClick={() => {
                setStarted(true)
                localStorage.setItem('followupPro_started', 'true')
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-10 py-4 rounded-lg shadow-lg text-lg transition"
            >
              Get Started
            </button>
          </header>
          {/* Feature Highlights */}
          <section className="max-w-4xl mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
              <Clock className="text-amber-500 mb-2" size={32} />
              <h3 className="font-bold text-lg mb-1">Smart Follow-up</h3>
              <p className="text-gray-500 text-sm">Get notified when it's the perfect time to follow up—never too soon, never too late.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
              <CheckCircle className="text-green-500 mb-2" size={32} />
              <h3 className="font-bold text-lg mb-1">Track Every Application</h3>
              <p className="text-gray-500 text-sm">See all your job applications in one place, with status, notes, and recruiter info.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
              <Mail className="text-blue-500 mb-2" size={32} />
              <h3 className="font-bold text-lg mb-1">AI Email Generator</h3>
              <p className="text-gray-500 text-sm">Generate context-aware, professional emails for every stage of your job search.</p>
            </div>
          </section>
        </>
      )}
            {/* Main App (hidden until started) */}
      {started && (
        <>
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full shadow bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">FP</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">FollowUpPro</h1>
                    <p className="text-gray-600">Smart job follow-up assistant</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} />
                    <span>{user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Dashboard Stats */}
            <DashboardStats jobs={jobs} suggestions={suggestions} />
            {/* Follow-up Suggestions */}
            {suggestions.length > 0 && (
              <div className="mb-8" id="followup-suggestions">
                <div className="card shadow-lg rounded-xl border border-amber-200 bg-amber-50">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="text-amber-500" size={24} />
                    <h2 className="text-xl font-semibold text-amber-900">Follow-up Suggestions</h2>
                  </div>
                  <div className="space-y-3">
                    {suggestions.map(({ job, reason }) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-amber-100 hover:shadow-md transition-shadow"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              job.status === 'phone screen'
                                ? 'bg-blue-100 text-blue-800'
                                : job.status === 'final interview'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </span>
                            <h3 className="font-medium text-gray-900">{job.company} - {job.role}</h3>
                          </div>
                          <p className="text-sm text-gray-600">
                            Last contacted: {new Date(job.lastContactedAt).toLocaleDateString()}<br/>
                            <span className="text-amber-700 font-medium">{reason}</span>
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="btn-primary text-sm shadow hover:scale-105 transition-transform"
                        >
                          Generate Follow-up
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Job List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <JobList 
                  jobs={jobs} 
                  onUpdate={updateJob}
                  onDelete={deleteJob}
                  onSelect={setSelectedJob}
                  onAddJob={() => setShowJobForm(true)}
                />
              </div>
              {/* Message Generator */}
              <div className="lg:col-span-1">
                <MessageGenerator 
                  selectedJob={selectedJob}
                  onClose={() => setSelectedJob(null)}
                />
              </div>
            </div>
          </div>
          {/* Job Form Modal */}
          {showJobForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-md w-full">
                <JobForm 
                  onSubmit={addJob}
                  onCancel={() => setShowJobForm(false)}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App

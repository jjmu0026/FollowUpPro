-- FollowUpPro Database Setup for Multi-User Support
-- Run this in your Supabase SQL editor

-- 1. Update the jobs table to include user_id
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Enable Row Level Security (RLS)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for secure user access

-- Policy: Users can only see their own jobs
CREATE POLICY "Users can view own jobs" ON jobs
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can only insert their own jobs
CREATE POLICY "Users can insert own jobs" ON jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own jobs
CREATE POLICY "Users can update own jobs" ON jobs
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can only delete their own jobs
CREATE POLICY "Users can delete own jobs" ON jobs
  FOR DELETE USING (auth.uid() = user_id);

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at);

-- 5. Optional: Create a function to automatically set user_id on insert
CREATE OR REPLACE FUNCTION public.handle_new_job()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create trigger to automatically set user_id
CREATE TRIGGER on_job_created
  BEFORE INSERT ON jobs
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_job();

-- 7. Enable realtime for the jobs table (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE jobs;

-- 8. Create a view for job statistics (optional)
CREATE OR REPLACE VIEW job_stats AS
SELECT 
  user_id,
  COUNT(*) as total_jobs,
  COUNT(*) FILTER (WHERE status = 'applied') as applied,
  COUNT(*) FILTER (WHERE status = 'interviewing') as interviewing,
  COUNT(*) FILTER (WHERE status = 'phone screen') as phone_screen,
  COUNT(*) FILTER (WHERE status = 'final interview') as final_interview,
  COUNT(*) FILTER (WHERE status = 'waiting') as waiting,
  COUNT(*) FILTER (WHERE status = 'rejected') as rejected,
  COUNT(*) FILTER (WHERE status = 'offer') as offer,
  COUNT(*) FILTER (WHERE status = 'ghosted') as ghosted
FROM jobs
GROUP BY user_id;

-- 9. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON jobs TO anon, authenticated;
GRANT ALL ON job_stats TO anon, authenticated;
GRANT USAGE ON SEQUENCE jobs_id_seq TO anon, authenticated;

-- 10. Optional: Create a function to get user's job count
CREATE OR REPLACE FUNCTION get_user_job_count()
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*) 
    FROM jobs 
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Optional: Create a function to get follow-up suggestions
CREATE OR REPLACE FUNCTION get_followup_suggestions()
RETURNS TABLE (
  job_id INTEGER,
  company TEXT,
  role TEXT,
  status TEXT,
  days_since_contact INTEGER,
  reason TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    j.id,
    j.company,
    j.role,
    j.status,
    EXTRACT(DAY FROM (NOW() - j.last_contacted_at))::INTEGER as days_since_contact,
    CASE 
      WHEN j.status = 'applied' THEN 'Time to follow up on application'
      WHEN j.status = 'interviewing' THEN 'Time to follow up on interview'
      WHEN j.status = 'phone screen' THEN 'Time to follow up on phone screen'
      WHEN j.status = 'final interview' THEN 'Time to follow up on final interview'
      WHEN j.status = 'waiting' THEN 'Time to check on application status'
      WHEN j.status = 'ghosted' THEN 'Time to re-engage'
      WHEN j.status = 'offer' THEN 'Time to respond to offer'
      ELSE 'Time to follow up'
    END as reason
  FROM jobs j
  WHERE j.user_id = auth.uid()
    AND j.status != 'rejected'
    AND j.last_contacted_at IS NOT NULL
    AND EXTRACT(DAY FROM (NOW() - j.last_contacted_at)) >= 
      CASE 
        WHEN j.status = 'applied' THEN 7
        WHEN j.status = 'interviewing' THEN 3
        WHEN j.status = 'phone screen' THEN 4
        WHEN j.status = 'final interview' THEN 5
        WHEN j.status = 'waiting' THEN 5
        WHEN j.status = 'ghosted' THEN 10
        WHEN j.status = 'offer' THEN 2
        ELSE 7
      END
    AND EXTRACT(DOW FROM NOW()) BETWEEN 1 AND 5; -- Weekdays only
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
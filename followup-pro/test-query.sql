-- Test query to check RLS policies
-- Run this in Supabase SQL Editor

-- 1. Check if we can query jobs as the current user
SELECT 
  id,
  company,
  role,
  status,
  user_id,
  created_at
FROM jobs
WHERE user_id = auth.uid()
ORDER BY created_at DESC;

-- 2. Check if RLS is blocking the query
SELECT 
  schemaname,
  tablename,
  rowsecurity,
  CASE 
    WHEN rowsecurity = true THEN 'RLS is ENABLED'
    ELSE 'RLS is DISABLED'
  END as rls_status
FROM pg_tables 
WHERE tablename = 'jobs';

-- 3. Check the exact policies
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'jobs';

-- 4. Test a simple query without user_id filter
SELECT COUNT(*) as total_jobs FROM jobs;

-- 5. Check if the current user has any jobs
SELECT 
  COUNT(*) as user_jobs_count,
  auth.uid() as current_user_id
FROM jobs 
WHERE user_id = auth.uid(); 
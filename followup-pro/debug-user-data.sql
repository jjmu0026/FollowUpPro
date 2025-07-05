-- Debug script to check user data and RLS policies
-- Run this in Supabase SQL Editor

-- 1. Check if there are any jobs in the table
SELECT 
  COUNT(*) as total_jobs,
  COUNT(DISTINCT user_id) as unique_users
FROM jobs;

-- 2. Check the current authenticated user
SELECT 
  auth.uid() as current_user_id,
  auth.email() as current_user_email;

-- 3. Check if the current user can see their jobs (with RLS)
SELECT 
  id,
  company,
  role,
  status,
  user_id,
  created_at
FROM jobs
ORDER BY created_at DESC
LIMIT 5;

-- 4. Check all jobs without RLS (admin view)
-- This will show all jobs regardless of user
SELECT 
  id,
  company,
  role,
  status,
  user_id,
  created_at
FROM jobs
ORDER BY created_at DESC
LIMIT 10;

-- 5. Check if the user_id is being set correctly
-- Look for jobs with the current user's ID
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

-- 6. Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'jobs'; 
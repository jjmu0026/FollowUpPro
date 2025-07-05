-- Check if database is properly set up for FollowUpPro
-- Run this in Supabase SQL Editor to verify setup

-- Check if jobs table exists
SELECT 
  table_name,
  CASE 
    WHEN table_name = 'jobs' THEN '✅ Jobs table exists'
    ELSE '❌ Jobs table missing'
  END as status
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'jobs';

-- Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity,
  CASE 
    WHEN rowsecurity = true THEN '✅ RLS enabled'
    ELSE '❌ RLS disabled'
  END as rls_status
FROM pg_tables 
WHERE tablename = 'jobs';

-- Check if policies exist
SELECT 
  policyname,
  CASE 
    WHEN policyname IS NOT NULL THEN '✅ Policy exists: ' || policyname
    ELSE '❌ No policies found'
  END as policy_status
FROM pg_policies 
WHERE tablename = 'jobs';

-- Check if user can access the table
SELECT 
  grantee,
  privilege_type,
  CASE 
    WHEN privilege_type = 'ALL' THEN '✅ Full access granted'
    ELSE '⚠️ Limited access: ' || privilege_type
  END as access_status
FROM information_schema.role_table_grants 
WHERE table_name = 'jobs' AND grantee = 'authenticated'; 
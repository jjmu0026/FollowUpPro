import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vfoazaxtdqgjyqrwbsoy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmb2F6YXh0ZHFnanlxcndic295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MDQzODQsImV4cCI6MjA2NzE4MDM4NH0.5EUw0Ne3Qmjvj5V_cVJb2g4_AxGMACQDOrJFuVN1ZOw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
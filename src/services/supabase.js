import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://ebkohcejuyvvbmmbzkca.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVia29oY2VqdXl2dmJtbWJ6a2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxNTU3NjMsImV4cCI6MjAzODczMTc2M30.km8wZNbCgqvxx3_uiF_jSzqO1qJ7Wy4RdzJSjfb-Pkw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

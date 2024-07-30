import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://kvlmddgnjqmtgxpynehs.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2bG1kZGduanFtdGd4cHluZWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyODgzOTAsImV4cCI6MjAzNzg2NDM5MH0.UXF91S7kXmr1GPTgxoQtSmBOa4ZtNGz4WxSRDLY3BXQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

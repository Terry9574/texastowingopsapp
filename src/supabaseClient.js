import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://odxwjyuamvgccpesykts.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9keHdqeXVhbXZnY2NwZXN5a3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0Mjk4MTQsImV4cCI6MjA3MDAwNTgxNH0.BnzEn6Ep40ysR0hRcuYeY61Rlxohd2YDIvuHbQvDeAc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

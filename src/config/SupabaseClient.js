
import { createClient } from '@supabase/supabase-js'
const supabaseUrl ='http://127.0.0.1:54321'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
// const supabaseUrl = 'https://ketcyasqjyyfkkyjbrlv.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtldGN5YXNxanl5ZmtreWpicmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzMDA4MTgsImV4cCI6MjAyMDg3NjgxOH0.3V1CZyQeHgMrA_92YeQf3lGvKcdf5dQDPbmrLmGq5EE'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
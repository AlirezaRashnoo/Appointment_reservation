import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://enqwdqrwwdkzywyvyvaf.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVucXdkcXJ3d2Rrenl3eXZ5dmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3Nzk0NDAsImV4cCI6MjA3MzM1NTQ0MH0.A_d1c_Wek3pvCaWY8zBLd-Fev2QmHZSVY8LXuj2QdwI"

const supabase = createClient(supabaseUrl,supabaseAnonKey)

export default supabase;
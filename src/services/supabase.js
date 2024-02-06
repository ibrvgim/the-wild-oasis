import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xxqblmhqdgektporcntt.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4cWJsbWhxZGdla3Rwb3JjbnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0NjU2MzQsImV4cCI6MjAyMjA0MTYzNH0.EieoA4hJ--Z1mpx4M8g1rzakTa8siHq16mT-IG-sLoY`;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

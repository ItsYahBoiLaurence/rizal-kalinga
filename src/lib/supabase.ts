import {createClient} from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL // or process.env.REACT_APP_SUPABASE_URL for CRA
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY // or process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
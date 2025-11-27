import { supabase } from './supabase'

// Registro
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error
  return data
}

// Login
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

// Google
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
  if (error) throw error
  return data
}

// Logout
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Hardcoded admin credentials
  const ADMIN_EMAIL = 'januszjankra@gmail.com'
  const ADMIN_PASSWORD = '?!jan369750KRA?!'

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const signIn = async (email, password) => {
    // Check for hardcoded admin credentials first
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create a mock user object for the admin
      const adminUser = {
        id: 'admin-user-id',
        email: ADMIN_EMAIL,
        role: 'admin',
        created_at: new Date().toISOString(),
        email_confirmed_at: new Date().toISOString()
      }
      
      // Set the admin user directly
      setUser(adminUser)
      
      // Create admin profile
      const adminProfile = {
        id: 'admin-user-id',
        email: ADMIN_EMAIL,
        full_name: 'Janusz Krawczak',
        role: 'admin',
        created_at: new Date().toISOString()
      }
      
      setProfile(adminProfile)
      
      return { data: { user: adminUser }, error: null }
    }

    // For other users, try Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    // Clear local state
    setUser(null)
    setProfile(null)
    
    // Also sign out from Supabase in case there's a session
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

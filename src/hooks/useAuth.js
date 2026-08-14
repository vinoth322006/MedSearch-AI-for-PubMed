import { useState, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'

export function useAuthActions() {
  const { login, logout, updateProfile } = useAuth()
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const handleLogin = useCallback(async (email, password) => {
    setAuthLoading(true)
    setAuthError('')
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const user = {
        id: 'user_' + Date.now(),
        name: email.split('@')[0],
        email,
        dob: ''
      }
      login(user)
      return { success: true }
    } catch (err) {
      setAuthError('Login failed. Please try again.')
      return { success: false, error: authError }
    } finally {
      setAuthLoading(false)
    }
  }, [login, authError])

  const handleRegister = useCallback(async (name, email, password, dob) => {
    setAuthLoading(true)
    setAuthError('')
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const user = { id: 'user_' + Date.now(), name, email, dob: dob || '' }
      login(user)
      return { success: true }
    } catch (err) {
      setAuthError('Registration failed. Please try again.')
      return { success: false, error: authError }
    } finally {
      setAuthLoading(false)
    }
  }, [login, authError])

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  const handleUpdateProfile = useCallback((updates) => {
    updateProfile(updates)
  }, [updateProfile])

  return {
    authLoading,
    authError,
    setAuthError,
    handleLogin,
    handleRegister,
    handleLogout,
    handleUpdateProfile
  }
}

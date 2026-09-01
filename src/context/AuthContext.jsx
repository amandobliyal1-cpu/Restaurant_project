import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const [isPromptOpen, setIsPromptOpen] = useState(false)
  const [promptMessage, setPromptMessage] = useState('')

  // login now takes the full user record (id, name, email, address?) so we
  // can check/update the delivery address later without re-fetching.
  const login = (userRecord) => {
    const safeUser = userRecord && userRecord.name
      ? userRecord
      : { ...userRecord, name: 'Guest' }
    setUser(safeUser)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  // called after saving the address form so the rest of the app (Navbar,
  // CartPage checkout check) sees the update immediately
  const updateUserAddress = (address) => {
    setUser((prev) => (prev ? { ...prev, address } : prev))
  }

  const username = user?.name || ''
  const hasAddress = Boolean(user?.address)

  const requireAuth = (callback, message = 'Please log in to continue.') => {
    if (isLoggedIn) {
      callback()
      return
    }
    setPromptMessage(message)
    setIsPromptOpen(true)
  }

  const closePrompt = () => setIsPromptOpen(false)

  const promptToLogin = () => {
    setIsPromptOpen(false)
    navigate('/login')
  }

  const value = {
    isLoggedIn,
    user,
    username,
    hasAddress,
    login,
    logout,
    updateUserAddress,
    requireAuth,
    isPromptOpen,
    promptMessage,
    closePrompt,
    promptToLogin,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an <AuthProvider>')
  }
  return ctx
}

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'

import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthGuardPrompt from './components/AuthGuardPrompt'
import ProtectedRoute from './components/ProtectedRoute'

import StoryPage from './pages/StoryPage'
import CartPage from './pages/CartPage'
import AddressPage from './pages/AddressPage'
import ReservationPage from './pages/ReservationPage'
import NotFound from './pages/NotFound'

const HomePage = lazy(() => import('./pages/HomePage'))
const MenuPage = lazy(() => import('./pages/MenuPage'))
const OrderPage = lazy(() => import('./pages/OrderPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))

const KNOWN_PATHS = ['/', '/story', '/menu', '/order', '/cart', '/address', '/reservation', '/login', '/signup']

function App() {
  const location = useLocation()
  const isKnownRoute = KNOWN_PATHS.includes(location.pathname)

  return (
    <AuthProvider>
      <CartProvider>
        {isKnownRoute && <Navbar />}

        <Suspense fallback={<div>Loading page...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/address"
              element={
                <ProtectedRoute>
                  <AddressPage />
                </ProtectedRoute>
              }
            />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>

        {isKnownRoute && <Footer />}

        <AuthGuardPrompt />
      </CartProvider>
    </AuthProvider>
  )
}

export default App

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

// Each user (and signed-out "guest") gets their own storage slot, so one
// browser can be used by multiple accounts without carts bleeding together.
function storageKeyFor(user) {
  const id = user?.id ?? user?.email ?? 'guest'
  return `indibhoj_cart_${id}`
}

function loadCartFromStorage(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.warn('Could not load cart from storage:', err)
    return []
  }
}

export function CartProvider({ children }) {
  const { user } = useAuth()
  const storageKey = storageKeyFor(user)
  const [cartItems, setCartItems] = useState(() => loadCartFromStorage(storageKey))
  const prevKeyRef = useRef(storageKey)

  // When the logged-in user changes (login, logout, or switching accounts),
  // swap the in-memory cart for that user's own persisted cart instead of
  // carrying over whatever was in state before.
  useEffect(() => {
    if (prevKeyRef.current !== storageKey) {
      prevKeyRef.current = storageKey
      setCartItems(loadCartFromStorage(storageKey))
    }
  }, [storageKey])

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(cartItems))
    } catch (err) {
      console.warn('Could not save cart to storage:', err)
    }
  }, [cartItems, storageKey])

  const addToCart = (menuItem, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((line) => line.id === menuItem.id)

      if (existing) {
        return prevItems.map((line) =>
          line.id === menuItem.id
            ? { ...line, quantity: line.quantity + quantity }
            : line
        )
      }

      return [
        ...prevItems,
        {
          id: menuItem.id,
          name: menuItem.name,
          image: menuItem.image,
          price: menuItem.price,
          quantity,
        },
      ]
    })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCartItems((prevItems) =>
      prevItems.map((line) => (line.id === id ? { ...line, quantity } : line))
    )
  }

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((line) => line.id !== id))
  }

  const clearCart = () => setCartItems([])

  const cartCount = cartItems.reduce((sum, line) => sum + line.quantity, 0)

  const cartTotal = cartItems.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0
  )

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a <CartProvider>')
  }
  return ctx
}

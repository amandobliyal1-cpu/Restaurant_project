import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { addOrder } from '../Services/orderService'
import CartItem from '../components/CartItem'

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart()
  const { requireAuth, username, user, hasAddress } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [orderError, setOrderError] = useState(null)

  const placeOrder = async () => {
    setIsPlacingOrder(true)
    setOrderError(null)
    try {
      await addOrder({
        username,
        items: cartItems,
        deliveryAddress: user?.address,
        total: cartTotal,
        placedAt: new Date().toISOString(),
      })
      clearCart()
      setOrderPlaced(true)
    } catch (err) {
      console.error(err)
      setOrderError('Could not place your order. Please try again.')
    } finally {
      setIsPlacingOrder(false)
    }
  }

  // gate: no saved address yet → send the user to the address form first,
  // and come straight back here to finish checkout once it's saved
  const handleCheckout = () => {
    requireAuth(() => {
      if (!hasAddress) {
        navigate('/address', { state: { fromCheckout: true } })
        return
      }
      placeOrder()
    }, 'Please log in to place your order.')
  }

  // resume checkout automatically after returning from the address form
  const autoCheckoutHandled = useRef(false)
  useEffect(() => {
    if (
      location.state?.autoCheckout &&
      !autoCheckoutHandled.current &&
      hasAddress &&
      cartItems.length > 0
    ) {
      autoCheckoutHandled.current = true
      placeOrder()
      navigate(location.pathname, { replace: true, state: {} })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, hasAddress])

  return (
    <div id="cart" className="py-5">
      <div className="container py-4">
        <h2 className="div-title text-center fw-bold fs-1 mb-5">Your Cart</h2>

        {orderPlaced && (
          <div className="card border-0 rounded-4 shadow-sm text-center p-4 mx-auto fs-5" style={{ maxWidth: '500px' }}>
            🎉 Order placed! Your food is on its way.
          </div>
        )}

        {orderError && <p className="text-center text-danger fw-semibold">{orderError}</p>}

        {!orderPlaced && cartItems.length === 0 && (
          <p className="text-center text-secondary py-4">
            Your cart is empty. Visit the Order Page to add a dish.
          </p>
        )}

        {!orderPlaced && cartItems.length > 0 && (
          <div className="card border-0 rounded-4 shadow-sm p-4 mx-auto" style={{ maxWidth: '700px' }}>
            {cartItems.map((line) => (
              <CartItem
                key={line.id}
                line={line}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}

            <div className="d-flex justify-content-between align-items-start pt-4 mt-3 border-top border-2">
              <div>
                <p className="small text-secondary mb-1 fw-semibold">Delivery Address</p>
                {hasAddress ? (
                  <p className="small text-secondary mb-0">
                    {user.address.fullName}, {user.address.addressLine1}, {user.address.city}
                  </p>
                ) : (
                  <p className="small text-secondary mb-0">No address saved yet</p>
                )}
                <button
                  type="button"
                  className="btn btn-link btn-sm p-0"
                  onClick={() => navigate('/address')}
                >
                  {hasAddress ? 'Change address' : 'Add address'}
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between fs-4 fw-bold pt-3 mt-2">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>

            <button
              type="button"
              className="btn btn-primary w-100 mt-3"
              onClick={handleCheckout}
              disabled={isPlacingOrder}
            >
              {isPlacingOrder ? 'Placing order…' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage

import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function MenuCard({ item }) {
  const [quantity, setQuantity] = useState(1)
  const { requireAuth } = useAuth()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1))
  const increaseQuantity = () => setQuantity((q) => q + 1)

  const handleAddToCart = () => {
    requireAuth(
      () => addToCart(item, quantity),
      `Please log in to add "${item.name}" to your cart.`
    )
  }

  const handleOrderNow = () => {
    requireAuth(
      () => {
        addToCart(item, quantity)
        navigate('/cart')
      },
      `Please log in to order "${item.name}".`
    )
  }

  return (
    <div className="card menu-card h-100 border-0 rounded-4 shadow-sm hover-lift">
      <div className="hover-zoom" style={{ height: '220px' }}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="card-body px-4 pt-4 pb-4 d-flex flex-column">
        <h3 className="card-title font-display fw-bold fs-4 mb-2">{item.name}</h3>
        <p className="card-text text-secondary small mb-2">{item.description}</p>

        <div className="mt-auto">
          <span className="price fs-4 fw-bold text-brand">₹{item.price}</span>

          <div className="d-flex align-items-center gap-3 my-3">
            <button type="button" className="btn btn-outline-secondary rounded-circle stepper-btn" onClick={decreaseQuantity} aria-label="Decrease quantity">−</button>
            <span className="fw-semibold">{quantity}</span>
            <button type="button" className="btn btn-outline-secondary rounded-circle stepper-btn" onClick={increaseQuantity} aria-label="Increase quantity">+</button>
          </div>

          <div className="d-flex flex-nowrap gap-2">
            <button type="button" className="btn btn-outline-primary btn-sm flex-fill text-nowrap px-2" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button type="button" className="btn btn-primary btn-sm flex-fill text-nowrap px-2" onClick={handleOrderNow}>
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuCard

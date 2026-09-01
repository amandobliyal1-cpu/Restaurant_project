function CartItem({ line, onUpdateQuantity, onRemove }) {
  const decrease = () => onUpdateQuantity(line.id, line.quantity - 1)
  const increase = () => onUpdateQuantity(line.id, line.quantity + 1)

  return (
    <div className="d-flex align-items-center gap-3 py-3 border-bottom">
      <img src={line.image} alt={line.name} className="rounded-3" style={{ width: 60, height: 60, objectFit: 'cover' }} />

      <div className="flex-grow-1">
        <h4 className="fs-6 mb-1">{line.name}</h4>
        <p className="small text-secondary mb-0">₹{line.price} each</p>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button type="button" className="btn btn-outline-secondary rounded-circle stepper-btn" onClick={decrease} aria-label="Decrease quantity">−</button>
        <span className="fw-semibold">{line.quantity}</span>
        <button type="button" className="btn btn-outline-secondary rounded-circle stepper-btn" onClick={increase} aria-label="Increase quantity">+</button>
      </div>

      <div className="fw-bold text-brand text-end" style={{ minWidth: '70px' }}>₹{line.price * line.quantity}</div>

      <button type="button" className="btn btn-link text-danger fs-5 p-0" onClick={() => onRemove(line.id)} aria-label={`Remove ${line.name}`}>
        ✕
      </button>
    </div>
  )
}

export default CartItem

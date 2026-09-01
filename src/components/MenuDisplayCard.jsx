function MenuDisplayCard({ item }) {
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
        <p className="card-text text-secondary small mb-3">{item.description}</p>
        <span className="price fs-4 fw-bold text-brand mt-auto">₹{item.price}</span>
      </div>
    </div>
  )
}

export default MenuDisplayCard

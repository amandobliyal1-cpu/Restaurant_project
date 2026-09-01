import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { isLoggedIn, username, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const navLinkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : 'text-light'}`

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-brand-dark sticky-top shadow-sm py-3">
      <div className="container">
        <NavLink to="/" end className="navbar-brand font-display fw-bold fs-2 text-brand logo-btn">
          IndiBhoj
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-lg-auto gap-lg-4 mb-3 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/story" className={navLinkClass}>Story</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/menu" className={navLinkClass}>Menu</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/order" className={navLinkClass}>Order</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/reservation" className={navLinkClass}>Reserve</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <NavLink
              to="/cart"
              className={({ isActive }) => `cart-icon-link position-relative fs-4 text-light text-decoration-none ${isActive ? 'active' : ''}`}
              aria-label="View cart"
            >
              🛒
              {isLoggedIn && cartCount > 0 && (
                <span className="badge rounded-pill bg-primary position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {isLoggedIn ? (
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm rounded-pill px-3"
                  onClick={() => navigate('/address')}
                >
                  My Address
                </button>
                <button type="button" className="btn btn-primary btn-sm rounded-pill px-3" onClick={logout}>
                  Logout ({username})
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <button type="button" className="btn btn-outline-light btn-sm rounded-pill px-3" onClick={() => navigate('/login')}>
                  Login
                </button>
                <button type="button" className="btn btn-primary btn-sm rounded-pill px-3" onClick={() => navigate('/signup')}>
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

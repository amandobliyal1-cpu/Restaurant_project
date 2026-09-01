import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section id="home" className="hero d-flex align-items-center text-center text-white">
      <div className="container">
        <div className="mx-auto" style={{ maxWidth: '800px' }}>
          <h1 className="font-display fw-bold display-3 mb-3">Spice &amp; Soul of Mumbai</h1>

          <p className="fs-5 mb-4" style={{ opacity: 0.95 }}>
            Authentic Indian flavours, sizzling tandoor, coastal curries —
            every meal is a celebration.
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/menu" className="btn btn-outline-light btn-lg px-4">
              Explore Menu
            </Link>
            <Link to="/reservation" className="btn btn-outline-light btn-lg px-4">
              Book a Table
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

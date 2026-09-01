function Footer() {
  return (
    <footer className="bg-dark text-white-50 pt-5 pb-4 mt-5">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 pb-4 mb-4 border-bottom border-secondary-subtle">
          <div className="font-display fs-3 fw-bold text-warning">IndiBhoj</div>
          <div>
            <a href="https://www.instagram.com/" className="text-white-50 fs-4 ms-3 text-decoration-none" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/" className="text-white-50 fs-4 ms-3 text-decoration-none" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>

        <p className="text-center small mb-0">© 2025 IndiBhoj, Mumbai. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

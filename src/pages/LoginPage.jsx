import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserByEmail } from '../Services/userService'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const user = await getUserByEmail(email)

      if (!user || user.password !== password) {
        setError('Invalid email or password.')
        setIsSubmitting(false)
        return
      }

      login(user)
      navigate('/')
    } catch (err) {
      console.error(err)
      setError('Could not log in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-5">
      <div className="container py-4" style={{ maxWidth: '480px' }}>
        <h2 className="section-title text-center fw-bold fs-1 mb-5">Log In to IndiBhoj</h2>

        {error && <p className="text-center text-danger fw-semibold mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label small text-secondary">Email</label>
            <input
              id="loginEmail"
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="loginPassword" className="form-label small text-secondary">Password</label>
            <input
              id="loginPassword"
              type="password"
              className="form-control"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex gap-2">
            <button type="button" className="btn btn-secondary flex-fill" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary flex-fill" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in…' : 'Log In'}
            </button>
          </div>
        </form>

        <p className="text-center text-secondary small mt-4">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </section>
  )
}

export default LoginPage

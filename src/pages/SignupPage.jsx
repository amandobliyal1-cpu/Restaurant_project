import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addUser, getUserByEmail } from '../Services/userService'
import { useAuth } from '../context/AuthContext'

function SignupPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const existingUser = await getUserByEmail(email)
      if (existingUser) {
        setError('An account with this email already exists.')
        setIsSubmitting(false)
        return
      }

      const createdUser = await addUser({ name, email, password })
      login(createdUser)
      navigate('/')
    } catch (err) {
      console.error(err)
      setError('Could not create your account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-5">
      <div className="container py-4" style={{ maxWidth: '480px' }}>
        <h2 className="section-title text-center fw-bold fs-1 mb-5">Create Account</h2>

        {error && <p className="text-center text-danger fw-semibold mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="signupName" className="form-label small text-secondary">Name</label>
            <input
              id="signupName"
              type="text"
              className="form-control"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="signupEmail" className="form-label small text-secondary">Email</label>
            <input
              id="signupEmail"
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="signupPassword" className="form-label small text-secondary">Password</label>
            <input
              id="signupPassword"
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-secondary small mt-4">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </section>
  )
}

export default SignupPage

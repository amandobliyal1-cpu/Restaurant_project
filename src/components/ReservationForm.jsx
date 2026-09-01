import { useState } from 'react'
import { addReservation } from '../Services/reservationService'

function ReservationForm({ timeSlots, guestOptions }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    notes: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      await addReservation(formData)
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setSubmitError('Could not submit your reservation. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="card border-0 rounded-4 shadow-sm p-4">
        <h3 className="font-display fs-4 mb-3">Book a Table</h3>
        <p className="mb-0">
          🎉 Thank you, <strong>{formData.name}</strong>! Your table for{' '}
          {formData.guests || 'your party'} on {formData.date} at{' '}
          {formData.time} has been requested. We'll confirm by email shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="card border-0 rounded-4 shadow-sm p-4">
      <h3 className="font-display fs-4 mb-3">Book a Table</h3>

      {submitError && <p className="text-danger fw-semibold small">{submitError}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            name="phone"
            className="form-control"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <select name="time" className="form-select" value={formData.time} onChange={handleChange} required>
            <option value="" disabled>Select time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <select name="guests" className="form-select" value={formData.guests} onChange={handleChange} required>
            <option value="" disabled>Number of guests</option>
            {guestOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <textarea
            name="notes"
            className="form-control"
            rows="2"
            placeholder="Special requests (allergies, celebrations, etc.)"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Reserve Now'}
        </button>
      </form>
    </div>
  )
}

export default ReservationForm

import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ReservationForm from '../components/ReservationForm'

const timeSlots = [
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
]

const guestOptions = [
  '1 guest',
  '2 guests',
  '3 guests',
  '4 guests',
  '5 guests',
  '6 guests',
]

function ReservationPage() {
  const { requireAuth } = useAuth()
  const [isFormRevealed, setIsFormRevealed] = useState(false)

  const handleReserveClick = () => {
    requireAuth(
      () => setIsFormRevealed(true),
      'Please log in to book a table.'
    )
  }

  return (
    <div id="reservation" className="py-5">
      <div className="container py-4">
        <h2 className="div-title text-center fw-bold fs-1 mb-5">Reserve Your Table</h2>

        <div className="row g-4 bg-light rounded-5 shadow-sm p-4 p-md-5 mx-0">
          <div className="col-md-6">
            <h3 className="font-display fs-3 mb-4">Visit IndiBhoj</h3>

            <div className="mb-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="icon-circle bg-white rounded-circle d-flex align-items-center justify-content-center fs-5">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <span>23, Pali Hill, Bandra West, Mumbai - 400050</span>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="icon-circle bg-white rounded-circle d-flex align-items-center justify-content-center fs-5">
                  <i className="fas fa-phone-alt"></i>
                </span>
                <span>+91 98765 43210</span>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="icon-circle bg-white rounded-circle d-flex align-items-center justify-content-center fs-5">
                  <i className="fas fa-envelope"></i>
                </span>
                <span>IndiBhoj@gmail.com</span>
              </div>
            </div>

            <div className="bg-white rounded-4 p-4">
              <h4 className="fw-bold fs-5 mb-3"><i className="far fa-clock"></i> Opening Hours</h4>
              <p className="mb-1"><strong>Monday - Thursday:</strong> 12:00 PM - 11:00 PM</p>
              <p className="mb-1"><strong>Friday - Saturday:</strong> 12:00 PM - 12:00 AM</p>
              <p className="mb-1"><strong>Sunday:</strong> 12:00 PM - 10:30 PM</p>
              <p className="mt-3 mb-0">
                <i className="fas fa-utensils"></i> Live Ghazal Nights: Fri &amp; Sat 8 PM
              </p>
            </div>
          </div>

          <div className="col-md-6">
            {!isFormRevealed ? (
              <div className="card border-0 rounded-4 shadow-sm p-4 h-100 d-flex flex-column justify-content-center">
                <h3 className="font-display fs-4 mb-3">Book a Table</h3>
                <p className="text-secondary small mb-4">
                  Ready to reserve? Click below — you'll need to be logged
                  in to see the booking form.
                </p>
                <button type="button" className="btn btn-primary w-100" onClick={handleReserveClick}>
                  Reserve a Table
                </button>
              </div>
            ) : (
              <ReservationForm timeSlots={timeSlots} guestOptions={guestOptions} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationPage

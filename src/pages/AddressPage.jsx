import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { updateUser } from '../Services/userService'

const emptyAddress = {
  fullName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
}

function AddressPage() {
  const { user, updateUserAddress } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // if the user got here from the checkout ("Place Order" with no saved
  // address), we send them back to the cart afterwards so they can finish
  const fromCheckout = Boolean(location.state?.fromCheckout)

  const [form, setForm] = useState(emptyAddress)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user?.address) {
      setForm({ ...emptyAddress, ...user.address })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSaving(true)

    try {
      await updateUser(user.id, { address: form })
      updateUserAddress(form)
      setSaved(true)

      if (fromCheckout) {
        // hand control back to CartPage, which will auto-continue checkout
        navigate('/cart', { state: { autoCheckout: true } })
      }
    } catch (err) {
      console.error(err)
      setError('Could not save your address. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div id="address" className="py-5">
      <div className="container py-4" style={{ maxWidth: '600px' }}>
        <h2 className="div-title text-center fw-bold fs-1 mb-4">
          {user?.address ? 'Update Delivery Address' : 'Add Delivery Address'}
        </h2>

        {fromCheckout && (
          <p className="text-center text-secondary mb-4">
            Please add a delivery address to continue with your order.
          </p>
        )}

        {error && <p className="text-center text-danger fw-semibold">{error}</p>}
        {saved && !fromCheckout && (
          <p className="text-center text-success fw-semibold">Address saved.</p>
        )}

        <form onSubmit={handleSubmit} className="card border-0 rounded-4 shadow-sm p-4">
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label small text-secondary">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="form-control"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label small text-secondary">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="addressLine1" className="form-label small text-secondary">Address Line 1</label>
            <input
              id="addressLine1"
              name="addressLine1"
              type="text"
              className="form-control"
              placeholder="House no., building, street"
              value={form.addressLine1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="addressLine2" className="form-label small text-secondary">Address Line 2 (optional)</label>
            <input
              id="addressLine2"
              name="addressLine2"
              type="text"
              className="form-control"
              placeholder="Landmark, area"
              value={form.addressLine2}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="col-md-5 mb-3">
              <label htmlFor="city" className="form-label small text-secondary">City</label>
              <input
                id="city"
                name="city"
                type="text"
                className="form-control"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="state" className="form-label small text-secondary">State</label>
              <input
                id="state"
                name="state"
                type="text"
                className="form-control"
                value={form.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="pincode" className="form-label small text-secondary">Pincode</label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                className="form-control"
                value={form.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2" disabled={isSaving}>
            {isSaving ? 'Saving…' : user?.address ? 'Update Address' : 'Save Address'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddressPage

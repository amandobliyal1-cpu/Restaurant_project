import { useEffect, useState } from 'react'
import { getMenu } from '../Services/menuService'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import MenuDisplayCard from '../components/MenuDisplayCard'

function HomePage() {
  const [menuItems, setMenuItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

 

  useEffect(() => {
    const loadSignatureDishes = async () => {
      try {
        const data = await getMenu()
        setMenuItems(data)
      } catch (err) {
        setError('Could not load the menu Server error.')
      } finally {
        setIsLoading(false)
      }
    }

    loadSignatureDishes()
  }, [])

  const signatureDishes = menuItems.filter((item) => item.isSignature === true)

  return (
    <>
      <Hero />

      <div id="signature-delicacies" className="py-5">
        <div className="container py-4">
          <h2 className="div-title text-center fw-bold fs-1 mb-5">Signature Delicacies</h2>

          {isLoading && <p className="text-center text-secondary py-4">Loading signature dishes…</p>}

          {error && <p className="text-center text-danger fw-semibold py-4">{error}</p>}

          {!isLoading && !error && (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {signatureDishes.map((item) => (
                <div className="col" key={item.id}>
                  <MenuDisplayCard item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div id="about-snippet" className="py-5">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <h3 className="font-display fs-1 mb-3">Our Story, In Brief</h3>
              <p className="text-secondary-emphasis mb-4">
                IndiBhoj brings the vibrant street energy of Mumbai and the
                rich heritage of Indian cuisine under one roof — heirloom
                spices, Dum Pukht tradition, and a whole lot of love.
              </p>
             <Link to="/story" className="btn btn-outline-primary">Read Our Full Story</Link>
            </div>

            <div className="col-md-6">
              <img
                src="/images/chef.png"
                alt="Chef in Mumbai kitchen"
                loading="lazy"
                className="img-fluid rounded-4 shadow w-100"
                style={{ objectFit: 'cover', maxHeight: '420px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage ;

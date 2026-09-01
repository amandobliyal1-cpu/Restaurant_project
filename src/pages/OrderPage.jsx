import { useEffect, useState } from 'react'
import { getMenu } from '../Services/menuService'
import MenuCard from '../components/MenuCard'

function OrderPage() {
  const [menuItems, setMenuItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadOrderableMenu = async () => {
      try {
        const data = await getMenu()
        setMenuItems(data)
      } catch (err) {
        setError(`Could not load the menu Server error',{err}`)
      } finally {
        setIsLoading(false)
      }
    }

    // loadOrderableMenu()   
    const timer = setTimeout(() => {
    loadOrderableMenu()
  }, 1000) 

  return () => clearTimeout(timer)
  }, [])

  const deliverableItems = menuItems.filter((item) => item.isDeliverable === true)

  return (
    <div id="order" className="py-5">
      <div className="container py-4">
        <h2 className="div-title text-center fw-bold fs-1 mb-3 pb-5">Place Your Order</h2>

        {isLoading && <p className="text-center text-secondary py-4">Loading menu…</p>}
        {error && <p className="text-center text-danger fw-semibold py-4">{error}</p>}

        {!isLoading && !error && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {deliverableItems.map((item) => (
              <div className="col" key={item.id}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderPage ;

import { useEffect, useState } from 'react'
import { getMenu } from '../Services/menuService'
import MenuDisplayCard from '../components/MenuDisplayCard'

function MenuPage() {
  const [menuItems, setMenuItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadFullMenu() {
      try {
        const data = await getMenu()
        setMenuItems(data)
      } catch (err) {
        console.error(err)
        setError('Could not load the menu. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    loadFullMenu()
  }, [])

  const curatedMenu = menuItems.filter((item) => item.showInMenu)

  return (
    <div id="full-menu" className="py-5">
      <div className="container py-4">
        <h2 className="div-title text-center fw-bold fs-1 mb-3">Our Full Menu</h2>
        <p className="text-center text-secondary mx-auto mb-5" style={{ maxWidth: '640px' }}>
          Every dish IndiBhoj serves, all in one place — browse the menu ahead of reserving your table with us.
          A handful of these favourites are also available for delivery on the Order Page.
        </p>

        {isLoading && <p className="text-center text-secondary py-4">Loading menu…</p>}
        {error && <p className="text-center text-danger fw-semibold py-4">{error}</p>}

        {!isLoading && !error && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {curatedMenu.map((item) => (
              <div className="col" key={item.id}>
                <MenuDisplayCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuPage

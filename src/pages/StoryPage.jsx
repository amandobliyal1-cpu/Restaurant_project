const galleryItems = [
  { src: '/images/restaurant.png', alt: 'IndiBhoj restaurant frontage', caption: 'Our Bandra Storefront' },
  { src: '/images/chef.png', alt: 'Chef Ajay Khanna at work', caption: 'Chef Ajay at the Tandoor' },
  { src: '/images/tandoori-platter.png', alt: 'Tandoori platter fresh off the grill', caption: 'Fresh Off the Grill' },
  { src: '/images/lucknowi-dum-biryani.png', alt: 'Dum biryani being plated', caption: 'The Dum Biryani Pass' },
  { src: '/images/murgh-makhani.png', alt: 'Murgh makhani in the kitchen', caption: "Tonight's Butter Chicken" },
  { src: '/images/paneer-tikka-achari.png', alt: 'Paneer tikka achari on the tandoor', caption: 'Paneer on the Coals' },
  { src: '/images/dal-makhani.png', alt: 'Dal makhani simmering', caption: 'The Overnight Dal' },
  { src: '/images/gulab-jamun.png', alt: 'Gulab jamun dessert plating', caption: 'Sweet Finish' },
]

function StoryPage() {
  return (
    <>
      <div id="story-history" className="py-5">
        <div className="container py-4">
          <h2 className="div-title text-center fw-bold fs-1 mb-5">Our Story</h2>

          <div className="mx-auto" style={{ maxWidth: '760px' }}>
            <p className="text-secondary-emphasis mb-4" style={{ lineHeight: 1.75 }}>
              IndiBhoj began in 2008 as a single tandoor stall on Mohammed Ali
              Road, run by a young Chef Ajay Khanna who had spent a decade
              cooking in the kitchens of old Delhi and the coastal towns of
              Konkan. What started as a handful of skewers sold to late-night
              crowds slowly became a full kitchen, then a small dining room,
              and eventually the restaurant that now sits on Pali Hill.
            </p>

            <p className="text-secondary-emphasis mb-4" style={{ lineHeight: 1.75 }}>
              From the very beginning, the philosophy never changed: heirloom
              spices, slow-cooked gravies, and recipes passed down rather than
              invented. Every masala at IndiBhoj is still ground in-house,
              every dal simmers for hours over a low flame the way it did on
              that first stall, and every naan is shaped by hand before it
              touches the tandoor.
            </p>

            <p className="text-secondary-emphasis mb-4" style={{ lineHeight: 1.75 }}>
              As the restaurant grew, so did its ambitions. Chef Ajay
              travelled through Lucknow to study the art of Dum Pukht —
              sealing rice and meat together under dough so they cook in
              their own steam — and brought that technique home to become the
              backbone of the Lucknowi Dum Biryani served today. Trips to the
              Konkan coast shaped the restaurant's approach to seafood and
              fresh coconut-based gravies, while Punjab influenced the
              richness of its butter chicken and dal makhani.
            </p>

            <p className="text-secondary-emphasis mb-0" style={{ lineHeight: 1.75 }}>
              Today, IndiBhoj is run by a kitchen team of over a dozen cooks,
              many of whom trained directly under Chef Ajay. The restaurant
              still buys fresh produce daily from local markets, still fires
              its tandoors with charcoal rather than gas, and still closes
              its Friday and Saturday nights with live ghazal music — a
              tradition that started, almost by accident, on a slow evening
              back in 2011 when a regular customer brought his harmonium and
              never really stopped coming back.
            </p>
          </div>
        </div>
      </div>

      <div id="story-gallery" className="py-5">
        <div className="container py-4">
          <h2 className="div-title text-center fw-bold fs-1 mb-5">A Look Inside</h2>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {galleryItems.map((photo) => (
              <div className="col" key={photo.src + photo.caption}>
                <figure className="card border-0 rounded-4 shadow-sm hover-lift m-0">
                  <div className="hover-zoom" style={{ height: '180px' }}>
                    <img src={photo.src} alt={photo.alt} loading="lazy" className="w-100 h-100" style={{ objectFit: 'cover' }} />
                  </div>
                  <figcaption className="text-center fw-semibold small text-secondary-emphasis py-3 px-2">
                    {photo.caption}
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default StoryPage

import BuyingProcess from './BuyingProcess'
import CustomerReviews from './top-review/customer-reviews'
import FeaturedProduct from './feature-products.tsx/featured-products'
import Hero from './Hero'
import SizeFeature from './size-featured/product-size-feature'
import WhyChooseUs from './WhyChooseUs'

export default function CustomerHomePage() {
  return (
    <>
      <Hero />
      <BuyingProcess />
      <FeaturedProduct />
      <WhyChooseUs />
      <SizeFeature />
      <CustomerReviews />
    </>
  )
}

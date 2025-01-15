import React from 'react'
import PlaceContainer from '../../components/pageComponents/for-likedplaces/PlaceContainer'
import Hero from '../../components/pageComponents/ui/Hero'
import Footer from '../../components/pageComponents/ui/Footer'
import PlaceSlider from '../../components/pageComponents/for-likedplaces/PlaceSlider'

const LikedPlaces = () => {
  return (
    <div>
      <Hero />
      <PlaceContainer />
      <PlaceSlider />
      <Footer />
    </div>
  )
}

export default LikedPlaces

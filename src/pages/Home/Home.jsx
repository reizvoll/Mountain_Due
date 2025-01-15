import PlaceSlider from '../../components/pageComponents/for-likedplaces/PlaceSlider'
import Footer from '../../components/pageComponents/ui/Footer'
import HeroSection from '../../components/pageComponents/ui/HeroSection'
import useUser from '../../hooks/useUser'
import Map from './Map'

const Home = () => {
  const { user, isLoggedIn } = useUser()

  console.log('users 리덕스 훅 체크용==>', user, isLoggedIn)

  return (
    <div>
      <HeroSection />
      <Map />
      <PlaceSlider />
      <Footer />
    </div>
  )
}

export default Home

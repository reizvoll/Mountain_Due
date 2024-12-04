import ContainerYoutubeSection from "../../components/pageComponents/for-youtube/ContainerYoutubeSection";
import Hero from "../../components/pageComponents/for-youtube/HeroForYoutube";
import YoutubeShow from "../../components/pageComponents/for-youtube/YoutubeShow";
import Footer from '../../components/pageComponents/ui/Footer';

const Youtube = () => {
  return (
    <>
    <div className="items-center justify-center overflow-hidden">
      <Hero />
      <ContainerYoutubeSection>
      <YoutubeShow />
      </ContainerYoutubeSection>
      <Footer />
      </div>
    </>
  );
};
export default Youtube;

import ContainerYoutubeSection from "../../components/pageComponents/for-youtube/ContainerYoutubeSection";
import Hero from "../../components/pageComponents/for-youtube/Hero";
import YoutubeShow from "../../components/pageComponents/for-youtube/YoutubeShow";

const Youtube = () => {
  return (
    <>
    <div className="items-center justify-center overflow-hidden">
      <Hero />
      <ContainerYoutubeSection>
      <YoutubeShow />
      </ContainerYoutubeSection>
      </div>
    </>
  );
};
export default Youtube;

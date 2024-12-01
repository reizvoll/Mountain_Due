import Container from "../ui/Container";

const Hero = () => {
  return (
    <Container>
      <div
        style={{
          backgroundImage: "url(img/youtube_page_img.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="flex flex-col items-center justify-center min-h-[600px] w-screen mb-[100px]"
      >
        <div className="flex flex-col items-center gap-16">
          <h2 className="text-[48px]">Youtube 영상</h2>
          <div className="flex flex-col items-center">
            <h3 className="text-white">다양한 클라이밍 영상을</h3>
            <h3 className="text-white">이곳에서 확인하세요!</h3>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Hero;

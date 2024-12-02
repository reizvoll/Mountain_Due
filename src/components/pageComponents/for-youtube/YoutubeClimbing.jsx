import Btn from "../ui/Btn";

const YoutubeClimbing = ({
  climbResult,
  modalClickHandler,
  fetchNextClimb,
}) => {
  if (climbResult) {
    return (
      <>
        <div className="flex flex-col items-center mb-[50px]">
          <div className="flex flex-row items-center justify-center w-full flex-wrap gap-10 m-5">
            <div className="w-full flex justify-start">
              <h3 className="text-left text-[24px] font-bold ml-[110px]">
                재밌는 클라이밍 영상
              </h3>
            </div>
            {climbResult?.map((page) => {
              return page.items.map((item) => {
                return (
                  <div key={item.id}>
                    <img
                      width="300"
                      height="180"
                      src={item.thumbnail}
                      className="rounded-md"
                      onClick={() => {
                        modalClickHandler(item);
                      }}
                    ></img>
                    <p className="mt-3 text-[18px]">{item.title.substring(0, 15).trim()+"..."}</p>
                  </div>
                );
              });
            })}
          </div>
          <Btn
            onClick={() => {
              fetchNextClimb();
            }}
          >
            더 보기
          </Btn>
        </div>
      </>
    );
  }
};
export default YoutubeClimbing;

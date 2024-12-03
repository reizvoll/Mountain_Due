import Btn from "../ui/Btn";

const YoutubeBeginner = ({ MOCK_DATA, modalClickHandler }) => {
    // const { data: climbResult } = useQuery({
    //   queryKey: ["climbResult"],
    //   queryFn: async () => {
    //     const data = await getClimbResults();
    //     return data;
    //   },
    // });
  
    //   console.log(items);

    const {
        data: { items },
      } = MOCK_DATA;
  
    return (
      <>
        <div className="flex flex-col items-center mb-[50px]">
          <div className="flex flex-row items-center justify-center w-full flex-wrap gap-10 m-5">
          <div className="w-full flex justify-start">
            <h3 className="text-left text-[24px] font-bold ml-[110px]">
              초심자를 위한 클라이밍 영상
            </h3>
          </div>
            {items.map((item) => {
              const {
                id: { videoId },
              } = item;
              const {
                snippet: {
                  thumbnails: { high },
                },
              } = item;
              return (
                <img
                  key={videoId}
                  width="300"
                  height="180"
                  src={high.url}
                  className="rounded-md"
                  onClick={() => {
                    modalClickHandler(item);
                  }}
                ></img>
              );
            })}
          </div>
          <Btn>더 보기</Btn>
        </div>
      </>
    );
  };
  export default YoutubeBeginner;
  
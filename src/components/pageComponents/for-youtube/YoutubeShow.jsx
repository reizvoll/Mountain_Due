// import { useQuery } from "@tanstack/react-query";
// import Btn from "../ui/Btn";
// import { getBeginnerResults, getClimbResults } from "../../../api/youtube";
import { useState } from "react";
import YoutubeBeginner from "./YoutubeBeginner";
import YoutubeClimbing from "./YoutubeClimbing";
import { MOCK_DATA } from "../../../mock-data/climbingData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getClimbResults } from "../../../api/youtube";

const YoutubeShow = () => {
  const fetchClimbResults = async ({ pageParam = "" }) => {
    const data = await getClimbResults(pageParam);
    return {
      items: data.items,
      nextPageToken: data.nextPageToken,
    };
  };

  const {
    data: climbResult,
    fetchNextPage : fetchNextClimb,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["climbResults"],
    queryFn: fetchClimbResults,
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    select: (data) => {
      return data.pages.map((page) => ({
        items: page.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
        })),
        nextPageToken: page.nextPageToken,
      }));
    },
  });

  const [isClicked, setIsClicked] = useState(false);
  const [youtubeId, setYoutubeId] = useState("");

  const modalClickHandler = (item) => {
    const toggle = !isClicked;
    setIsClicked(toggle);
    const {
      id: { videoId },
    } = item;
    setYoutubeId(videoId);
  };

  const modalClose = (e) => {
    e.stopPropagation();
    setIsClicked(false);
  };

  return (
    <>
      <main className="flex flex-col items-center w-[1200px]">
        <div className="flex flex-col flex-wrap items-center max-w-[1200px] mt-4">
          <YoutubeClimbing
            climbResult={climbResult}
            modalClickHandler={modalClickHandler}
            fetchNextClimb={fetchNextClimb}
          />
          <YoutubeBeginner
            MOCK_DATA={MOCK_DATA}
            modalClickHandler={modalClickHandler}
          />
        </div>
      </main>
      {isClicked && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center"
          onClick={modalClose}
        >
          <div className="flex items-center justify-center w-[1200px] h-[675px] bg-white rounded-lg shadow-lg">
            <iframe
              id="ytplayer"
              type="text/html"
              width="1200"
              height="675"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              className="rounded-md"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};
export default YoutubeShow;

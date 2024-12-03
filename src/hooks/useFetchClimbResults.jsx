import { useInfiniteQuery } from "@tanstack/react-query";
import { getClimbResults } from "../api/youtube";

const useFetchClimbResults = () => {
  const fetchClimbResults = async ({ pageParam = "" }) => {
    const data = await getClimbResults(pageParam);
    return {
      items: data.items,
      nextPageToken: data.nextPageToken,
    };
  };

  const {
    data: climbResult,
    fetchNextPage: fetchNextClimb,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["climbResults"],
    queryFn: fetchClimbResults,
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    select: (data) => {
      return data.pages.map((page) => ({
        items: page.items.map((item) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
        })),
        nextPageToken: page.nextPageToken,
      }));
    },
  });

  return { climbResult, fetchNextClimb, hasNextPage, isFetchingNextPage };
};
export default useFetchClimbResults;

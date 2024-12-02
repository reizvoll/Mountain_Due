import axios from "axios";

const API_KEY = "AIzaSyBs9ASH5if90rwwByEHmWebTY_ykq0Ap5A";

const youtubeAPI = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
});

const paramsClimbing = {
  part: "snippet",
  maxResults: 6,
  order: "relevance",
  q: "클라이밍",
  key: API_KEY,
};

const paramsBeginner = {
  part: "snippet",
  maxResults: 6,
  order: "relevance",
  q: "초보 클라이밍",
  key: API_KEY,
};

export const getClimbResults = async (pageToken = "") => {
  try {
    const response = await youtubeAPI.get("/search", {
      params: {
        ...paramsClimbing,
        pageToken, 
      },
    });
    console.log("YouTube API response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching climb results:", error);
    throw error;
  }
};

export const getBeginnerResults = async () => {
  const response = await youtubeAPI.get("/search", { params: paramsBeginner });
  console.log(response);
  return response.data;
};

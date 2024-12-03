import axios from "axios";

const API_KEY = "AIzaSyC0NeCVkjuKSGZiKLC92ppNvbMSBTUxBoA";

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
  playlistId: "PLQw_lIekogqOZpOzmzpMzfDjksS9FQxPv",
  key: API_KEY,
};

const paramsBeginner = {
  part: "snippet",
  maxResults: 6,
  playlistId: "PLQw_lIekogqPuD9j-r-XSWnHUwJGzjMhH",
  key: API_KEY,
};

export const getClimbResults = async (pageToken = "") => {
  try {
    const response = await youtubeAPI.get("/playlistItems", {
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

export const getBeginnerResults = async (pageToken = "") => {
  try {
    const response = await youtubeAPI.get("/playlistItems", {
      params: {
        ...paramsBeginner,
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

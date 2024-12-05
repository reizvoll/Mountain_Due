import axios from 'axios'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

const youtubeAPI = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
})

const paramsClimbing = {
  part: 'snippet',
  maxResults: 6,
  playlistId: 'PLQw_lIekogqOZpOzmzpMzfDjksS9FQxPv',
  key: API_KEY,
}

const paramsBeginner = {
  part: 'snippet',
  maxResults: 6,
  playlistId: 'PLQw_lIekogqPuD9j-r-XSWnHUwJGzjMhH',
  key: API_KEY,
}

export const getClimbResults = async (pageToken = '') => {
  try {
    const response = await youtubeAPI.get('/playlistItems', {
      params: {
        ...paramsClimbing,
        pageToken,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching climb results:', error)
    throw error
  }
}

export const getBeginnerResults = async (pageToken = '') => {
  try {
    const response = await youtubeAPI.get('/playlistItems', {
      params: {
        ...paramsBeginner,
        pageToken,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching climb results:', error)
    throw error
  }
}

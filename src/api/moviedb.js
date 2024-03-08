import axios from 'axios';
import { token } from '../constants';

//endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming`;
const topRatedEndpoint = `${apiBaseUrl}/movie/top_rated?language=en-US`;
const searchMovieEndpoint = `${apiBaseUrl}/search/movie`;

// dinamyEndpoint

const movieDetailsEndpoint = movieId => `${apiBaseUrl}/movie/${movieId}?language=en-US&append_to_response=videos`;




export const image500 = path=>path? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path=>path? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path=>path? `https://image.tmdb.org/t/p/w185${path}` : null;
export const video = path=>path? '../assets/staticvideo.wav' : null;

const apiCall = async(endpoint, params)=>{
   
const options = {
  method: 'GET',
  url: endpoint,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  },
  params: params || {}
};

return axios
  .request(options)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.error(error);
    return {};
  });
}

export const fetchTrendingMovies = () =>{
    return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = (params) =>{
    return apiCall(upcomingMoviesEndpoint,params);
}

export const fetchTopRatedgMovies = () =>{
    return apiCall(topRatedEndpoint);
}

export const fetchMoviesDetails = (movieId) =>{
  return apiCall(movieDetailsEndpoint(movieId));
}


export const searchMovies = params=>{
  return apiCall(searchMovieEndpoint, params)
}


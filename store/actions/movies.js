import axios from "axios";

export const GET_MOVIES = "GET_MOVIES";

export const getMovies = (genre_id) => {
  return function (dispatch) {
    return axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genre_id}&api_key=d38aa8716411ef7d8e9054b34a6678ac`
      )
      .then(({ data }) => {
        dispatch({
          type: GET_MOVIES,
          movies: data.results,
          genre_id: genre_id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

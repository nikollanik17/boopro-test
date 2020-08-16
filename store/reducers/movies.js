import { GET_MOVIES } from "../actions/movies";

const initialState = {
  movies: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      const elem = {
        key: action.genre_id,
        value: action.movies,
      };
      return {
        movies: [...state.movies, elem],
      };
    default:
      return state;
  }
};

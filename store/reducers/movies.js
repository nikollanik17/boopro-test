import { GET_MOVIES } from "../actions/movies";
import axios from "axios";

// const initialState = {
//   movies: [],
//   activeMovie: {},
// };

export default (state = [], action) => {
  switch (action.type) {
    case GET_MOVIES:
      return [...action.movies];
    default:
      return state;
  }
};

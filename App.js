import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Genres from "./components/Genres/Genres";
import Login from "./components/Login/Login";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import moviesReducer from "./store/reducers/movies";

// const rootReducet = combineReducers({
//   movies: moviesReducer,
// });

// const store = createStore(rootReducet);

export default function App() {
  const [valid, setValid] = useState(false);

  const loginValidationHandler = (param) => {
    setValid(param);
  };

  let content = <Login onLogin={loginValidationHandler} />;

  if (valid) {
    content = <Genres />;
  }

  return (
    // <Provider store={store}>
    <SafeAreaView style={styles.screen}>{content}</SafeAreaView>
    // </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Genres from "./components/Genres/Genres";
import Login from "./components/Login/Login";

export default function App() {
  const [valid, setValid] = useState(false);

  const loginValidationHandler = (param) => {
    setValid(param);
  };

  let content = <Login onLogin={loginValidationHandler} />;

  if (valid) {
    content = <Genres />;
  }

  return <SafeAreaView style={styles.screen}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

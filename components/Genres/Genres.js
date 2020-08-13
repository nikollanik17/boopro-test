import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Genre from "./Genre/Genre";
import genresData from "./genres.json";

const Genres = (props) => {
  const [state, setState] = useState({
    activeMovie: {},
  });

  const getActiveMovie = (param) => {
    setState((prevState) => {
      return {
        ...prevState,
        activeMovie: param,
      };
    });
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.sv}>
        {genresData.map((genre) => (
          <View key={genre.id}>
            <Genre
              genre={genre.name}
              id={genre.id}
              onMovieClick={getActiveMovie}
              activeMovie={state.activeMovie}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
    width: "100%",
  },
  sv: {
    flex: 1,
    width: "100%",
  },
});

export default Genres;

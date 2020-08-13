import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";

const Genre = (props) => {
  const [state, setState] = useState({
    movies: [],
  });

  //za modal
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${props.id}&api_key=d38aa8716411ef7d8e9054b34a6678ac`
      )
      .then(({ data }) => {
        const updatedMovies = data.results.slice(0, 5);
        //stavljamo custom id za svaki film da bi svaki imao razliciti id, da se ne bi desilo da u 2 zanra isti film bude aktivan
        updatedMovies.forEach((el) => {
          el.id = props.id + "-" + el.id;
        });
        setState((prevState) => {
          return {
            ...prevState,
            movies: updatedMovies,
          };
        });
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.genreTitle}>{props.genre}</Text>
      {state.movies.map((movie) => (
        <View style={styles.movie} key={movie.id}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              props.onMovieClick(movie);
              setIsActive(true);
            }}
          >
            <View
              style={
                props.activeMovie.id === movie.id ? styles.imageContainer : ""
              }
            >
              <Image
                source={{
                  uri: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
          {props.activeMovie.id === movie.id ? (
            <View style={styles.movieDetails}>
              <Text style={styles.title}>{movie.original_title}</Text>
            </View>
          ) : null}
        </View>
      ))}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isActive ? true : false}
      >
        <View style={styles.popup}>
          <ScrollView>
            <Image
              source={{
                uri: `http://image.tmdb.org/t/p/w500/${props.activeMovie.poster_path}`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.popupDetails}>
              <Text style={styles.popupTitle}>
                {props.activeMovie.original_title}
              </Text>
              <Text style={styles.popupOverview}>
                {props.activeMovie.overview}
              </Text>
              <View style={styles.popupVote}>
                <Ionicons name="ios-star" size={20} />
                <Text style={styles.popupVoteText}>
                  {props.activeMovie.vote_average}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  color={"#333"}
                  title="Close"
                  onPress={() => setIsActive(false)}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingHorizontal: 50,
  },
  movie: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    padding: 20,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  imageContainer: {
    borderColor: "red",
    borderWidth: 3,
  },
  genreTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  popupDetails: {
    paddingHorizontal: 15,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 5,
  },
  popupVote: {
    marginVertical: 10,
    flexDirection: "row",
  },
  popupVoteText: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
});

export default Genre;

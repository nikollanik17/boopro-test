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
  BackHandler,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import * as moviesActions from "../../../store/actions/movies";

const Genre = (props) => {
  const movies = useSelector((state) => state.movies.movies);

  //za modal
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    //redux
    dispatch(moviesActions.getMovies(props.id));
  }, []);

  const movies_genre_id = movies.filter((movie) => movie.key === props.id);

  let mvs = null;

  if (movies_genre_id.length !== 0) {
    mvs = movies_genre_id[0].value.slice(0, 5);
    //stavljamo custom id za svaki film da se ne bi desilo da neki film u isto vreme bude aktivan u dva razlicita zanra
    mvs.forEach((element) => {
      element.id = props.id + "-" + element.id;
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.genreTitle}>{props.genre}</Text>
      <ScrollView horizontal={true}>
        {mvs
          ? mvs.map((movie) => (
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
                      props.activeMovie.id === movie.id
                        ? styles.imageContainer
                        : ""
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
            ))
          : null}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isActive ? true : false}
        onRequestClose={() => {
          setIsActive(false);
        }}
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
    // paddingHorizontal: 50,
  },
  movie: {
    flex: 1,
    width: Dimensions.get("window").width - 60,
    height: Dimensions.get("window").height / 1.5,
    marginHorizontal: 30,
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
    height: Dimensions.get("window").height / 1.7,
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

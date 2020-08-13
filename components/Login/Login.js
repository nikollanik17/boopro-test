import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";

import axios from "axios";

const Login = (props) => {
  const [state, setState] = useState({
    error: {
      status: false,
      validEmail: false,
      message: "",
    },
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (inputText) => {
    setEmail(inputText);
  };

  const onChangePassword = (inputText) => {
    setPassword(inputText);
  };

  const onSubmit = () => {
    axios
      .post("http://dev.api.kabox.io/api/auth/login", {
        email: email,
        password: password,
      })
      .then(({ data }) => {
        props.onLogin(true);
      })
      .catch((error) => {
        let validEmail = false;
        if (error.response.status === 401) {
          validEmail = true;
        }
        setState((prevState) => {
          return {
            ...prevState,
            error: {
              status: true,
              validEmail: validEmail,
              message: error.message,
            },
          };
        });
      });
  };

  let error;
  if (state.error.status) {
    error = (
      <View style={styles.error}>
        {state.error.validEmail ? (
          <Text>Wrong password!</Text>
        ) : (
          <Text>Wrong email!</Text>
        )}
        <Text>{state.error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Login</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={onChangePassword}
                value={password}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Submit"
                color="#333"
                onPress={() => {
                  onSubmit();
                }}
              />
            </View>
            {error}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 70,
    paddingHorizontal: 20,
    height: "100%",
  },
  headingContainer: {
    marginBottom: 35,
  },
  heading: {
    color: "#333",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 16,
    color: "#333",
    fontWeight: "700",
  },
  input: {
    fontSize: 16,
    fontWeight: "300",
    padding: 10,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 40,
    elevation: 6,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  buttonContainer: {
    width: "30%",
  },
  error: {
    backgroundColor: "red",
    padding: 15,
    marginTop: 12,
  },
});

export default Login;

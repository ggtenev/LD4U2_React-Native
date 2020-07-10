import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import Colors from "../../constants/colors";

import * as authActions from "../../store/actions/auth";

import {
  View,
  Image,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
} from "react-native";


export default function AuthScreen({ navigation }) {
  const [loginMode, setLoginMode] = useState(true);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

 
  //Sign in method
  const signIn = async () => {
    setIsLoading(true);
    try {
      await dispatch(authActions.signIn(email, password));
      navigation.navigate("Onboarding");

    } catch (err) {
      setError(err.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  //Sign up method
  const signUp = async () => {
    setIsLoading(true);
    if(!firstName && !lastName) {
      setError('Fill in all fields')
      setIsLoading(false)
      return
    }
    try {
      await dispatch(authActions.signup(email, password));
      setEmail("");
      setPassword("");
      navigation.navigate("Onboarding");
    } catch (err) {
      setError(err.message);
      console.log(err);
      setIsLoading(false);
    }
  };

  //Loading spinner while sending request to the server
  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  //Returning sign in / sign up conditionally based on user's choice
  return loginMode ? (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
      keyboardVerticalOffset={44}
    >
      <View style={styles.inputs}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ height: 90, width: 90 }}
            source={require("../../assets/rec-logo-11.png")}
          />
        </View>
        <View>
          {/*Email input field */}
          <TextInput
            style={styles.inputFiled}
            placeholder='Email'
            keyboardType='email-address'
            required
            autoCapitalize='none'
            errorText='Please enter a valid email'
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View>
          {/* Password input field */}
          <TextInput
            style={styles.inputFiled}
            placeholder='Password'
            secureTextEntry
            autoCapitalize='none'
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
         {/* Display error message if the user has not provided info in the input fields */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={{ marginTop: 5, borderRadius: 15, overflow: "hidden" }}>
            <Button
              title='Log In'
              color='#7cc930'
              email
              autoCapitalize='none'
              required
              onPress={signIn}
            />
          </View>
          <View style={{ alignItems: "center", marginTop: 5 }}>
            <Text style={{ color: "grey" }}>No account yet?</Text>
          </View>
          <View style={{ marginTop: 5, borderRadius: 15, overflow: "hidden" }}>
            <Button
              title='Sign Up'
              color='#7b51f7'
              password
              required
              onPress={() => setLoginMode(false)}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  ) : (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
      keyboardVerticalOffset={0}
    >
      <View style={styles.inputs}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ height: 90, width: 90 }}
            source={require("../../assets/rec-logo-11.png")}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputFiled}
            placeholder='First Name'
            keyboardType='email-address'
            required
            autoCapitalize='none'
            errorText='Please enter a valid email'
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
          />
          <TextInput
            style={styles.inputFiled}
            placeholder='Last Name'
            keyboardType='email-address'
            required
            autoCapitalize='none'
            errorText='Please enter a valid email'
            onChangeText={(text) => setLastName(text)}
            value={lastName}
          />
          <TextInput
            style={styles.inputFiled}
            placeholder='Email'
            keyboardType='email-address'
            required
            autoCapitalize='none'
            errorText='Please enter a valid email'
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View>
          {/* <Text>Password</Text> */}
          <TextInput
            style={styles.inputFiled}
            placeholder='Password'
            secureTextEntry
            autoCapitalize='none'
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={{ marginTop: 5, borderRadius: 15, overflow: "hidden" }}>
            <Button
              title='Sign Up'
              color='#7b51f7'
              password
              required
              onPress={signUp}
            />
          </View>
          <View style={{ alignItems: "center", marginTop: 3 }}>
            <Text style={{ color: "grey" }}>Already have an account?</Text>
          </View>
          <View style={{ marginTop: 5, borderRadius: 15, overflow: "hidden" }}>
            <Button
              title='Log In'
              color='#7cc930'
              email
              autoCapitalize='none'
              required
              onPress={() => setLoginMode(true) }
            />
          </View>
        </View>
      </View>
      {/* </LinearGradient> */}
    </KeyboardAvoidingView>
  );
}

//STYLES
const styles = StyleSheet.create({
  gradient: {
    // flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    width: "82%",
    marginTop: "30%",
    padding: 25,
    marginVertical:'10%'
  },
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputFiled: {
    borderBottomWidth: 0.7,
    borderBottomColor: "grey",
    marginVertical: 15,
  },
  buttons: {},
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
  },
});

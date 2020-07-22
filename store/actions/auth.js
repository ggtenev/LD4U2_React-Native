//REDUX ACTIONS FOR THE AUTHENTICATION FLOW

import { AsyncStorage } from "react-native";

//ACTION CONSTANTS
export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const LOGOUT = "LOGOUT";

export const signup = (email, password) => {
  
  //ASYNC DATABASE COMMUNICATION
  return async (dispatch) => {

    //SAVING THE RESPONSE FROM THE DB IN A VARIABLE
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAMIY5-p6uJit99Mk-W3uARj2aSRliMucw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    //CHECKING IF THERE IS AN ERROR
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const resData = await response.json();

    //IF ALL IS GOOD THE ACTION IS DISPATCHED TO THE REDUCER
    dispatch({
      type: SIGN_UP,
      token: resData.idToken,
      userId: resData.localId,
    });
  };
};

//SIGN IN ACTION
export const signIn = (email, password) => {
  return async (dispatch) => {

    //SAVING THE RESPONSE FROM THE DB IN A VARIABLE
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAMIY5-p6uJit99Mk-W3uARj2aSRliMucw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    //Checking for errors in the response and customizing the error message sent to the user
    if (!response.ok) {
      const errorData = await response.json();
      let errorId = errorData.error.message;
      let message = "";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "Incorrect email address";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Incorrect password";
      }
      throw new Error(message);
    }
    const resData = await response.json();

     //IF ALL IS GOOD THE ACTION IS DISPATCHED TO THE REDUCER
    dispatch({
      type: SIGN_IN,
      token: resData.idToken,
      userId: resData.localId,
    });
  };
};

//LOGOUT ACTION
export const logOut = () => {
  return { type: LOGOUT };
};

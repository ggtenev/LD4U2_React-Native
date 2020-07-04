import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Onboarding from "./screens/Onboarding";
import Maps from "./screens/Maps";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import Navigator from './Navigation'

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";

const rootReducer = combineReducers({
  products: productsReducer,
  cart:cartReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

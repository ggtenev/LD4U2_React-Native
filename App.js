import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import Navigator from './Navigation'

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from './store/reducers/orders'

const rootReducer = combineReducers({
  products: productsReducer,
  cart:cartReducer,
  orders:orderReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
}



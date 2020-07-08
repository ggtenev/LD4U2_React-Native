import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import Navigator from './Navigation'

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from './store/reducers/orders'

import reduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
  products: productsReducer,
  cart:cartReducer,
  orders:orderReducer
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
}



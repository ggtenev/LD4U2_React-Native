import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import Navigator from "./Navigation";

//Importing reducers and middleware
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
import reduxThunk from "redux-thunk";

//Combining reducers 
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  auth: authReducer,
});

//Main Redux Store with THUNK middleware
const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default function App() {
  return (
    //Connecting the app to the Redux Store
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

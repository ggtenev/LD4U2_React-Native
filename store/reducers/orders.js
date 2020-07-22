//ORDERS REDUCER

import { ADD_ORDER, SET_ORDERS } from "../actions/orders";
import Order from "../../model/order";

//Initial state
const initState = {
  orders: [],
  userOrders: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    //FILTERING ORDERS
    case SET_ORDERS:
      return {
        orders: action.orders,
        userOrders: state.orders.filter((order) => order.user === "u1"),
      };
      //ADDING ORDER
    case ADD_ORDER:
      const newOrder = new Order(
        "u1",
        action.orderData.id,
        action.orderData.items,
        action.orderData.totalAmount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }

  return state;
};

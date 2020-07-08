export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";
import Order from "../../model/order";

export const fetchOrders = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://ld4u-860ba.firebaseio.com/orders.json"
    );

    const resData = await response.json();
    console.log("action");
    const loadedOrders = [];
    for (let key in resData) {
      loadedOrders.push(
        new Order(
          key,
          "u1",
          resData[key].cartItems,
          resData[key].totalAmount,
          resData[key].date
        )
      );
    }
    console.log(loadedOrders);
    dispatch({ type: SET_ORDERS, orders: loadedOrders });
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    //async code DB communication
    try {
      const response = await fetch(
        "https://ld4u-860ba.firebaseio.com/orders.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            totalAmount,
          }),
        }
      );

      if(!response.ok){
        throw new Error('Something went wrong')
      }

      const resData = await response.json();
      dispatch({
        type: ADD_ORDER,
        orderData: { items: cartItems, totalAmount, id: resData.name },
      });
    } catch(err){
      console.log(err)
    }
  };
};

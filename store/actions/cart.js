//ACTION CONSTANTS
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

//ADD TO CART ACTION SENT TO THE REDUCER
export const addToCart = (product) => {
  return { type: ADD_TO_CART, product: product };
};

//REMOVE FROM CART ACTION
export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    id,
  };
};

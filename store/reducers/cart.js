import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../model/cart-item";
import { ADD_ORDER } from "../actions/orders";

const initState = {
  items: {},
  totalAmount: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      if (state.items[addedProduct.id]) {

        //already have item in the cart so just increase the Qty
        const updatedItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedItem },
          totalAmount: state.totalAmount + productPrice,
        };
      } else {

        //New item
        const newCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + productPrice,
        };
      }
    case REMOVE_FROM_CART:
      const pid = action.id;
      const currentQty = state.items[pid].quantity;
      if (currentQty > 1) {

        //need to reduce QTY
        const updatedCartItem = new CartItem(
          state.items[pid].quantity - 1,
          state.items[pid].productPrice,
          state.items[pid].productTitle,
          state.items[pid].sum - state.items[pid].productPrice
        );
        const updatedItems = { ...state.items, [pid]: updatedCartItem };
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - state.items[pid].productPrice,
        };
      } else {

        //DELETE ITEM
        const updatedItems = { ...state.items };
        delete updatedItems[pid];
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - state.items[pid].productPrice,
        };
      }
    case ADD_ORDER:
      return initState;
  }
  return state;
};

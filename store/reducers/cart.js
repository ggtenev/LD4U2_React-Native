import { ADD_TO_CART} from '../actions/cart'
import CartItem from '../../model/cart-item' 

const initState = {
  items:{},
  totalAmount:0
}

export default (state = initState, action) => {
  switch(action.type){
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price
      const productTitle = addedProduct.title

      if(state.items[addedProduct.id]){
        //already have item in the cart
        const updatedItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
        return {
          ...state,
          items: {...state.items, [addedProduct.id]:updatedItem},
          totalAmount:state.totalAmount + productPrice
        }
      } else{
        const newCartItem = new CartItem(1,productPrice, productTitle,productPrice)
        return {
          ...state,
          items:{...state.items, [addedProduct.id]:newCartItem},
          totalAmount:state.totalAmount + productPrice
        }
      }
  }
  return state
}
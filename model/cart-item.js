//Defining thе structure of a cart item

class CartItem{
  constructor(quantity, productPrice,productTitle, sum){
    this.quantity = quantity
    this.productPrice = productPrice
    this.productTitle = productTitle
    this.sum = sum
  }
}

export default CartItem
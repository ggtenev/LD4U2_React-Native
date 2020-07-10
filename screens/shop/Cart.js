import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/colors";
import CartItem from '../../components/CartItem'
import * as actions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders'

export default function Cart({navigation}) {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => {
    const arrayItems = [];
    for (let key in state.cart.items) {
      arrayItems.push({
        id: key,
        title: state.cart.items[key].productTitle,
        price: state.cart.items[key].productPrice,
        sum: state.cart.items[key].sum,
        quantity: state.cart.items[key].quantity,
      });
    }
    return arrayItems.sort((a,b) => a.id > b.id ? 1 : -1)
  });
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>YOUR ITEMS</Text>
        <FlatList 
      data={cartItems}
      renderItem={({item}) => <CartItem 
      deletable={true}
      price={item.price} 
      quantity={item.quantity} 
      title={item.title}
      deleteItem = {() => dispatch(actions.removeFromCart(item.id))}
       />}
      />
      </View>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>£ {Math.abs(cartTotalAmount.toFixed(2))}</Text>
        </Text>
        <Button onPress={() => {
          
          navigation.navigate('Checkout',{makeOrder:() => dispatch(orderActions.addOrder(cartItems,cartTotalAmount))})}}
          title='Check Out' color='orange' disabled={cartItems.length == 0 ? true:false}
          
           />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 15,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 5,
  },
  summaryText: {
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,

    fontSize: 20,
    marginLeft: 5,
  },
  title:{
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 20,
  }
});

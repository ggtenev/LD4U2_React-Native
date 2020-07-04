import React, {useState , useEffect} from "react";
import { View, FlatList, Text, StyleSheet,TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../components/Product";
import { Ionicons } from '@expo/vector-icons';

import * as cartActions from '../../store/actions/cart'

export default function ProductsOverview({navigation}) {
  const [cartNum, setCartNum] = useState(0)
  const products = useSelector((state) => state.products.availableProducts);
  const cartItems = useSelector(state => state.cart.items)
  const dispatch = useDispatch()

  useEffect(() => {
    let numCart = 0;
    for(let key in cartItems){
     numCart += cartItems[key].quantity
    }
    setCartNum(numCart)
    navigation.setParams({cartItems:numCart});
  },[cartItems])

  return (
    <View >
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product
            title={item.title}
            img={item.imageUrl}
            price={item.price}
            description={item.description}
            addToCart ={() => dispatch(cartActions.addToCart(item))}
          />
        )}
      />
    </View>
  );
}

ProductsOverview.navigationOptions = ({navigation}) => {
  const cartItems = navigation.getParam('cartItems')
  return {
    title:'Products',
    headerRight:() => (
      <TouchableOpacity
        style={styles.basket}
        onPress={() => navigation.navigate("Cart")}
      >
        <Ionicons
          name='md-cart'
          size={32}
          color={Platform.OS === "android" ? "white" : "#888"}
        />
      <View style={styles.num}>
          <Text style={styles.nums}>{cartItems}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  items: {
    alignItems: "center",
  },
  basket:{
    marginRight: 12,
    flexDirection:'row',
  },
  nums: {
    fontSize: 16,
    color:'white',
    fontWeight:'800'
  },
  num: {
    position:'relative',
    right:6,
    padding:5,
    width:25,
    height:25,
    backgroundColor:'orange',
    borderRadius:15,
    marginTop: 9,
    alignItems:'center',
    justifyContent:'center'
  },
});

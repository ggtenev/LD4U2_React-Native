import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import {useSelector} from 'react-redux'

import Shop from "../components/Shop";

import shop1 from "../assets/banners/food1.jpg";
import shop2 from "../assets/banners/food2.jpg";
import shop3 from "../assets/banners/food3.jpg";

let screenHeight = Dimensions.get("window").height;

export default function Maps({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cartNum, setCartNum] = useState(0)
  
  const cartItems = useSelector(state => state.cart.items)
  // useEffect(() => {
  //   setCartItems(useSelector(state => Object.keys(state.cart.items).length)) 
  //   navigation.setParams({cartItems})
  // },[cartItems])

  useEffect(() => {
  
    let numCart = 0;
    for(let key in cartItems){
     numCart += cartItems[key].quantity
    }
    setCartNum(numCart)
    navigation.setParams({cartItems:numCart});

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [cartItems]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  if (!location)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' />
      </View>
    );
  return (

    <View>
      <View style={styles.searchBar}>
        <Ionicons
          name='md-search'
          size={24}
          color='black'
          style={{ marginLeft: 20 }}
        />
        <TextInput
          placeholder='Search'
          style={{ marginLeft: 20, width: "80%" }}
        />
      </View>

      <MapView
        style={styles.mapStyle}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
      </MapView>
      <View style={styles.shops}>
        <ScrollView horizontal={true}>
          <View style={styles.shop}>
            <Shop img={shop1} title='Tesco' navigation={navigation} />
          </View>
          <View style={styles.shop}>
            <Shop img={shop2} title='ASDA' navigation={navigation} />
          </View>
          <View style={styles.shop}>
            <Shop
              img={shop3}
              title="Sainsbury's"
              navigation={navigation}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

Maps.navigationOptions = ({ navigation }) => {
  const cartItems = navigation.getParam('cartItems')
  return {
    headerRight: () => (
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
    ),
    headerLeft:() => (
      <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.toggleDrawer()}>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          size={32}
          color={Platform.OS === "android" ? "white" : "#888"}
        />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  mapStyle: {
    width: "100%",
    height: screenHeight * 0.4,
  },
  shops:{
    height:screenHeight * 0.6,
  },
  shop: {
    width: Dimensions.get("window").width - 20,
    height:screenHeight * 0.5,
    padding: 5,
  },
  searchBar: {
    alignItems: "center",
    // marginTop:26,
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  basket:{
    marginRight: 10,
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
  menuBtn:{
    marginLeft:15
  }
});

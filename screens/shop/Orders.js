import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import OrderItem from '../../components/OrderItem'


import { Ionicons } from "@expo/vector-icons";

export default function Order() {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => {
        return <OrderItem total={item.totalAmount} item={item} date={item.readableDate}/>;
      }}
    />
  );
}

Order.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <TouchableOpacity
        style={styles.menuBtn}
        onPress={() => navigation.toggleDrawer()}
      >
        <Ionicons
          name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          size={32}
          color={Platform.OS === "android" ? "white" : "#888"}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  menuBtn:{
    marginLeft:15
  }
});

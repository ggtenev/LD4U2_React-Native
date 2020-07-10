import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/OrderItem";
import * as actions from "../../store/actions/orders";

import { Ionicons } from "@expo/vector-icons";

export default function Order() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);

    // Fetching orders from DB
    try {
      dispatch(actions.fetchOrders()).then(() => setIsLoading(false));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const orders = useSelector((state) => state.orders.orders);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An error occured</Text>
      </View>
    );
  }

  //Returns a loading component if the orders are not fetched
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  //Checking of any orders have been fetched from the server
  if (!isLoading && orders.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No orders</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={orders}
      keyExtractor={() => Math.random().toString()}
      renderItem={({ item }) => {
        return (
          <OrderItem
            total={item.totalAmount}
            item={item}
            date={item.readableDate}
          />
        );
      }}
    />
  );
}

//Header options
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
  menuBtn: {
    marginLeft: 15,
  },
});

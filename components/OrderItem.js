//ORDER COMPONENT THAT WILL BE SHOWN IN THE "ORDERS" SCREEN

import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import CartItem from "./CartItem";
import Colors from "../constants/colors";

export default function OrderItem({ total, date, item, quantity, title }) {
  
  //COMPONENT STATE FOR DISPLAYING/HIDING THE ORDER DETAILS
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.summary}>
        <Text style={styles.amount}>Total : ${total.toFixed(2)}</Text>
      </View>

      {/* HIDE or SHOW conditinal rendering of content */}
      <Button
        title={showDetails ? "Hide Details" : "Show details"}
        color={Colors.primary}
        onPress={() => setShowDetails((prev) => !prev)}
      />
      {showDetails && (
        <View>
          {item.items.map((i) => (
            <CartItem
              key={Math.random()}
              quantity={i.quantity}
              total={i.sum}
              price={i.price}
              title={i.title}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: 5,
    marginBottom: 10,
  },
  amount: {},
  date: {
    fontSize: 32,
    textAlign: "center",
  },
});

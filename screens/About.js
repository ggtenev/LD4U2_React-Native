// ABOUT SCREEN FROM THE DRAWER NAVIGATION

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function About() {
  return (
    <View style={styles.container}>
      <Image style={{width:80, height:80, marginVertical:30}} source={require("../assets/rec-logo-11.png")} />
      <Text style={{textAlign:'center', fontSize:18, fontWeight:'800', marginHorizontal:8}}>
        The objective of the app is to allow users to be able to order items of
        necessities from their local corner stores and have it delivered to
        their home. This will include an additional service where the corner
        stores dispose of customers recyclable items for a monthly subscription
        service.
      </Text>
    </View>
  );
}

//NAVIGATION OPTIONS
About.navigationOptions = ({ navigation }) => {
  return {
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
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems:'center'
  },
  menuBtn: {
    marginLeft: 15,
  },
});

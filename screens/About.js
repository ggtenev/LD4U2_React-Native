import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function About() {
  return (
    <View style={styles.container}>
      <Text>About</Text>
     </View>
  );
}

About.navigationOptions = ({navigation}) => {
  return {
    headerLeft:() => (
      <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.toggleDrawer()}>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          size={32}
          color={Platform.OS === "android" ? "white" : "#888"}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  menuBtn:{
    marginLeft:15
  }
})


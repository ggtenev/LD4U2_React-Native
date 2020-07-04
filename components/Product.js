import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

export default function Product({img, title, description ,price, addToCart}) {

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri:img}}/>
      <Text style={styles.title}>{title}</Text>
      {/* <Text>{description}</Text> */}
      <Text style={{textAlign:'center', fontWeight:'700', fontSize:18, marginVertical:8}}>£{price.toFixed(2)}</Text>
      <View>
        <Button title='Add to Cart' color='green' onPress={addToCart}/>
      </View>
     </View>
  );
}

const styles = StyleSheet.create({
  container:{
    elevation:5,
    width:'95%',
    height:290,
    shadowColor:'black',
    shadowOpacity:0.3,
    shadowOffset:{width:1,height:5}, 
    shadowRadius:4,
    padding:15,
    marginVertical:7,
    marginHorizontal:8,
    borderRadius:10,
  }, 
  title:{
    textAlign:'center',
    fontSize:24,
    fontWeight:'800'
  },
  image:{
    width:'100%',
    height:'60%'
  }
})

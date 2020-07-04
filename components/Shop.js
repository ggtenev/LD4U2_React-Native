import React from 'react';
import { View,Image, StyleSheet,Button, Text, TouchableOpacity } from 'react-native';

export default function Shop({img, title, description, navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductsOverview')}>
      <Image style={styles.img} source={(img)} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.para}>Decription for store one Decription for store one</Text>
      <Button title='Visit Store' color='green' onPress={() => navigation.navigate('ProductsOverview')}/>
      </TouchableOpacity>
     </View>
  );
}

const styles = StyleSheet.create({
  container:{
   textAlign:'center',
    
  },
  img:{
    width:'99%',
    maxHeight:120
    
  },
  title:{
    fontWeight:'800',
    fontSize:24,
    textAlign:'center'
  },
  para:{
    textAlign:'center',
    marginVertical:1
  }
})
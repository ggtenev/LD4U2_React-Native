import React, { Component } from "react";
import { StyleSheet, View, Switch, Button, Text } from "react-native";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";
import {useSelector, useDispatch} from 'react-redux'

export default class Checkout extends Component {
  state = { useLiteCreditCardInput: false, sw:false };
  

  toggleSwitch = () => this.setState({sw:!this.state.sw});

  // _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
  // _onFocus = (field) => console.log("focusing", field);
  _setUseLiteCreditCardInput = (useLiteCreditCardInput) =>
    this.setState({ useLiteCreditCardInput });

  render() {
    return (
      <View style={s.container}>
        <Text style={{textAlign:'center',marginBottom:15,fontSize:22, fontWeight:'700'}}>Payment Details</Text>
        {/* <Switch
          style={s.switch}
          onValueChange={this._setUseLiteCreditCardInput}
          value={this.state.useLiteCreditCardInput} /> */}

        {this.state.useLiteCreditCardInput ? (
          <LiteCreditCardInput
            // autoFocus
            inputStyle={s.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}

            // onFocus={this._onFocus}
            // onChange={this._onChange}
          />
        ) : (
          <CreditCardInput
            allowScroll
            // autoFocus
            style={s.t}
            requiresName
            requiresCVC
            requiresPostalCode
            // labelStyle={s.label}
            // inputStyle={s.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}

            // onFocus={this._onFocus}
            // onChange={this._onChange}
          />
        )}
        <View style={s.subscription}>
        <Switch 
        // style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
        onValueChange={this.toggleSwitch}
        value={this.state.sw}
        thumbColor={this.state.sw ? "green" : "#f4f3f4"}
        trackColor={{ false: "#767577", true: "#05b41f" }}
        style={s.switch}/>
        <Text style={s.subMessage}>Subscribe to out monthly plan of £4.99</Text>
        </View>
        
        <View style={s.btn}>
          <Button title='Finalize Order' color='green' onPress={() => this.props.navigation.navigate('Confirmation')}/>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  btn:{
   
  width:'88%',
  // height:466,
   marginTop:10,
   marginLeft:'6%',
  //  justifyContent:'center', 
  //  alignItems:'center',
   borderRadius:22,
   overflow:'hidden'
  },
  t: {
    flex: 1,
    flexDirection: "column",
  },
  subMessage:{
    fontWeight:'700',
    fontSize:14
  },
  switch: {
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
    alignSelf: "flex-start",
   marginVertical:22,
   marginRight:10,
   fontSize:16
  },
  subscription:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  container: {
    // flex: 1,
    // flexDirection: "column",
    backgroundColor: "#F5F5F5",
    marginTop: 40,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});

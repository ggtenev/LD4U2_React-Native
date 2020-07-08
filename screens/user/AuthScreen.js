import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import Colors from '../../constants/colors'

import * as authActions from '../../store/actions/auth'

import { View, KeyboardAvoidingView,Alert, ActivityIndicator, Button, StyleSheet, ScrollView, TextInput, Text } from 'react-native';
// import { useScreens } from 'react-native-screens';

export default function AuthScreen({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  // useEffect(()=>{
  //   if(error){
  //     Alert.alert('Error has eccured','Something went wrong',[{text:'OK'}])
  //   }
  // },[error])

  const signIn  = async () => {
    setIsLoading(true)
    try{
      await dispatch(authActions.signIn(email, password))
      navigation.navigate('Onboarding')
      
    // setIsLoading(false)
    // setEmail('')
    // setPassword('')
    } catch(err){
      setError('Something went wrong')
      console.log(err)
    }
    // setError(false)
    setIsLoading(false)
  }

  const signUp = async () => {
    setIsLoading(true)
    try{
      await dispatch(authActions.signup(email, password))
      
    setEmail('')
    setPassword('')
      navigation.navigate('Onboarding')
    } catch(err){
      setError(err.message)
      console.log(err)
    }
    // setError(false)
    setIsLoading(false)
    
  }

  if(isLoading){
    return (<View style={styles.activityIndicator}>
      <ActivityIndicator size='large'/>
    </View>)
  }
  return (
    <KeyboardAvoidingView style={styles.screen} behavior='padding'
      keyboardVerticalOffset={122}>
      {/* <LinearGradient colors={['blue','pink']}> */}
      <ScrollView style={styles.inputs}>
        <View>
        <Text style={{textAlign:'center', fontSize:18, color:'green'}}>Welcome</Text>
        </View>
        <View>
          {/* <Text>Email</Text> */}
          <TextInput style={styles.inputFiled}
            placeholder='Email'
            keyboardType='email-address'
            required
            autoCapitalize='none'
            errorText='Please enter a valid email'
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>
        <View>
          {/* <Text>Password</Text> */}
          <TextInput style={styles.inputFiled}
            placeholder='Password'
            secureTextEntry
            autoCapitalize='none'
            onChangeText={text => setPassword(text)}
            value={password} />
        </View>
        
          <View style={{alignItems:'center'}}><Text style={{color:'red'}}>{error}</Text></View>
        
        <View style={styles.buttons}>
          <View style={{ marginTop: 5, borderRadius: 15, overflow: 'hidden' }}>
            <Button title='Log In' color='#7cc930'
              email
              autoCapitalize='none'
              required
              onPress={signIn}
            />
          </View>
          <View style={{alignItems:'center',marginTop:5}}><Text style={{color:'grey'}}>No account yet?</Text></View>
          <View style={{ marginTop: 5, borderRadius: 15, overflow: 'hidden' }}>
            <Button title='Sign Up' color='#7b51f7' password required
              onPress={signUp}
              
            />
          </View>

        </View>
      </ScrollView>
      {/* </LinearGradient> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    // flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputs: {
    width: '82%',
    marginTop: '40%',
    padding: 25,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 1,
    borderRadius: 2,
    height: 300,
    // backgroundColor:'white'
  },
  screen: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'green'
  },
  inputFiled: {
    borderBottomWidth: 0.7,
    borderBottomColor: 'grey',
    marginVertical: 15
  },
  buttons: {

  },
  activityIndicator:{
    flex:1,
    justifyContent:'center',

  }
})
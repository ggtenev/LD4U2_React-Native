import React from 'react';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, SafeAreaView, Button, View } from 'react-native'

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import Colors from './constants/colors'
import ProductsOverview from './screens/shop/ProductsOverview'
import Maps from './screens/Maps'
import Onboarding from './screens/Onboarding'
import Cart from './screens/shop/Cart'
import Checkout from './screens/Checkout'
import Confirmation from './screens/Confirmation'
import About from './screens/About'
import Orders from './screens/shop/Orders'
import AuthScreen from './screens/user/AuthScreen'

import * as authActions from './store/actions/auth'
import {useDispatch} from 'react-redux'


const defNavOptions = {
  headerTitleAlign:'center',
  headerStyle:{
    backgroundColor:Colors.primary
  },
  headerTintColor:'white'
}

const ProductsNav = createStackNavigator({
  // Onboarding:{
  //   screen:SwitchNav,
  //   navigationOptions:{
  //     title:'',
  //     headerStyle:{
  //       height:-5
  //     }
  //   }
  // },
  Maps:{
    screen:Maps,
    navigationOptions:{
      title:'Pick your store',
      headerTintColor:'white',
      headerStyle:{
        // height:0
        backgroundColor:Colors.primary
      }
    }
  },
  Cart:Cart,
  ProductsOverview:ProductsOverview,
  Checkout:Checkout,
  
  
},{
  defaultNavigationOptions:defNavOptions
})

const SwitchNav = createSwitchNavigator({
  Auth:AuthScreen,
  Onboarding:Onboarding,
  Products:ProductsNav,
  Confirmation:Confirmation
},{
  defaultNavigationOptions:{
    title:'',
    headerTitleAlign: "center",
    headerStyle:{
      height:0
    }
  },
  navigationOptions:{
    drawerIcon:drawerConfig => <Ionicons 
    size={23} 
    name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
    color={drawerConfig.tintColor}
    />
  }
})

const OrdersNav = createStackNavigator({
  Orders:Orders,
}, {
  defaultNavigationOptions:defNavOptions,
  navigationOptions:{
    drawerIcon:drawerConfig => <Ionicons 
    size={23} 
    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
    color={drawerConfig.tintColor}
    />
  }
})

const AboutNav = createStackNavigator({
  About:About,
}, {
  defaultNavigationOptions:defNavOptions,
  navigationOptions:{
    drawerIcon:drawerConfig => <FontAwesome 
    size={23} 
    name='info-circle'
    color={drawerConfig.tintColor}
    />
  }
})

const ShopNavigator = createDrawerNavigator({
  
  Home:SwitchNav,
  Orders:OrdersNav,
  About:AboutNav
}, {
  contentOptions:{
    activeTinitColor:Colors.primary
  },
  contentComponent: props => {
    const dispatch = useDispatch()
    return <View style={{flex:1,paddingTop:20}}>
      <SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
        <DrawerItems {...props}/>
        <Button title='logout' color='orange' onPress={() => {
          dispatch(authActions.logOut())
          props.navigation.navigate('Auth')
        }}/>
      </SafeAreaView>
    </View>
  }
})

export default createAppContainer(ShopNavigator)
import React from 'react';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native'

import { Ionicons } from "@expo/vector-icons";

import Colors from './constants/colors'
import ProductsOverview from './screens/shop/ProductsOverview'
import Maps from './screens/Maps'
import Onboarding from './screens/Onboarding'
import Cart from './screens/shop/Cart'
import Checkout from './screens/Checkout'
import Confirmation from './screens/Confirmation'
import Orders from './screens/shop/Orders'

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

const ShopNavigator = createDrawerNavigator({
  Home:SwitchNav,
  Orders:OrdersNav
}, {
  contentOptions:{
    activeTinitColor:Colors.primary
  }
})

export default createAppContainer(ShopNavigator)
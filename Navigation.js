import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native'

import Colors from './constants/colors'
import ProductsOverview from './screens/shop/ProductsOverview'
import Maps from './screens/Maps'
import Onboarding from './screens/Onboarding'
import Cart from './screens/shop/Cart'
import Checkout from './screens/Checkout'
import Confirmation from './screens/Confirmation'



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
  defaultNavigationOptions:{
    headerTitleAlign:'center',
    headerStyle:{
      backgroundColor:Colors.primary
    },
    headerTintColor:'white'
  }
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
  }
})

export default createAppContainer(SwitchNav)
import React from "react";

//Importing navigation dependencies
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { Platform, SafeAreaView, Button, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

//Importing all screens
import Colors from "./constants/colors";
import ProductsOverview from "./screens/shop/ProductsOverview";
import Maps from "./screens/Maps";
import Onboarding from "./screens/Onboarding";
import Cart from "./screens/shop/Cart";
import Checkout from "./screens/Checkout";
import Confirmation from "./screens/Confirmation";
import About from "./screens/About";
import Orders from "./screens/shop/Orders";
import AuthScreen from "./screens/user/AuthScreen";

//Importing actions
import * as authActions from "./store/actions/auth";
import { useDispatch } from "react-redux";



// Basic header options to be used across all the screens
const defNavOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: Colors.primary,
    height:Platform.OS === 'android' ? 60 : 70
  },
  headerTintColor: "white",
};

//Main Stack navigator after the user has signed in
const ProductsNav = createStackNavigator(
  {
    Maps: {
      screen: Maps,
      navigationOptions: {
        title: "Pick your store",
        headerTintColor: "white",
        headerStyle: {
          height:Platform.OS === 'android' ? 60 : 90,
          backgroundColor: Colors.primary,
        },
      },
    },
    Cart: Cart,
    ProductsOverview: ProductsOverview,
    Checkout: Checkout,
  },
  {
    defaultNavigationOptions: defNavOptions,
  }
);

//Switch navigator for the authentication flow
const SwitchNav = createSwitchNavigator(
  {
    Auth: AuthScreen,
    Onboarding: Onboarding,
    Products: ProductsNav,
    Confirmation: Confirmation,
  },
  {
    defaultNavigationOptions: {
      title: "",
      headerTitleAlign: "center",
      headerStyle: {
        height: 0,
      },
    },
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          size={23}
          name={Platform.OS === "android" ? "md-home" : "ios-home"}
          color={drawerConfig.tintColor}
        />
      ),
    },
  }
);

// Orders nav screen
const OrdersNav = createStackNavigator(
  {
    Orders: Orders,
  },
  {
    defaultNavigationOptions: defNavOptions,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          size={23}
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          color={drawerConfig.tintColor}
        />
      ),
    },
  }
);

//About nav screen
const AboutNav = createStackNavigator(
  {
    About: About,
  },
  {
    defaultNavigationOptions: defNavOptions,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <FontAwesome
          size={23}
          name='info-circle'
          color={drawerConfig.tintColor}
        />
      ),
    },
  }
);

//Drawer navigation
const ShopNavigator = createDrawerNavigator(
  {
    Home: SwitchNav,
    Orders: OrdersNav,
    About: AboutNav,
  },
  {
    contentOptions: {
      activeTinitColor: Colors.primary,
    },
    //LOGOUT BUTTON
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title='logout'
              color='orange'
              onPress={() => {
                dispatch(authActions.logOut());
                props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

export default createAppContainer(ShopNavigator);

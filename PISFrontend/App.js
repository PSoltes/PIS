import React from "react";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { Root } from "native-base";
import LoginScreen from "./screens/LoginScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import MyBooksScreen from "./screens/MyBooksScreen.js";
import BookDetail from "./screens/BookDetail.js";
import AdminConfirmationScreen from "./screens/AdminConfirmationScreen.js";
import AdminListScreen from "./screens/AdminListScreen.js";
import AddReviewScreen from "./screens/AddReviewScreen.js";

const switchNav = createSwitchNavigator({
  
  AdminConfirmationScreen: AdminConfirmationScreen,
  AdminListScreen:AdminListScreen 
},
  {
    initialRouteName: "AdminListScreen"  
}
);

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    MyBooks:{
        screen:  MyBooksScreen,
      navigationOptions:
      {
        header: null
      }
    },
    BookDetail:{
      screen:  BookDetail,
      navigationOptions:
      {
        header: null
      }
    },
  
    AdminListScreen: {
      screen: switchNav,
      navigationOptions:
      {
        header: null
      }
    },
    AddReviewScreen :{
      screen: AddReviewScreen ,
      navigationOptions:
      {
        header: null
      }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}

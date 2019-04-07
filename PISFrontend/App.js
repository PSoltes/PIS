import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Root } from "native-base";
import LoginScreen from "./screens/LoginScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import MyBooksScreen from "./screens/MyBooksScreen.js";
import BookDetail from "./screens/BookDetail.js";
import AdminConfirmationScreen from "./screens/AdminConfirmationScreen.js";
import AdminListScreen from "./screens/AdminListScreen.js";
import AddRevieweScreen from "./screens/AddReviewScreen.js";

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    MyBooks: {
      screen: MyBooksScreen
    },
    BookDetail: {
      screen: BookDetail
    },
    AdminConfirmationScreen: {
      screen: AdminConfirmationScreen
    },
    AdminListScreen: {
      screen: AdminListScreen
    },
    AddRevieweScreen: {
      screen: AddRevieweScreen
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

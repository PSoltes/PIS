import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './screens/LoginScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import MyBooksScreen from './screens/MyBooksScreen';
import BookDetail from './screens/BookDetail';
import AdminConfirmationScreen from './screens/AdminConfirmationScreen';
import AdminListScreen from './screens/AdminListScreen';
import AddRevieweScreen from './screens/AddReviewScreen';




const AppNavigator = createStackNavigator(
  {
    Login:
    {
    screen: LoginScreen,
    navigationOptions:
    {
        header: null
    }
    },
    MyBooks:{
        screen:  MyBooksScreen,
    },
    BookDetail:{
      screen:  BookDetail,
    },
    AdminConfirmationScreen:{
      screen: AdminConfirmationScreen,
    },
    AdminListScreen:{
      screen: AdminListScreen,
    },
    AddRevieweScreen :{
      screen: AddRevieweScreen ,
    },
    Home:{
      screen: HomeScreen,
      navigationOptions:{
        header: null
      }
    },
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

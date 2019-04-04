import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './screens/LoginScreen.js'




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
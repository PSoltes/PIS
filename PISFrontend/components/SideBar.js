import React, { Component } from "react";
import { Text, Content, Button } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import getById from "../scripts/GetById.js";
import dearray from "../scripts/Dearray.js";
import update from "../scripts/Update.js";

export default class SideBar extends React.Component {
  
  async logOff() {
    try {
      const user_id = await AsyncStorage.getItem("id");
      if (user_id !== null) {
        let user = await getById(user_id, "user");
        console.log(user);
        user = dearray(user);
        user.api_token = null;
        const response = await update(user, user.id, "user");
        console.log(response);

      }
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.removeItem("id");
      await AsyncStorage.removeItem("api_token");
      console.log("navigujem na login");
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <Content style={{ backgroundColor: "#FFFFFF" }}>
        <Text>Drawer</Text>
        <Button transparent onPress={this.logOff}>
          <Text>Odhlasit sa</Text>
        </Button>
      </Content>
    );
  }
}

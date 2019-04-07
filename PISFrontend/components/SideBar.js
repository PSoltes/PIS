import React, { Component } from "react";
import { Text, Content, Button } from "native-base";
import { AsyncStorage } from "react-native";
import getById from "../scripts/GetById.js";
import dearray from "../scripts/Dearray.js";
import update from "../scripts/Update.js";

export default class SideBar extends React.Component {
  async logOff() {
    console.log("hlupost");
    getUser = async () => {
      console.log("lul");
      try {
        const value = await AsyncStorage.getItem("current_user");
        console.log(value);
        if (value !== null) {
          let user = await getById(value.id, "user");
          user = dearray(user);
          user.api_token = null;
          const response = await update(user, user.id, "user");
        }
      } catch (error) {
        console.log(error);
      }
    };
    /*
    removeUser = async () => {
      try {
        await AsyncStorage.removeItem("current_user");
        console.log("navigujem na login");
      } catch (error) {
        console.log(error);
      }
    };*/
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

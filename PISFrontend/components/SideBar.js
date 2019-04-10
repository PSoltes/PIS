import React, { Component } from "react";
import { Text, Content, Header, H3, List, ListItem } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import getById from "../scripts/GetById.js";
import dearray from "../scripts/Dearray.js";
import update from "../scripts/Update.js";

function AdminOrNot(props)
  {
      if(props.admin==true)
      {
        return (<ListItem
          button
          onPress={() => props.nav.navigate("AdminListScreen")}
        >
          <Text>Príspevky na potvrdenie</Text>
          </ListItem>);
      }
      else
      {
        return ( <ListItem
          button
          onPress={() => props.nav.navigate("Home")}
        >
          <Text>Moje Knihy</Text>
        </ListItem>);
      }
  }

export default class SideBar extends React.Component {
  async logOff() {
    try {
      const user_id = await AsyncStorage.getItem("id");
      if (user_id !== null) {
        getById(user_id, "user").then(
          function(user)
          {
            user = dearray(user);
            user.api_token = null;
            update(user, user.id, "user");
          },
          function(error)
          {
            console.log(error);
          }
        );
       
      }
    } catch (error) {
      console.log(error);
    }

    try {
      AsyncStorage.removeItem("id");
      AsyncStorage.removeItem("api_token");
      this.props.closeDrawer;
      this.props.navigation.navigate("Login")
    } catch (error) {
      console.log(error);
    }
  }

  
  render() {
    
    return (
      <Content style={{ backgroundColor: "#FFFFFF" }}>
        <Header
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#0FDDAF",
            height: 100,
            justifyContent: "flex-end",
            paddingVertical:"10%"
          }}
        >
          <H3>Ahoj</H3>
        </Header>
        <List>
          <AdminOrNot admin={this.props.admin} nav={this.props.navigation}/>         
          <ListItem button onPress={this.logOff.bind(this)}>
            <Text>Odhlásiť sa!</Text>
          </ListItem>
        </List>
      </Content>
    );
  }
}

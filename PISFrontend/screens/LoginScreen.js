import React from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  View,
  Label,
  H2,
  Button,
  H3,
  StyleProvider,
  Toast
} from "native-base";
import getByAttribute from "../scripts/GetByAttribute.js";
import update from "../scripts/Update.js";
import dearray from "../scripts/Dearray.js";
import AsyncStorage from '@react-native-community/async-storage';
const uuidv4 = require("uuid/v4");

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showToast: false
    };
  }

  async login(email, password) {
    const that = this;
    getByAttribute("email", email, "user").then(
      async function(user) {
        user = dearray(user[0]);
        if (user && user.is_blocked == "true") {
          Toast.show({
            text:
              "Účet používateľa je zablokovaný. Na mail bola zaslaná správa pre odblokovanie",
            buttonText: "OK",
            type: "danger"
          });
        } else if (user && user.password == password) {
          user.api_token = uuidv4();
          user.login_counter = 0;
          

          try {
            AsyncStorage.setItem("id", user.id);
            AsyncStorage.setItem("api_token", user.api_token);
          } catch (error) {
            console.log("posral sa async store " + error);
          }
          await update(user, user.id, "user");

          that.props.navigation.navigate("Home", {name: user.name});
        } else {
          if (user) {
            user.login_counter = parseInt(user.login_counter) + 1;
            if (user.login_counter >= 3) {
              user.is_blocked = true;
              //dorobit mail pre odblokovanie
            }
            update(user, user.id, "user");
          }
          Toast.show({
            text: "Nesprávne meno alebo heslo!",
            buttonText: "OK",
            duration: 3000,
            type: "danger"
          });
        }
      },
      function(err) {
        console.log(err);
      }
    );
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={{ backgroundColor: "transparent" }}>
          <Content
            padder
            contentContainerStyle={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: "100%",
                marginVertical: "5%",
                alignItems: "center"
              }}
            >
              <H2>Knižnica</H2>
              <H3 style={{ color: "#909090" }}>Prihlásenie</H3>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Item
                floatingLabel
                underline
                style={{
                  width: "90%"
                }}
              >
                <Label>Email</Label>
                <Input
                  name="email"
                  onChangeText={text => this.setState({ email: text })}
                  value={this.state.email}
                />
              </Item>
              <Item
                floatingLabel
                underline
                style={{
                  width: "90%"
                }}
              >
                <Label>Heslo</Label>
                <Input
                  secureTextEntry
                  name="password"
                  onChangeText={text => this.setState({ password: text })}
                  value={this.state.password}
                />
              </Item>
            </View>
            <Item>
              <Button
                block
                width="70%"
                onPress={this.login.bind(
                  this,
                  this.state.email,
                  this.state.password
                )}
              >
                <Text> Prihlásiť </Text>
              </Button>
            </Item>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

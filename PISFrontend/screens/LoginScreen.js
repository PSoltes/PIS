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
import { ActivityIndicator } from "react-native";
import getByAttribute from "../scripts/GetByAttribute.js";
import update from "../scripts/Update.js";
import dearray from "../scripts/Dearray.js";
import AsyncStorage from "@react-native-community/async-storage";
const uuidv4 = require("uuid/v4");
import Modal from "react-native-modal";
import sendEmail from "../scripts/Email.js"

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showToast: false,
      loggingIn: false,
      passwordRecovery: false,
      unblockUser: false,
      recoveryUnblockEmail: "",
      unblockToken: ""
    };
  }

  login(email, password) {
    if (!email || !password) {
      Toast.show({
        text: "Nezadané heslo alebo mail",
        buttonText: "OK",
        type: "danger"
      });

      return;
    }
    this.setState({
      loggingIn: true
    });
    getByAttribute("email", email, "user")
      .then(user => {
          user = dearray(user[0]);
          if (user && user.is_blocked == "true") {
            Toast.show({
              text:
                "Účet používateľa je zablokovaný. Na mail bola zaslaná správa pre odblokovanie",
              buttonText: "OK",
              type: "danger"
            });
            this.setState({ loggingIn: false });
          } else if (user && user.password == password) {
            user.api_token = uuidv4();
            user.login_counter = 0;

            try {
              AsyncStorage.setItem("id", user.id);
              AsyncStorage.setItem("api_token", user.api_token);
            } catch (error) {
              console.log("posral sa async store " + error);
              throw error;
            }
            update(user, user.id, "user")
              .then(result => {
                this.setState({
                  loggingIn: false,
                  email: "",
                  password: ""
                });
                if (user.is_admin == "true") {
                  this.props.navigation.navigate("AdminListScreen");
                } else {
                  this.setState({
                    email: "",
                    password: ""
                  });
                  this.props.navigation.navigate("Home");
                }
              })
              .catch(err => {
                throw err;
              });
          } else {
            if (user) {
              user.login_counter = parseInt(user.login_counter) + 1;
              if (user.login_counter >= 3) {
                user.is_blocked = true;
                user.block_token = uuidv4();
                console.warn(user.email);
                sendEmail(
                  user.email,
                  "Informačný systém Knižnica - účet zablokovaný",
                  "Váš účet bolo zablokovaný z dôvodu troch nesprávnych pokusov o prihlásenie. Pre jeho odblokovanie choďte do aplikácie a na úvodnej ploche zvoľte možnosť odblokovať účet a zadajte váš email a nasledujúci token: " +
                    user.block_token
                )
                  .then(response => {
                    console.warn(response);
                  })
                  .catch(err => {
                    console.warn("email " + err);
                    throw err;
                  });
              }
              update(user, user.id, "user").then(result => {
                this.setState({ loggingIn: false });
              });
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
      )
      .catch(err => {
        console.log(err);
        //this.props.navigation.navigate("ErrorScreen"); show err screen :D
      });
  }

  sendPassword() {
    getByAttribute("email", this.state.recoveryUnblockEmail, "user")
      .then(user => {
        if (user) {
          user = dearray(user[0]);
          sendEmail(
            user.email,
            "Heslo z IS Knižnica",
            "Vaše heslo je " + user.password
          )
            .then(response => {
              this.setState({
                recoveryUnblockEmail: "",
                passwordRecovery: false
              });
              Toast.show({
                text: "Heslo odoslané",
                buttonText: "OK",
                duration: 3000,
                type: "success"
              });
            })
            .catch(err => {
              throw err;
            });
        } else {
          Toast.show({
            text: "Neexistujúce konto",
            buttonText: "OK",
            duration: 3000,
            type: "danger"
          });
        }
      })
      .catch(
        err => console.log(err) //errorScreen
      );
  }
  unblockUser() {
    getByAttribute("email", this.state.recoveryUnblockEmail, "user")
      .then(user => {
        user = dearray(user[0]);
        if (user && user.block_token == this.state.unblockToken) {
          user.is_blocked = false;
          user.login_counter = 0;
          user.block_token = "";
          update(user, user.id, "user")
            .then(response => {
              this.setState({
                recoveryUnblockEmail: "",
                unblockToken: "",
                unblockUser: false
              });
              Toast.show({
                text: "Účet bol odblokovaný",
                buttonText: "OK",
                duration: 3000,
                type: "success"
              });
            })
            .catch(err => {
              throw err;
            });
        } else {
          console.warn(user);
          Toast.show({
            text: "Neexistujúce konto",
            buttonText: "OK",
            duration: 3000,
            type: "danger"
          });
        }
      })
      .catch(
        err => {
          console.log(err);
        } //errscreen
      );
  }

  render() {
    let button;
    if (this.state.loggingIn) {
      button = <ActivityIndicator size="small" color="#0FDDAF" />;
    } else {
      button = (
        <Button
          block
          width="70%"
          onPress={this.login.bind(this, this.state.email, this.state.password)}
        >
          <Text> Prihlásiť </Text>
        </Button>
      );
    }
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
            <Modal
              isVisible={this.state.passwordRecovery}
              onBackdropPress={() =>
                this.setState({
                  passwordRecovery: !this.state.passwordRecovery
                })
              }
            >
              <View
                style={{
                  justifyContent: "space-between",
                  backgroundColor: "#fff",
                  height: 200,
                  alignItems: "center",
                  padding: "5%",
                  borderRadius: 7
                }}
              >
                <H3>Zadaj email svojho účtu</H3>
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
                    onChangeText={text =>
                      this.setState({ recoveryUnblockEmail: text })
                    }
                    value={this.state.recoveryUnblockEmail}
                  />
                </Item>
                <Button
                  style={{ alignSelf: "center" }}
                  onPress={this.sendPassword.bind(this)}
                >
                  <Text>Odošli heslo</Text>
                </Button>
              </View>
            </Modal>
            <Modal
              isVisible={this.state.unblockUser}
              onBackdropPress={() =>
                this.setState({ unblockUser: !this.state.unblockUser })
              }
            >
              <View
                style={{
                  justifyContent: "space-between",
                  backgroundColor: "#fff",
                  height: 300,
                  alignItems: "center",
                  padding: "5%",
                  borderRadius: 7
                }}
              >
                <H3>Zadaj email svojho účtu a token na jeho odblokovanie</H3>
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
                    onChangeText={text =>
                      this.setState({ recoveryUnblockEmail: text })
                    }
                    value={this.state.recoveryUnblockEmail}
                  />
                </Item>
                <Item
                  floatingLabel
                  underline
                  style={{
                    width: "90%"
                  }}
                >
                  <Label>Token</Label>
                  <Input
                    name="token"
                    onChangeText={text => this.setState({ unblockToken: text })}
                    value={this.state.unblockToken}
                  />
                </Item>
                <Button
                  style={{ alignSelf: "center" }}
                  onPress={this.unblockUser.bind(this)}
                >
                  <Text>Odblokuj používateľa</Text>
                </Button>
              </View>
            </Modal>
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
              <Button
                transparent
                style={{ height: 30, alignSelf: "center" }}
                onPress={() =>
                  this.setState({
                    passwordRecovery: !this.state.passwordRecovery
                  })
                }
              >
                <Text>Zabudol si heslo?</Text>
              </Button>
              <Button
                transparent
                style={{ height: 30, alignSelf: "center" }}
                onPress={() =>
                  this.setState({ unblockUser: !this.state.unblockUser })
                }
              >
                <Text>Odblokuj účet</Text>
              </Button>
            </View>
            <Item>{button}</Item>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

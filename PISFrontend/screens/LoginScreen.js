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
  StyleProvider
} from "native-base";
import getByAttribute from "../scripts/GetByAttribute.js";
import getById from '../scripts/GetById.js';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  async login(email, password) {
    let usr='';
    getByAttribute('email', email, 'user').then(
    function(user) {
      console.warn(user);
      /*usr=user;
      if (user && user.password == password) {
        console.log("login muthafuckarr");
      } else {
        console.log("nespravne heslo");
      }*/
    },
    function(err) {
      console.log(err);
    }
    );
  }

  render() {
    const { navigate } = this.props.navigation;
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
                onPress={() => {
                  this.login(this.state.email, this.state.password);
                }}
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

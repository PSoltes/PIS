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

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

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
            <View style={{ width: "100%", marginVertical:"5%", alignItems: "center" }}>
              <H2>Knižnica</H2>
              <H3 style={{color:"#909090"}}>Login</H3>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Item
                underline
                style={{
                  width: "90%"
                }}
                stackedLabel
              >
                <Label>Email</Label>
                <Input placeholder="Email" />
              </Item>
              <Item
                underline
                style={{
                  width: "90%"
                }}
                stackedLabel
              >
                <Label>Heslo</Label>
                <Input placeholder="Heslo" />
              </Item>
            </View>
            <Item>
              <Button block width="70%">
                <Text> Login </Text>
              </Button>
            </Item>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

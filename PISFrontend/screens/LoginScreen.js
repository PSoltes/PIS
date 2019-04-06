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
    const {navigate} = this.props.navigation;
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
              <H3 style={{color:"#909090"}}>Prihlásenie</H3>
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
                <Input name="email" onPress={this.handleChange("email")} value={this.state.email}></Input>
              </Item>
              <Item
                floatingLabel
                underline
                style={{
                  width: "90%"
                }}
              >
                <Label>Heslo</Label>
                <Input secureTextEntry name="password" onPress={this.handleChange("password")} value={this.state.email}></Input>
              </Item>
            </View>
            <Item>
              <Button block width="70%" onPress={() => navigate('Home', {name: 'Richard'})}>
                <Text> Prihlásiť </Text>
              </Button>
            </Item>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

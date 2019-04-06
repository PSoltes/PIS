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
import SoapRequest from 'react-native-soap-request';

const soapRequest = new SoapRequest({
  requestURL: 'http://labss2.fiit.stuba.sk/pis/ws/Students/Team035user'
});

const xmlRequest = soapRequest.createRequest({
  'typ:ProductRegistrationRequest': {
    attributes: {
      'xmlns:typ': 'http://labss2.fiit.stuba.sk/pis/students/team035user/types'
    },
  'team_id': '035',
  'team_password':'zvbTTu',
    'user':{
      'id':1,
      'name':'Pavol',
      'surname':'Smajda',
      'email':'Borecky@gmail.com',
      'password':'LOLOLO',
      'login_counter':0,
      'is_blocked':false,
      'api_token':null,
      'picture_path':null
    }
  }
});
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

 async componentWillMount(){
    const response = await soapRequest.sendRequest();
    console.warn(response)
  }

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

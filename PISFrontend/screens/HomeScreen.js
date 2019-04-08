import React, { Component } from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import auth from "../scripts/Auth.js";
import {
  Container,
  Content,
  Header,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Drawer,
  StyleProvider,
  Card,
  H3,
  Text,
  H2
} from "native-base";
import { Image } from "react-native";
import SideBar from "../components/SideBar.js";
import { Col, Grid } from "react-native-easy-grid";

export default class HomeScreen extends Component {
  closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  render() {
    const { navigation } = this.props;
    const name = navigation.getParam("name", "");
    return (
      <StyleProvider style={getTheme(material)}>
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={<SideBar />}
          onClose={() => this.closeDrawer()}
        >
          <Container>
            <Header
              style={{ backgroundColor: "#00e6b8"}}
              androidStatusBarColor="#00e6b8"
            >
              <Body>
                <Title>Dobrý deň {name}</Title>
              </Body>
              <Right>
                <Button transparent onPress={() => this.openDrawer()}>
                  <Icon name="menu" />
                </Button>
              </Right>
            </Header>
            <Content contentContainerStyle={{ flex: 1, alignItems: "center" }} padder>
            <H2 style={{alignSelf:"flex-start", marginVertical:"3%"}}>Moje Knihy</H2>
              <Card style={{ height: "20%", width: "100%"}}>
                <Grid>
                  <Col style={{flex:1, alignItems:"flex-start", height:"100%"}} size={1}>
                    <Image source={require('../img/BookCover.png')} resizeMode="contain" style={{width:"100%", flex:1}}/>
                  </Col>
                  <Col size={3} style={{marginVertical:"3%"}}>
                    <H3>Game of Thrones</H3>
                    <Text>George RR Martin</Text>
                  </Col>
                </Grid>
              </Card>
              <Card style={{ height: "20%", width: "100%"}}>
                <Grid>
                  <Col style={{flex:1, alignItems:"flex-start", height:"100%"}} size={1}>
                    <Image source={require('../img/BookCover.png')} resizeMode="contain" style={{width:"100%", flex:1}}/>
                  </Col>
                  <Col size={3} style={{marginVertical:"3%"}}>
                    <H3>Game of Thrones</H3>
                    <Text>George RR Martin</Text>
                  </Col>
                </Grid>
              </Card>
            </Content>
          </Container>
        </Drawer>
      </StyleProvider>
    );
  }
}

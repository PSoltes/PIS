import React, { Component } from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Drawer
} from "native-base";
import  SideBar  from "../components/SideBar.js"

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
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar/>}
        onClose={() => this.closeDrawer()}
      >
        <Container>
          <Header
            style={{ backgroundColor: "#00e6b8" }}
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
        </Container>
      </Drawer>
    );
  }
}

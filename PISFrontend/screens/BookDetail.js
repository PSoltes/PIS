import React, { Component } from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import { Container, Content, StyleProvider, Drawer } from 'native-base';
import AppHeader from "../components/AppHeader.js";
import SideBar from "../components/SideBar.js"


export default class BookDetail extends Component {

  closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  render() {
    const { navigation } = this.props;
    const book = navigation.getParam("book");
    return (
      <StyleProvider style={getTheme(material)}>
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={
          <SideBar
            navigation={this.props.navigation}
            closeDrawer={() => this.props.closeDrawer()}
          />
        }
        onClose={() => this.closeDrawer()}
      >
        <Container>
          <AppHeader
            title={book.name}
            openDrawer={() => this.openDrawer()}
          />
          <Content
            contentContainerStyle={{ flex: 1, alignItems: "center" }}
            padder
          >
          </Content>
        </Container>
      </Drawer>
    </StyleProvider>);
  }
}

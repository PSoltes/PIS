import React from "react";
import {Header, Body, Right, Icon, Button, Title} from "native-base"

export default class AppHeader extends React.Component {
  
  render() {
    return (
      <Header
        style={{ backgroundColor: "#00e6b8" }}
        androidStatusBarColor="#00e6b8"
      >
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
    );
  }
}

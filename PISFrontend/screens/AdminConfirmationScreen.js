import React, { Component } from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';


export default class AdminConfirmationScreen extends Component {

  render() {
    const { navigation } = this.props;
    const name = navigation.getParam('name', '');
    return (
    <Container>
      <Header style={{ backgroundColor: '#00e6b8'}} androidStatusBarColor="#00e6b8">
        <Body>
        <Title>Dobrý deň {name}</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
    </Container>
    );
  }
}

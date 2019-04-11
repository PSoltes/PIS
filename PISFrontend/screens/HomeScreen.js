import React, { Component } from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import auth from "../scripts/Auth.js";
import {
  Container,
  Content,
  Drawer,
  StyleProvider,
  Card,
  H2,
  Text,
} from "native-base";
import { Image } from "react-native";
import SideBar from "../components/SideBar.js";
import { Col, Grid } from "react-native-easy-grid";
import AppHeader from "../components/AppHeader.js";

export default class HomeScreen extends Component {
  closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  constructor(props)
  {
    super(props);
    this.state=
    {
      books:{}
    }
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
          content={<SideBar navigation={this.props.navigation} closeDrawer={() => this.closeDrawer()} />}
          onClose={() => this.closeDrawer()}
        >
          <Container>
            <AppHeader title="Moje Knihy" openDrawer={() => this.openDrawer()}/>
            <Content contentContainerStyle={{ flex: 1, alignItems: "center" }} padder>
              <Card style={{ height: "20%", width: "100%"}}>
                <Grid>
                  <Col style={{flex:1, alignItems:"flex-start", height:"100%"}} size={1}>
                    <Image source={require('../img/BookCover.png')} resizeMode="contain" style={{width:"100%", flex:1}}/>
                  </Col>
                  <Col size={3} style={{marginVertical:"3%"}}>
                    <H2 style={{color:"#0FDDAF"}}>Game of Thrones</H2>
                    <Text>George RR Martin</Text>
                    <Text>Dátum výpožičky: 25. 2. 2018</Text>
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

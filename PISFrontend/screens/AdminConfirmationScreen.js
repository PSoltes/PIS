import React, { Component } from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import { Container, Content, Header, Left,CheckBox, Body, Right, Button,Icon, Title,Text,Card,CardItem,H1,H3} from 'native-base';
import {View} from 'react-native';
import BookDetail from "./BookDetail";
let item;
export default class AdminConfirmationScreen extends Component {

  render() {
    const { navigation } = this.props;
     item = navigation.getParam('items', {});
    return (
    <Container>
      <Header style={{ backgroundColor: '#00e6b8'}} androidStatusBarColor="#00e6b8">
        <Body>
        <Title>Potvrdenie</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
      <Content width="90%" style={{flex:1,alignSelf:'center'}}>
        <View style={{flex:1,borderBottomWidth:3,borderColor:'#00e6b8',alignItems:'flex-start',margin:10}}>
          <View>
            <H1 style={{color:'#00e6b8',marginBottom:10}}>{item.book}</H1>
          </View>
          <View>
            <H3 style={{marginBottom:10}}>
              {item.author}
            </H3>
          </View>
        </View>
        <View style={{alignItems:'flex-start',margin:10}}>
          <View >
            <Text style={stylos.bold}>Autor:<Text style={stylos.normal}>{item.user}</Text> </Text>
          </View>
          <View>
            <Text style={stylos.bold}>Datum pridania: <Text style={stylos.normal}>{item.date}</Text></Text>
          </View>
          <View>
            <Text style={stylos.bold}>Kontrola zkázaných výrazov: <Text style={{color:'green'}}>PREŠIEL</Text></Text>
          </View>
        </View>
        <View>
          <Card style={{backGroundColor:'grey',font:10,flex:1,margin:10}}>
            <Text style={{padding:5}}>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </Text>
          </Card>
        </View>
        <View width="92%" style={{flexDirection:'row',flex:1,alignSelf: 'stretch',margin:10}}>
          <Left>
            <Text >Obsahuje spojler : </Text>
          </Left>
          <Right>
            <CheckBox />
          </Right>
        </View>
        <View width="100%" style={{flexDirection:'row',flex:1,alignSelf: 'stretch',margin:10}}>
          <Left>
            <Button
            block
            width="90%"
            success
            onPress={() => {
            }}
            >
              <Text> Schváliť</Text>
            </Button>
          </Left>
          <Right>
            <Button
            block
            width="90%"
            danger
            onPress={() => {
            }}
            >
              <Text> Zamietnúť </Text>
            </Button>
          </Right>
        </View>
      </Content>
    </Container>
    );
  }
}
const stylos={
  bold:{
    fontWeight: 'bold',
  },
  normal:{
    fontWeight: 'normal',
  }
}
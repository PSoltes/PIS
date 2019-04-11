import React, { Component } from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import { Container, Content, Header, Left,CheckBox, Body, Right, Button,Icon, Title,Text,Card,CardItem,H1,H3,H2} from 'native-base';
import {View,Alert} from 'react-native';
import Update from '../scripts/Update';
import Delete from '../scripts/Delete';
let item,col;
export default class AdminConfirmationScreen extends Component {

  async Accept(){
    console.warn("ideme");
   let retrn;
   item.conf.approved_at=new Date().toISOString;
    await Update(item.conf, item.conf.id, 'comment').then(
      function(respons) {
        console.warn(respons);
        retrn=respons;
      },
      function(err) {
        console.log(err);
      }
      );
      console.warn("ideme overiť");
      if(retrn){
        Alert.alert(
          'Upozornenie',
          'Úspešné schválenie.',
          [
            {text: 'OK',onPress: () =>{
              this.props.navigation.navigate('AdminListScreen');
              }}
          ],
          {cancelable: false},
          );
        console.warn('Pridané');
      }
      else{
        Alert.alert(
          'Upozornenie',
          'Došlo k chybe pri ukladaní dát.',
          [
            {text: 'OK'}
          ],
          {cancelable: false},
          );
          console.warn('Nepridané');
      }

  }
  async Decline(){
    let retrn;
    await Delete(item.conf.id, 'comment').then(
      function(respons) {
        console.warn(respons);
        retrn=respons;
      },
      function(err) {
        console.log(err);
      }
      );
      if(retrn){
        Alert.alert(
          'Upozornenie',
          'Úspešné zamietnuté.',
          [
            {text: 'OK',onPress: () =>{
              this.props.navigation.navigate('AdminListScreen');
              }}
          ],
          {cancelable: false},
          );
        console.warn('Pridané');
      }
      else{
        Alert.alert(
          'Upozornenie',
          'Došlo k chybe pri ukladaní dát.',
          [
            {text: 'OK'}
          ],
          {cancelable: false},
          );
          console.warn('Nepridané');
      }
  }
  render() {
   
    const { navigation } = this.props;
     item = navigation.getParam('items', {});
     let expresion='';
     if(item.conf.has_wrong_expression){
      expresion='NEPREŠIEL'
        col='red';
     }
     else {
       expresion='PREŠIEL'
        col='green';

     }

    return (
    <Container>
      <Header style={{ backgroundColor: '#00e6b8'}} androidStatusBarColor="#00e6b8">
        <Body>
        <Title>Potvrdenie</Title>
        </Body>
        <Right>
          <Button transparent
          onPress={() => {
            this.props.navigation.navigate('AdminListScreen');
          }}
          >
            <Icon name="close" />
          </Button>
        </Right>
      </Header>
      <Content width="90%" style={{flex:1,alignSelf:'center'}}>
        <View style={{flex:1,borderBottomWidth:3,borderColor:'#00e6b8',alignItems:'flex-start',margin:10}}>
          <View>
            <H1 style={{color:'#00e6b8',marginBottom:10}}>{item.book.name}</H1>
          </View>
          <View>
            <H3 style={{marginBottom:10}}>
              {item.book.author}
            </H3>
          </View>
        </View>
        <View style={{alignItems:'flex-start',margin:10}}>
          <View >
            <Text style={stylos.bold}>Autor:<Text style={stylos.normal}>{item.user.name} {item.user.surname}</Text> </Text>
          </View>
          <View>
            <Text style={stylos.bold}>Datum pridania: <Text style={stylos.normal}>{item.conf.created_at}</Text></Text>
          </View>
          <View>
            <Text style={stylos.bold}>Kontrola zakázaných výrazov: <Text style={{color: col}}>{expresion}</Text></Text>
          </View>
        </View>
        <View>
          <Card style={{backGroundColor:'grey',font:10,flex:1,margin:10}}>
            <Text style={{padding:5}}>
              {item.conf.text}
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
              this.Accept();
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
            onPress={() => {this.Decline();
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
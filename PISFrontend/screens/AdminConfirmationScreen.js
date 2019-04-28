import React, { Component } from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import { Container, Content, Header, Left, CheckBox, Body, Right, Button, Icon, Title, Text, Card, CardItem, H1, H3, H2 } from 'native-base';
import { View, Alert, ActivityIndicator } from 'react-native';
import Update from '../scripts/Update';
import Delete from '../scripts/Delete';
import Email from '../scripts/Email';
import moment from 'moment';
let item, col;
export default class AdminConfirmationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      check: false
    };
  }

  async Accept() {
    let retrn;
    item.conf.spoiler_flag=this.state.check;
    item.conf.approved_at =(new Date()).toISOString();
    await Update(item.conf, item.conf.id, item.conf.name).then(
      function (respons) {
        retrn = respons;
      },
      function (err) {
        console.log(err);
      }
    );
    await Email(item.user.email,'Schválenie príspevku','Váš prípevok bol schválený.').then(
      function (respons) {
      },
      function (err) {
        console.log(err);
      }
    );
      Alert.alert(
        'Upozornenie',
        'Príspevok bol úspešne schválené.',
        [
          {
            text: 'OK', onPress: () => {
              this.props.navigation.navigate('AdminListScreen');
            }
          }
        ],
        { cancelable: false },
      );
    this.setState({ loading: false });
  }
  async Decline() {
    this.setState({ loading: true });
    let retrn;
    await Delete(item.conf.id, item.conf.name).then(
      function (respons) {
        retrn = respons;
      },
      function (err) {
        console.log(err);
      }
    );
    await Email(item.user.email,'Schválenie príspevku','Váš príspevok bol zamietnutý.').then(
      function (respons) {
      },
      function (err) {
        console.log(err);
      }
    );
    
      Alert.alert(
        'Upozornenie',
        'Príspevok úspešne zamietnutý.',
        [
          {
            text: 'OK', onPress: () => {
              this.props.navigation.navigate('AdminListScreen');
            }
          }
        ],
        { cancelable: false },
      ); 
    this.setState({ loading: false });
  }
  render() {
    const { navigation } = this.props;
    item = navigation.getParam('items', {});
    let expresion = '';
    if(item.conf.spoiler_flag=="true"){
      this.setState({check:true});
    }
    else{
      this.setState({check:false});
    }
    this.setState({check:});
    if (item.conf.has_wrong_expression=="true") {
      expresion = 'NEPREŠIEL'
      col = 'red';
    }
    else {
      expresion = 'PREŠIEL'
      col = 'green';

    }
    
    let button;
    if (this.state.loading) {
      button = <ActivityIndicator size="small" color="#0FDDAF" />;
    } else {
      button = <View></View>
    }
    return (
      <Container>
        <Header style={{ backgroundColor: '#00e6b8' }} androidStatusBarColor="#00e6b8">
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
        <Content width="90%" style={{ flex: 1, alignSelf: 'center' }}>
          <View style={{ flex: 1, borderBottomWidth: 3, borderColor: '#00e6b8', alignItems: 'flex-start', margin: 10 }}>
            <View>
              <H1 style={{ color: '#00e6b8', marginBottom: 10 }}>{item.book.name}</H1>
            </View>
            <View>
              <H3 style={{ marginBottom: 10 }}>
                {item.book.author}
              </H3>
            </View>
          </View>
          <View style={{ alignItems: 'flex-start', margin: 10 }}>
            <View >
              <Text style={stylos.bold}>Autor:<Text style={stylos.normal}>{item.user.name} {item.user.surname}</Text> </Text>
            </View>
            <View>
              <Text style={stylos.bold}>Datum pridania: <Text style={stylos.normal}>{moment(new Date(item.conf.created_at)).format("DD/MM/YY")}</Text></Text>
            </View>
            <View>
              <Text style={stylos.bold}>Kontrola zakázaných výrazov: <Text style={{ color: col }}>{expresion}</Text></Text>
            </View>
          </View>
          <View>
            <Card style={{ backGroundColor: 'grey', font: 10, flex: 1, margin: 10 }}>
              <Text style={{ padding: 5 }}>
                {item.conf.text}
              </Text>
            </Card>
          </View>
          <View width="92%" style={{ flexDirection: 'row', flex: 1, alignSelf: 'stretch', margin: 10 }}>
            <Left>
              <Text >Obsahuje spojler : </Text>
            </Left>
            <Right>
              <CheckBox checked={this.state.check} onPress={()=>{
                this.setState({check:!this.state.check});
              }}/>
            </Right>
          </View>
          <View width="100%" style={{ flexDirection: 'row', flex: 1, alignSelf: 'stretch', margin: 10 }}>
            <Left>
              <Button
                block
                width="90%"
                success
                onPress={() => {
                  this.setState({ loading: true });
                  this.Accept();
                  this.setState({ loading: false });
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
                  this.Decline();
                }}
              >
                <Text> Zamietnúť </Text>
              </Button>
            </Right>
          </View>
          {button}
        </Content>
      </Container>
    );
  }
}
const stylos = {
  bold: {
    fontWeight: 'bold',
  },
  normal: {
    fontWeight: 'normal',
  }
}
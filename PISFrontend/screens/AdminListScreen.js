import React, { Component } from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title,Text,Card,CardItem,H3,H1,H2} from 'native-base';
import {FlatList,View,ActivityIndicator} from 'react-native';
import getByAttribute from "../scripts/GetByAttribute";
import getById from '../scripts/GetById';
import Dearray from '../scripts/Dearray';

export default class AdminListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
     confirms: '',
     loading: false

    };
  }
  async LoadComments(){
    this.setState({loading:true});
    let comarr= [];let revarr=[];
    await getByAttribute('approved_at', null, 'comment').then(
    function(conf) {
      console.log(conf);
      comarr=conf;
    },
    function(err) {
      console.log(err);
    }
    );
    await getByAttribute('approved_at', null, 'review').then(
      function(conf) {
        console.log(conf);
        revarr=conf;
      },
      function(err) {
        console.log(err);
      }
      );
      comarr.push(...revarr);
   let finarr=[];
  if(comarr){
    for(let obj in comarr){
      let usr=''; let book='';
      let bkid=comarr[obj].book_id[0];let usrid=comarr[obj].user_id[0];
      await getById(usrid,'user').then(
      function(user) {;
        usr=Dearray(user);
      },
      function(err) {
        console.log(err);
      }
      );
      console.log(usr);
      await getById(bkid,'book').then(
      function(respons) {
        book=Dearray(respons);
      },
      function(err) {
        console.log(err);
      }
      );
      let object;
      if(comarr[obj].name[0]=="review"){
         object = {key:comarr[obj].id[0],book:book,conf:Dearray(comarr[obj]),type:'Recenzia',user:usr};
      }
      else{
       object = {key:comarr[obj].id[0],book:book,conf:Dearray(comarr[obj]),type:'Komentár',user:usr};
      }
      finarr.push(object);
    }
    this.setState({confirms:finarr});
    console.log(this.state.confirms);
  }
  this.setState({loading:false});
  }
  async componentWillMount(){
    this.LoadComments();
  }
  render() {
    let button;
    if (this.state.loading) {
      button =<ActivityIndicator size="large" color="#0FDDAF" />;
              
    } else {
     button= <FlatList
     data={this.state.confirms}
     renderItem={({item})=>(
       <Card style={{width:'90%',alignSelf: 'center'}}>
         <CardItem width="100%" button onPress={()=>{
           this.props.navigation.navigate('AdminConfirmationScreen',{items:item});
          }}>
           <Body width="100%">
           <View width="100%">
               <View>
                 <H3 style={{color:'#00e6b8'}}>{item.book.name}</H3>
               </View>
               <View  width="100%" style={{font:15,flex:1,flexDirection:'row',alignSelf: 'stretch'}}>
                 <View>
                 <Text>
                   {item.book.author}
                 </Text>
                   <Text>
                     {item.user.name} {item.user.surname}
                   </Text>
                 </View>
                 <Right>
                       <Text>{item.type} </Text>
                       <Text>{item.conf.created_at}</Text>
                 </Right>
               </View>
           </View>
           </Body>
         </CardItem>
       </Card>
     )}
     />
    }
    return (
    <Container>
      <Header style={{ backgroundColor: '#00e6b8'}} androidStatusBarColor="#00e6b8">
        <Body>
        <Title>Potvrdenia</Title>
        </Body>
        <Right>
        <Button transparent
         onPress={() => {
          this.LoadComments();
        }}
        >
            <Icon name="sync" />
          </Button>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
      <Content contentContainerStyle={{flex:1,flexDirection:'column',justifyContent:'center'}}>
        {button}
      </Content>
    </Container>
    );
  }
}

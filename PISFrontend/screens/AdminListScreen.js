import React, { Component } from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title,Text,Card,CardItem,H3,H1,H2} from 'native-base';
import {FlatList,View} from 'react-native';
import getByAttribute from "../scripts/GetByAttribute";
import getById from '../scripts/GetById';
import Dearray from '../scripts/Dearray';

export default class AdminListScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
     confirms: ''
    };
  }
  async LoadComments(){
    let confarr= [];
    await getByAttribute('approved_at', null, 'comment').then(
    function(conf) {
      console.log(conf);
      confarr=conf;
    },
    function(err) {
      console.log(err);
    }
    );
   let finarr=[];
  if(confarr){
    for(let obj in confarr){
      let usr=''; let book='';
      console.log(confarr[obj].user_id[0]+" - "+confarr[obj].book_id[0]);
      let bkid=confarr[obj].book_id[0];let usrid=confarr[obj].user_id[0];
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
      let object = {key:confarr[obj].id[0],book:book,conf:Dearray(confarr[obj]),type:'Komentár',user:usr};
      finarr.push(object);
    }
    this.setState({confirms:finarr});
    console.log(this.state.confirms);
  }

  }
  async componentWillMount(){
    this.LoadComments();
  }
  render() {
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
      <Content>
      <FlatList
      data={this.state.confirms}
        /*[{key: '1',book:'Horiaca ríša',author:'Juraj Červenák',date:'12/03/2019',type:'Komentár',user:'Pavol Šoltés' },
        {key: '2',book:'Horiaca ríša',author:'Juraj Červenák',date:'12/03/2019',type:'Komentár',user:'Pavol Šoltés' },
        {key: '3',book:'Horiaca ríša',author:'Juraj Červenák',date:'12/03/2019',type:'Komentár',user:'Pavol Šoltés' },
        {key: '4',book:'Horiaca ríša',author:'Juraj Červenák',date:'12/03/2019',type:'Komentár',user:'Pavol Šoltés' },
        {key: '5',book:'Horiaca ríša',author:'Juraj Červenák',date:'12/03/2019',type:'Komentár',user:'Pavol Šoltés' }]}*/
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
      /></Content>
    </Container>
    );
  }
}

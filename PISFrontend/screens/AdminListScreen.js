import React, { Component } from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import { Container, Content, Header, Left, Body, Right, Button, Icon, Title,Text,Card,CardItem,H3,H1} from 'native-base';
import {FlatList,View} from 'react-native';


export default class AdminListScreen extends Component {

  render() {
    const { navigation } = this.props;
    const name = navigation.getParam('name', '');
    return (
    <Container>
      <Header style={{ backgroundColor: '#00e6b8'}} androidStatusBarColor="#00e6b8">
        <Body>
        <Title>Potvrdenia</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
      <Content>
      <FlatList
      data={[{key: '1',book:'Horiaca ríša',author:'Juraj Červenák',date:'12/03/2019',type:'Komentár',user:'Pavol Šoltés' },
        {key: '2',book:'Horiaca ríša',author:'Juraj Červenák',date:'12/03/2019',type:'Komentár',user:'Pavol Šoltés' },
        {key: '3',book:'Horiaca ríša',author:'Juraj Červenák',date:'12/03/2019',type:'Komentár',user:'Pavol Šoltés' },
        {key: '4',book:'Horiaca ríša',author:'Juraj Červenák',date:'12/03/2019',type:'Komentár',user:'Pavol Šoltés' },
        {key: '5',book:'Horiaca ríša',author:'Juraj Červenák',date:'12/03/2019',type:'Komentár',user:'Pavol Šoltés' }]}
      renderItem={({item})=>(
      <View>
        <Card style={{width:'90%',alignSelf: 'center'}}>
          <CardItem button onPress={()=>{
            this.props.navigation.navigate('AdminConfirmationScreen');
            console.warn(item.key)}}>
            <Body>
            <View style={{flex:1,flexDirection:'row',alignSelf: 'stretch'}}>
              <View style={{alignItems:'flex-start'}}>
                <View>
                  <H3 style={{color:'#00e6b8'}}>{item.book}</H3>
                </View>
                <View>
                  <Text>
                    {item.author}
                  </Text>
                </View>
              </View>
              <View style={{alignItems:'flex-end',font:15}}>
                <View>
                  <Text>{item.date}</Text>
                </View>
                <View>
                  <Text>{item.type} , {item.user}</Text>
                </View>
              </View>
            </View>

            </Body>
          </CardItem>
        </Card>
      </View>
      )}
      />
      </Content>
    </Container>
    );
  }
}

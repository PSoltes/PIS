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
import getById from "../scripts/GetById.js";
import getByAttribute from "../scripts/GetByAttribute.js";
import dearray from "../scripts/Dearray.js"

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
      books:[{name:"debil", author:"retard"}, {name:"bestBookOnPlanet", author:"Miro"}]
    }
  }

  async componentDidMount()
  {
    var book_ids = [];
    var myPromises = [];
    
    const result = await getByAttribute("user_id", 187700, "book_loan");

    result.forEach((book_loan) => {
      book_ids.push(book_loan.book_id[0]);
    });

    book_ids = [...new Set(book_ids)];

    book_ids.forEach((book_id) => {
      myPromises.push(getById(book_id, "book"));
    })

    Promise.all(myPromises).then(
      (booksUp) => {
        
        booksUp.forEach((book) =>{

          book = dearray(book);
        });
        console.log(booksUp);
        this.setState(
          {books:booksUp}
        );
      }
    )

  }

  render() {
    const bookList = this.state.books.map((book) => {
      return <Card style={{ height: "20%", width: "100%"}}>
      <Grid>
        <Col style={{flex:1, alignItems:"flex-start", height:"100%"}} size={1}>
          <Image source={require('../img/BookCover.png')} resizeMode="contain" style={{width:"100%", flex:1}}/>
        </Col>
        <Col size={3} style={{marginVertical:"3%"}}>
          <H2 style={{color:"#0FDDAF"}}>{book.name}</H2>
          <Text>{book.author}</Text>
        </Col>
      </Grid>
    </Card>
    }

    )
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
              {bookList}
            </Content>
          </Container>
        </Drawer>
      </StyleProvider>
    );
  }
}
import React, { Component } from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import { Container, StyleProvider, Content, Drawer, View, Header, Left, Body, Right, Button, Icon, Title, H2, Toast, Text, Textarea } from 'native-base';
import { ActivityIndicator } from "react-native";

import AppHeader from "../components/AppHeader.js";
import SideBar from "../components/SideBar.js";
import AsyncStorage from "@react-native-community/async-storage";
import auth from "../scripts/Auth.js";

import { Grid, Col, Row } from "react-native-easy-grid";
import insert from '../scripts/Insert.js';
import update from '../scripts/Update.js';
import email from '../scripts/Email.js';

export default class AddReviewScreen extends Component {
  closeDrawer() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  constructor(props) {
    super(props);
    this.state = {
        book: '',
        review: '',
        review_text: '',
        my_id: 0,
        my_email: '',
        isLoading: false
    };
  }

  insertReview(){
    this.setState({isLoading: true});

    let review = this.state.review;

    review.text = this.state.review_text;
    review.created_at = Date();
    review.has_wrong_expression = false;
    review.approved_at = null;
    review.spoiler_flag = false;

    if(!review.id){
      review.name = "review";
      review.book_id = this.props.navigation.getParam("book").id;
      review.user_id = this.state.my_id;
      email(this.state.my_email,
        "Informačný systém knižnica - recenzia pridaná",
        "Vaša recenzia bola úspešne pridaná, prosím počkajte na jej schválenie pracovníkom knižnice a uverejnenie.");
      insert(review, 'review').then( res => {
        Toast.show({
          text: "Recenzia bola vytvorená a odoslaná na schválenie.",
          buttonText: "OK",
          duration: 3000,
          type: "info"
        });
        this.setState({isLoading: false});
        this.props.navigation.navigate("Home");
      });
    }
    else{
      email(this.state.my_email,
        "Informačný systém knižnica - recenzia zmenená",
        "Vaša recenzia bola úspešne zmenená, prosím počkajte na jej schválenie pracovníkom knižnice a uverejnenie.");
      update(review, review.id, 'review').then( res => {
        Toast.show({
          text: "Recenzia bola upravená a odoslaná na schválenie.",
          buttonText: "OK",
          duration: 3000,
          type: "info"
        });
        this.setState({isLoading: false});
        this.props.navigation.navigate("Home");
      });
    }
  }

  componentDidMount() {
    this.setState({isLoading: true});
    AsyncStorage.getItem("id").then( id => {
        this.setState({ my_id: id });
        auth().then(loginResult => {
            if (loginResult) {
                console.log("auth");

                AsyncStorage.getItem("email").then( email => {
                    this.setState({my_email: email});
                });

                const { navigation } = this.props;
                this.setState({book: navigation.getParam("book")});
                this.setState({review: navigation.getParam("review")});
                this.setState({review_text: navigation.getParam("review").text});
                this.setState({isLoading: false});
            }
            else {
                console.log("not auth");
                this.props.navigation.navigate("Login");
            }
        });
    });
  }

  render() {
     let wrapper;
     if(this.state.isLoading == true){
       wrapper = (
         <Container>
           <Content
              ref={c => (this.component = c)}
              contentContainerStyle={{alignItems: "center", justifyContent: "center", height: "100%", flex: 1}}
              padder
           >
             <ActivityIndicator size="large" color="#0FDDAF" />
           </Content>
         </Container>
       );
     }
     else {
     wrapper = (
      <StyleProvider style={getTheme(material)}>
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={
            <SideBar
              navigation={this.props.navigation}
              closeDrawer={() => this.props.closeDrawer()}
            />
          }
          onClose={() => this.closeDrawer()}
        >
          <Container>
            <AppHeader
              title={"Recenzia"}
              openDrawer={() => this.openDrawer()}
            />
            <Content
              ref={c => (this.component = c)}
              contentContainerStyle={{alignItems: "center"}}
              padder
            >

              <Grid>
                <Col>
                    <Row
                        style={{
                            borderBottomColor: "#0FDDAF",
                            borderBottomWidth: 1,
                            paddingBottom: 5
                        }}
                    >
                        <Col>
                            <Row size={1}>
                                <H2 style={{ color: "#0FDDAF" }}>{this.state.book.name}</H2>
                            </Row>
                            <Row size={1}>
                                <Text>{this.state.book.author}</Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{height: "100%" }}>
                            <Textarea
                                rowSpan={10}
                                bordered
                                placeholder="Tu napíšte svoju recenziu"
                                onChangeText={newtext => this.setState({ review_text: newtext})}
                                value={this.state.review_text}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                style={{backgroundColor: "#0FDDAF", justifyContent: "center", width: "100%", height: 35}}
                                onPress={() => {
                                    this.insertReview();
                                }}
                            >
                                <Text>Potvrdiť</Text>
                            </Button>
                        </Col>
                    </Row>
                </Col>
              </Grid>

            </Content>
          </Container>
        </Drawer>
      </StyleProvider>
    );
    }
    return wrapper;
  }
}

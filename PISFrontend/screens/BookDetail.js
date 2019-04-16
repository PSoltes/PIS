import React, { Component } from "react";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import {
    Container,
    Content,
    StyleProvider,
    Drawer,
    AppRegistry,
    View,
    Text,
    H2,
    Button,
    Item,
    ListItem,
    CheckBox,
    Body,
    Card,
    CardItem,
    Icon,
    Input,
    Toast,
    Accordion
} from 'native-base';
import AppHeader from "../components/AppHeader.js";
import SideBar from "../components/SideBar.js"

import { Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import images from "../img/images.js";
import auth from "../scripts/Auth.js";
import getByAttribute from "../scripts/GetByAttribute.js";
import dearray from "../scripts/Dearray.js";
import AsyncStorage from "@react-native-community/async-storage";
import getById from '../scripts/GetById.js';
import insert from '../scripts/Insert.js';
import update from '../scripts/Update.js';
import remove from '../scripts/Delete.js';
import email from '../scripts/Email.js';

import Moment from 'react-moment';
import { Rating, AirbnbRating } from 'react-native-ratings';

export default class BookDetail extends Component {
    closeDrawer() {
        this.drawer._root.close();
    }

    openDrawer() {
        this.drawer._root.open();
    }

    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            only_mine_checked: false,
            my_id: 0,
            my_email: '',
            new_comment_text: '',
            comment_id: '',
            comment: '',
            review: '',
            rating: 0,
            my_rating: 0,
            my_rating_id: '',
            rating_count: 0,
            isLoading: false,
            modal_visible: false
        };
    }

    findComments(){
        let approvedComments = [];
        this.setState({isLoading: true});
        getByAttribute("book_id", this.props.navigation.getParam("book").id, "comment").then(result => {
            if (result != null){
                result.forEach(comment => {

                    comment = dearray(comment);
                    if (comment.approved_at != 'null' || comment.user_id == this.state.my_id){
                        getById(comment.user_id, 'user').then( returnOfGet => {
                            if (returnOfGet != null){

                                user = dearray(returnOfGet);
                                if (this.state.only_mine_checked == true && user.id == this.state.my_id){
                                    comment.user_name = user.name;
                                    comment.user_surname = user.surname;

                                    approvedComments.push(comment);
                                    this.setState({ comments: approvedComments });
                                }
                                else if (this.state.only_mine_checked == false){
                                    comment.user_name = user.name;
                                    comment.user_surname = user.surname;

                                    approvedComments.push(comment);
                                    this.setState({ comments: approvedComments });
                                }
                                this.setState({isLoading: false});
                            }
                        });
                    }

                });
            }
        });
    }

    findReview(){
        this.setState({isLoading: true});
        getByAttribute("book_id", this.props.navigation.getParam("book").id, "review").then(result => {
            if (result != null){
                result.forEach( review => {
                   review = dearray(review);
                   if(review.approved_at != 'null' || review.user_id == this.state.my_id){
                     this.setState({review: review});
                     this.setState({isLoading: false});
                     return;
                   }
                });
            }
            else{
                this.setState({review: ''});
            }
            this.setState({isLoading: false});
        });
    }

    findRating(){
        let totalRating = 0;
        let counter = 0;
        this.setState({isLoading: true});
        getByAttribute("book_id", this.props.navigation.getParam("book").id, "evaluation").then(result => {
            if (result != null){
                result.forEach(evaluation => {
                    counter += 1;
                    evaluation = dearray(evaluation);
                    totalRating += parseInt(evaluation.value);
                    if (evaluation.user_id == this.state.my_id){
                        this.setState({my_rating: parseInt(evaluation.value), my_rating_id: evaluation.id});
                    }
                });
                this.setState({rating: totalRating, rating_count: counter});
            }
            else{
                this.setState({rating: 0, my_rating: 0, rating_count: 0});
            }
            this.setState({isLoading: false});
        });
    }

    insertComment(){
        this.setState({isLoading: true});
        if (this.state.comment_id == '' && this.state.new_comment_text != ''){
            let comment = {};
            comment.id = 0;
            comment.name = 'comment';
            comment.book_id = this.props.navigation.getParam("book").id;
            comment.user_id = this.state.my_id;
            comment.created_at = Date();
            comment.has_wrong_expression = false;
            comment.approved_at = null;
            comment.text = this.state.new_comment_text;
            comment.spoiler_flag = false;
            email(this.state.my_email,
                      "Informačný systém knižnica - komentár pridaný",
                      "Vaš komentár bol úspešne pridaný, prosím počkajte na jeho schválenie pracovníkom knižnice.");
            insert(comment, 'comment').then( res => {
                    this.findComments();
                    this.setState({ comment_id: '', comment: '', new_comment_text: '' });
                    Toast.show({
                        text: "Komentár bol odoslaný na schválenie.",
                        buttonText: "OK",
                        duration: 3000,
                        type: "info"
                    });
                    this.setState({isLoading: false});
                }
            );
        }
        else if (this.state.comment_id != null){
            this.state.comment.text = this.state.new_comment_text;
            this.state.comment.has_wrong_expression = false;
            this.state.comment.approved_at = null;
            this.state.comment.spoiler_flag = false;
            email(this.state.my_email,
                      "Informačný systém knižnica - komentár zmenený",
                      "Vaš komentár bol úspešne zmenený, prosím počkajte na jeho schválenie pracovníkom knižnice.");
            update(this.state.comment, this.state.comment_id, 'comment').then( res => {
                    this.findComments();
                    this.setState({ comment_id: '', comment: '', new_comment_text: '' });
                    Toast.show({
                        text: "Komentár bol odoslaný na schválenie.",
                        buttonText: "OK",
                        duration: 3000,
                        type: "info"
                    });
                    this.setState({isLoading: false});
                }
            );
        }
    }

    deleteComment(toDelete){
        this.setState({isLoading: true});
        remove(toDelete, 'comment').then(res => {
            this.findComments();
            this.setState({ comment_id: null, comment: null, new_comment_text: '' });
            Toast.show({
                text: "Komentár bol odstránený.",
                buttonText: "OK",
                duration: 3000,
                type: "info"
            });
            this.setState({isLoading: false});
        });
    }

    deleteReview(toDelete){
        this.setState({isLoading: true});
        remove(toDelete, 'review').then(res => {
            this.setState({ review: '' });
            Toast.show({
                text: "Vaša recenzia bola odstránená.",
                buttonText: "OK",
                duration: 3000,
                type: "info"
            });
            this.setState({isLoading: false});
        });
    }

    componentDidMount() {
        this.setState({isLoading: true});
        AsyncStorage.getItem("id").then(
            id => {
                this.setState({ my_id: id });
                auth().then(loginResult => {
                    if (loginResult) {
                        AsyncStorage.getItem("email").then( email => {
                            this.setState({my_email: email});
                        });
                        console.log("auth");
                        this.findReview();
                        this.findRating();
                        this.findComments();
                    }
                    else {
                        console.log("not auth");
                        this.props.navigation.navigate("Login");
                    }
                });
            }
        );
    }

    _renderHeader(item, expanded) {
        let button_edit_review;
        let button_remove_review;
        let review_not_approved;
        if (this.state.review.approved_at == 'null'){
            review_not_approved = (
                <Icon style={{ color: "orange" }} type="FontAwesome" name="exclamation-triangle"
                    onPress={() =>{
                        Toast.show({
                            text: "Recenzia nie je schválena.",
                            duration: 3000,
                            type: "warning"
                        });
                    }}
                />
            )
        }
        if (this.state.review.user_id == this.state.my_id){
            if (expanded){
                button_edit_review = (
                    <Icon style={{ color: "white" }} type="FontAwesome" name="pencil"
                        onPress={() =>{
                            this.props.navigation.navigate("AddReviewScreen", {review: this.state.review, book: this.props.navigation.getParam("book")});
                        }}
                    />
                );
                button_remove_review = (
                    <Icon style={{ color: "white" }} type="FontAwesome" name="trash"
                        onPress={() => {
                            this.deleteReview(this.state.review.id);
                        }}
                    />
                );
            }
        }
        else{
            button_edit_review = (<Icon/>);
            button_remove_review = (<Icon/>);
        }
        return (
          <View style={{
            flexDirection: "row",
            paddingTop: 5,
            paddingLeft: 5,
            paddingRight: 5,
            height: 35,
            backgroundColor: "#0FDDAF" }}>
                <Grid>
                        <Col style={{alignItems: "flex-start"}}size={25}>
                            <Text>
                                {" "}{item.title}
                            </Text>
                        </Col>
                        <Col size={15}>
                            {review_not_approved}
                        </Col>
                        <Col style={{alignItems: "flex-end"}} size={30}>
                            {button_edit_review}
                        </Col>
                        <Col style={{alignItems: "flex-end"}} size={15}>
                            {button_remove_review}
                        </Col>
                        <Col style={{alignItems: "flex-end"}} size={15}>
                            {expanded
                                ? <Icon style={{  color: "white"}} type="FontAwesome" name="arrow-circle-up"/>
                                : <Icon style={{  color: "white"}} type="FontAwesome" name="arrow-circle-down"/>
                            }
                        </Col>
               </Grid>
          </View>
        );
    }

    ratingCompleted(newRating) {
        this.setState({isLoading: true});
        let evaluation = {};
        evaluation.name = "rating";
        evaluation.book_id = this.props.navigation.getParam("book").id;
        evaluation.user_id = this.state.my_id;
        evaluation.value = newRating;
        if (this.state.my_rating == 0){
            evaluation.id = 0;
            insert(evaluation, 'evaluation').then( res => {
                this.setState({rating_count: this.state.rating_count+1, rating: this.state.rating + newRating, my_rating: newRating});
                Toast.show({
                    text: "Hodnotenie bolo zaznamenané.",
                    buttonText: "OK",
                    duration: 3000,
                    type: "info"
                });
                this.setState({isLoading: false});
            });
        }
        else{
            evaluation.id = this.state.my_rating_id;
            update(evaluation, this.state.my_rating_id, 'evaluation').then( res => {
                this.setState({rating_count: this.state.rating_count+1, rating: this.state.rating + newRating, my_rating: newRating});
                Toast.show({
                    text: "Hodnotenie bolo zmenené.",
                    buttonText: "OK",
                    duration: 3000,
                    type: "info"
                });
                this.setState({isLoading: false});
            });
        }
    }

  render() {
    const { navigation } = this.props;
    const book = navigation.getParam("book");

    const commentsElements = this.state.comments.map(comment => {
        let button_edit;
        let button_delete;
        let comment_not_approved;

        if (this.state.my_id == comment.user_id && comment.approved_at == 'null'){
            comment_not_approved = (
                <Button transparent
                    onPress={() =>{
                        Toast.show({
                            text: "Komentár nie je schválený.",
                            duration: 3000,
                            type: "warning"
                        });
                    }}
                >
                    <Icon style={{ color: "orange" }} type="FontAwesome" name="exclamation-triangle"/>
                </Button>
            )
        };

        if (this.state.my_id == comment.user_id){
            button_edit = (
                <Button transparent
                    onPress={() => {
                        this.setState({ comment_id: comment.id, comment: comment, new_comment_text: comment.text});
                        this.component._root.scrollToPosition(0, 0);
                    }}
                >
                    <Icon style={{ color: "#0FDDAF" }} type="FontAwesome" name="pencil" />
                </Button>
            );
            button_delete = (
                <Button transparent
                    onPress={() => {
                        alert('Komentár bude vymazaný.');
                        this.deleteComment(comment.id);
                    }}
                >
                    <Icon style={{ color: "#0FDDAF" }} type="FontAwesome" name="trash" />
                </Button>
            );
        }

        return (
            <Card style={{width: "99%"}}>
                <CardItem bordered>
                    <Body>
                        <Text>{comment.text}</Text>
                    </Body>
                </CardItem>
                <CardItem footer bordered>
                    <Grid>
                        <Col size={50}>
                            <Row>
                                <Moment element={Text} format="YYYY-MM-DD HH:mm">{comment.created_at}</Moment>
                            </Row>
                            <Row>
                                <Text>{comment.user_name} </Text>
                                <Text>{comment.user_surname}</Text>
                            </Row>
                        </Col>
                        <Col size={20}>
                            {comment_not_approved}
                        </Col>
                        <Col style={{alignItems: "flex-end"}} size={15}>
                            {button_edit}
                        </Col>
                        <Col style={{alignItems: "flex-end"}} size={15}>
                            {button_delete}
                        </Col>
                    </Grid>
                </CardItem>
            </Card>
        );
    });

    let reviewElement;
    if (this.state.review != '' && this.state.review.approved_at != null){
        const data = [{title: "Recenzia", content: this.state.review.text}];
        reviewElement = (
            <Accordion
                dataArray={data}
                expanded
                renderHeader={this._renderHeader.bind(this)}
                contentStyle={{ backgroundColor: "#f0f2f5" }}
            />
        )
    }
    else{
        reviewElement = (
            <Button
                style={{backgroundColor: "#0FDDAF", justifyContent: "center", width: "100%", height: 35}}
                onPress={() => {
                    this.props.navigation.navigate("AddReviewScreen", {review: {}, book: this.props.navigation.getParam("book")});
                }}
            >
                <Text>Pridať recenziu</Text>
            </Button>
        )
    }

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
            title={book.name}
            openDrawer={() => this.openDrawer()}
          />
          <Content
            ref={c => (this.component = c)}
            contentContainerStyle={{alignItems: "center"}}
            padder
          >
          <Grid>
            <Col>
                <Row style={{
                         height: 150,
                         borderBottomColor: "#0FDDAF",
                         borderBottomWidth: 1,
                         paddingBottom: 5
                       }}>
                    <Col size={35}>
                        <Image
                            source={images[book.picture_path]}
                            resizeMode="cover"
                            style={{ paddingTop: 3, paddingBottom: 3, height: "100%", width: "100%"}}
                        />
                    </Col>
                    <Col size={65}>
                        <Row size={1}>
                            <H2 style={{ color: "#0FDDAF" }}>{book.name}</H2>
                        </Row>
                        <Row size={1}>
                            <Text>{book.author}</Text>
                        </Row>
                        <Row size={1}>
                                <AirbnbRating
                                    showRating={false}
                                    defaultRating={this.state.rating/this.state.rating_count}
                                    onFinishRating={this.ratingCompleted.bind(this)}
                                />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {reviewElement}
                    </Col>
                </Row>
                <Row style={{marginTop: 10}}>
                    <Col>
                    <H2>Komentáre:</H2>
                    <ListItem>
                    <CheckBox
                        style={{color: "#0FDDAF", marginRight: 30}}
                        checked={this.state.only_mine_checked}
                        onPress={()=>{
                                this.setState({ only_mine_checked: !this.state.only_mine_checked });
                                this.findComments()}
                        }
                    />
                    <Text>Zobraziť moje komentáre</Text>
                    </ListItem>
                    <Item style={{backgroundColor: "#e8ebef"}}>
                        <Input
                            placeholder='Napíšte svoj komentár'
                            onChangeText={text => this.setState({ new_comment_text: text })}
                            value={this.state.new_comment_text}
                        />
                        <Icon style={{ color: "#0FDDAF" }} type="FontAwesome" name="paper-plane"
                              onPress={() => {
                                this.insertComment();
                              }}
                        />
                    </Item>
                    </Col>
                </Row>
                <Row style={{width: "100%"}}>
                    <Col>
                        {commentsElements}
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

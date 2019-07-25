import React, { Component } from "react";
import {
  Title,
  Body,
  Icon,
  Text
} from "native-base";
import { StyleSheet, View , ActivityIndicator } from "react-native";
import moment from "moment";



export default class BooCountDown extends Component {
  constructor(props) {
    super(props);
    var date = moment()
      .utcOffset("+05:30")
      .format("YYYY-MM-DD hh:mm:ss");

      this.state = {
      isLoading : true,
      };

  }

  tick() {
    var date = moment()
      .utcOffset("+05:30")
      .format("YYYY-MM-DD hh:mm:ss");
    var diffr = moment.duration(moment(this.state.expiry).diff(moment(date)));
    //difference of the expiry date-time given and current date-time
    var days = parseInt(diffr.asDays());
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var weeks = parseInt(days/7);
    this.setState(prevState => ({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      weeks: weeks,
      milliseconds: prevState.milliseconds - 1
    }));

    var styles = StyleSheet.create({
      container: {
        backgroundColor: "blue"
      }
    });
  }

  componentDidMount() {
    
  fetch("https://api.jsonbin.io/b/5d39b8f071e1da4952dcf1df")
  .then((response) => response.json())
  .then((data) => {
    var date = moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss");
    var expiry = data.date;
    var diffr = moment.duration(moment(expiry).diff(moment(date)));
   
    this.setState({
      days: "",
      hours: "",
      minutes: "",
      seconds: "",
      weeks: "",
      expiry: expiry,
      milliseconds: diffr.asMilliseconds(),
      isLoading: false
    }, function(){
      this.interval = setInterval(() => this.tick(), 1);
    });
    

  })
  .catch(function(error) {
    console.log(error);
    return "2019-08-29 07:00:45"
  });
    
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }



  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, justifyContent:'center', padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.5, backgroundColor: "powderblue" }}>
          <Body>
            <Title style={{ margin: 8 }}>
              <Icon name="clock" style={{}} /> Boo
            </Title>
          </Body>
        </View>
        <View style={{ flex: 4, flexDirection: "row" }}>
          <View style={{ flex: 2, flexDirection: "column" }}>
            <View style={{ flex: 1, backgroundColor: "#9E9E9E" }}>
              <Text>{this.state.days}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#EC407A" }}>
              <Text>{this.state.days}</Text>
            </View>
          </View>

          <View style={{ flex: 2, flexDirection: "column" }}>
            <View style={{ flex: 2, backgroundColor: "#03A9F4" }}>
              <Text>{this.state.hours}</Text>
            </View>
            <View style={{ flex: 2, backgroundColor: "#8BC34A" }}>
              <Text>{this.state.minutes}</Text>
            </View>
            <View style={{ flex: 2, backgroundColor: "#FF5722" }}>
              <Text>{this.state.seconds}</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, backgroundColor: "steelblue" }}>
          <Text>{this.state.milliseconds}</Text>
        </View>
      </View>
    );
  }
}

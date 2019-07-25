import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base";
import { StyleSheet, View } from "react-native";
import moment from "moment";
import axios from 'axios';


export default class BooCountDown extends Component {
  constructor(props) {
    super(props);
    var date = moment()
      .utcOffset("+05:30")
      .format("YYYY-MM-DD hh:mm:ss");

    //var expirydate = "2019-08-29 07:00:45"
    axios.get('https://riju.co/boo.php')
    .then(response => {
      this.setState({ expiry: response.data.date });
      var diffr = moment.duration(moment(response.data.date).diff(moment(date)));
      var milliseconds = diffr.asMilliseconds();

    })
    .catch(error => {
      this.setState({ expiry:  "2019-08-29 07:00:45" });
      var milliseconds = '99999999';
    });


    //var diffr = moment.duration(moment(expirydate).diff(moment(date)));

   

    this.state = {
      days: "",
      hours: "",
      minutes: "",
      seconds: "",
      weeks: "",
      milliseconds: milliseconds,
    };
  }

  tick() {
    var date = moment()
      .utcOffset("+05:30")
      .format("YYYY-MM-DD hh:mm:ss");

    var expirydate = "2019-08-29 07:00:45";

    var diffr = moment.duration(moment(this.state.expiry).diff(moment(date)));
    //difference of the expiry date-time given and current date-time
    var days = parseInt(diffr.asDays());
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    var weeks = parseInt(diffr.asWeeks());
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
    this.interval = setInterval(() => this.tick(), 1);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
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
            <View style={{ flex: 2, backgroundColor: "#8BC34A" }} >
            <Text>{this.state.minutes}</Text>
            </View>
            <View style={{ flex: 2, backgroundColor: "#FF5722" }} >
            <Text>{this.state.seconds}</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, backgroundColor: "steelblue" }} >
        <Text>{this.state.milliseconds}</Text>

        </View>
      </View>
    );
  }
}

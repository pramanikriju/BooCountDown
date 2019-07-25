import React, { Component } from "react";
import { Title, Body, Icon, Text } from "native-base";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import moment from "moment";

const styles = StyleSheet.create({
  bigBlue: {
    color: "white",
    fontWeight: "bold",
    fontSize: 110
  },
  white: {
    color: "white"
  },
  smallBoo: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50
  },
  boo: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15
  },
  centerAll: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default class BooCountDown extends Component {
  constructor(props) {
    super(props);
    var date = moment()
      .utcOffset("+05:30")
      .format("YYYY-MM-DD hh:mm:ss");

    this.state = {
      isLoading: true
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
    var weeks = parseInt(diffr.asWeeks());
    this.setState(prevState => ({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      weeks: weeks,
      milliseconds: prevState.milliseconds - 1
    }));

  
  }

  componentDidMount() {
    fetch("https://api.jsonbin.io/b/5d39b8f071e1da4952dcf1df")
      .then(response => response.json())
      .then(data => {
        var date = moment()
          .utcOffset("+05:30")
          .format("YYYY-MM-DD hh:mm:ss");
        var expiry = data.date;
        var diffr = moment.duration(moment(expiry).diff(moment(date)));

        this.setState(
          {
            days: "",
            hours: "",
            minutes: "",
            seconds: "",
            weeks: "",
            expiry: expiry,
            milliseconds: diffr.asMilliseconds(),
            isLoading: false
          },
          function() {
            this.interval = setInterval(() => this.tick(), 1);
          }
        );
      })
      .catch(function(error) {
        console.log(error);
        return "2019-08-29 07:00:45";
      });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: "#3F51B5",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3
          }}
        >
          <Body>
            <Title style={{ margin: 8, paddingHorizontal: 15 }}>
              <Icon name="clock" style={{ color: "white" }} /> Boo
            </Title>
          </Body>
        </View>
        <View style={{ flex: 4, flexDirection: "row" }}>
          <View style={{ flex: 2, flexDirection: "column" }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#9E9E9E",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.bigBlue}>{this.state.days}</Text>
              <Text style={styles.white}>Days</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#EC407A",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.bigBlue}>{this.state.weeks}</Text>
              <Text style={styles.white}>Weeks</Text>
            </View>
          </View>

          <View style={{ flex: 2, flexDirection: "column" }}>
            <View
              style={{
                flex: 2,
                backgroundColor: "#03A9F4",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.smallBoo}>{this.state.hours}</Text>
              <Text style={styles.white}>Hours</Text>
            </View>
            <View
              style={{
                flex: 2,
                backgroundColor: "#8BC34A",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.smallBoo}>{this.state.minutes}</Text>
              <Text style={styles.white}>Minutes</Text>
            </View>
            <View
              style={{
                flex: 2,
                backgroundColor: "#FF5722",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.smallBoo}>{this.state.seconds}</Text>
              <Text style={styles.white}>Seconds</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#546E7A",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={styles.smallBoo}>{this.state.milliseconds}</Text>
          <Text style={styles.boo}>Milliseconds</Text>
          <Text style={styles.boo}>(Beause I am thora extra like that)</Text>
        </View>
      </View>
    );
  }
}

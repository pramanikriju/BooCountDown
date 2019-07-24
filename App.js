import React, { Component } from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import moment from 'moment';



export default class GeneralExample extends Component {
  constructor(props) {
    super(props);

    var milliseconds = '';

    this.state = { 
      days : '',
      hours : '',
      minutes : '',
      seconds: '',
      milliseconds: '99999999',
     };
  }

  tick() {
    var date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss');

    var expirydate = '2019-08-29 07:00:45';
    
 
    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    //difference of the expiry date-time given and current date-time
    var days = parseInt(diffr.asDays());
    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    this.setState(prevState => ({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds : prevState.milliseconds -1,
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    return (
      <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='clock' />
          </Button>
        </Left>
        <Body>
          <Title>Boo</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Text>
         {this.state.days}
        </Text>
        <Text>
        {this.state.hours}
        </Text>
        <Text>
        {this.state.minutes}
        </Text>
        <Text>
        {this.state.seconds}
        </Text>
        <Text>
        {this.state.milliseconds}
        </Text>
        <Text>
        {this.state.check}
        </Text>
      
      
      </Content>
    </Container>
    );
  }
}
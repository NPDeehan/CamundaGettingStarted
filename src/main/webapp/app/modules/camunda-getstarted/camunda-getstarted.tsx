import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';
import { Translate } from 'react-jhipster';

class CamundaGettingStarted extends React.Component {
  handleClick(event: MouseEvent) {
    event.preventDefault();
    alert(event.currentTarget.tagName); // alerts BUTTON
  }

  state = {
    count: 0
  };

  nextMod = {
    modeName: 'Nothing'
  };

  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  decrement = () => {
    this.setState({
      count: this.state.count - 1
    });
  };
  engine = () => {
    fetch('/rest/engine', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.nextMod.modeName = 'Set';
  };

  render() {
    return (
      <div>
        <h1>{this.nextMod.modeName}</h1>
        <button onClick={this.engine}>Create a Springboot Project</button>
        <button onClick={this.decrement}>Create a Microserice Project</button>
      </div>
    );
  }
}

export default CamundaGettingStarted;

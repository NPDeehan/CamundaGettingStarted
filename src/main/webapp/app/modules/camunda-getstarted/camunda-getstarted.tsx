import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';
import { Route, Redirect } from 'react-router';
import { Translate } from 'react-jhipster';

class CamundaGettingStarted extends React.Component {
  handleClick(event: MouseEvent) {
    event.preventDefault();
    alert(event.currentTarget.tagName); // alerts BUTTON
  }

  state = {
    count: 0,
    name: 'Nothing',
    ref: false
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
    })
      .then(response => response.json())
      .then(data => this.setState({ name: data[0].name, ref: true }));
  };

  render() {
    if (this.state.ref) {
      return <Redirect to={this.state.name} />;
    } else {
      return (
        <div>
          <h1>{this.state.name}</h1>
          <button onClick={this.engine}>Create a Springboot Project</button>
          <button onClick={this.decrement}>Create a Microserice Project</button>
        </div>
      );
    }
  }
}

export default CamundaGettingStarted;

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
    nextModule: 'Nothing',
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
      .then(data => this.setState({ nextModule: data[0].name, ref: true }));
  };

  render() {
    if (this.state.ref) {
      return <Redirect to={this.state.nextModule} />;
    } else {
      return (
        <div>
          <h1>{this.state.name}</h1>
          <button onClick={this.engine} className="btn btn-primary">
            Create a Springboot Project
          </button>
          <button onClick={this.decrement} className="btn btn-warning  ">
            Create a Microserice Project
          </button>
        </div>
      );
    }
  }
}

export default CamundaGettingStarted;

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
    nextModule: 'fail',
    processInstanceid: '',
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

  startMicroInstance = () => {
    fetch('/rest/process-definition/key/GettingStartedGuide/start/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variables: { arch: { value: 'micro', type: 'String' } }, businessKey: '1' })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ processInstanceid: data.id });
        return fetch(`/rest/task?processInstanceId=${this.processInstanceid}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => response.json())
          .then(data => this.setState({ nextModule: data[0].formKey, ref: true }));
      });
  };
  startSpringBootInstance = () => {
    fetch('/rest/process-definition/key/GettingStartedGuide/start/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variables: { arch: { value: 'springboot', type: 'String' } }, businessKey: '1' })
    })
      .then(response => response.json())
      .then(data => this.setState({ processInstanceid: data.id }));
  };

  render() {
    if (this.state.ref) {
      return <Redirect to={this.state.nextModule} />;
    } else {
      return (
        <div>
          <h1>{this.state.processInstanceid}</h1>
          <button onClick={this.startSpringBootInstance} className="btn btn-primary">
            Create a Springboot Project
          </button>
          <button onClick={this.startMicroInstance} className="btn btn-warning  ">
            Create a Microserice Project
          </button>
        </div>
      );
    }
  }
}

export default CamundaGettingStarted;

import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';
import { Row, Col } from 'reactstrap';
import { Route, Redirect } from 'react-router';
import { Translate } from 'react-jhipster';

class CamundaGettingStarted extends React.Component {
  handleClick(event: MouseEvent) {
    event.preventDefault();
    alert(event.currentTarget.tagName); // alerts BUTTON
  }
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      nextModule: 'fail',
      processInstanceId: '',
      taskId: '',
      ref: false
    };
  }

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
    fetch('/rest/process-definition/key/CamundaStartedGuide/start/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variables: { arch: { value: 'micro', type: 'String' } }, businessKey: '1' })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ processInstanceId: data.id });
        return fetch(`/rest/task?processInstanceId=${data.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => response.json())
          .then(data => this.setState({ nextModule: data[0].formKey, taskId: data[0].id, ref: true }));
      });
  };
  startSpringBootInstance = () => {
    fetch('/rest/process-definition/key/CamundaStartedGuide/start/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variables: { arch: { value: 'springboot', type: 'String' } }, businessKey: '1' })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ processInstanceId: data.id });
        return fetch(`/rest/task?processInstanceId=${data.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => response.json())
          .then(data => this.setState({ nextModule: data[0].formKey, taskId: data[0].id, ref: true }));
      });
  };

  render() {
    if (this.state.ref) {
      return (
        <Redirect
          to={{
            pathname: `/${this.state.nextModule}`,
            state: { processInstanceId: this.state.processInstanceId, taskId: this.state.taskId }
          }}
        />
      );
    } else {
      return (
        <React.Fragment>
          <Row>
            <Col>
              <div>
                <h3>You can Choose to build a project where the engine is remote and you can write independent services</h3>
                <button onClick={this.startMicroInstance} className="btn btn-warning  ">
                  Create a Microserice Project
                </button>
              </div>
            </Col>
            <Col>
              <div>
                <h3>You can also choose to make a springboot project where all of your logic will be in one Java Project</h3>
                <button onClick={this.startSpringBootInstance} className="btn btn-primary">
                  Create a Springboot Project
                </button>
              </div>
            </Col>
          </Row>
        </React.Fragment>
      );
    }
  }
}

export default CamundaGettingStarted;

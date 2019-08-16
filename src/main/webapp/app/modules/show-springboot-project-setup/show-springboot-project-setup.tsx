import React, { Component } from 'react';
import { Redirect } from 'react-router';

class ShowSpringbootProjectSetup extends Component {
  state = {
    nextModule: '',
    ref: false,
    taskId: '',
    processInstanceId: '',
    lang: 'Java'
  };
  userLost = () => {
    fetch(`/rest/task/${this.props.location.state.taskId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variables: { lost: { value: true, type: 'Boolean' } } })
    }).then(data => {
      return fetch(`/rest/task?processInstanceId=${this.props.location.state.processInstanceId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(data => this.setState({ nextModule: data[0].formKey, taskId: data[0].id, ref: true }));
    });
  };

  completeTask = () => {
    fetch(`/rest/task/${this.props.location.state.taskId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variables: { arch: { value: 'micro', type: 'String' } }, withVariablesInReturn: true })
    }).then(data => {
      return fetch(`/rest/task?processInstanceId=${this.props.location.state.processInstanceId}`, {
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
            state: {
              processInstanceId: this.props.location.state.processInstanceId,
              taskId: this.state.taskId,
              lang: this.state.lang
            }
          }}
        />
      );
    } else {
      return (
        <React.Fragment>
          <div>
            <h1>Spring Boot Project Setup</h1>
            <p>Here are some basic requirements to lift off with Camunda and Spring Boot.</p>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">IDE (e.g. Intellij IDEA or Eclipse)</li>
              <li className="list-group-item d-flex justify-content-between align-items-center">Maven</li>
              <li className="list-group-item d-flex justify-content-between align-items-center">JDK</li>
            </ul>
          </div>
          <div>
            <button onClick={this.completeTask} className="btn btn-primary">
              Go to Next Step
            </button>
            <button onClick={this.userLost} className="btn btn-danger">
              Are you Having trouble?
            </button>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default ShowSpringbootProjectSetup;

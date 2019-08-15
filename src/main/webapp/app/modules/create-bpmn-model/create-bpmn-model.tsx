import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Row, Col, Alert } from 'reactstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactBpmn from 'react-bpmn';

class CreateBpmnModel extends Component {
  state = {
    count: 0,
    nextModule: '',
    ref: false,
    taskId: '',
    processInstanceId: '',
    lang: 'Java'
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
      body: JSON.stringify({ variables: { model: { value: 'ModelBuilt', type: 'String' } } })
    }).then(data => {
      return fetch(`/rest/task?processInstanceId=${this.props.location.state.processInstanceId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(data => this.setState({ nextModule: data[0].formKey, taskId: data[0].id, ref: true }));
    });
  };
  setLang = event => {
    console.log(event);
    this.setState({ lang: event.target.value });
  };

  render() {
    if (this.state.ref) {
      return (
        <Redirect
          to={{
            pathname: `/${this.state.nextModule}`,
            state: { processInstanceId: this.props.location.state.processInstanceId, taskId: this.state.taskId, lang: this.state.lang }
          }}
        />
      );
    } else {
      return (
        <React.Fragment>
          <div>
            <h1>Build a BPMN Model</h1>
            <h4>Using the camunda modeler model the following process</h4>
          </div>

          <br />
          <br />
          <iframe
            src="https://cawemo.com/embed/e9be88c1-31c0-4a11-a0b1-e111892fd92a"
            style={{ width: '1500px', height: '500px', border: '1px solid #ccc' }}
            allowfullscreen
          />

          <div class="alert alert-dismissible alert-info">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            <h4 class="alert-heading">Would you like to see a BPMN Reference page?</h4>
            <p class="mb-0">
              <a href="https://docs.camunda.org" class="alert-link" target="_blank">
                just because its cool
              </a>
              .
            </p>
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
export default CreateBpmnModel;

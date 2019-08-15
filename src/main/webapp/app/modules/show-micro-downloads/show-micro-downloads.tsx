import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Row, Col, Alert } from 'reactstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const code = `
              const { Client, logger } = require("camunda-external-task-client-js");
                                                           
              // configuration for the Client:
              //  - 'baseUrl': url to the Workflow Engine
             //  - 'logger': utility to automatically log important events
             const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };
                                                           
               // create a Client instance with custom configuration
                const client = new Client(config);
                                                           
               // susbscribe to the topic: 'creditScoreChecker'
              client.subscribe("creditScoreChecker", async function({ task, taskService }) {
              // Put your business logic
              // complete the task
              await taskService.complete(task);
            }); `;

class ShowMicroDownloads extends Component {
  state = {
    count: 0,
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

  completeTask = () => {
    fetch(`/rest/task/${this.props.location.state.taskId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variables: { lang: { value: 'Java', type: 'String' } } })
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
            <h1>External Client</h1>
            <h4>With the camunda planform running you're going to need to somehow communicate with it</h4>
          </div>

          <br />
          <br />
          <div class="card text-white bg-primary mb-3">
            <div class="card-header">JavaScript Worker</div>
            <div class="card-body">
              <h4 class="card-title">Copy this code and run it with node</h4>
              <p class="card-text">
                {' '}
                <SyntaxHighlighter language="javascript" style={docco}>
                  {code}
                </SyntaxHighlighter>{' '}
              </p>
            </div>
          </div>

          <div class="alert alert-dismissible alert-warning">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            <h4 class="alert-heading">Having problems?</h4>
            <p class="mb-0">
              {' '}
              you probably need node
              <a href="https://nodejs.org/en/download/" class="alert-link" target="_blank">
                Download Here
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
export default ShowMicroDownloads;

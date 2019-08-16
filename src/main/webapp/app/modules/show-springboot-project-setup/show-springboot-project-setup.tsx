import React, { Component } from 'react';
import { Redirect } from 'react-router';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const code = `
package org.camunda.bpm.getstarted.loanapproval;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WebappExampleProcessApplication {
\tpublic static void main(String... args) {
\t\tSpringApplication.run(WebappExampleProcessApplication.class, args);
\t}
}`;

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
            <h2>Add Main Class to our Spring Boot Application</h2>
            <p>
              Next, we add an application class with a main method that will be the entry point for launching the Spring Boot application.
              The class has the annotation @SpringBootApplication on it, which implicitly adds several convenient features
              (autoconfiguration, component scan, etc. - see Spring Boot docs). The class is added in the src/main/java folder in the
              org.camunda.bpm.getstarted.loanapproval package.
            </p>
            <p className="card-text">
              {' '}
              <SyntaxHighlighter language="java" style={docco}>
                {code}
              </SyntaxHighlighter>{' '}
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

export default ShowSpringbootProjectSetup;

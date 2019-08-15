import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Row, Col, Alert } from 'reactstrap';

class ShowMicroRequirement extends Component {
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
            <h1>Now you've got a choice to make</h1>
            <h4>Select the programing language you'd like to use for this getting started guide</h4>
          </div>
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class={this.state.lang === 'Java' ? 'btn btn-primary active' : 'btn btn-primary'}>
              Java
              <input checked={this.state.lang === 'Java'} value="Java" type="radio" name="options" id="option1" onChange={this.setLang} />
            </label>
            <label class={this.state.lang === 'JavaScript' ? 'btn btn-primary active' : 'btn btn-primary'}>
              JavaScript
              <input
                checked={this.state.lang === 'JavaScript'}
                value="JavaScript"
                type="radio"
                name="options"
                id="option2"
                onChange={this.setLang}
              />
            </label>
            <label class={this.state.lang === 'Python' ? 'btn btn-primary active' : 'btn btn-primary'}>
              I don't care
              <input
                checked={this.state.lang === 'Python'}
                value="Python"
                type="radio"
                name="options"
                id="option3"
                onChange={this.setLang}
              />
            </label>
          </div>
          <br />
          <br />
          <h4>No matter which language you pick, you're doing to need the Camunda Engine</h4>
          <br />
          <br />
          <div class="alert alert-dismissible alert-info">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            <h4 class="alert-heading">Time to Get Camunda!</h4>
            <p class="mb-0">
              <a
                href="https://camunda.org/release/camunda-bpm/tomcat/7.11/camunda-bpm-tomcat-7.11.0.zip?__hstc=252030934.3ccc2533575ddaceedbbf9babbbf837e.1553783104470.1565305832951.1565877799069.9&__hssc=252030934.1.1565877799069&__hsfp=3195920900"
                class="alert-link"
              >
                download here
              </a>
              .
            </p>
          </div>
          <div class="alert alert-dismissible alert-info">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            <h4 class="alert-heading">Java Download</h4>
            <p class="mb-0">
              In order to run Camunda you're going to need to download{' '}
              <a href="https://openjdk.java.net/install/" class="alert-link">
                the Java OpenJDK
              </a>
              .
            </p>
          </div>
          <div class="alert alert-dismissible alert-info">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            <h4 class="alert-heading">You should also get Opera</h4>
            <p class="mb-0">
              <a href="https://www.opera.com/download" class="alert-link">
                just because its cool
              </a>
              .
            </p>
          </div>

          <div>
            <button onClick={this.completeTask} className="btn btn-primary">
              Go to Next Step
            </button>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default ShowMicroRequirement;

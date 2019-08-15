import React, { Component } from 'react';
import { Redirect } from 'react-router';

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
      body: JSON.stringify({ variables: { arch: { value: 'micro', type: 'String' } } })
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
            <h1>ID IS</h1>
            <h1>{this.props.location.state.taskId}</h1>
            <button onClick={this.completeTask} className="btn btn-primary">
              Go to Next Step
            </button>
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
        </React.Fragment>
      );
    }
  }
}

export default ShowMicroRequirement;

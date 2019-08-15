import React, { Component } from 'react';
import { Redirect } from 'react-router';

class ShowMicroRequirement extends Component {
  state = {
    count: 0,
    nextModule: '',
    taskId: ''
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
    fetch(`/rest/task/${this.state.taskId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variables: { arch: { value: 'micro', type: 'String' } }, businessKey: '1' })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ processInstanceid: data.processInstanceId });
        return fetch(`/rest/task?processInstanceId=${data.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => response.json())
          .then(data => this.setState({ nextModule: data[0].formKey, ref: true }));
      });
  };

  render() {
    if (this.state.nextModule) {
      return <Redirect to={this.state.nextModule} />;
    } else {
      return (
        <div>
          <h1>{this.state.nextModule}</h1>
          <button onClick={this.completeTask} className="btn btn-primary">
            Go to Next Step
          </button>
        </div>
      );
    }
  }
}

export default ShowMicroRequirement;

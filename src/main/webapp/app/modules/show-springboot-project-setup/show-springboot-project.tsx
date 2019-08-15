import React, { Component } from 'react';
import { Redirect } from 'react-router';

class ShowSpringbootProject extends Component {
  state = {
    count: 0,
    nextModule: ''
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
    if (this.state.nextModule) {
      return <Redirect to={this.state.nextModule} />;
    } else {
      return (
        <div>
          <h1>{this.state.nextModule}</h1>
          <button onClick={this.engine} className="btn btn-primary">
            Go to Next Step
          </button>
        </div>
      );
    }
  }
}

export default ShowSpringbootProject;

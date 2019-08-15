import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Row, Col, Alert } from 'reactstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

class SuggestADifferentGuide extends Component {
  state = {
    count: 0,
    nextModule: '',
    ref: false,
    taskId: '',
    processInstanceId: '',
    lang: 'Java'
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
            <h1>Im Sorry you're not having fun</h1>
          </div>

          <br />
          <br />

          <div class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            <h4 class="alert-heading">Hope this will help</h4>
            <p class="mb-0">
              <a href="https://www.youtube.com/embed/oHg5SJYRHA0?autoplay=1" class="alert-link">
                We've greated a guide you might like more Escape this way
              </a>
              .
            </p>
          </div>
        </React.Fragment>
      );
    }
  }
}
export default SuggestADifferentGuide;

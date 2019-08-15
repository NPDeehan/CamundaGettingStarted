import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Row, Col, Alert } from 'reactstrap';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const code = `
            package org.camunda.bpm.getstarted.chargecard;
            
            import java.util.logging.Logger;
            
            import org.camunda.bpm.client.ExternalTaskClient;
            
            public class ChargeCardWorker {
              private final static Logger LOGGER = Logger.getLogger(ChargeCardWorker.class.getName());
            
              public static void main(String[] args) {
                ExternalTaskClient client = ExternalTaskClient.create()
                    .baseUrl("http://localhost:8080/engine-rest")
                    .asyncResponseTimeout(10000) // long polling timeout
                    .build();
            
                // subscribe to an external task topic as specified in the process
                client.subscribe("charge-card")
                    .lockDuration(1000) // the default lock duration is 20 seconds, but you can override this
                    .handler((externalTask, externalTaskService) -> {
                      // Put your business logic here
            
                      // Get a process variable
                      String item = (String) externalTask.getVariable("item");
                      Long amount = (Long) externalTask.getVariable("amount");
                      LOGGER.info("Charging credit card with an amount of '" + amount + "'€ for the item '" + item + "'...");
            
                      // Complete the task
                      externalTaskService.complete(externalTask);
                    })
                    .open();
              }
            } `;

class ShowMicroDownloadsJava extends Component {
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
            <h1>External Client</h1>
            <h4>With the camunda planform running you're going to need to somehow communicate with it</h4>
          </div>

          <br />
          <br />
          <div class="card text-white bg-primary mb-3">
            <div class="card-header">Java Worker</div>
            <div class="card-body">
              <h4 class="card-title">put the following class inside a maven project</h4>
              <p class="card-text">
                {' '}
                <SyntaxHighlighter language="java" style={docco}>
                  {code}
                </SyntaxHighlighter>{' '}
              </p>
            </div>
          </div>

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
export default ShowMicroDownloadsJava;

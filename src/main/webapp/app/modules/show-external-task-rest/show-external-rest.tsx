import React, { Component } from 'react';
import { Redirect } from 'react-router';
import RestCallView from './restCallView';

class ShowExternalTaskRest extends Component {
  state = {
    count: 0,
    nextModule: ''
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

  render() {
    const getBeautifulJson = data => {
      return JSON.stringify(data, null, 4)
        .split(',')
        .map((elem, index) => {
          return <div>{elem}</div>;
        });
    };

    const view = {
      first: {
        example: 'http://localhost:8080/rest/external-task?topic=myTopic',
        description: 'Here you should get a list of open tasks for the type of the topic of your worker.',
        link: 'https://docs.camunda.org/manual/latest/reference/rest/external-task/get-query/',
        exampleResponse: getBeautifulJson([
          {
            activityId: 'anActivityId',
            activityInstanceId: 'anActivityInstanceId',
            errorMessage: 'anErrorMessage',
            errorDetails: 'anErrorDetails',
            executionId: 'anExecutionId',
            id: 'anExternalTaskId',
            lockExpirationTime: '2015-10-06T16:34:42.000+0200',
            processDefinitionId: 'aProcessDefinitionId',
            processDefinitionKey: 'aProcessDefinitionKey',
            processInstanceId: 'aProcessInstanceId',
            tenantId: null,
            retries: 3,
            suspended: false,
            workerId: 'aWorkerId',
            topicName: 'aTopic',
            priority: 9,
            businessKey: 'aBusinessKey'
          }
        ])
      },
      second: {
        example: 'http://localhost:8080/rest/external-task/fetchAndLock',
        description:
          'This time you are communicating to the engine that yoa are a special worker and that are there to complete x amount of tasks.',
        link: 'https://docs.camunda.org/manual/latest/reference/rest/external-task/fetch/',
        exampleResponse: getBeautifulJson([
          {
            activityId: 'anActivityId',
            activityInstanceId: 'anActivityInstanceId',
            errorMessage: 'anErrorMessage',
            errorDetails: 'anErrorDetails',
            executionId: 'anExecutionId',
            id: 'anExternalTaskId',
            lockExpirationTime: '2015-10-06T16:34:42.000+0200',
            processDefinitionId: 'aProcessDefinitionId',
            processDefinitionKey: 'aProcessDefinitionKey',
            processInstanceId: 'aProcessInstanceId',
            tenantId: null,
            retries: 3,
            workerId: 'aWorkerId',
            priority: 4,
            topicName: 'createOrder',
            variables: {
              orderId: {
                type: 'String',
                value: '1234',
                valueInfo: {}
              }
            }
          }
        ])
      },
      third: {
        example: 'http://localhost:8080/rest/external-task/{id}/complete',
        description:
          'This action should be executed after finishing whatever work had to be done and marks the end of the existence of this task instance.',
        link: 'https://docs.camunda.org/manual/latest/reference/rest/external-task/post-complete/',
        exampleResponse: '204 No Content.'
      }
    };
    if (this.state.nextModule) {
      return <Redirect to={this.state.nextModule} />;
    } else {
      return (
        <React.Fragment>
          <div>
            <h2>Introduction</h2>
            <div>
              <div>
                In this chapter you will learn which rest-endpoints are available to call in order to work with the external-task-worker
                concept.
              </div>
              <div>The most important calls for beginners are the call to get the open external tasks for your topic.</div>
              <div>You then have to tell the engine that your worker is now working on it and afterwards completing it.</div>
              <div>This is done by executing following commands to the rest-endpoint of the engine:</div>
            </div>
            <RestCallView
              topic="GET /external-task"
              example={view.first.example}
              description={view.first.description}
              exampleResponse={view.first.exampleResponse}
              link={view.first.link}
            />
            <RestCallView
              topic="POST /external-task/fetchAndLock"
              example={view.second.example}
              description={view.second.description}
              exampleResponse={view.second.exampleResponse}
              link={view.second.link}
            />
            <RestCallView
              topic="POST /external-task/{id}/complete"
              example={view.third.example}
              description={view.third.description}
              exampleResponse={view.third.exampleResponse}
              link={view.third.link}
            />
            <div>
              <label />
            </div>
          </div>

          <a target="_blank" href="https://docs.camunda.org/manual/latest/reference/rest/external-task/">
            More information on the rest-endpoints
          </a>

          <div>
            <h1>{this.state.nextModule}</h1>
            <button className="btn btn-primary">Go to Next Step</button>
            <button onClick={this.userLost} className="btn btn-danger">
              Are you Having trouble?
            </button>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default ShowExternalTaskRest;

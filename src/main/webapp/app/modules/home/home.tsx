import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { Redirect } from 'react-router';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

import React, { Component, MouseEvent } from 'react';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  state = {
    nextModule: '',
    ref: false,
    taskId: '',
    processInstanceId: ''
  };

  componentDidMount() {
    this.props.getSession();
  }
  continue = () => {
    fetch(`/rest/task?processInstanceBusinessKey=${this.props.account.login}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data =>
        this.setState({ nextModule: data[0].formKey, taskId: data[0].id, processInstanceId: data[0].processInstanceId, ref: true })
      );
  };

  render() {
    const { account } = this.props;
    if (this.state.ref) {
      return (
        <Redirect
          to={{
            pathname: `/${this.state.nextModule}`,
            state: { processInstanceId: this.state.processInstanceId, taskId: this.state.taskId }
          }}
        />
      );
    } else {
      return (
        <Row>
          <Col md="9">
            <h2>
              <Translate contentKey="home.title">Welcome To The Camunda Getting Started Guide</Translate>
            </h2>
            <p className="lead">
              <Translate contentKey="home.subtitle">This is how to build your first Camunda process</Translate>
            </p>
            <div>
              <Alert color="info">
                <Link to="/camunda-getstarted" className="alert-link">
                  <Translate contentKey="home.link.getStarted">Register a new account</Translate>
                </Link>
              </Alert>
            </div>
            {account && account.login ? (
              <div>
                <div>
                  <button onClick={this.continue} className="btn btn-warning">
                    Continue Your Progress
                  </button>
                </div>
                <br />
                <Alert color="success">
                  <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                    You are logged in as user {account.login}.
                  </Translate>
                </Alert>

                <br />
              </div>
            ) : (
              <div>
                <Alert color="warning">
                  <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
                  <Link to="/login" className="alert-link">
                    <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
                  </Link>
                </Alert>

                <Alert color="warning">
                  <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
                  <Link to="/register" className="alert-link">
                    <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
                  </Link>
                </Alert>
              </div>
            )}

            <p>
              <Translate contentKey="home.question">If you have any question on JHipster:</Translate>
            </p>

            <ul>
              <li>
                <a href="/camunda-getstarted" target="_blank" rel="noopener noreferrer">
                  <Translate contentKey="home.link.getStarted">Get Started With Camunda!</Translate>
                </a>
              </li>
            </ul>
          </Col>
          <Col md="3" className="pad">
            <span className="hipster rounded" />
          </Col>
        </Row>
      );
    }
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

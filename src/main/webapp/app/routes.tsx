import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import CamundaGetStarted from 'app/modules/camunda-getstarted/camunda-getstarted';
import ShowMicroDownloads from 'app/modules/show-micro-downloads/show-micro-downloads';
import ShowMicroRequirement from 'app/modules/show-micro-requirement/show-micro-requirement';
import ShowExternalTaskRest from 'app/modules/show-external-task-rest/show-external-rest';
import ShowSpringbootProject from 'app/modules/show-springboot-project-setup/how-springboot-project-setup';
import ShowSpringbootRequirement from 'app/modules/show-springboot-requirement/show-springboot-requirement';
import CreateExternalClient from 'app/modules/create-external-client/create-external-client';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';

// tslint:disable:space-in-parens
const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => <div>loading ...</div>
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>
});
// tslint:enable

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorBoundaryRoute path="/camunda-getstarted" component={CamundaGetStarted} />
      <ErrorBoundaryRoute path="/create-external-client" component={CreateExternalClient} />
      <ErrorBoundaryRoute path="/show-micro-downloads" component={ShowMicroDownloads} />
      <ErrorBoundaryRoute path="/show-micro-requirement" component={ShowMicroRequirement} />
      <ErrorBoundaryRoute path="/show-external-task-rest" component={ShowExternalTaskRest} />
      <ErrorBoundaryRoute path="/show-springboot-project-setup" component={ShowSpringbootRequirement} />
      <ErrorBoundaryRoute path="/show-springboot-requirement" component={ShowSpringbootRequirement} />
      <ErrorBoundaryRoute path="/login" component={Login} />
      <ErrorBoundaryRoute path="/logout" component={Logout} />
      <ErrorBoundaryRoute path="/register" component={Register} />
      <ErrorBoundaryRoute path="/activate/:key?" component={Activate} />
      <ErrorBoundaryRoute path="/reset/request" component={PasswordResetInit} />
      <ErrorBoundaryRoute path="/reset/finish/:key?" component={PasswordResetFinish} />
      <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/account" component={Account} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <PrivateRoute path="/entity" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <ErrorBoundaryRoute path="/" exact component={Home} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;

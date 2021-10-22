/*
 * @Author: your name
 * @Date: 2021-07-05 16:12:25
 * @LastEditTime: 2021-10-22 15:59:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tags/webpack/src/router/index.js
 */
import React, { lazy, Suspense, Component } from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
const Home = lazy(() => import('@/pages/app'));
const Login = lazy(() => import('@/pages/login/'));
const Mine = lazy(() => import('@/pages/mine/'));

export default class RouterConfig extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/mine" component={Mine}></Route>
            <Redirect to="/"></Redirect>
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

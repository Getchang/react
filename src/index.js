/*
 * @Author: your name
 * @Date: 2021-06-24 16:40:19
 * @LastEditTime: 2021-07-08 14:15:20
 * @LastEditors: Please set LastEditors
 * @FilePath: /tags/webpack/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './app.js'
import Router from './router/index'
ReactDOM.render(
  <Router />,
  document.getElementById('app')
)
if (module.hot) {
  module.hot.accept();
}
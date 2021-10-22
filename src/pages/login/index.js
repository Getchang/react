/*
 * @Author: your name
 * @Date: 2021-07-08 11:06:27
 * @LastEditTime: 2021-07-22 14:55:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tags/webpack/src/login/index.js
 */
import React, {Component} from 'react'
import Api from '@/utils/'
export default class Login extends Component{
  render() {
    console.log(Api)
    return (
      <div>这是登录页面</div>
    )
  }
}
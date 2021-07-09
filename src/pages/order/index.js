/*
 * @Author: your name
 * @Date: 2021-07-08 11:06:27
 * @LastEditTime: 2021-07-09 09:30:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tags/webpack/src/login/index.js
 */
import React, {Component, Fragment} from 'react'
import Foot from '@/components/footer/'
import Head from '@/components/header/'
export default class Order extends Component{
  render() {
    return (
      <Fragment>
        <Head></Head>
        <div>这是订单页面</div> 
        <Foot></Foot>
      </Fragment>
    )
  }
}
/*
 * @Author: your name
 * @Date: 2021-07-08 17:14:47
 * @LastEditTime: 2021-07-08 17:15:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /tags/webpack/src/utils/index.js
 */
const Api = {
  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
    }
    return(false);
  },
  // 设置cookie
  setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ";expires=" + exdate.toGMTString()
  },
  // 读取cookie
  getCookie(c_name) {
    let cookiestring = document.cookie
    if (cookiestring.length > 0) {
      let c_start, c_end
      c_start = cookiestring.indexOf(c_name + "=")
      if (c_start != -1){
        c_start = c_start + c_name.length + 1
        c_end = cookiestring.indexOf(";", c_start)
        if (c_end == -1){
          c_end = cookiestring.length
          return unescape(cookiestring.substring(c_start))
        } else {
          return unescape(cookiestring.substring(c_start, c_end))
        }
      }
    }
  },
  // 清除cookie
  clearCookie(name) {
    this.setCookie(name, "", -1);
  }
}
export default Api
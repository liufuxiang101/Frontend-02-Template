import request from '../utils/request'
import qs from 'query-string'

const urls = {
  API: '/api'
}

const http = {
  post: '',
  get: ''
}

/*
 * get 请求
 */
http.get = (url, param) => {
  const paramObj = qs.stringify(param)

  console.log(paramObj)

  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      url: urls.API + url + (paramObj ? '?' + paramObj : ''),
      headers: {}
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/*
 * post 请求
 */
http.post = (url, param, data) => {
  const paramObj = qs.stringify(param)
  const dataObj = JSON.stringify(data)

  console.log(paramObj)
  console.log(JSON.stringify(data))

  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      url: urls.API + url + (paramObj ? '?' + paramObj : ''),
      data: dataObj,
      headers: {}
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default http

import axios from 'axios'
//创建axios实例
const request = axios.create({
  baseURL: '/api', 
  timeout: 5000,
})
//请求拦截
request.interceptors.request.use(
    config => {
        if (config.method === 'post'){
            config.data = {
                version:"1",
                requestTime:"111",
                source:"",
                ...config.data
            }
        }
        config.headers['autoToken'] = localStorage.getItem("autoToken")
        config.headers['Authorization'] = localStorage.getItem("Authorization")
      return config
    },
    error => {
      // do something with request error
      return Promise.reject(error)
    }
  )
//响应拦截
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    //提示错误信息
    //...
    return Promise.reject(error)
  },
)
//对外暴露
export default request
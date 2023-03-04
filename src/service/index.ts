import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //针对实例对象，添加每个实例特有的拦截器
  interceptors: {
    requestInterceptor: (config) => {
      const token = ''
      if (token) {
        config.headers.Authorization = 'Bearer'
      }
      console.log('请求成功的拦截')
      //请求拦截时具体要执行的代码，就可以在这里编写
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
  //可定义一个个hook(拦截器)来当作参数传入对象
})
export default hyRequest

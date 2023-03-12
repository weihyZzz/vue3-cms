import HYRequest from './request'
import localCache from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './request/config'
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //针对实例对象，添加每个实例特有的拦截器
  interceptors: {
    requestInterceptor: (config) => {
      //  携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      //请求拦截时具体要执行的代码，就可以在这里编写
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
  //可定义一个个hook(拦截器)来当作参数传入对象
})
export default hyRequest

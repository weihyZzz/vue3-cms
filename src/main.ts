import { createApp } from 'vue'

//全局引用
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import './service/axios_demo'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global/index'
import hyRequest from './service'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(globalRegister)
// app.use(ElementPlus)
app.mount('#app')
// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     }
//   }
// })
hyRequest.request({
  url: '/home/multidata',
  method: 'GET',
  headers: {},
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单独请求的config')
      config.headers['token'] = '123'
      return config
    },
    responseInterceptor: (res) => {
      console.log('单独响应的response')
      return res
    }
  }
})

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

hyRequest
  .request<DataType>({
    url: '/home/multidata',
    showLoading: false
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })

// hyRequest.get()

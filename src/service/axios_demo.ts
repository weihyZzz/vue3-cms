import axios from 'axios'

//1.模拟get请求
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res.data)
})
// 2.带参数的get请求
axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'admin',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

// 3.post请求
// axios
//   .get('http://httpbin.org/post', {
//     data: {
//       name: 'admin',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// 4.axios可进行全局配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000

// 5.axios.all，发送多个请求
// axios
//   .all([
//     axios.get('/get', { params: { name: 'admin', age: 18 } }),
//     axios.post('/post', { params: { name: 'admin', age: 18 } })
//   ])
//   .then((res) => {
//     console.log(res[0])
//     console.log(res[1])
//   })

axios.interceptors.request.use(
  (config) => {
    // 想做的一些操作
    // 1.给请求添加token
    // 2.isLoading动画
    console.log('请求成功的拦截')
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)

// fn1: 数据响应成功(服务器正常的返回了数据 20x)
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)

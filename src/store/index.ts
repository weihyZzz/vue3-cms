import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'

import login from './login/login'
//createStore可以传入一个类型,来限制state中的成员
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'why',
      age: 23
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store

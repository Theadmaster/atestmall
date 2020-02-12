import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false
// 原型prototype  Vue实例可作为一个事件总线  添加事件总线对象
Vue.prototype.$bus = new Vue({
})
// 安装 toast插件
Vue.use(toast)

// 解决移动端300ms延迟问题
FastClick.attach(document.body)

// 使用懒加载的组件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import DB from './db.js'
Vue.use(DB)

export const eventBus = new Vue();

new Vue({
  el: '#app',
  data: {
  	hello: "hello"
  },
  render: h => h(App)
})

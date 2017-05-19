import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import Util from './utilPlugin';

Vue.use(VueResource);
Vue.use(Util);

new Vue({
  el: '#app',
  render: h => h(App)
})

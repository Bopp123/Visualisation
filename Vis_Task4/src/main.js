import Vue from 'vue'
import App from './App.vue'
import Util from './utilPlugin';

Vue.use(Util);

export const eventBus = new Vue();

var CanvasJS = "";

new Vue({
  el: '#app',
  render: h => h(App)
})

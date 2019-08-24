import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import routes from './routes';

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router
}).$mount('#app');

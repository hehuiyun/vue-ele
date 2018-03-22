import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
// 引入子组件到路由
import goods from './components/goods/goods';
import seller from './components/seller/seller';
import ratings from './components/ratings/ratings';

import './common/stylus/index.styl';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);

let router = new VueRouter({
  routes: [
    {path: '/goods', component: goods},
    {path: '/seller', component: seller},
    {path: '/ratings', component: ratings}
  ],
  linkActiveClass: 'active'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
});

router.push('./goods');

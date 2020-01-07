import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

var Router = (VueRouter as any)
// 扩展openPage方法
Router.prototype.openPage = function(link : string, query :Object) {
  const meta = this.currentRoute.meta;
  meta.time = new Date().getTime();
  this.push({
    path: link,
    query,
  });
};

const routes = [
  {
    path: '/',
    name: 'Load',
    component: () => import(/* webpackChunkName: "about" */ '../views/Load.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

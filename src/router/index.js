import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import CItStore from "../components/ItStore";
import CShoppingCart from "../components/ShoppingCart";
import CCheckOut from "../components/CheckOut";
import COrderResult from "../components/OrderResult";

const CLogin = () => import(/* webpackChunkName: "admin" */"../components/admin/Login");
const CAdmin = () => import(/* webpackChunkName: "admin" */"../components/admin/Admin");
const CProductAdmin = () => import(/* webpackChunkName: "admin" */'../components/admin/ProductAdmin');
const CProductEditor = () => import(/* webpackChunkName: "admin" */'../components/admin/ProductEditor');
const COrderAdmin = () => import(/* webpackChunkName: "admin" */'../components/admin/OrderAdmin');

import { store } from '../store';

export const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes: [
    { path: '/', component: CItStore },
    { path: '/cart', component: CShoppingCart },
    { path: '/checkout', component: CCheckOut },
    { path: '/result/:id', component: COrderResult },
    { path: '/login', component: CLogin },
    { path: '/admin', component: CAdmin, 
      beforeEnter(to, from, next) {
        if (store.state.auth.authenticated) {
          next();
        } else {
          next('/login');
        }
      },
      children: [
        {path: 'products/:op(create|edit)/:id(\\d+)?', component: CProductEditor},   
        {path: 'products', component: CProductAdmin},   
        {path: 'orders', component: COrderAdmin}, 
        {path: '', redirect: '/admin/products'}
      ] },
    { path: '*', redirect: '/' },
  ]
});
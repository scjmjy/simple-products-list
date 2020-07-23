import Vue from 'vue';
import Axios from 'axios';

const ORDERS_URL = '/api/orders';

export default{
  namespaced: true,
  state: {
    sOrders: []
  },
  mutations: {
    muSetOrders(state, data) {
      state.sOrders = data;
    },
    muChangeOrderShipped(state, payload) {
      (state);
      // payload.order.shipped = payload.shipped;
      Vue.set(payload.order, 'shipped', payload.shipped);
    }
  },
  actions: {
    async aSaveRemoteOrder(ctx, order) {
      order.orderLines = ctx.rootState.cart.sOrderLines;
      return ( await Axios.post(ORDERS_URL, order)).data.id;
    },
    async aLoadRemoteOrders(ctx) {
      const orders = (await ctx.rootGetters['auth/authenticatedAxios'].get(ORDERS_URL)).data;
      ctx.commit('muSetOrders', orders);
    },
    async aShipOrder(ctx, order) {
      ctx.commit('muChangeOrderShipped', {order:order,shipped:order.shipped == null ? true : !order.shipped});
      await ctx.rootGetters['auth/authenticatedAxios'].put(`${ORDERS_URL}/${order.id}`, order);
    }
  }
};
<template>
  <div>
    <h4 class="bg-info text-white text-center p-2">所有订单</h4>
    <div class="form-group text-center">
      <input id="cb-show-shipped" class="form-check-input" type="checkbox" v-model="dShowShipped">
      <label for="cb-show-shipped" class="form-check-label">显示已发货的订单</label>
    </div>
    <table class="table table-sm table-bordered">
      <thead>
        <tr>
          <th>订单号</th><th>客户名</th><th>城市</th><th>总金额</th><th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="cDisplayOrders.length == 0">
          <td colspan="5">没有订单信息</td>
        </tr>
        <tr v-for="order of cDisplayOrders" :key="order.id">
          <td>{{order.id}}</td>
          <td>{{order.name}}</td>
          <td>{{order.city}}</td>
          <td class="text-right">{{mGetTotal(order) | fCurrency}}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-danger" @click="mShipOrder(order)">{{order.shipped ? '已发货' : '未发货'}}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      dShowShipped: false
    };
  },
  computed: {
    ...mapState({
      cOrders: state => state.orders.sOrders
    }),
    cDisplayOrders() {
      return this.dShowShipped ? this.cOrders : this.cOrders.filter(o => !o.shipped);
    }
  },
  methods: {
    ...mapActions({
      mLoadRemoteOrders: 'orders/aLoadRemoteOrders',
      mShipOrder: 'orders/aShipOrder'
    }),
    mGetTotal(order) {
      if (order.orderLines == null || order.orderLines.length == 0) {
        return 0;
      }
      return order.orderLines.reduce( (total, line) => total + line.quantity*line.product.price, 0 );
    }
  },
  created() {
    this.mLoadRemoteOrders();
  }
};

</script>

<style>

</style>
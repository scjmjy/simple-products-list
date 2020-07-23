<template>
  <div class="container">
    <div class="row">
      <div class="col bg-dark text-white">
        <a class="navbar-barnd">Online Store for IT</a>
      </div>
    </div>
    <div class="row">
      <div class="col mt-2">
        <h2 class="text-center">你的购物车</h2>
        <table class="table table-bordered table-striped p-2">
          <thead>
            <tr>
              <th>数量</th>
              <th>商品名</th>
              <th class="text-right">单价</th>
              <th class="text-right">小计</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="cLines.length == 0">
              <td colspan="5" class="text-center">
                您的购物车是空的，去<router-link to="/">买点东西</router-link>吧
              </td>
            </tr>
            <COrderLine v-for="line of cLines" :key="line.product.id" :pLine="line" @eQuantity="mChangeQuantity(line, $event)" @eRemoveLine="mRemoveLine"></COrderLine>
          </tbody>
          <tfoot v-if="cLines.length > 0">
            <tr>
              <td colspan="3" class="text-right">总计：</td>
              <td class="text-right">{{ cTotalPrice | fCurrency }}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="text-center">
          <router-link to="/" class="btn btn-secondary m-2">返回</router-link>
          <router-link to="/checkout" class="btn btn-primary m-2">提交</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import COrderLine from './ShoppingCartLine'

export default {
  components: {COrderLine},
  computed: {
    ...mapState({
      cLines: state => state.cart.sOrderLines
    }),
    ...mapGetters({
      cTotalPrice: 'cart/gTotalPrice'
    })
  },
  methods: {
    ...mapMutations({
      __muChangeQuantity: 'cart/muChangeQuantity',
      mRemoveLine: 'cart/muRemoveLine',
    }),
    mChangeQuantity(line, $event) {
      this.__muChangeQuantity({line, quantity: $event});
    }
  }
};

</script>

<style>
</style>
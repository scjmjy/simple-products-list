<template>
  <div class="float-right">
    <small>
      购物车：
      <span v-if="cItemCount>0">{{ cItemCount }}件，{{ cTotalPrice | fCurrency }}</span>
      <span v-else>0 件</span>
    </small>
    <router-link tag="button" to="/cart" class="btn btn-sm bg-dark text-white" :disabled="cItemCount==0">
      <i class="fa fa-shopping-cart"></i>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cItemCount: 'cart/gAllItemCount',
      cTotalPrice: 'cart/gTotalPrice',
    })
  }
}
</script>

<style>

</style>
<template>
  <div>
    <div  v-for="p of cProducts" :key="p.id" class="cart m-1 p-1 bg-light">
      <h4>{{ `${p.id}-${p.name}` }} <span class="badge badege-pill badge-primary float-right">{{ p.price | fCurrency }}</span> </h4>
      <div class="card-text bg-white p-2">
        {{ p.description }}
        <button class="btn btn-success btn-sm float-right" @click="mAddToCart(p)">
          加入购物车
        </button>
      </div>
    </div>
    <CPageControls />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CPageControls from "./PageControls";

export default {
  components: {
    CPageControls
  },
  computed: {
    ...mapGetters({
      cProducts: 'gProductsCurrentPage'
    })
  },
  methods: {
    ...mapMutations({
      mAddToCart: 'cart/muAddProduct'
    })
  }
}
</script>

<style>

</style>
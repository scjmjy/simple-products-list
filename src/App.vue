<template>
  <router-view/>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions({
      mLoadOrderLines: 'cart/initOrderLines',
      mLoadRemoteProducts: 'loadRemoteProducts'
    })
  },
  created() {
    this.mLoadOrderLines(this.$store);
    this.mLoadRemoteProducts();
  }
}
</script>
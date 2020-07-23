<template>
  <div class="container">
    <div class="row">
      <div class="col bg-dark text-white">
        <a class="navbar-brand">Online Store for IT</a>
        <CCartSummary />
      </div>
    </div>
    <div class="row">
      <div class="col-3 bg-info p-2">
        <h4 class="text-white m-2">分类</h4>
        <CCategoryControls />
        <button class="btn btn-block btn-warning mt-5" @click="mSetShowSearch(true)">
          搜索
        </button>
      </div>
      <div class="col-9 bg-success p-2">
        <CSearch />
        <CProductList />
      </div>
    </div>
  </div>
</template>

<script>
import CSearch from "./Search";
import CProductList from "./ProductList";
import CCategoryControls from "./CategoryControls";
import CCartSummary from "./CartSummary";

import { mapMutations } from "vuex";

export default {
  components: {
    CSearch,
    CProductList,
    CCategoryControls,
    CCartSummary
  },
  methods: {
    ...mapMutations({
      mSetShowSearch: 'muSetShowSearch'
    })
  }
};
</script>

<style>
</style>
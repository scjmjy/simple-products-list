<template>
  <div class="row mt-2">
    <div class="col form-group ml-1">
      <select :value="cPageSize" @change="mSetPageSize"  class="form-control">
        <option value="4">4条/页</option>
        <option value="8">8条/页</option>
        <option value="12">12条/页</option>
      </select>
    </div>
    <div class="col-9 text-right">
      <button :disabled="cCurrentPage == 1" @click="mPreviousPage" class="btn btn-secondary mx-1">上页</button>
      <span v-if="cCurrentPage > 4 && cPageNumbers[0] != 1">
        <button class="btn  btn-sm btn-secondary mx-1" v-on:click="mSetCurrentPage(1)">1</button>
        <span class="h4">...</span>
      </span>
      <span class="mx-1">
        <button class="btn btn-sm" v-bind:class="i == cCurrentPage ? 'btn-primary' : ''" v-bind:key="i" v-for="i in cPageNumbers" v-on:click="mSetCurrentPage(i)">{{ i }}</button>
      </span>
      <span v-if="cPageCount - cPageNumbers[cPageNumbers.length-1] > 0">
        <span class="h4">...</span>
        <button class="btn btn-sm btn-secondary mx-1" v-on:click="mSetCurrentPage(cPageCount)">{{ cPageCount}}</button>
      </span>
      <button :disabled="cCurrentPage == cPageCount" @click="mNextPage" class="btn btn-secondary mx-1">下页</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      cCurrentPage: state => state.sCurrentPage,
      cPageSize: state => state.sPageSize
    }),
    ...mapGetters({ cPageCount: "gPageCount" }),
    cPageNumbers() {
      if (this.cPageCount < 4) {
        return [...Array(this.cPageCount + 1).keys()].slice(1);
      } else if (this.cCurrentPage <= 4) {
        return [1, 2, 3, 4, 5];
      } else if (this.cCurrentPage > this.cPageCount - 4) {
        return [...Array(5).keys()].reverse().map(v => this.cPageCount - v);
      } else {
        return [this.cCurrentPage - 1, this.cCurrentPage, this.cCurrentPage + 1];
      }
    }
  },
  methods: {
    ...mapActions({
      mSetCurrentPage: "setCurrentPage",
      __muSetPageSize: "setPageSize"
    }),
    mSetPageSize($event) {
      this.__muSetPageSize(Number($event.target.value));
    },
    mPreviousPage() {
      this.mSetCurrentPage(this.cCurrentPage - 1);
    },
    mNextPage() {
      this.mSetCurrentPage(this.cCurrentPage + 1);
    }
  }
};
</script>

<style>
</style>
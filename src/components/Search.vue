<template>
  <div v-if="cShowSearch" class="row my-2">
    <label class="col-2 col-form-label text-right">搜索：</label>
    <input class="col form-control" :value="cSearchTerm" @input="mDoSearch" placeholder="请输入关键字"/>
    <button class="col-1 btn btn-sm btn-secondary mx-4" @click="mCloseSearch">关闭</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      cShowSearch: state => state.sShowSearch,
      cSearchTerm: state => state.sSearchTerm
    })
  },
  methods: {
    ...mapMutations({
      mSetShowSearch: 'muSetShowSearch'
    }),
    ...mapActions({
      mClearSearchTerm: 'clearSearchTerm',
      mSearch: 'search'
    }),
    mCloseSearch() {
      this.mClearSearchTerm();
      this.mSetShowSearch(false);
    },
    mDoSearch($event) {
      this.mSearch($event.target.value);
    }
  }
};

</script>

<style>

</style>
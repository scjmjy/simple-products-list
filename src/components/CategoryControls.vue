<template>
  <div class="container-fluid">
    <div class="row my-2" v-for="c of cCategories" :key="c">
      <button
        class="btn btn-block"
        @click="mSetCurrentCategory(c)"
        :class="c == cCurrentCategory ? 'btn-primary' : 'btn-secondary'"
      >{{ c }}</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({ cCurrentCategory: state => state.sCurrentCategory }),
    ...mapGetters({ cCategories: "gAllCategories" })
  },
  methods: {
    ...mapActions({
      mSetCurrentCategory: "setCurrentCategory"
    })
  }
};
</script>

<style>
</style>
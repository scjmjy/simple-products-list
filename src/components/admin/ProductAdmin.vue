<template>
  <div>
    <router-link to="/admin/products/create" class="btn btn-primary my-2">新建商品</router-link>
    <table class="table table-sm table-bordered">
      <thead>
        <tr><td>ID</td><td>名称</td><td>分类</td><td class="text-right">价格</td><td></td></tr>
      </thead>
      <tbody>
        <tr v-for="p of cProducts" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.name }}</td>
          <td>{{ p.category }}</td>
          <td class="text-right">{{p.price | fCurrency}}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-danger mx-1" @click="mRemoveProduct(p)">删除</button>
            <button class="btn btn-sm btn-warning mx-1" @click="mEditProduct(p)">编辑</button>
          </td>
        </tr>
      </tbody>
    </table>
    <CPageControls/>
  </div>

</template>

<script>
import CPageControls from "../PageControls";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {CPageControls},
  computed: {
    ...mapGetters({
      cProducts: 'gProductsCurrentPage'
    })
  },
  methods: {
    ...mapActions({
      mRemoveProduct: 'removeProduct'
    }),
    mEditProduct(prod) {
      this.$router.push(`/admin/products/edit/${prod.id}`);
    }
  }
}
</script>

<style>

</style>
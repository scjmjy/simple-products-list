<template>
  <div>
    <h4 class="text-white text-center p-2" :class="cCreateMode?'bg-primary':'bg-info'">{{cCreateMode?'新建商品':'编辑商品'}}</h4>
    <h4 v-if="$v.$invalid && $v.$dirty" class="bg-danger text-white text-center p-2">所有信息都是必填项</h4>
    <div class="form-group" v-if="!cCreateMode">
      <label>商品ID不可编辑</label>
      <input disabled class="form-control" v-model="dProduct.id">
    </div>
    <div class="form-group">
      <label>名称</label>
      <input class="form-control" v-model="dProduct.name">
    </div>
    <div class="form-group">
      <label>描述</label>
      <input class="form-control" v-model="dProduct.description">
    </div>
    <div class="form-group">
      <label>分类</label>
      <select class="form-control" v-model="dProduct.category">
        <option v-for="c of cCategories" :key="c.name">{{c}}</option>
      </select>
    </div>
    <div class="form-group">
      <label>价格</label>
      <input class="form-control" v-model="dProduct.price">
    </div>
    <div class="text-center">
      <router-link to="/admin/products" class="btn btn-secondary m-1">取消</router-link>
      <button class="btn m-1" :class="cCreateMode?'btn-primary':'btn-info'" @click="mHandleStore">{{ cCreateMode?'保存修改':'确认新建' }}</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      dProduct: {}
    }
  },
  computed: {
    ...mapState({
      cCategories: state => state.sCategories
    }),
    cCreateMode() {
      return this.$route.params['op'] == 'create';
    }
  },
  validations: {
    dProduct: {
      name: { required },
      description: { required },
      category: { required },
      price: { required },
    }
  },
  methods: {
    ...mapActions(['addProduct','updateProduct']),
    async mHandleStore() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.cCreateMode) {
          await this.addProduct(this.dProduct);
        } else {
          await this.updateProduct(this.dProduct);
        }
        this.$router.push('/admin/products');
      }
    }
  },
  created() {
    if (!this.cCreateMode) {
      this.dProduct = {...this.$store.getters.gGetProductById(this.$route.params['id'])};
    }
  }
}
</script>

<style>

</style>
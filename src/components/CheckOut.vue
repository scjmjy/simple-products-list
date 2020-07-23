<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col bg-dark text-white">
          <a class="navbar-brand">Online Store for IT</a>
        </div>
      </div>
    </div>
    <div class="m-2">
      <div class="form-group m-2">
        <label>名字</label>
        <input v-model="$v.dUserInfo.name.$model" class="form-control">
        <CValError :pValidation="$v.dUserInfo.name" />

        <label>邮箱</label>
        <input v-model="$v.dUserInfo.email.$model" class="form-control">
        <CValError :pValidation="$v.dUserInfo.email" />

        <label>地址</label>
        <input v-model="$v.dUserInfo.address.$model" class="form-control">
        <CValError :pValidation="$v.dUserInfo.address" />

        <label>城市</label>
        <input v-model="$v.dUserInfo.city.$model" class="form-control">
        <CValError :pValidation="$v.dUserInfo.city" />
      </div>
    </div>
    <div class="text-center">
      <router-link to="/cart" class="btn btn-secondary m-1">返回</router-link>
      <button to="/result" class="btn btn-primary m-1" @click="mSubmitOrder">下单</button>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import CValError from "./ValidationError";
import { mapActions } from 'vuex';

export default {
  components: {CValError},
  data() {
    return {
      dUserInfo: {
        name: null,
        email: null,
        address: null,
        city: null
      }
    }
  },
  methods: {
    ...mapActions({
      mSaveRemoteOrder: 'orders/aSaveRemoteOrder',
      mClearOrder: 'cart/clearOrderLines'
    }),
    async mSubmitOrder() {
      this.$v.$touch();
      if (!this.$v.invalid) {
        const orderId = await this.mSaveRemoteOrder(this.dUserInfo);
        this.mClearOrder();
        this.$router.push(`/result/${orderId}`);
      }
    }
  },
  validations: {
      dUserInfo: {
        name: { required },
        email:  { required, email },
        address:  { required },
        city:  { required }
      }
  }
}
</script>

<style>

</style>
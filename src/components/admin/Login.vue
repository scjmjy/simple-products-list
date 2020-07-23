<template>
  <div class="m-2">
    <h4 class="bg-primary text-white text-center p-2">
      账号登录
    </h4>
    <h4 v-if="showFailureMsg" class="bg-danger text-white text-center p-2 m-2">
      登录失败，请重新登录
    </h4>
    <div class="from-group">
      <label>用户名</label>
      <input v-model="$v.username.$model" class="form-control">
      <CValidationError :pValidation="$v.username"/>
    </div>
    <div class="from-group mt-2">
      <label>密码</label>
      <input type="password" v-model="$v.password.$model" class="form-control">
      <CValidationError :pValidation="$v.password"/>
    </div>
    <div class="text-center mt-3">
      <button class="btn btn-primary" @click="mLogin">登录</button>
    </div> 
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import CValidationError from "../ValidationError";
export default {
  components: {CValidationError},
  data() {
    return {
      username: '',
      password: '',
      showFailureMsg: false
    }
  },
  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated
    })
  },
  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate'
    }),

    async mLogin() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        await this.authenticate({name:this.username, password: this.password});
        if (this.authenticated) {
          this.$router.push('/admin');
        } else {
          this.showFailureMsg = true;
        }
      }
    }
  },
  validations: {
    username: { required },
    password: { required }
  }
}
</script>

<style>

</style>
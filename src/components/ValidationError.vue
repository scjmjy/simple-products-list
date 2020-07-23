<template>
  <div v-if="cShow" class="text-danger">
    <div v-for="m of cMessages" :key="m">
        {{ m }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['pValidation'],
  computed: {
    cShow() {
      return this.pValidation.$dirty && this.pValidation.$invalid;
    },
    cMessages() {
      const msg = [];
      if (this.pValidation.$dirty) {
        if (this.mHasValidationError('required')) {
          msg.push('不能为空');
        } else if (this.mHasValidationError('email')) {
          msg.push('请输入正确的邮箱地址');
        }
      }

      return msg;
    }
  },
  methods: {
    mHasValidationError(type) {
      return (type in this.pValidation.$params) && !this.pValidation[type];
    }
  }
}
</script>

<style>

</style>
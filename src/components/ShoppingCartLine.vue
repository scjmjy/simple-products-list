<template>
  <tr>
    <td>
      <input type="number" class="form-control-sm"
      style="width:5em"
      :value="dQuantity"
      @input="mChangeQuantity">
    </td>
    <td>{{ pLine.product.name }}</td>
    <td class="text-right">{{ pLine.product.price }}</td>
    <td class="text-right">{{ pLine.quantity*pLine.product.price | fCurrency }}</td>
    <td class="text-center">
      <button class="btn btn-sm btn-danger"  @click="mRemoveLine">删除</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['pLine'],
  data() {
    return {
      dQuantity: this.pLine.quantity
    }
  },
  methods: {
    mChangeQuantity($event) {
      const q = $event.target.value;
      if (q > 0) {
        this.$emit('eQuantity', q);
        this.dQuantity = q;
      } else {
        this.$emit('eQuantity', 1);
        this.dQuantity = 1;
        $event.target.value = 1;
      }
    },
    mRemoveLine() {
      this.$emit('eRemoveLine', this.pLine);
    }
  }
}
</script>

<style>

</style>
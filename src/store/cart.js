export default {
  namespaced: true,
  state: {
    sOrderLines: []
  },
  getters: {
    gAllItemCount(state) {
      return state.sOrderLines.reduce( (total, line) => line.quantity + total, 0 );
    },
    gTotalPrice(state) {
      return state.sOrderLines.reduce( (total, line) => line.quantity*line.product.price + total, 0 );
    }
  },
  mutations: {
    muAddProduct(state, prod) {
      const line = state.sOrderLines.find( line => line.product.id == prod.id );
      if (line != null) {
        line.quantity ++;
      } else {
        state.sOrderLines.push( {product: prod, quantity: 1} );
      }
    },
    muChangeQuantity(state, update) {
      (state); // TODO REMOVE
      update.line.quantity = update.quantity;
    },
    muRemoveLine(state, lineToRemove) {
      const index = state.sOrderLines.findIndex( line => line == lineToRemove );
      if (index > -1) {
        state.sOrderLines.splice( index, 1 );
      }
    },
    muSetOrderLines(state, lines) {
      state.sOrderLines = lines;
    }
  },
  actions: {
    loadOrderLines(ctx) {
      let data = window.localStorage.getItem('orderLines');
      if (data!=null) {
        ctx.commit('muSetOrderLines', JSON.parse(data));
      }
    },
    saveOrderLines(ctx) {
      window.localStorage.setItem('orderLines', JSON.stringify(ctx.state.sOrderLines));
    },
    clearOrderLines(ctx) {
      ctx.commit('muSetOrderLines', []);
    },
    initOrderLines(ctx, store) {
      ctx.dispatch('loadOrderLines');
      store.watch( state => state.cart.sOrderLines, () => ctx.dispatch('saveOrderLines'), {deep: true} )
    }
  }
  
}
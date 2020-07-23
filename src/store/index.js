import Vue from 'vue';
import Vuex from 'vuex';

import Axios from "axios";

import cart from "./cart";
import auth from "./auth";
import orders from "./orders";

Vue.use(Vuex);

const BASE_URL = '/api';
const PRODUCTS_URL = `${BASE_URL}/products`;
const CATEGORIES_URL = `${BASE_URL}/categories`;

export const store = new Vuex.Store({
  // strict: true,

  modules: { cart, auth, orders },

  state: {
    sCategories: [],
    sCurrentCategory: 'All',

    sPageSize: 4,
    sPages: [],
    sCurrentPage: 1,
    sServerPageCount: 0,

    sSearchTerm: '',
    sShowSearch: false
  },

  getters: {
    gProductsCurrentPage: state => state.sPages[state.sCurrentPage-1] ,
    gPageCount: state => state.sServerPageCount ,
    gAllCategories: state => ['All', ...state.sCategories],
    gGetProductById : state => (id) => state.sPages[state.sCurrentPage-1].find(p => p.id == id)
  },

  mutations: {
    muSetCurrentPage(state, page) {
      state.sCurrentPage = page;
    },
    muSetPageSize(state, size) {
      state.sPageSize = size;
      state.sCurrentPage = 1;
    },
    muSetCurrentCategory(state, cat) {
      state.sCurrentCategory = cat;
      state.sCurrentPage = 1;
    },
    muAddPage(state, page) {
      for (let i = 0; i < page.pageCount; i++) {
        Vue.set(state.sPages, page.index + i, page.data.slice(i*state.sPageSize, (i+1)*state.sPageSize));
      }
    },
    muClearPages(state) {
      state.sPages.splice(0,state.sPages.length)
    },
    muSetCategories(state, categories) {
      state.sCategories = categories;
    },
    muSetPageCount(state, totalCount) {
      state.sServerPageCount = Math.ceil(Number(totalCount) / state.sPageSize);
    },
    muSetSearchTerm(state, term) {
      state.sSearchTerm = term;
      state.sCurrentPage = 1;
    },
    muSetShowSearch(state, show) {
      state.sShowSearch = show;
    },
    _muAddProduct(state, prod) {
      state.sPages[state.sCurrentPage-1].unshift(prod);
    },
    _muUpdateProduct(state, prod) {
      const page = state.sPages[state.sCurrentPage-1];
      const index = page.findIndex(p => p.id == prod.id);
      Vue.set(page, index, prod);
    }
  },

  actions: {
    async loadRemoteProducts(ctx) {
      await ctx.dispatch('loadPage', 2);
      ctx.commit('muSetCategories', (await Axios.get(CATEGORIES_URL)).data);
    },
    async loadPage(ctx, pageCount = 1) {
      let url = `${PRODUCTS_URL}?_page=${ctx.state.sCurrentPage}`
                + `&_limit=${ctx.state.sPageSize * pageCount}`;
      if (ctx.state.sCurrentCategory != 'All') {
        url += `&category=${ctx.state.sCurrentCategory}`;
      }

      if (ctx.state.sSearchTerm != '') {
        url += `&q=${ctx.state.sSearchTerm}`;
      }

      let response = await Axios.get(url);
      ctx.commit('muSetPageCount', response.headers['x-total-count']);
      ctx.commit('muAddPage', { index: ctx.state.sCurrentPage-1, data: response.data, pageCount: pageCount });
    },
    setCurrentPage(ctx, page) {
      ctx.commit('muSetCurrentPage', page);
      if (!ctx.state.sPages[page-1]) {
        ctx.dispatch('loadPage');
      }
    },
    setPageSize(ctx, size) {
      ctx.commit('muClearPages');
      ctx.commit('muSetPageSize', size);
      ctx.dispatch('loadPage', 2);
    },
    setCurrentCategory(ctx, cat) {
      ctx.commit('muClearPages');
      ctx.commit('muSetCurrentCategory', cat);
      ctx.dispatch('loadPage', 2);
    },
    search(ctx, term) {
      ctx.commit('muSetSearchTerm', term);
      ctx.commit('muClearPages');
      ctx.dispatch('loadPage', 2);
    },
    clearSearchTerm(ctx) {
      ctx.commit('muSetSearchTerm', '');
      ctx.commit('muClearPages');
      ctx.dispatch('loadPage', 2);
    },
    async addProduct(ctx, prod) {
      const data = (await ctx.getters['auth/authenticatedAxios'].post(PRODUCTS_URL, prod)).data;
      prod.id = data.id;
      ctx.commit('_muAddProduct', prod);
    },
    async removeProduct(ctx, prod) {
      await ctx.getters['auth/authenticatedAxios'].delete(`${PRODUCTS_URL}/${prod.id}`)
      ctx.commit('muClearPages');
      ctx.dispatch('loadPage', 1);
    },
    async updateProduct(ctx, prod) {
      await ctx.getters['auth/authenticatedAxios'].put(`${PRODUCTS_URL}/${prod.id}`, prod);
      ctx.commit('_muUpdateProduct', prod);
    }
  }
});
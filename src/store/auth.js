import Axios from "axios";

const LOGIN_URL = '/api/login';

export default {
  namespaced: true,
  state: {
    authenticated: false,
    jwt: null
  },
  getters: {
    authenticatedAxios(state) {
      return Axios.create({
        headers: {
          'Authorization': `Bearer<${state.jwt}>`
        }
      });
    }
  },
  mutations: {
    setAuthenticated(state, token) {
      state.jwt = token;
      state.authenticated = true;
    },
    clearAuthentication(state) {
      state.jwt = null;
      state.authenticated = false;
    }
  },
  actions: {
    async authenticate(ctx, credentials) {
      const response = await Axios.post(LOGIN_URL, credentials);
      if (response.data.success == true) {
        ctx.commit('setAuthenticated', response.data.token);
      }
    }
  }
}
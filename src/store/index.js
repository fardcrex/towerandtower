import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import authService from "@/services/AuthService.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { tipoUsuarioId: -1 },
    timeToken: new Date(localStorage.getItem("timeToken")),
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData.datos;
      axios.defaults.headers.common["Authorization"] = `${userData.token}`;
    },
    SET_TIME_TOKEN_DATA(state, timeToken) {
      if (!timeToken) {
        timeToken = new Date();
        localStorage.setItem("timeToken", timeToken.toJSON());
      }
      state.timeToken = timeToken;
    },
    LOGOUT() {
      // state.user = null
      localStorage.clear();
      // axios.defaults.headers.common['Authorization'] = null
      location.reload();
    },
  },
  actions: {
    logout({ commit }) {
      commit("LOGOUT");
    },
    async login({ commit }, credentials) {
      const resUser = await authService.postLogin(credentials);
      console.log(resUser);
      if (resUser.data.datos) {
        commit("SET_USER_DATA", resUser.data);
        localStorage.setItem("usuario", JSON.stringify(resUser.data));
        commit("SET_TIME_TOKEN_DATA");
      } else {
        throw resUser.data.Status;
      }
      const user = resUser.data.datos;

      authService.postRegistrarToken(resUser.data.token, user.usuarioId);
    },
  },
  modules: {},
});

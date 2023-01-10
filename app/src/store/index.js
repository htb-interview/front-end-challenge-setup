import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: "0.0.1", 
    
    category: "",
    game: "" , 

    apiurl: "https://htb-steam-api.vercel.app/api/apps?"
  },
  getters: {
    getCategory: state => { 
      return state.category;
    }, 
    getGame: state => { 
      return state.game;
    },
    getUrl : state => { 
      return state.apiurl;
    }
  },
  mutations: {
    categoryM(state,val) {
      state.category = val;
    },
    gameM(state,val) {
      state.game = val;
    },
  },
  actions: {
    categoryA(context,val) {
      context.commit('categoryM',val);
    },
    gameA(context,val) {
      context.commit('gameM',val);
    },
  },
})

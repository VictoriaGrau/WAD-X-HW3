import Vue from "vue";
import Vuex from "vuex";
import { posts } from "../data/posts.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    posts: posts.map(post => ({ ...post }))
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    INCREMENT_LIKE(state, postId) {
      const post = state.posts.find(p => p.id === postId);
      if (!post) return;
      post.likes++;
    },
    RESET_LIKES(state) {
      state.posts.forEach(post => {
        post.likes = 0;
      });
    }
  },
  actions: {
    signup({ commit }, payload) {
      commit("SET_USER", payload);
      return Promise.resolve();
    },
    incrementLike({ commit }, postId) {
      commit("INCREMENT_LIKE", postId);
    },
    resetLikes({ commit }) {
      commit("RESET_LIKES");
    }
  }
});
import Vue from 'vue'
import Vuex from 'vuex'
import { posts } from "../data/posts.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    posts: posts
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    LIKE_POST(state, postId) {
      const post = state.posts.find(p => p.id === postId)
      if (post) post.likes++
    }
  },

  actions: {
    signup({ commit }, payload) {
      commit("SET_USER", payload)
      return Promise.resolve()
    },
    likePost({ commit }, id) {
      commit("LIKE_POST", id)
    }
  }
})

import Vue from "vue";
import Vuex from "vuex";
import { getPosts, likePost } from "../services/api.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    posts: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_POSTS(state, posts) {
      state.posts = posts.map(p => ({
        ...p,
        id: Number(p.id),
        likes: Number(p.likes) || 0
      }));
    },
    UPDATE_POST_LIKES(state, payload) {
      const index = state.posts.findIndex(p => p.id === payload.id);
      if (index !== -1) {
        Vue.set(state.posts, index, {
          ...state.posts[index],
          likes: payload.likes
        });
      } else {
        console.log(`Post ${payload.id} not found!`);
      }
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const posts = await getPosts();
        commit("SET_POSTS", posts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    },
    // For some reason the like counter is not synced with the currently displayed like counter.
    async likePost({ commit, state }, postId) {
      const id = Number(postId);
      const post = state.posts.find(p => p.id === id);
      if (!post) {
        return;
      }

      const oldLikes = post.likes;
      commit("UPDATE_POST_LIKES", { id, likes: oldLikes + 1 });
      try {
        const response = await likePost(id);
        if (response && typeof response.likes !== 'undefined') {
          commit("UPDATE_POST_LIKES", { id, likes: response.likes });
        }
      } catch (err) {
        commit("UPDATE_POST_LIKES", { id, likes: oldLikes });
      }
    },
  },
  getters: {
    getPostById: (state) => (id) => {
      return state.posts.find(post => post.id === id);
    }
  }
});
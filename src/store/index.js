import Vue from 'vue';
import Vuex from 'vuex';
import getData from '@/api/Axiosget';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    slideList: [],
    goodList: [],
    goodsType: '',
    sortType: 'all',
    showContent: false,
    goodstotal: 0,
    counterMap: {},
  },
  mutations: {
    setSlideList(state, list) {
      state.slideList = list;
    },
    setshowContent(state, bool) {
      state.showContent = bool;
    },
    setgoodList(state, value) {
      state.goodList = [...state.goodList, ...value];
    },
    resetgoodList(state) {
      state.goodList = [];
    },
    setGoodsType(state, type) {
      state.goodsType = type;
    },
    sortGoodsList(state, type) {
      state.sortType = type;
    },
    setgoodsTotal(state, total) {
      state.goodstotal = total;
    },
    setcounterMap(state, value) {
      state.counterMap = value;
    },
    localStorageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if ((state.counterMap[id] === 1 && value === -1) || value === undefined) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, value);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
  },
  actions: {
    async getSlideList({ commit, dispatch }, type) {
      const value = await getData.getslidebar(type);
      commit('setshowContent', false);
      commit('setSlideList', value);
      commit('setGoodsType', value[0]);
      commit('setshowContent', true);
      dispatch('getgoodList', { type: value[0], page: 1, size: 5 });
    },
    async getgoodList({ commit, state }, params) {
      const { type, page, size } = params;
      const { list, total } = await getData.getGoodlist(
        {
          type,
          page,
          size,
          sort: state.sortType,
        },
      );
      commit('setgoodsTotal', total);
      commit('setgoodList', list);
      commit('setGoodsType', type);
    },
  },
  modules: {
  },
});

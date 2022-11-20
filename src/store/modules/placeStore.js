import { areaList, sigunguList, placeList, placeListWord } from "@/api/tour.js";

const errorCall = (error) => {
  console.log(error);
};

const placeStore = {
  namespaced: true,
  state: {
    areas: [{ value: null, text: "시/도 선택" }],
    sigungus: [{ value: null, text: "구/군 선택" }],
    contents: [{ value: 1, text: "전체" }],
    places: [],
    planItems: [],
    place: null,
  },
  getters: {},
  mutations: {
    CLEAR_AREA_LIST(state) {
      state.areas = [{ value: null, text: "시/도 선택" }];
    },
    CLEAR_SIGUNGU_LIST(state) {
      state.sigungus = [{ value: null, text: "구/군 선택" }];
    },
    CLEAR_PLACE_LIST(state) {
      state.places = [];
    },
    CLEAR_CONTENT_LIST(state) {
      state.contents = [{ value: 1, text: "전체" }];
    },
    CLEAR_PLANITEM_LIST(state) {
      state.planItems = [];
    },
    SET_AREA_LIST(state, areas) {
      areas.forEach((area) => {
        state.areas.push({
          value: area.areaCode,
          text: area.areaName,
          disabled: false,
        });
      });
    },
    SET_SIGUNGU_LIST(state, sigungus) {
      sigungus.forEach((sigungu) => {
        state.sigungus.push({
          value: sigungu.sigunguCode,
          text: sigungu.sigunguName,
          disabled: false,
        });
      });
    },
    SET_CONTENT_LIST(state, contents) {
      contents.forEach((content) => {
        state.contents.push({
          value: content.contentType,
          text: content.name,
        });
      });
    },
    SET_PLACE_LIST(state, places) {
      state.places = places;
    },
    SET_DETAIL_PLACE(state, place) {
      state.place = place;
    },
    SET_PLANITEM_LIST(state, place) {
      state.planItems.push(place);
    },
  },
  actions: {
    getAreas: ({ commit }) => {
      areaList(({ data }) => {
        commit("SET_AREA_LIST", data);
      }, errorCall);
    },
    getSigungus: ({ commit }, areaCode) => {
      const params = { areaCode };
      sigunguList(
        params,
        ({ data }) => {
          commit("SET_SIGUNGU_LIST", data);
        },
        errorCall
      );
    },
    async getPlaces({ commit }, params) {
      await placeList(
        params,
        ({ data }) => {
          commit("SET_PLACE_LIST", data);
        },
        errorCall
      );
    },
    async getPlaceSearch({ commit }, word) {
      await placeListWord(
        word,
        ({ data }) => {
          commit("SET_PLACE_LIST", data);
        },
        errorCall
      );
    },
    setContents({ commit }, params) {
      commit("SET_CONTENT_LIST", params);
    },
    setPlanItem({ commit }, place) {
      commit("SET_PLANITEM_LIST", place);
    },
  },
};

export default placeStore;

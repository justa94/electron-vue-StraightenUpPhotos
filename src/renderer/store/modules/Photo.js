/* eslint-disable */
const state = {
  currentImagePath: '', // 현재 이미지파일 경로
  imageNames: '', // 이미지 경로들
  sourceFolderPath: '1', // 정리 대상 폴더
  destFolerPaths: '', // 이동하게될 목적 폴더들
  numberOfFiles_origin: 0, // 이미지 파일 갯수 (전체)
  numberOfFiles_complete: 0 // 처리된 이미지 파일 갯수
}

const getters = {
  currentImagePath: () => state.currentImagePath,
  imageNames: () => state.imageNames,
  sourceFolderPath: () => state.sourceFolderPath,
  destFolerPaths: () => state.destFolerPaths,
  numberOfFiles_origin: () => state.numberOfFiles_origin,
  numberOfFiles_complete: () => state.numberOfFiles_complete,  
}

const actions = {
  setCurrentImagePath({ commit }, payload) {
    state.currentImagePath = payload
  },
  setImageNames({ commit }, payload) {
    state.imageNames = payload
  },
  setSourceFolderPath({ commit }, payload) {
    state.sourceFolderPath = payload
  },
  setDestFolerPaths({ commit }, payload) {
    state.setDestFolerPaths = payload
  },
  setNumberOfFiles_origin({ commit }, payload) {
    state.numberOfFiles_origin = payload
  },
  setNumberOfFiles_complete({ commit }, payload) {
    state.numberOfFiles_complete = payload
  },
}

const mutations = {}

export default {
  state,
  mutations,
  actions,
  getters
}

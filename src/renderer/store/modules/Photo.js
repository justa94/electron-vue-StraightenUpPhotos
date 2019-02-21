/* eslint-disable */
// TODO: Folder를 Directory로 바꿀까?
const state = {
  currentImagePath: '', // 현재 이미지파일 경로
  imageNames: [], // 이미지 경로들
  sourceFolderPath: '', // 정리 대상 폴더
  destFolders: [], // 이동하게될 목적 폴더들
  numberOfFiles_origin: 0, // 이미지 파일 갯수 (전체)
  numberOfFiles_complete: 0 // 처리된 이미지 파일 갯수
}

const getters = {
  currentImagePath: () => state.currentImagePath,
  imageNames: () => state.imageNames,
  sourceFolderPath: () => state.sourceFolderPath,
  destFolders: () => state.destFolders,
  numberOfFiles_origin: () => state.numberOfFiles_origin,
  numberOfFiles_complete: () => state.numberOfFiles_complete,  
}

const actions = {
  setCurrentImagePath({ commit }, payload) {
    state.currentImagePath = payload
  },
  setImageNames({ commit }, payload) {
    // state.imageNames = payload
    state.imageNames.push(payload)
  },
  setSourceFolderPath({ commit }, payload) {
    state.sourceFolderPath = payload
  },
  addDestFolders({ commit }, payload) {
    // state.destFolers = payload
    state.destFolders.push(payload)
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

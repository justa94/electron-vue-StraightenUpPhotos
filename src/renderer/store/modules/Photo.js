/* eslint-disable */
const state = {
  currentImagePath: '', // 현재 이미지파일 경로
  imageNames: [], // 이미지 경로들
  sourceFolderPath: '', // 정리 대상 폴더
  destFolders: [], // 이동하게될 목적 폴더들
  numberOfFiles_origin: 0, // 이미지 파일 갯수 (전체)
  numberOfFiles_complete: 0, // 처리된 이미지 파일 갯수
  currentIndex: 0, // 현재 배열 인덱스
  srcSelected: false, // src 폴더 선택되었는지 여부
  history: [],
  spinning: false, // 파일 이동중 spin
  isVideo: false,
  viewMode: 'single', // 보기 모드 (single, multi)
  multiChecked: [], // 멀티체크된 인덱스
}

const getters = {
  currentImagePath: () => state.currentImagePath,
  imageNames: () => state.imageNames,
  sourceFolderPath: () => state.sourceFolderPath,
  destFolders: () => state.destFolders,
  numberOfFiles_origin: () => state.numberOfFiles_origin,
  numberOfFiles_complete: () => state.numberOfFiles_complete,
  remainFiles: () => state.numberOfFiles_origin - state.numberOfFiles_complete,
  currentIndex: () => state.currentIndex,
  srcSelected: () => state.srcSelected,
  history: () => state.history,
  spinning: () => state.spinning,
  isVideo: () => state.isVideo,
  viewMode: () => state.viewMode,
  multiChecked: () => state.multiChecked,
}

const actions = {
  setCurrentImagePath({ commit }, payload) {
    state.currentImagePath = payload
  },
  setImageNames({ commit }, payload) {
    state.imageNames = payload
    // state.imageNames.push(payload)
  },
  setSourceFolderPath({ commit }, payload) {
    state.sourceFolderPath = payload
  },
  addDestFolders({ commit }, payload) {
    // state.destFolers = payload
    state.destFolders.push(payload)
  },
  changeDestFolders({ commit }, payload) {
    state.destFolders.splice(payload.index, 1, payload.data);
    // state.destFolders[payload.index] = payload.data
  },
  changeAllDestFolders({ commit }, payload) {
    state.destFolders = payload.data;
  },
  popDestFolders({ commit }, index) {
    state.destFolders.splice(index, 1)
  },
  setNumberOfFiles_origin({ commit }, payload) {
    state.numberOfFiles_origin = payload
  },
  setNumberOfFiles_complete({ commit }, payload) {
    state.numberOfFiles_complete = payload
  },
  setCurrentIndex({ commit }, payload) {
    state.currentIndex = payload
  },
  setSrcSelected({ commit }, payload) {
    state.srcSelected = payload
  },
  pushHistory({ commit }, payload) {
    state.history.push(payload)
  },
  popHistory({ commit }, index) {
    state.history.splice(index, 1)
  },
  setSpinning({ commit }, payload) {
    state.spinning = payload
  },
  setIsVideo({ commit }, payload) {
    state.isVideo = payload
  },
  setViewMode({ commit }, payload) {
    state.viewMode = payload
  },
  setMultiChecked({ commit }, payload) {
    const { mode } = payload;

    switch(mode) {
      case 'reset':
        (
          console.log('reset')
        )
        state.multiChecked = [];
        break;
      case 'add':
        (
          console.log('add', payload)
        )
        state.multiChecked.push(payload.index)
        break;
      case 'remove':
        (
          console.log('remove', payload)
        )
        const removeIndex = state.multiChecked.indexOf(payload.index);
        if(removeIndex === -1) {
          console.log('리무브인덱스 -1')
          break;
        }
        state.multiChecked.splice(removeIndex, 1)
        break;
      default:
        break;
    }
  },
}

const mutations = {}

export default {
  state,
  mutations,
  actions,
  getters
}

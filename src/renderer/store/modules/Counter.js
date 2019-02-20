const state = {
  main: 0,
  my: 'hi? my'
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    console.log('INCREMENT_MAIN_COUNTER')
    state.main++
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    console.log('someAsyncTask')
    commit('INCREMENT_MAIN_COUNTER')
  },
  increMain () {
    console.log('increMain')
    state.main++
  }
}

const getters = {
  main () {
    return state.main
  },
  my () {
    return state.my
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

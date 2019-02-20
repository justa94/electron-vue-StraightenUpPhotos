import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StraightenUpPhotos',
      component: require('@/components/StraightenUpPhotos').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

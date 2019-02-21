<template>
  <div>
    PhotoZone
    <div>
      <img :src="currentImagePath" />
      <!-- <img src="C:\Users\user\Downloads\10000img\img\rimg4aea56.jpg" /> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
import { setTimeout } from 'timers';
export default {
  name: 'PhotoZone',
  components: { },
  computed: {
    ...mapGetters(['currentImagePath'])
  },
  data() {
    return {
      
    }
  },
  mounted() {
    console.log('PhotoZone Mounted')
  },
  methods: {
    ...mapActions([
      'setCurrentImagePath'
    ])
  }
}
</script>

<style scoped>
</style>

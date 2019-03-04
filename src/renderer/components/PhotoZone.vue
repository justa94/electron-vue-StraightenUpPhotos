<template>
  <div class="photoZone">
    <div class="directionContainer">
      <img src="@/assets/image/prev.svg" class="direction" @click="imageBack" />
      <img src="@/assets/image/next.svg" class="direction" @click="imageFront" />
    </div>
    <div class="imgContainer">
      <img v-if="!srcSelected" src="https://via.placeholder.com/700x700" />
      <img v-else :src="sourceFolderPath + '\\' + imageNames[currentIndex]" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  name: 'PhotoZone',
  components: { },
  computed: {
    ...mapGetters([
      'currentImagePath',
      'sourceFolderPath',
      'imageNames',
      'currentIndex',
      'srcSelected',
    ]),
    
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions([
      'setCurrentImagePath',
      'setCurrentIndex'
    ]),
    imageBack() {
      if(this.currentIndex < 1) {
        console.log('배열 길이 underflow')
        return
      }
      this.setCurrentIndex(this.currentIndex - 1)
    },
    imageFront() {
      if(this.currentIndex >= this.imageNames.length-1) {
        console.log('배열길이 overflow')
        return
      }
      this.setCurrentIndex(this.currentIndex + 1)
    }
  }
}
</script>

<style scoped lang='scss'>
.photoZone {
  // height: 100%;
}
.imgContainer {
  text-align: center;

  & > img {
    width: 100%;
    max-width: 700px;
    max-height: 700px;
  }
}
.imageBack {
  background-image: url('/static/image/1.png')
}
.directionContainer {
  text-align: center;
  margin: 1rem 0;
}
.direction {
  width: 12%;
  max-width: 70px;
  min-width: 30px;
  cursor: pointer;

  &:first-child {
    margin-right: 3%;
  }
}
</style>

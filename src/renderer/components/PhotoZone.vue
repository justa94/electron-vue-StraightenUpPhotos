<template>
  <div class="photoZone">
    <div class="directionContainer">
      <img src="@/assets/image/prev.svg" class="direction" @click="imageBack" />
      <img src="@/assets/image/next.svg" class="direction" @click="imageFront" />
    </div>
    <!-- <video controls="controls" width="100%" height="100%" v-if="isVideo">
      <source src="@/assets/video/SampleVideo_1280x720_20mb.mp4" type="video/mp4" />
    </video> -->
    <!-- <div class="imgContainer" v-else> -->
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
import path from 'path'

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
      'isVideo',
    ]),
  },
  data() {
    return {
    }
  },
  
  mounted() {
  },
  beforeUpdate() {
    console.log('photozone Beforeupdated')
    this.checkIsVideo()
  },
  updated() {
    console.log('photozone updated')
    this.checkIsVideo()
  },
  methods: {
    ...mapActions([
      'setCurrentImagePath',
      'setCurrentIndex',
      'setIsVideo',
    ]),
    checkIsVideo() {
      return
      const currentImage = this.imageNames[this.currentIndex]
      const ext = path.extname(currentImage)
      if(ext === '.mp4') {
        this.setIsVideo(true)
      }
      else {
        this.setIsVideo(false)
      }
    },
    imageBack() {
      if(this.currentIndex < 1) {
        console.log('배열 길이 underflow')
        return
      }
      this.setCurrentIndex(this.currentIndex - 1)
      this.checkIsVideo()
    },
    imageFront() {
      if(this.currentIndex >= this.imageNames.length-1) {
        console.log('배열길이 overflow')
        return
      }
      this.setCurrentIndex(this.currentIndex + 1)
      this.checkIsVideo()
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

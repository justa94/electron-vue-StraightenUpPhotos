<template>
  <div class="photoZone">
    PhotoZone
    <div class="imgContainer">
      <!-- TODO: src폴더 선택 전에는 빈 이미지 띄워놓기 -->
      <img v-if="currentImagePath.indexOf('placeholder') !== -1" :src="currentImagePath" />
      <img v-else :src="sourceFolderPath + '\\' + currentImagePath" />
      <!-- <img src="C:\Users\user\Downloads\10000img\img\rimg4aea56.jpg" /> -->
    </div>
    <footer style="text-align: center">
      <b-button class="imageBack">
        <--
      </b-button>
      <b-button>
        -->
      </b-button>
      <!-- i
      <i class="placeholderImage" />
      <img :src="imUrl" width="50px" height="50px" /> -->
      <!-- <img src="static/image/right-arrow.jpg" /> -->
      <!-- <img src="static/image/1.png" /> -->
    </footer>
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
    ...mapGetters([
      'currentImagePath',
      'sourceFolderPath'
    ])
  },
  data() {
    return {
      imUrl: 'static/image/right-arrow.svg'
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

<style scoped lang='scss'>
.photoZone {
  
  height: 100%;
}
.imgContainer {
  height: 100%;
  // width: 500px;
  // height: 700px;

  & > img {
    width: 100%;
    max-width: 500px;
    max-height: 700px;
  }
}
footer {
  color: red;
  position: absolute;
  bottom: 3%;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}
.imageBack {
  background-image: url('/static/image/1.png')
}
.placeholderImage {
  // background-image: url(static/image/placeholder.jpg)
}
</style>

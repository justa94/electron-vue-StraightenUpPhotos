<template>
  <div>
    PhotoZone
    <div class="imgContainer">
      <!-- TODO: src폴더 선택 전에는 빈 이미지 띄워놓기 -->
      <img :src="sourceFolderPath + '\\' + currentImagePath" />
      <!-- <img src="C:\Users\user\Downloads\10000img\img\rimg4aea56.jpg" /> -->
    </div>
    <footer>
      hi
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
.imgContainer {
  // height: 100%;
  // width: 500px;
  // height: 700px;

  & > img {
    // width: 100%;
    // max-width: 500px;
    // max-height: 700px;
  }
}
footer {
  color: red;
  position: absolute;
  bottom: 3%;
  width: 100%;
}
</style>

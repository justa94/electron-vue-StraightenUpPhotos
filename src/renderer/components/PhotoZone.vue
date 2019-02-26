<template>
  <div class="photoZone">
    <!-- PhotoZone -->
    <div class="directionContainer">
      <img src="@/assets/image/prev.svg" class="direction" @click="imageBack" />
      <img src="@/assets/image/next.svg" class="direction" @click="imageFront" />
    </div>
    <div class="imgContainer">
      <!-- TODO: src폴더 선택 전에는 빈 이미지 띄워놓기 -> 좀더 오류없게끔 처리 다시하기 -->
      <img v-if="currentImagePath.indexOf('placeholder') !== -1" :src="currentImagePath" />
      <img v-else :src="sourceFolderPath + '\\' + imageNames[currentIndex]" />
      <!-- <img src="C:\Users\user\Downloads\10000img\img\rimg4aea56.jpg" /> -->
    </div>
    <footer style="text-align: center">
      <!-- <a-button @click="imageBack" class="imageBack">
        &lt;prev
      </a-button> -->
      <!-- <a-button @click="imageFront">
        next&gt;
      </a-button> -->


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
    ]),
    
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
      'setCurrentImagePath',
      'setCurrentIndex'
    ]),
    imageBack() {
      console.log('imageNames', this.imageNames[3])

      if(this.currentIndex < 1) {
        console.log('배열 길이 underflow')
        return
      }
      this.setCurrentIndex(this.currentIndex - 1)

      // _.forEach(this.imageNames, (item, index) => {
      //   console.log(index, item)
      // })
      
    },
    imageFront() {
      console.log('this.currentIndex', this.currentIndex);
      console.log('this.imageNames-1', this.imageNames.length-1);
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
  
  height: 100%;
}
.imgContainer {
  // height: 100%;
  // width: 500px;
  // height: 700px;
  text-align: center;

  & > img {
    width: 100%;
    max-width: 700px;
    max-height: 800px;
  }
}
footer {
  color: red;
  // position: absolute;
  // bottom: 3%;
  margin-top: 3%;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;

  & > button {
    &:first-child {
      margin-right: 2%;
    }
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

  // margin-right: 3%;

  &:first-child {
    margin-right: 3%;
  }
}

</style>

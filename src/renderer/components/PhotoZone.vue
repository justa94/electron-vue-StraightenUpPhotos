<template>
<!-- TODO: 드래그 앤 드랍 -->
  <div class="photoZone">
    <div class="directionContainer">
      <img src="@/assets/image/prev.svg" class="direction" @click="imageBack" />
      <img src="@/assets/image/next.svg" class="direction" @click="imageFront" />
      <span class="viewSwitchContainer">
        Multi View
        <a-switch @change="onChangeMultiViewSwitch" />
      </span>
    </div>
    {{ imageSrc }}
    <!-- TODO: via.placeholder.com image 다운받아서 static에 넣기 -->
    <div v-if="viewMode === 'single'">
      <video id="video" controls width="100%" height="100%" v-if="isVideo" class="photoZoneVideo">
        <source :src="imageSrc" type="video/mp4" />
      </video>
      <div class="imgContainer" v-else>
        <img v-if="!srcSelected || remainFiles === 0" src="https://via.placeholder.com/700x700" />
        <img v-else :src="imageSrc" />
      </div>
    </div>
    <div class="multiImageContainer" v-else-if="viewMode === 'multi'">
      <a-row v-for="i in [1,2,3]" :key="i">
        <a-col v-for="j in [1,2,3]" :key="j" :span="8" class="multiImage">
          <img v-if="!srcSelected || remainFiles === 0" src="https://via.placeholder.com/250x250" />
          <img v-else :src="multiImageSrc(0)" />
        </a-col>
      </a-row>
    </div>


    <!-- <a-button @click="capture">canvas</a-button> -->
    <!-- <canvas id="canvas"></canvas> -->
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
      'remainFiles',
      'viewMode',
    ]),
    imageSrc() {
      console.log('imageSrc 변경')
      return this.sourceFolderPath + '\\' + this.imageNames[this.currentIndex]
    },
    // multiImageSrc(num) {
    multiImageSrc() {
      // return this.sourceFolderPath + '\\' + this.imageNames[this.currentIndex+num]
      return num => this.sourceFolderPath + '\\' + this.imageNames[this.currentIndex+num]
    }
  },
  data() {
    return {
    }
  },
  
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
    console.log('photoZone updated')
  },
  methods: {
    ...mapActions([
      'setCurrentImagePath',
      'setCurrentIndex',
      'setIsVideo',
      'setViewMode',
    ]),
    myDrag() {
      console.log('dgra')
    },
    myDrop(e) {
      e.preventDefault();
      console.log('drop')
      console.log(e)
    },
    capture() {
      var canvas = document.getElementById('canvas');
      var video = document.getElementById('video');
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      // canvas.getContext('2d').drawImage(video, 0, 0, 1, 500);

      console.log('canvas?', { canvas, video, width: video.videoWidth })
    }, 
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
    },
    onChangeMultiViewSwitch(e) {
      const viewMode = e ? 'multi' : 'single';
      this.setViewMode(viewMode)
    }
  }
}
</script>

<style scoped lang='scss'>
.photoZone {
  // height: 100%;
  .photoZoneVideo {
    width: 100%;
    height: 100%;
    max-width: 1000px;
    max-height: 700px;
  }
}
.imgContainer {
  text-align: center;

  & > img {
    width: 100%;
    height: 100%;
    max-width: 700px;
    max-height: 700px;
  }
}
.multiImageContainer {
  margin: auto;
  display: table;

  .multiImage {
    // border: 1px solid black;
    width: 250px;
    height: 250px;

    & > img {
      border: 1px solid black;
      width: 250px;
      height: 250px;
    }
  }
}
.imageBack {
  background-image: url('/static/image/1.png')
}
.directionContainer {
  text-align: center;
  margin: 1rem 0;

  .direction {
    width: 12%;
    max-width: 70px;
    min-width: 30px;
    cursor: pointer;

    &:first-child {
      margin-right: 3%;
    }
  }
  .viewSwitchContainer {
    float: right;
    display: flex;
    flex-direction: column;
  }
}

</style>

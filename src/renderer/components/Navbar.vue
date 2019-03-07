<template>
  <div class="navHeight">
    <div style="flex: 0; text-align: center;" class="selectFolderContainer">
      <a-button @click="getSoucreFolder" class="selectFolder" type="primary">
        <a-icon type="folder" />
        폴더 선택
      </a-button>
      <div>
        <span v-html="sourceFolderPath" class="pathView" />
      </div>
    </div>
      <h3 style="margin: auto 0; margin-right: 12%;" class="imageNameContainer">{{ imageNames[currentIndex] }}</h3>
      <h2 v-if="srcSelected" style="margin: auto 0;">
        {{ remainFiles !== 0 ? currentIndex+1 : 0 }} / {{ remainFiles }}
      </h2>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions, mapState } from 'vuex'
const { dialog } = require('electron').remote
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import mixin from '@/mixin'

export default {
  name: 'Navbar',
  components: { },
  mixins: [mixin],
  computed: {
    ...mapGetters([
      'sourceFolderPath',
      'currentImagePath',
      'currentIndex',
      'numberOfFiles_origin',
      'numberOfFiles_complete',
      'currentImagePath',
      'imageNames',
      'srcSelected',
      'remainFiles',
    ])
    // mapState 사용 안함
    // ...mapState({
    //   photo: state => state.Photo
    // })
  },
  updated() {
    console.log('updated Navbar')
    this.checkIsVideo()
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions([
      'setSourceFolderPath',
      'setNumberOfFiles_origin',
      'setNumberOfFiles_complete',
      'setCurrentImagePath',
      'setImageNames',
      'setSrcSelected',
      'setIsVideo',
    ]),
    checkIsVideo() {
      if(this.remainFiles === 0) {
        return;
      }
      const currentImage = this.imageNames[this.currentIndex]
      const ext = path.extname(currentImage)
      if(ext === '.mp4') {
        this.setIsVideo(true)
      }
      else {
        this.setIsVideo(false)
      }
    },
    getSoucreFolder() {
      // 경로설정 Dialog 오픈
      const dirPath = dialog.showOpenDialog({
        properties: ['openDirectory']
      })
      // 예외처리
      if(dirPath === undefined) {
        this.noti('warning', '폴더를 선택하세요')
        return
      }

      // 해당 폴더 안의 모든 파일들 이름 배열에 담기
      let files = fs.readdirSync(dirPath[0])

      console.log('files', files)

      const extAllows = [
        '.jpg',
        '.png',
        '.gif',
        // 비디오까지 넣는건 구현이 힘들듯 하다.
        // '.mp4',
        // '.webm',
        // '.ogv'
      ]

      files = files.filter((file) => {
        const ext = path.extname(file)

        for(let i=0; i<extAllows.length; i++) {
          // if(_.lowerCase(ext) === extAllows[i]) {
          if(ext.toLowerCase() === extAllows[i]) {
            return true
          }
        }
        return false
      })
      console.log('files2', files)

      if(files.length === 0) {
        this.noti('warning', '이미지가 없는 폴더입니다.')
        return;
      }
      console.log('sort path?', dirPath[0] + '\\' + files[0])

      
      
      /* 
      * 날짜순으로 정렬하기
      * fs.statSync 사용
      * atime: 엑세스시간
      * ctime: 생성시간
      * mtime: 수정시간
      */
      // 개발용도로 임시적으로 주석처리
      // let sortPath = dirPath[0] + '\\';
      // files.sort((a, b) => {
      //   let s1 = fs.statSync(sortPath + a)
      //   let s2 = fs.statSync(sortPath + b)

      //   return s2.mtime.getTime() - s1.mtime.getTime()
      // })

      // 스토어에 저장
      this.setSourceFolderPath(dirPath[0])
      this.setCurrentImagePath(files[0])
      this.setImageNames(files)
      this.setSrcSelected(true)

      // 파일 갯수 설정
      this.setNumberOfFiles_origin(files.length)
      this.setNumberOfFiles_complete(0)
    }
  }
}
</script>

<style scoped lang="scss">
.navHeight {
  background: #C9D6FF;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #E2E2E2, #C9D6FF);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #E2E2E2, #C9D6FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  height: 10vh;
  display: flex;
  justify-content: space-around;

  padding: 1% 0;
}

.imageNameContainer {
  margin: auto 0; 
  // margin-right: 12%;
  // flex: 1;
  text-align: center;
}

.selectFolder {
  background-color: #ff4e00;
  background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
  border-color: #ff4e00;

  &:hover, &:focus {
    background-color: #ff4e00;
    background-image: linear-gradient(315deg, #ff4e00 50%, #ec9f05 90%);
    border-color: #ff4e00;
  }
}

.pathView {
  font-size: 0.7rem;
}

@media(max-width: 700px) {
  .selectFolderContainer {
    display: none;
  }
}
</style>
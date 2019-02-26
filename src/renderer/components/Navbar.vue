<template>
  <div class="navHeight">
        <div>
          <a-button @click="getSoucreFolder" class="selectFolder" type="primary">
            <a-icon type="folder" />
            폴더 선택
            <!-- TODO: 아이콘 넣어서 선택전, 선택후 구분하기 -->
          </a-button>
          <div>
            <span v-html="sourceFolderPath" class="pathView" />
          </div>
        </div>
        <!-- <div> -->
          <!-- <h1>Photo</h1> -->
          <h3 style="margin: auto 0; margin-right: 12%;">{{ imageNames[currentIndex] }}</h3>
        <!-- </div> -->
        
        <h2 style="margin: auto 0;">
          <!-- <div style="font-size: 1rem">처리량</div>
          {{ numberOfFiles_complete }} / {{ numberOfFiles_origin }} -->
          {{ currentIndex+1 }} / {{ remainFiles }}
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
    ]),
    remainFiles() {
      return this.numberOfFiles_origin - this.numberOfFiles_complete
    }
    // mapState 사용 안함
    // ...mapState({
    //   photo: state => state.Photo
    // })
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
    ]),
    getSoucreFolder() {
      // 경로설정 Dialog 오픈
      const dirPath = dialog.showOpenDialog({
        properties: ['openDirectory']
      })
      // 예외처리
      if(dirPath === undefined) {
        console.warn('폴더 선택 안됨')
        this.noti('warning', '폴더를 선택하세요')
        return
      }

      // 해당 폴더 안의 모든 파일들 이름 배열에 담기
      // TODO: 파일들 날짜순으로 정렬해서 넣을 순 없을까?
      // TODO: 반응형으로 만들기위해서 사이즈 줄어들면 폴더 버튼이랑 수량표시 없애기
      let files = fs.readdirSync(dirPath[0])

      const extAllows = [
        'jpg',
        'png',
        'gif',
      ]
      // console.log('ext.toLowerCase - .JPG', _.lowerCase('.JPG'))
      // console.log('ext.toLowerCase - .png', _.lowerCase('.png'))
      // console.log('ext.toLowerCase - .PNG', _.lowerCase('.PNG'))
      // console.log('ext.toLowerCase - .gif', _.lowerCase('.gif'))
      // console.log('ext.toLowerCase - .GIF', _.lowerCase('.GIF'))
      
      files = files.filter((file) => {
        const ext = path.extname(file)

        // const ret = _.forEach(extAllows, (item) => {
        //   if(ext.toLowerCase === '.jpg') {
        //     console.log('items?', item)
        //     return true;
        //   }
        // })

        for(let i=0; i<extAllows.length; i++) {
          console.log('item?', extAllows[i])
          console.log('ext.toLowerCase', _.lowerCase(ext))
          
          if(_.lowerCase(ext) === extAllows[i]) {
            // console.log('ext1', ext)
            console.log('ret true')
            return true
          }
        }
        
        return false
      })
      console.log(files);
      console.log('unde?', files.length === 0)

      if(files.length === 0) {
        // 이미지가 없는 폴더
        this.noti('warning', '이미지가 없는 폴더입니다.')
        return;
      }

      // 스토어에 저장
      this.setSourceFolderPath(dirPath[0])


      // 파일 갯수 설정
      this.setNumberOfFiles_origin(files.length)
      this.setNumberOfFiles_complete(0)

      this.setCurrentImagePath(files[0])
      this.setImageNames(files)
    }
  }
}
</script>

<style scoped lang="scss">
.navHeight {
  background: #C9D6FF;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #E2E2E2, #C9D6FF);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #E2E2E2, #C9D6FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  height: 7vh;
  display: flex;
  justify-content: space-around;

  padding: 1% 0;
}

.selectFolder {
  background-color: #ff4e00;
  background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
  border-color: #ff4e00;

  &:hover {
    background-color: #ff4e00;
    background-image: linear-gradient(315deg, #ff4e00 50%, #ec9f05 90%);
    border-color: #ff4e00;
  }
  &:focus {
    background-color: #ff4e00;
    background-image: linear-gradient(315deg, #ff4e00 50%, #ec9f05 90%);
    border-color: #ff4e00;
  }
  // color: blue;
  // font-weight: bold;
  // text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  // box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.pathView {
  font-size: 0.7rem;
}
</style>
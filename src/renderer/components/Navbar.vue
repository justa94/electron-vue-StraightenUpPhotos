<template>
  <div>
    <b-navbar type="primary" variant="info">
      <b-container fluid>
        <b-row style="width: 100%; text-align:center;">
          <b-col>
            <div>
              <b-button @click="getSoucreFolder">
                폴더 선택
                <!-- TODO: 아이콘 넣어서 선택전, 선택후 구분하기 -->
              </b-button>
              <div>
                {{ sourceFolderPath }} <br/>
                {{ currentImagePath }}
              </div>
            </div>
          </b-col>
          <b-col>
            <b-nav-text tag="h2">
              Photo
            </b-nav-text>
          </b-col>
          <b-col>
            <b-nav-text tag="h2">
              {{ numberOfFiles_complete }} / {{ numberOfFiles_origin }}
            </b-nav-text>
          </b-col>
        </b-row>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions, mapState } from 'vuex'
const { dialog } = require('electron').remote
import fs from 'fs'

export default {
  name: 'Navbar',
  components: { },
  computed: {
    ...mapGetters([
      'sourceFolderPath',
      'currentImagePath',
      'numberOfFiles_origin',
      'numberOfFiles_complete'
    ]),
    ...mapState({
      photo: state => state.Photo
    })
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions([
      'setSourceFolderPath',
      'setNumberOfFiles_origin',
      'setNumberOfFiles_complete'
    ]),
    getSoucreFolder() {
      // 경로설정 Dialog 오픈
      const path = dialog.showOpenDialog({
        properties: ['openDirectory']
      })
      // 예외처리
      if(path === undefined) {
        console.warn('폴더 선택 안됨')
        return
      }

      // 스토어에 저장
      this.setSourceFolderPath(path[0])

      // 해당 폴더 안의 모든 파일들 이름 배열에 담기
      const files = fs.readdirSync(path[0])
      console.log(files)

      // TODO: jpg 등 이미지 확장자만 뽑아내기

      // 파일 갯수 설정
      this.setNumberOfFiles_origin(files.length)
      this.setNumberOfFiles_complete(0)
    }
  }
}
</script>

<style scoped>
.center {
  color: blue;
  justify-content: space-between;
}
</style>
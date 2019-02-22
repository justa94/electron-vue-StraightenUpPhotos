<template>
  <div>
    <b-row>
      <b-col>
        <div>
          <b-button @click="test" variant="primary">test</b-button>
          <span v-html="currentImagePath" class="pathView" />
        </div>
      </b-col>
    </b-row>
    <b-row v-for="(destFolder, index) in destFolders" :key="index">
      <div>
          <b-button @click="moveImage(destFolder.dirPath)" variant="primary" v-html="destFolder.dirName" />
          <span v-html="destFolder.dirPath" class="pathView" />
          <!-- TODO: icon으로 수정, 삭제 버튼 만들기 -->
        </div>
    </b-row>
    <b-row>
      <b-col>
        <!-- TODO: src폴더 선택 전에는 Disable -->
        <b-button @click="hanldeClickNewDir" variant="secondary" size="sm">경로 추가</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
const { dialog } = require('electron').remote
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import { setTimeout } from 'timers';

export default {
  name: 'SidebarRight',
  components: { },
  computed: {
    ...mapGetters([
      'currentImagePath',
      'destFolders',
      'sourceFolderPath',
      'imageNames',
      'currentIndex'
    ])
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions([
      'setCurrentImagePath',
      'addDestFolders',
      'setSourceFolderPath',
      'setImageNames',
      'setCurrentIndex'
    ]),
    test() {
      const apath = dialog.showOpenDialog({
        filters: [
          { name: 'Image', extensions: ['jpg', 'png'] }
        ]
      })
      if(apath === undefined) {
        console.warn('unde')
        return
      }

      console.log('path?', apath)

      this.setCurrentImagePath(apath[0])

      return
      console.log('handleClickNewDir')
      let path = dialog.showOpenDialog({
        properties: ['openDirectory']
      })

      console.log(path)
      if(path === undefined) {
        console.warn('unde')
        return
      }
      this.folder = fs.readdirSync(path[0])
      
      console.log(this.folder.length)
      console.log(this.folder[3])
      
      _.forEach(this.folder, (fo) => {
        console.log(path[0] + '\\' + fo)
      })
    },
    hanldeClickNewDir() {
      let dirPath = dialog.showOpenDialog({
        properties: ['openDirectory']
      })
      // 예외처리
      if(dirPath === undefined) {
        console.warn('폴더 선택 안됨')
        return
      }
      dirPath = dirPath[0]

      console.log('dirPath', dirPath)
      const dirName = path.basename(dirPath)
      console.log('dirName', dirName)

      // TODO: 폴더경로 중복검사
      // TODO: src 폴더랑 경로가 같으면 안됨
      this.addDestFolders({dirPath, dirName})


      setTimeout(() => {
        console.dir(this.destFolders)
      }, 1000)
    },
    // @dev: 목적지 폴더 경로를 인자로 받아서 그 위치에 파일 이동
    moveImage(paramDestpath) {
      const srcPath = this.sourceFolderPath + '\\' + this.imageNames[this.currentIndex]
      const destPath = paramDestpath + '\\' + this.imageNames[this.currentIndex]
      
      console.log('src: ', srcPath)
      console.log('dest: ', destPath)

      fs.rename(srcPath, destPath, (err) => {
        if(err) {
          console.error(err)
          console.error('pbw error!')
          return
        }
        
        console.info('file move Success!')
        console.info(srcPath + '==>' + destPath)
      })
    }
  }
}
</script>

<style scoped>
.pathView {
  font-size: 0.7rem;
}
</style>

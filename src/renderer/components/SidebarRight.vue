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
    <b-row>
      <b-col>
        <b-button @click="hanldeClickNewDir" variant="secondary" size="sm">경로 추가</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div>currentImagePath: {{ currentImagePath }}</div>
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
// const _ = 'lodash'

export default {
  name: 'SidebarRight',
  components: { },
  computed: {
    ...mapGetters(['currentImagePath'])
  },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions([
      'setCurrentImagePath'
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

      
    }
  }
}
</script>

<style scoped>
.pathView {
  font-size: 0.7rem;
}
</style>

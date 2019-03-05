<template>
  <div class="sidebarRightContainer">
    <a-row v-for="(destFolder, index) in destFolders" :key="index" class="destBtn">
      <div class="moveContainer">
        <!-- TODO: hover, focus 시에 color 변경 -->
        <!-- <a-button @click="moveImage(destFolder)" v-html="destFolder.dirName" class="moveBtn" type="primary" size="large" /> -->
        <a-button @click="beforeMoveImage(destFolder)" v-html="destFolder.dirName" class="moveBtn" type="primary" size="large" />
        <span class="iconContainer">
          <a-tag color="#2db7f5" @click="changePath(index)">변경</a-tag>
          <a-tag color="#f50" @click="removePath(index)">삭제</a-tag>
        </span>
      </div>
      <div style="width: 100%">
        <span v-html="destFolder.dirPath" class="pathView" />
      </div>
    </a-row>
    <a-row style="text-align: center">
      <!-- TODO: src폴더 선택 전에는 Disable -->
      <a-button @click="hanldeClickNewDir" size="small" type="primary">
      <!-- <a-button @click="test" size="small" type="primary"> -->
        <a-icon type="plus-circle" />
        경로 추가
      </a-button>
    </a-row>
    <a-spin :spinning="sp">
    </a-spin>




    <!-- <b-row v-for="(destFolder, index) in destFolders" :key="index" class="destBtn">
      <div style="width: 100%">
        <b-button @click="moveImage(destFolder.dirPath)" variant="primary" v-html="destFolder.dirName" />
      </div>
      <div style="width: 100%">
        <span v-html="destFolder.dirPath" class="pathView" />
      </div>
    </b-row>
    <b-row style="justify-content: center;">
      <b-button @click="hanldeClickNewDir" variant="secondary" size="sm">경로 추가</b-button>
    </b-row> -->
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
const { dialog } = require('electron').remote
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import mixin from '@/mixin'

export default {
  name: 'SidebarRight',
  components: { },
  mixins: [mixin],
  computed: {
    ...mapGetters([
      'currentImagePath',
      'destFolders',
      'sourceFolderPath',
      'imageNames',
      'currentIndex',
      'numberOfFiles_complete',
      'spinning',
    ])
  },
  data() {
    return {
      sp: false
    }
  },
  methods: {
    ...mapActions([
      'setCurrentImagePath',
      'addDestFolders',
      'setSourceFolderPath',
      'setImageNames',
      'setCurrentIndex',
      'setNumberOfFiles_complete',
      'changeDestFolders',
      'popDestFolders',
      'pushHistory',
      'setSpinning',
    ]),
    test() {
      console.log('test in')
      setTimeout(() => {
        console.log('timer in')
      }, 1200)
    },


    hanldeClickNewDir() {
      const dirPath = this.openDialog()
      if(dirPath === undefined) {
        console.log('dirPath unde')
        return
      }
      const dirName = path.basename(dirPath)

      // 폴더경로 중복검사
      for(let i=0; i<this.destFolders.length; i++) {
        if(this.destFolders[i].dirPath === dirPath) {
          this.noti('warning', '경로가 같습니다')
          return
        }
      }

      // src 폴더랑 경로가 같으면 안됨
      // 개발용도로 일단 주석처리
      // if(this.sourceFolderPath === dirPath) {
      //   this.noti('warning', '경로가 같습니다')
      //   return
      // }

      this.addDestFolders({dirPath, dirName})
    },
    beforeMoveImage(paramdestFolder) {
      this.setSpinning(true)
      setTimeout(() => {
        this.moveImage(paramdestFolder)
        this.setSpinning(false)
      }, 50);
    },
    // @dev: 목적지 폴더 경로를 인자로 받아서 그 위치에 파일 이동
    moveImage(paramdestFolder) {
      // 예외처리
      if(this.imageNames.length <= 0) {
        this.noti('warning', 'src 폴더가 선택되지 않았습니다.')
        return
      }

      const paramDestpath = paramdestFolder.dirPath
      const paramDestName = paramdestFolder.dirName
      const imageName = this.imageNames[this.currentIndex]

      const srcPath = this.sourceFolderPath + '\\' + imageName
      const destPath = paramDestpath + '\\' + imageName

      console.log('cp timer start')
      // 파일 이동
      try {
        fs.renameSync(srcPath, destPath);
        // fs.copyFileSync(srcPath, destPath);
        console.log('success!')
      }
      catch(e) {
        console.error(e)
        console.error('pbw try error')
        this.noti('error', '에러!')
        return
      }
      finally {
        console.log('finally')
        this.setSpinning(false)
      }

      // 배열 수정 등 작업해주기
      // Photo 변경, CurrentIndex 변경

      // 배열 갈아치운다.
      this.imageNames.splice(this.currentIndex, 1);

      // 처리된 이미지 파일 갯수 증가
      this.setNumberOfFiles_complete(this.numberOfFiles_complete + 1)

      this.pushHistory({
        srcPath,
        destPath,
        destFolderName: paramDestName,
        imageName
      })

      // TODO: 마지막 파일 까지 이동했을 경우 처리해준다.
    },
    changePath(index) {
      const dirPath = this.openDialog()
      const dirName = path.basename(dirPath)

      const payload = {
        index,
        data: {
          dirName,
          dirPath
        }
      }

      this.changeDestFolders(payload)
    },
    removePath(index) {
      console.log('removePath', index)
      this.popDestFolders(index)

      // TODO: 제거하기전에 confirm하기
      /* antd에서 popconfirm, modal등이 동작하지 않음.
         bootstrap꺼는 잘 동작한다.. */
    }
  }
}
</script>

<style scoped lang="scss">
.pathView {
  font-size: 0.7rem;
}
.sidebarRightContainer {
  padding: 50px 20px;
}
.destBtn {
  margin-bottom: 20px;
  & button {
    min-width: 120px;
    max-width: 120px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.iconContainer {
  & > i {
    font-size: 1.5rem;
    border-radius: 50%;
    // border-color: #1890ff;
    // background-color: rgb(230, 247, 255);
    
    &:hover {
      cursor: pointer;
    }
  }
}
.moveContainer {
  // width: 100%;
  display: flex;
  justify-content: space-between;
}
.moveBtn {
  background-color: #87d068;
  border-color: lightsteelblue;
  color: darkgreen;

  &:hover, &:focus {
    background-color: hsl(102, 87%, 44%);
    border-color: lightsteelblue;
    color: hsl(229, 77%, 54%);
  }
}
</style>

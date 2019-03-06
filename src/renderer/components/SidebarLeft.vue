<template>
  <div class="sidebarLeft">
    <h2 style="text-align: center;">History</h2>
    <div>
      <a-list
        :dataSource="history"
        style="height: 800px; overflow: auto;"
        bordered
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <div class="listItem">
            <video controls="controls" width="120px" height="100px" v-if="item.isVideo">
              <source :src="item.destPath" type="video/mp4" />
            </video>
            <img v-else :src="item.destPath" width="120px" height="100px" />
            <!-- TODO: video면 섬네일 이미지 보이게하기 -->
            <!-- <img :src="item.destPath" width="120px" height="100px" /> -->
            <div>
              <div>--> {{ item.destFolderName }}</div>
              <a-button @click="beforeRestore(item, index)" type="default">복원</a-button>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
import fs from 'fs'
import mixin from '@/mixin'

export default {
  name: 'SidebarLeft',
  components: { },
  mixins: [mixin],
  computed: {
    ...mapGetters([
      'history',
      'imageNames',
      'numberOfFiles_complete',
      'isVideo',
    ])
  },
  data() {
    return {
      
    }
  },
  methods: {
    ...mapActions([
      'setNumberOfFiles_complete',
      'popHistory',
      'setSpinning',
    ]),
    beforeRestore(item, index) {
      this.setSpinning(true)
      setTimeout(() => {
        this.restore(item, index)
        this.setSpinning(false)
      }, 50);
    },
    restore(item, index) {
      const { srcPath, destPath, imageName } = item

      // 복원작업 dest -> src 이동
      try {
        this.setSpinning(true)
        fs.renameSync(destPath, srcPath);
        console.log('success!')
        // this.noti('success', '파일 복원 성공')
      }
      catch(e) {
        console.error(e)
        console.error('pbw try error')
        this.noti('error', '에러!')
        return
      }
      finally {
        console.log('history finally')
        this.setSpinning(false)
      }

      // imageNames에 추가 (앞에 추가함)
      console.log('imageNames 원래 길이', this.imageNames.length)
      console.log('prev ImageNames', this.imageNames)
      console.log('imagename', imageName)
      let a = this.imageNames.unshift(imageName)
      console.log('imageNames 길이', a)
      console.log('next ImageNames', this.imageNames)

      // 처리된 이미지 파일 갯수 감소
      this.setNumberOfFiles_complete(this.numberOfFiles_complete - 1)

      // history pop
      try {
        this.popHistory(index)
      }
      catch(e) {
        console.log('pbw history err')
      }
      finally {
        console.log('------------------------')
        console.log('history')
        console.log(this.history)
        console.log('------------------------')
      }
      
    },
  }
}
</script>

<style scoped lang="scss">
.listItem {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>

<template>
  <div>
    <b-navbar type="primary" variant="info" class="center">
      <b-nav-text tag="h2">
        Photo
      </b-nav-text>
    </b-navbar>
    <b-container fluid>
      <b-row class="maxHeight">
        <b-col cols="2">
          left
        </b-col>
        <b-col>
          middle
          <div v-html="folder"></div>
        </b-col>
        <b-col cols="4">
          <b-row>
            <b-col>
              <!-- <b-form-file
                webkitdirectory
              /> -->
            </b-col>
            <b-col>
              <button @click="hanldeClickNewDir">가족</button>
            </b-col>
          </b-row>
          <div>
            
          </div>
        </b-col>
      </b-row>
    </b-container>
    


    <!-- VueX 테스트 -->
    <!-- <div>
      <h2>Test</h2>
      <hr/>
      value: {{ this.$store.state.Counter.main }}
      value: {{ this.$store.getters.main }}
      text: {{ this.$store.state.Counter.my }}
      text: {{ this.getMy }}
      <div>
        <b-button @click="incre">Increment</b-button>
      </div>
    </div> -->
  </div>
</template>

<script>
/* eslint-disable */
const { dialog } = require('electron').remote
import fs from 'fs'
import _ from 'lodash'
// const _ = 'lodash'

export default {
  name: 'StraightenUpPhotos',
  components: { },
  computed: {
    getMy() {
      return this.$store.getters.my
    }
  },
  data() {
    return {
      folder: 'empty',
      folders: []
    }
  },
  methods: {
    incre() {
      // this.$store.Counter.dispatch('someAsyncTask')
      console.dir(this.$store)
      this.$store.dispatch('increMain', {})
    },
    hanldeClickNewDir() {
      console.log('handleClickNewDir')
      let path = dialog.showOpenDialog({
        properties: ['openDirectory']
      })

      console.log(path)
      this.folder = fs.readdirSync(path[0])
      console.log(this.folder.length)
      console.log(this.folder[3])
      
      _.forEach(this.folder, (fo) => {
        console.log(path[0] + '\\' + fo)
      })


      fs.readdir(path[0], function(err, files) {
        if(err) {
          console.error(err)
        }
        console.log(files.length)
        console.log(files[2])
        
      })
    }
  }
}
</script>

<style scoped>
  body {
    /* padding: 10%; */
  }
  .center {
    /* display: flex; */
    justify-content: center;
  }
  .maxHeight {
    height: 100%;
  }
</style>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <span> from {{ appName }} running on {{ platform }} </span>
    <div>This Button: <button @click="getFile">BTN</button></div>
  </div>
</template>

<script>
  import { remote } from 'electron'
  import os from 'os'
  
  import fs from 'fs'
  const {dialog} = require('electron').remote

  export default {
    data () {
      return {
        platform: os.platform(),
        appName: remote.app.getName(),
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial sta te.
        msg: 'Hello World!'
      }
    },
    methods: {
      getFile () {
        let content = 'Hello PBW!'

        dialog.showSaveDialog((fileNames) => {
          console.log('pbw fileName?', fileNames)
          if (fileNames === undefined) {
            console.log('no file')
            return
          }

          // fs.readFile(fileNames[0], 'utf-8', (err, data) => {
          //   if(err) {
          //     console.log('pbw err', err);
          //     return;
          //   }

          //   console.log('this content');
           //   console.log(data);
          // })

          fs.writeFile(fileNames, content, (err) => {
            if (err) {
              console.log('pbw err!', err)
              return
            }
            console.log('file saved')
          })
        })
      }
    }
  }
</script>

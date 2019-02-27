const { dialog } = require('electron').remote

var mixin = {
  methods: {
    noti(type, msg, note) {
      this.$notification[type]({
        message: msg || 'Notification Title',
        description: note || '',
      });
    },
    openDialog() {
      console.log('mixin opendialog')
      let dirPath = dialog.showOpenDialog({
        properties: ['openDirectory']
      })
      // 예외처리
      if(dirPath === undefined) {
        this.noti('warning', '폴더를 선택하세요')
        return
      }

      dirPath = dirPath[0]
      return dirPath
    },
  }
}

export default mixin
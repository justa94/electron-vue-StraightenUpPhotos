const { dialog } = require('electron').remote

var mixin = {
  methods: {
    noti(type, msg, note) {
      this.$message.info(msg)
      // this.$notification[type]({
      //   key: msg,
      //   message: msg || 'Notification Title',
      //   description: note || '',
      // });
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
    openFileDialog() {
      console.log('mixin openFileDialog()');
      let filePath = dialog.showOpenDialog({
        filters: [{ name: 'json', extensions: ['json'] }],
        properties: ['openFile']
      })

      console.log('filePath? ', filePath);

      if(!filePath) {
        this.noti('warning', '파일을 선택하세요');
        return;
      }

      filePath = filePath[0];
      return filePath;
    },
    openSavePresetDialog() {
      console.log('mixin openSavePresetDialog()');
      let filePath = dialog.showSaveDialog({
        title: '프리셋 저장',
        filters: [
          { name: 'json', extensions: ['json'] }
        ]
      });

      if (!filePath) {
        this.noti('warning', '파일을 선택하세요');
        console.warn(filePath)
        return;
      }

      return filePath;
    },
    isJsonPresetString(str) {
      try {
        const parsed = JSON.parse(str);
        if (!Array.isArray(parsed)) {
          throw 'not Array';
        }
        for (let elem of parsed) {
          const { dirName, dirPath } = elem;
          if (!dirName || !dirPath) {
            throw 'not dirName or dirPath';
          }
        }
      } catch (err) {
        this.noti(err);
        return false;
      }
      return true;
    }
  }
}

export default mixin
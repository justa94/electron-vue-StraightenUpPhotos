var mixin = {
  methods: {
    test() {
      console.log('mixin called')
    },
    // openNotificationWithIcon(type, msg, note) {
    noti(type, msg, note) {
      this.$notification[type]({
        message: msg || 'Notification Title',
        description: note || '',
      });
    },
  }
}

export default mixin
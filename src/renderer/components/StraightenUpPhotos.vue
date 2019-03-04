<template>
  <div>
    <a-spin size="large" :spinning="spinning">
      <Navbar />
      <a-row type="flex" justify="space-between" :gutter="0" class="photoContent">
        <a-col :span="5" class="col-SidebarLeft">
          <SidebarLeft />
        </a-col>
        <a-col :span="14">
          <PhotoZone />
        </a-col>
        <a-col :span="5">
          <SidebarRight />
        </a-col>
      </a-row>
    </a-spin>

    
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
import Navbar from '@/components/Navbar'
import SidebarLeft from '@/components/SidebarLeft'
import SidebarRight from '@/components/SidebarRight'
import PhotoZone from '@/components/PhotoZone'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'StraightenUpPhotos',
  components: {
    Navbar,
    SidebarLeft,
    SidebarRight,
    PhotoZone
  },
  computed: {
    ...mapGetters([
      'spinning'
    ]),
    getMy() {
      return this.$store.getters.my
    }
  },
  beforeUpdate() {
    console.log('before update', this.spinning)
  },
  updated() {
    console.log('updated', this.spinning)
  },
  data() {
    return {
      
    }
  },
  methods: {
    incre() {
      // this.$store.Counter.dispatch('someAsyncTask')
      console.dir(this.$store)
      this.$store.dispatch('increMain', {})
    }
  }
}
</script>

<style scoped>
.photoContent {
  height: 90vh;
  background: #1CD8D2;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #93EDC7, #1CD8D2);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #93EDC7, #1CD8D2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

@media(max-width: 1080px) {
  .col-SidebarLeft {
    display: none;
  }
}
</style>

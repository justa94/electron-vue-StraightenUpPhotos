<template>
  <div>
    <Navbar />
    <b-container fluid >
      <b-row class="photoContent">
        <b-col cols="2">
          <SidebarLeft />
        </b-col>
        <b-col style="text-align: center;">
          <PhotoZone />
        </b-col>
        <b-col cols="4">
          <SidebarRight />
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
import Navbar from '@/components/Navbar'
import SidebarLeft from '@/components/SidebarLeft'
import SidebarRight from '@/components/SidebarRight'
import PhotoZone from '@/components/PhotoZone'

export default {
  name: 'StraightenUpPhotos',
  components: {
    Navbar,
    SidebarLeft,
    SidebarRight,
    PhotoZone
  },
  computed: {
    getMy() {
      return this.$store.getters.my
    }
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
  height: 93vh;
  background: #1CD8D2;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #93EDC7, #1CD8D2);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #93EDC7, #1CD8D2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>

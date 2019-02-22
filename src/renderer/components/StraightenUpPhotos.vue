<template>
  <div>
    <Navbar />
    <b-container fluid >
      <b-row class="maxHeight">
        <b-col cols="2">
          <SidebarLeft />
        </b-col>
        <b-col>
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
.maxHeight {
  height: 93vh;
}
</style>

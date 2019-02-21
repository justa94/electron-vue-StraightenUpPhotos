<template>
  <div>
    <b-navbar type="primary" variant="info" class="center">
      <b-nav-text tag="h2">
        Photo
      </b-nav-text>
    </b-navbar>
    <b-container fluid>
      <b-row>
        <b-col>
          left
        </b-col>
        <b-col>
          right
        </b-col>
      </b-row>
    </b-container>
    <div>
      <b-button>Button</b-button>
      <b-button variant="danger">Button</b-button>
      <b-button variant="success">Button</b-button>
      <b-button variant="outline-primary">Button</b-button>
    </div>
    <div>
      <h2>Test</h2>
      <hr/>
      value: {{ this.$store.state.Counter.main }}
      value: {{ this.$store.getters.main }}
      text: {{ this.$store.state.Counter.my }}
      text: {{ this.getMy }}
      <div>
        <b-button @click="incre">Increment</b-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StraightenUpPhotos',
    components: { },
    computed: {
      getMy() {
        return this.$store.getters.my
      }
    },
    methods: {
      incre() {
        // this.$store.Counter.dispatch('someAsyncTask')
        console.dir(this.$store)
        this.$store.dispatch('increMain', {})
      },
      pare() {
        console.log('pare')
      }
    },
    data() {
      return {
        
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
</style>

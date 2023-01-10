<template>
  <div>
    <SteamHeader/>  
      
    <div style="width: 100%;">
        <SteamBody/>
    </div>  

    <LoadingBox/>
    
  </div>
</template>

<script>
import SteamHeader from '@/components/SteamHeader.vue'
import SteamBody from '@/components/SteamBody.vue'
import LoadingBox from '@/components/LoadingBox.vue'


export default {
  name: "MainScreen",
  components: { SteamHeader, SteamBody, LoadingBox},

  mounted() {},
  beforeDestroy() {},

  data: function () {
    return {};
  },

  methods: {

  },
};
</script>

<style scoped>

</style>
<template>
  
    <v-app>
    <HeaderComponent/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from './components/shared/HeaderComponent.vue';

export default {
  
  components:{
    HeaderComponent
    
},
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

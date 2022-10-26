<template>
        <v-app-bar
      dark
      style="z-index:300"
      color="primary"
      elevate-on-scroll
    >

    <router-link to="/"> <v-toolbar-title style="color:white">bSocial</v-toolbar-title></router-link> 

      <v-spacer></v-spacer>

      <v-btn @click="logout" text>
        Logout
        <v-icon>mdi-logout</v-icon>
      </v-btn>

    </v-app-bar>

</template>

<script>
export default {
    data: () => ({
       drawer:true,
       items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        right: null,
    }),
    methods: {
        logout() {
        window.localStorage.removeItem("token"); 
        this.$router.push({ path: "/login" });
    },
    },
    

    
}
</script>

<style scoped>

</style>
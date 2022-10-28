<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
//importing the socket.io we installed
import io from "socket.io-client"; 
export default {
  name: 'App',
  created(){
      this.userInfo = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
      const socket = io("http://localhost:8000");
      console.log(socket.id)
      socket.on("comments", (data) => {
        console.log(data.comment)
        console.log(data.id)
      });
    },
};
</script>

<style>
  a{
    text-decoration: none;
  }
</style>

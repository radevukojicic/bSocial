<template>
  <v-app>
    <v-main>
      <router-view/>
      <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          New comment
        </v-card-title>

        <v-card-text>
          
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

      

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
//importing the socket.io we installed
import io from "socket.io-client"; 
export default {
  data: () => ({
        dialog:false
    }),
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

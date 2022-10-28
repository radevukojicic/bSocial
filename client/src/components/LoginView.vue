<template>
    <v-app id="inspire">
        <v-app-bar
      dark
      absolute
      color="primary"
      elevate-on-scroll
    >

      <v-toolbar-title>bSocial</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn to="/login" text>
        Login
        <v-icon>mdi-person</v-icon>
      </v-btn>
      <router-link to="/register">
      <v-btn  text>
        Register
        <v-icon>mdi-person</v-icon>
      </v-btn>
      </router-link>


    </v-app-bar>
      <v-main>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                   
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login </v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                            <v-alert
                            v-if="errMsg"
                       dense
                       outlined
                       type="error"
                     >
                       {{this.errMsg}}
                     </v-alert>
                           <v-text-field
                              prepend-icon="person"
                              name="email"
                              label="Email"
                              v-model="email"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Password"
                              type="password"
                              v-model="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <p style="padding-left:15px">Don't have account? <router-link to="/register">Register here!</router-link></p>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login">Login</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-main>
   </v-app>
</template>

<script>
import axios from "axios"
export default {
    data: () => ({
        email:'',
        password:'',
        errMsg:null
    }),
    methods: {
        login() {
             let data = {
                email:this.email,
                password:this.password
             }
             axios.post("http://localhost:8000/user/login", data )
            .then(async response => {
               console.log(response.data)
                await window.localStorage.setItem("token", response.data.token);
                this.$router.push({ path: "/" });    
            })
            .catch(error => {
                //Set error message 
                this.errMsg = error.response.data
            })
        },
    }
};
</script>

<style scoped>
.container.fill-height > .layout {
    height: 100vh;
}
</style>
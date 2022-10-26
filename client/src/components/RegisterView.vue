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
<router-link to="/login">
      <v-btn text>
        Login
        <v-icon>mdi-person</v-icon>
      </v-btn>
      </router-link>

      
      <v-btn to="/register"  text>
        Register
        <v-icon>mdi-person</v-icon>
      </v-btn>


    </v-app-bar>
      <v-main>
         <v-container class="mt-4" fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                   
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Register </v-toolbar-title>
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
                              name="First name"
                              label="First name"
                              v-model="form.firstName"
                              type="text"
                           ></v-text-field>
                            <v-text-field
                              name="Last name"
                              label="Last name"
                              v-model="form.lastName"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              name="email"
                              label="Email"
                              v-model="form.email"
                              type="text"
                           ></v-text-field>
                            <v-text-field
                              name="username"
                              label="Username"
                              v-model="form.username"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              name="password"
                              label="Password"
                              type="password"
                              v-model="form.password"
                           ></v-text-field>
                            <v-text-field
                              id="passwordConfirm"
                              name="passwordConfirm"
                              label="Password Confirm"
                              type="password"
                              v-model="form.passwordConfirm"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <p style="padding-left:15px">Already have account? <router-link to="/login">Login here!</router-link></p>

                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="register">Register</v-btn>
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
      form : {
        fisrtName:'',
        lastName:'',
        email:'',
        username:'',
        password:'',
        passwordConfirm:'',
      },
      errMsg:null

    }),
    methods: {
        register() {
             axios.post("http://localhost:8000/user/register", this.form )
            .then(async response => {
               console.log(response.data)
                await window.localStorage.setItem("token", response.data.token);
                this.$router.push({ path: "/" });    
            })
            .catch(error => {
                //Set error message 
                this.errMsg = error.response.data.message
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
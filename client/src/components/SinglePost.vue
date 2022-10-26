<template>
<div>
    <NavBar />

        <div class="cen"> 
            <div>
        <router-link to="/"><v-btn fab dark class="mt-5" color="primary"><v-icon>mdi-arrow-left</v-icon></v-btn></router-link>

         <div style="width:500px"  class="card gedf-card mt-5">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                </div>
                                <div class=" mt-1">
                                    <div class="h5 m-0">{{this.post.username}}</div>
                                </div>
                            </div>
                            <div>
                            
                            </div>
                        </div>

                    </div>
                    <div class="card-body">
                        <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>{{this.post.createdAt}}</div>
                        <!-- <a class="card-link" href="#">
                            <h5 class="card-title">Lorem ipsum dolor sit amet, consectetur adip.</h5>
                        </a> -->

                        <p class="card-text">
                            {{this.post.content}}
                        </p>
                    </div>
                    <div class="card-footer">
                        <h6 class="mb-5">Comments:</h6>
                        <div v-for="comment in comments" :key="comment.id">
                        {{comment.username}}
                        <p style="width:95%;margin-left:5%; background:white; padding:10px;border-radius:7px" class="card-text">
                           {{comment.content}}
                        </p>
                        <v-divider></v-divider>
                        </div>
                 
                        
                    </div>
                    <v-btn @click="postComment" color="primary">Post comment</v-btn>
                    <textarea placeholder="write comment.. "
                    style="padding:10px ;border-radius:7px" v-model="content"  id="" cols="10" rows="10"></textarea>
                </div>
                    <div style="margin-bottom:230px"></div>

    </div>
    </div>
    </div>
</template>


<script>
import NavBar from '@/components/NavBar'
import apiClient from '../services/service'

export default {
    data: () => ({
      postId:null,
      post:'',
      comments:[],
      content:''
    }),
    name: "SinglePost",
    components: {
      NavBar,
    },
    mounted() {
      this.postId = this.$route.params.postId
      this.userInfo = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
      apiClient.getPost(this.postId)
      .then(response => {
        this.post = response.data
      })
      let data = {
        postId: this.postId,
      }
      apiClient.getComments(data)
      .then(async response => {
        this.comments = await response.data

      })

    },
    methods: {
     async postComment(){
     let data = {
        postId: this.postId,
        content: this.content
      }
       await apiClient.postComment(data)
        .then(response => {
        console.log(response.data)
      })
      await apiClient.getComments(data)
      .then(async response => {
        this.comments = await response.data
      })
      this.content = ''      

     }
   
    },
}
</script>


<style scoped>
.cen{
    display: flex;
    justify-content: center;
    align-items: center;
}
textarea{
    height: 100px;
    border: 1px solid black;
}
</style>
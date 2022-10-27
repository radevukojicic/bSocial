<template>
    <div id="admin">
    <NavBar />
       <div id="feed" class="mt-5 container-fluid gedf-wrapper">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <v-app-bar color="primary" dark>Profile name</v-app-bar>
                        <li class="list-group-item">
                            <div class="h5">{{this.userInfo.name}}</div>
                        </li>
                      
                </div>
                <div class="mt-5 card">
                    <v-app-bar color="primary" class="mb-9" dark>Users you don't follow</v-app-bar>
                    <ul v-for="item in nonFollow" :key="item.name">

                        <v-list-item  class="pl-0 grow">

        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{item.username}}</v-list-item-title>
        </v-list-item-content>

        <v-btn  dark @click="follow(item.id)">Follow</v-btn>
      </v-list-item>
                      <v-divider></v-divider>

                      </ul>
                </div>
            </div>
            <div class="col-md-6 gedf-main">

                <!--- \\\\\\\Post-->
                <div class="card gedf-card">
                    <div class="card-header">
                       <h5>Create post</h5>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div class="form-group">
                                <div id="errMsg" v-if="errMsg" class="alert alert-danger" role="alert">{{this.errMsg}}</div>
                                <div id="succMsg" v-if="succMsg" class="alert alert-success" role="alert">{{this.succMsg}} </div>
                                    <label class="sr-only" for="message">post</label>
                                    <textarea v-model="content" class="form-control" name="content" id="content" rows="3" placeholder="What are you thinking?" ></textarea>
                                </div>

                            </div>
                           
                        </div>
                        <div class="btn-toolbar justify-content-between">
                            <div class="btn-group">
                                 <v-btn @click="createPost" color="primary">Upload</v-btn>
                            </div>
                    
                        </div>
                    </div>
                </div>
                <!-- Post /////-->
                <div v-for="post in posts" :key="post.id" class="card gedf-card mt-5">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                </div>
                                <div class=" mt-1">
                                    <div class="h5 m-0">{{post.username}}</div>
                                </div>
                            </div>
                            <div>
                            
                            </div>
                        </div>

                    </div>
                    <div class="card-body">
                        <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>{{post.createdAt}}</div>
                        <!-- <a class="card-link" href="#">
                            <h5 class="card-title">Lorem ipsum dolor sit amet, consectetur adip.</h5>
                        </a> -->

                        <p class="card-text">
                            {{post.content}}
                        </p>
                    </div>
                    <div class="card-footer">
                       <router-link :to="`/post/`+post.id"> <a href="#"  class="card-link"><i class="fa fa-comment"></i> See comments</a></router-link>
                    </div>
                </div>
               




           



            </div>
            <div class="col-md-3">
                <div class="card gedf-card">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                            card's content.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
                <div class="card gedf-card">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                card's content.</p>
                            <a href="#" class="card-link">Card link</a>
                            <a href="#" class="card-link">Another link</a>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    </div>
</template>


<script>
import NavBar from '@/components/NavBar'
import apiClient from '../services/service'


export default {
    data: () => ({
     socket:{},
     posts:[],
     nonFollow:[],
     userInfo:{},
     content:'',
     succMsg:false,
     errMsg:false,
     followBtn:"Follow",
    }),
    name: "HomeView",
    components: {
      NavBar,
    },

    mounted() {
      this.userInfo = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
      apiClient.getPosts()
      .then(response => {
        this.posts = response.data
      })

      apiClient.nonFollow()
      .then(response => {
        this.nonFollow = response.data
      })

    },
    methods: {
      async follow(id){
        this.followBtn = "Followed"
        let data = {
          followingId : id
        }
        await apiClient.follow(data)
          .then(response => {
          console.log(response.data)
        })
        await apiClient.nonFollow()
      .then(response => {
        this.nonFollow = response.data
      })
       await apiClient.getPosts()
      .then(response => {
        this.posts = response.data
      })

    },
     async createPost(){
       let data = {
        content:this.content
       }
        await apiClient.createPost(data)
        .then(response => {
            this.errMsg = false
            this.content = ''
            this.succMsg = response.data.message
            apiClient.getPosts()
              .then(response => {
              this.posts = response.data
            })
         })
      .catch((err)=>{
        this.succMsg = false
        this.errMsg = err.response.data.message
      })
      

      }
    },
}
</script>


<style scoped>

</style>
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../components/HomeView.vue'
import LoginView from '../components/LoginView.vue'
import RegisterView from '../components/RegisterView.vue'
import SinglePost from '../components/SinglePost.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Not Found',
    component: NotFound
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
  path: "/",
  name:"Home",
  component: HomeView,
  },
  {
    path: "/post/:postId",
    name:"Single Post",
    component: SinglePost,
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


// router.beforeEach( (to, from, next) => {


// });

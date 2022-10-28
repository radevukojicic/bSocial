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


router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    var expired = JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
    var time = (Date.now() < expired.exp * 1000)
    console.log(time)
  }
    //If user is already login protect login and register
    if(time && to.name === 'Login'){
      next({name:"Home"})
    }
    if(time && to.name === 'Register'){
      next({name:"Home"})
    }

    // If logged in, or going to the Login page.

    if (time || to.name === 'Login' || to.name === 'Register') {
      // Continue to page.
      next()
    } else {
      // Not logged in, redirect to login.
      next({name: 'Login'})
    }
});

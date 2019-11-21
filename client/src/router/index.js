import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/welcome",
    name: "welcome",
    component: () =>
      import(/* webpackChunkName: "main" */ "../views/Welcome.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/Register.vue")
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/question/:id',
    name: 'readQuestion',
    component: () => import('../views/ReadQuestion.vue')
  },
  {
    path: '/questionForm',
    name: 'questionForm',
    component: () => import('../views/QuestionForm.vue')
  },
  {
    path: '/editquestion/:id',
    name: 'editquestion',
    component: () => import('../views/EditForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

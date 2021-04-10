import Vue from 'vue'
import VueRouter from 'vue-router'
import ContactsList from '../views/ContactsList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ContactsList',
    component: ContactsList
  },
  {
    path: '/:name',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    props: true,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

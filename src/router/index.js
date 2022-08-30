import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CarsView from '../views/CarsView.vue'
import TracksView from '../views/TracksView.vue'
import RacesView from '../views/RacesView.vue'
import BrakeView from '../views/BrakeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cars',
    name: 'cars',
    component: CarsView
  },
  {
    path: '/tracks',
    name: 'tracks',
    component: TracksView
  },
  {
    path: '/races',
    name: 'races',
    component: RacesView
  }, {
    path: '/brake',
    name: 'brake',
    component: BrakeView
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

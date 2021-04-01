import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorware from '../views/Authorware'
import Courseware from '../views/Courseware'
import CourseManagement from '../views/CourseManagement'
import Assess from '../views/Assess'
import Account from '../views/Account'
import Course from '../views/Course'
import CourseCatalog from '../views/CourseCatalog'
import Template from '../views/CourseManagement/Template.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/authorware',
    name: 'Authorware',
    component: Authorware,
  },
  {
    path: '/courseware',
    name: 'Courseware',
    component: Courseware
  },
  {
    path: '/courseManagement',
    name: 'CourseManagement',
    component: CourseManagement
  },
  {
    path: '/template',
    name: 'Template',
    component: Template,
  },
  {
    path: '/assess',
    name: 'Assess',
    component: Assess
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/course',
    name: 'Course',
    component: Course
  },
  {
    path: '/courseCatalog',
    name: 'CourseCatalog',
    component: CourseCatalog
  }
]

const router = new VueRouter({
  routes
})

export default router

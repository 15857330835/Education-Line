import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import InstitutionLogin from '../views/Login/InstitutionLogin.vue'
import ServiceProviderLogin from '../views/Login/ServiceProviderLogin.vue'
import StudentLogin from '../views/Login/StudentLogin.vue'
import TeacherLogin from '../views/Login/TeacherLogin.vue'
import Authorware from '../views/Authorware'
import AllCourses from '../views/AllCourses'
import Introduce from '../views/Authorware/Introduce.vue'
import Setup from '../views/Authorware/Setup.vue'
import Courseware from '../views/Courseware'
import CourseManagement from '../views/CourseManagement'
import InstitutionCourse from '../views/InstitutionCourse'
import InstitutionTemplate from '../views/InstitutionCourse/InstitutionTemplate.vue'
import Assess from '../views/Assess'
import Account from '../views/Account'
import AgencyAccount from '../views/Account/AgencyAccount.vue'
import Course from '../views/Course'
import CourseCatalog from '../views/CourseCatalog'
import History from '../views/CourseCatalog/History.vue'
import Template from '../views/CourseManagement/Template.vue'
import Production from '../views/Production'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/institutionLogin',
    name: 'InstitutionLogin',
    component: InstitutionLogin,
  },
  {
    path: '/serviceProviderLogin',
    name: 'ServiceProviderLogin',
    component: ServiceProviderLogin,
  },
  {
    path: '/studentLogin',
    name: 'StudentLogin',
    component: StudentLogin,
  },
  {
    path: '/teacherLogin',
    name: 'TeacherLogin',
    component: TeacherLogin,
  },
  {
    path: '/authorware',
    name: 'Authorware',
    component: Authorware,
  },
  {
    path: '/introduce',
    name: 'Introduce',
    component: Introduce,
  },
  {
    path: '/setup',
    name: 'Setup',
    component: Setup,
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
    path: '/agencyAccount',
    name: 'AgencyAccount',
    component: AgencyAccount
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
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/production',
    name: 'Production',
    component: Production
  },
  {
    path: '/allCourses',
    name: 'AllCourses',
    component: AllCourses
  },
  {
    path: '/institutionCourse',
    name: 'InstitutionCourse',
    component: InstitutionCourse
  },
  {
    path: '/institutionTemplate',
    name: 'InstitutionTemplate',
    component: InstitutionTemplate
  },
]

const router = new VueRouter({
  routes
})

export default router

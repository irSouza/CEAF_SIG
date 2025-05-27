import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

import Login from '@/views/Login.vue'
import ClientLayout from '@/views/ClientLayout.vue'
import SigLayout from '@/views/SigLayout.vue'

// Import das views client e sig, ou lazy loading
const ClientMenu = () => import('@/views/ClientMenu.vue')
const DashboardClient = () => import('@/views/DashboardClient.vue')
const ComplaintFormView = () => import('@/views/ComplaintFormView.vue')
const ComplaintDetail = () => import('@/views/ComplaintDetail.vue')

const SigMenu = () => import('@/views/SigMenu.vue')
const SigList = () => import('@/views/SigList.vue')
const DashboardSIG = () => import('@/views/DashboardSIG.vue')
const DashboardCompany = () => import('@/views/DashboardCompany.vue')
const SigPending = () => import('@/views/SigPending.vue')

const NotFound = () => import('@/views/NotFound.vue')

const routes = [
  { path: '/', name: 'Login', component: Login },
  {
    path: '/client',
    component: ClientLayout,
    meta: { requiresAuth: true, role: 'client' },
    children: [
      { path: '', name: 'ClientMenu', component: ClientMenu },
      { path: 'list', name: 'DashboardClient', component: DashboardClient },
      { path: 'form', name: 'ComplaintForm', component: ComplaintFormView },
      { path: 'detail/:id', name: 'ClientDetail', component: ComplaintDetail, props: true }
    ]
  },
  {
    path: '/sig',
    component: SigLayout,
    meta: { requiresAuth: true, role: 'SIG' },
    children: [
      { path: '', name: 'SigMenu', component: SigMenu },
      { path: 'list', name: 'SigList', component: SigList },
      { path: 'dashboard', name: 'DashboardSIG', component: DashboardSIG },
      { path: 'company', name: 'DashboardCompany', component: DashboardCompany },
      { path: 'pending', name: 'SigPending', component: SigPending },
      { path: 'detail/:id', name: 'SigDetail', component: ComplaintDetail, props: true }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.name === 'Login') return next()

  if (to.meta.requiresAuth && !auth.token) {
    return next({ name: 'Login' })
  }

  if (to.meta.role && auth.user.role !== to.meta.role) {
    return next({ name: 'Login' })
  }

  next()
})

export default router

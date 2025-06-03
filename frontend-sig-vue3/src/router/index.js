import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

import Login from '@/views/Login.vue'
import ClientLayout from '@/views/ClientLayout.vue'
import SigLayout from '@/views/SigLayout.vue'

// Lazy loading de componentes CLIENTE
const ClientMenu = () => import('@/views/ClientMenu.vue')
const ClientComplaintList = () => import('@/views/ClientComplaintList.vue') // ✅ caminho corrigido
const ComplaintFormView = () => import('@/views/ComplaintFormView.vue')
const ComplaintDetail = () => import('@/views/ComplaintDetail.vue')

// Lazy loading de componentes SIG
const SigMenu = () => import('@/views/SigMenu.vue')
const SigList = () => import('@/views/SigList.vue')
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
      { path: 'list', name: 'ClientComplaintList', component: ClientComplaintList },
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

// Guard global de navegação
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.name === 'Login') return next()

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiredRole = to.matched.find(record => record.meta.role)?.meta.role

  if (requiresAuth && !auth.token) {
    return next({ name: 'Login' })
  }

  if (requiredRole && auth.user?.role !== requiredRole) {
    return next({ name: 'Login' })
  }

  next()
})

export default router

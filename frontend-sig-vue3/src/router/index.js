import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

// Auth
import Login from '@/views/Login.vue'

// Layouts
import ClientLayout from '@/views/ClientLayout.vue'
import SigLayout    from '@/views/SigLayout.vue'

// Client Views
import ClientMenu        from '@/views/ClientMenu.vue'
import DashboardClient   from '@/views/DashboardClient.vue'
import ComplaintFormView from '@/views/ComplaintFormView.vue'
import ComplaintDetail   from '@/views/ComplaintDetail.vue'

// SIG Views
import SigMenu          from '@/views/SigMenu.vue'
import SigList          from '@/views/SigList.vue'
import DashboardSIG     from '@/views/DashboardSIG.vue'
import DashboardCompany from '@/views/DashboardCompany.vue'
import SigPending       from '@/views/SigPending.vue'

// Misc
import NotFound from '@/views/NotFound.vue'

const routes = [
  // Rota de login
  { path: '/', name: 'Login', component: Login },

  // Rotas do CLIENTE, todas dentro de ClientLayout
  {
    path: '/client',
    component: ClientLayout,
    meta: { requiresAuth: true, role: 'cliente' },
    children: [
      { path: '',       name: 'ClientMenu',      component: ClientMenu },
      { path: 'list',   name: 'DashboardClient', component: DashboardClient },
      { path: 'form',   name: 'ComplaintForm',   component: ComplaintFormView },
      { path: 'detail/:id', name: 'ClientDetail', component: ComplaintDetail, props: true }
    ]
  },

  // Rotas do SIG, todas dentro de SigLayout
  {
    path: '/sig',
    component: SigLayout,
    meta: { requiresAuth: true, role: 'SIG' },
    children: [
      { path: '',           name: 'SigMenu',         component: SigMenu },
      { path: 'list',       name: 'SigList',         component: SigList },
      { path: 'dashboard',  name: 'DashboardSIG',    component: DashboardSIG },
      { path: 'company',    name: 'DashboardCompany',component: DashboardCompany },
      { path: 'pending',    name: 'SigPending',      component: SigPending },
      { path: 'detail/:id', name: 'SigDetail',       component: ComplaintDetail, props: true }
    ]
  },

  // 404
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard global
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

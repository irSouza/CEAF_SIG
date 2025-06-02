import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';

import Login from '@/views/Login.vue';
import ClientLayout from '@/views/ClientLayout.vue';
import SigLayout from '@/views/SigLayout.vue';

// Lazy loading de componentes CLIENTE
const ClientMenu        = () => import('@/views/client/ClientMenu.vue');
const ComplaintFormView = () => import('@/views/client/ComplaintFormView.vue');
const ComplaintDetail   = () => import('@/views/client/ComplaintDetail.vue');

// Lazy loading de componentes SIG (admin)
const SigMenu         = () => import('@/views/sig/SigMenu.vue');
const SigList         = () => import('@/views/sig/SigList.vue');
const SigPending      = () => import('@/views/sig/SigPending.vue');

// Rota de “página não encontrada”
const NotFound = () => import('@/views/NotFound.vue');

const routes = [
  // Rota pública de login
  { path: '/', name: 'Login', component: Login },

  // Rotas da área CLIENTE (usuário comum), com layout próprio
  {
    path: '/client',
    component: ClientLayout,
    meta: { requiresAuth: true, role: 'client' },
    children: [
      { path: '',                 name: 'ClientMenu',        component: ClientMenu },
      { path: 'form',             name: 'ComplaintForm',     component: ComplaintFormView },
      {
        path: 'detail/:id',
        name: 'ClientDetail',
        component: ComplaintDetail,
        props: true
      }
    ]
  },

  // Rotas da área SIG (admin), com layout próprio
  {
    path: '/sig',
    component: SigLayout,
    meta: { requiresAuth: true, role: 'SIG' },
    children: [
      { path: '',               name: 'SigMenu',         component: SigMenu },
      { path: 'list',           name: 'SigList',         component: SigList },
      { path: 'pending',        name: 'SigPending',      component: SigPending },
      {
        path: 'detail/:id',
        name: 'SigDetail',
        component: ComplaintDetail,
        props: true
      }
    ]
  },

  // Qualquer rota não mapeada cai aqui
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guard global de navegação
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.name === 'Login') {
    return next();
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiredRole = to.matched.find(record => record.meta.role)?.meta.role;

  if (requiresAuth && !auth.token) {
    return next({ name: 'Login' });
  }

  if (requiredRole && auth.user?.role !== requiredRole) {
    return next({ name: 'Login' });
  }

  next();
});

export default router;

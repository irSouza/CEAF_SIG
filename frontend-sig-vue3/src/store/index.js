// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';

import Login from '@/views/Login.vue';
import ClientLayout from '@/views/ClientLayout.vue';
import SigLayout from '@/views/SigLayout.vue';

// **IMPORTANTE**: ajuste os caminhos abaixo conforme a sua estrutura de pastas.
// Se as suas views de cliente estiverem em src/views/client/…, use esse caminho.
// Se estiverem diretamente em src/views/, mantenha como '@/views/...'.

// Lazy loading de componentes CLIENTE
const ClientMenu        = () => import('@/views/client/ClientMenu.vue');
const DashboardClient   = () => import('@/views/client/DashboardClient.vue');
const ComplaintFormView = () => import('@/views/client/ComplaintFormView.vue');
const ComplaintDetail   = () => import('@/views/client/ComplaintDetail.vue');

// Lazy loading de componentes SIG (admin)
const SigMenu         = () => import('@/views/sig/SigMenu.vue');
const SigList         = () => import('@/views/sig/SigList.vue');
const DashboardSIG    = () => import('@/views/sig/DashboardSIG.vue');
const DashboardCompany= () => import('@/views/sig/DashboardCompany.vue');
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
      // Ao acessar “/client” sem sufixo, mostra o menu do cliente
      { path: '',                 name: 'ClientMenu',        component: ClientMenu },
      { path: 'list',             name: 'DashboardClient',   component: DashboardClient },
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
      { path: 'dashboard',      name: 'DashboardSIG',    component: DashboardSIG },
      { path: 'company',        name: 'DashboardCompany', component: DashboardCompany },
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

  // Sempre permitir acessar a página de Login
  if (to.name === 'Login') {
    return next();
  }

  // Verifica se a rota exige autenticação
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // Se houver papel específico exigido pela rota, extrai-o
  const requiredRole = to.matched.find(record => record.meta.role)?.meta.role;

  // Se a rota exige autenticação e não há token, redireciona para Login
  if (requiresAuth && !auth.token) {
    return next({ name: 'Login' });
  }

  // Se o usuário estiver autenticado mas não tiver o papel correto, redireciona para Login
  if (requiredRole && auth.user?.role !== requiredRole) {
    return next({ name: 'Login' });
  }

  // Caso contrário, permite a navegação
  next();
});

export default router;

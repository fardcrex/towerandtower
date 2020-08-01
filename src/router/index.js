import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginPage from "../views/LoginPage.vue";
import ReportesPage from "../views/ReportesPage.vue";
import NotificacionesPage from "../views/NotificacionesPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/Reportes",
    name: "Reportes",
    component: ReportesPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/Notificaciones",
    name: "Notificaciones",
    component: NotificacionesPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
    meta: { notRequiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("usuario");

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/login");
    return;
  }
  if (to.matched.some((record) => record.meta.notRequiresAuth) && loggedIn) {
    next("/");
    return;
  }
  next();
});

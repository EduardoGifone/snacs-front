const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "IndexPage",
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        name: "UrlVerify",
        path: "verificar/url",
        component: () => import("pages/UrlVerify.vue"),
      },
      {
        name: "TitleVerify",
        path: "verificar/titulo",
        component: () => import("pages/TitleVerify.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

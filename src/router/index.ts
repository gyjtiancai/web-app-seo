import { createRouter, createMemoryHistory, type RouteRecordRaw } from "vue-router"

// 定义路由配置，每个路由的组件使用动态导入实现懒加载
const routes: RouteRecordRaw[] = [
  { path: "/", component: () => import("@/views/HomePage.vue"), meta: { title: "首页", description: "站点首页描述" } },
  {
    path: "/about",
    component: () => import("@/views/AboutPage.vue"),
    meta: { title: "关于我们", description: "关于页面描述" }
  }
]
export function createRouterInstance() {
  return createRouter({
    // SSR 使用内存历史
    history: createMemoryHistory(),
    routes
  })
}

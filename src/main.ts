import { createSSRApp } from "vue"
import App from "./App.vue"
import TDesign from "tdesign-vue-next"
import "tdesign-vue-next/es/style/index.css"
import { createRouterInstance } from "./router"
import "./http/instance"

// 创建应用实例
export function createApp() {
  const app = createSSRApp(App)
  const router = createRouterInstance()

  app.use(router)
  app.use(TDesign)

  return { app, router }
}

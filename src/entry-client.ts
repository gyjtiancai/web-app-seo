import { createApp } from './main';

const { app, router } = createApp();
// 等待路由就绪（处理异步路由或数据），再挂载应用
router.isReady().then(() => {
  app.mount('#app');  // 挂载到页面上与 server 渲染的内容结合
});

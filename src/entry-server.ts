import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import App from './App.vue';
import { createRouterInstance } from './router';
import TDesign from 'tdesign-vue-next';

export async function render(url: string) {
  const app = createSSRApp(App);
  const router = createRouterInstance();
  
  app.use(router);
  app.use(TDesign);
  
  try {
    // 等待路由准备就绪
    await router.push(url);
    await router.isReady();
    
    // 渲染应用
    const appHtml = await renderToString(app);
    
    // 获取当前路由的元信息
    const currentRoute = router.currentRoute.value;
    const title = currentRoute.meta.title || 'Vite + Vue + SSR';
    const meta = currentRoute.meta.description 
      ? `<meta name="description" content="${currentRoute.meta.description}">` 
      : '';
    
    return {
      appHtml,
      title,
      meta
    };
  } catch (error) {
    console.error('SSR error:', error);
    // 返回错误页面或默认内容
    return {
      appHtml: '<div>Server Error</div>',
      title: 'Error',
      meta: ''
    };
  }
}

// 导出 render 函数作为模块的默认导出
export default { render };

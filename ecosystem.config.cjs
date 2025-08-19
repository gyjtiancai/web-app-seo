module.exports = {
  apps: [
    // 开发守护
    // {
    //   name: 'web-app-seo-dev',
    //   cwd: __dirname,
    //   script: process.platform === 'win32' ? 'cmd' : 'npm',
    //   args: process.platform === 'win32' ? '/c npm run dev:ssr' : 'run dev:ssr',
    //   interpreter: 'none',
    //   env: { NODE_ENV: 'development' }
    // },
    // 生产守护（先 npm run build）
    {
      name: 'web-app-seo',
      cwd: __dirname,
      script: process.platform === 'win32' ? 'cmd' : 'npm',
      args: process.platform === 'win32' ? '/c npm run preview' : 'run preview',
      interpreter: 'none',
      env: { NODE_ENV: 'production' }
    }
  ]
}
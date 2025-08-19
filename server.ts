import express from "express"
import { createServer as createViteServer } from "vite"
import path from "path"
import fs from "fs"
import { fileURLToPath, pathToFileURL } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isProd = process.env.NODE_ENV === "production"
const PORT = isProd ? 3000 : 3001

export async function startServer() {
  const app = express()

  // 添加请求日志中间件
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
  })

  let vite
  if (!isProd) {
    // 开发模式：启用Vite作为中间件
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      logLevel: "info"
    })

    // 使用 vite 的 connect 实例作为中间件
    app.use(vite.middlewares)
  } else {
    // 生产模式：提供静态文件服务
    app.use(express.static(path.resolve(__dirname, "dist/client"), { index: false }))
  }

  // 通用的请求处理：服务端渲染
  app.use(async (req, res, next) => {
    const url = req.originalUrl

    try {
      // 1. 读取模板文件
      let template: string
      if (!isProd) {
        template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8")
        template = await vite.transformIndexHtml(url, template)
      } else {
        template = fs.readFileSync(path.resolve(__dirname, "dist/client/index.html"), "utf-8")
      }

      // 2. 加载 SSR 渲染函数
      let render: (url: string) => Promise<{ appHtml: string; title?: string; meta?: string }>
      if (!isProd) {
        // 开发模式下，直接从 Vite 中加载模块（实时编译）
        const mod = await vite.ssrLoadModule("/src/entry-server.ts")
        render = mod.render || mod.default.render
      } else {
        // 生产模式下，使用打包好的服务端产物
        try {
          const serverEntryPath = path.resolve(__dirname, 'dist/server/entry-server.js')
          const serverEntryUrl = pathToFileURL(serverEntryPath).href
          const mod = await import(serverEntryUrl)
          render = mod.render || mod.default?.render || mod.default
        } catch (error) {
          console.error("Failed to load server entry:", error)
          throw new Error("Failed to load server entry. Make sure to run `npm run build` first.")
        }
      }

      // 3. 渲染应用
      const { appHtml, title, meta } = await render(url)

      // 4. 注入应用 HTML 到模板中
      let html = template.replace(`<!--ssr-outlet-->`, appHtml)
      // 注入动态 title
      if (title) {
        html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
      }
      // 注入动态 meta（如 description）
      if (meta) {
        html = html.replace(/<\/head>/i, `${meta}\n</head>`) 
      }

      // 5. 返回完整的 HTML
      res.status(200).set({ "Content-Type": "text/html" }).end(html)
    } catch (e) {
      const error = e as Error
      console.error("Error during rendering:", error)

      // 开发模式下，让 Vite 显示错误页面
      if (!isProd && vite) {
        vite.ssrFixStacktrace(error)
      }

      next(error)
    }
  })

  // 错误处理中间件
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Error:", err)
    res.status(500).send("Internal Server Error")
  })

  // 启动服务器
  return new Promise((resolve) => { 
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n  Server running at:`)
      console.log(`  - Local:   http://localhost:${PORT}`)
      console.log(`\n  Environment: ${isProd ? "production" : "development"}\n`)

      // 解决 Jest 测试时 server 不关闭的问题
      resolve(server)
    })
  })
}

// 启动服务器
startServer().catch((err) => {
  console.error("Failed to start server:", err)
  process.exit(1)
})

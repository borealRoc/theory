const Koa = require('./my_koa')
const app = new Koa()
const Router = require('./my_koa_router')
const router = new Router()
const static = require('./my_koa_static')

// 2. 测试路由
router.get('/index', async ctx => { ctx.body = 'index page'; })
router.post('/index', async ctx => { ctx.body = 'index post page' })
router.get('/list', async ctx => { ctx.body = 'list page' })
router.post('/list', async ctx => { ctx.body = 'list post page' })
app.use(router.routes())

// 3. 测试静态文件托管
app.use(static(__dirname + '/www'))

// 1. 测试中间件机制
const delay = () => Promise.resolve(resolve => setTimeout(() => resolve()
    , 2000))
app.use(async (ctx, next) => {
    ctx.body = "1"
    await next()
    ctx.body += "5"
})
app.use(async (ctx, next) => {
    ctx.body += "2"
    await delay()
    await next()
    ctx.body += "4"
})
app.use(async (ctx, next) => {
    ctx.body += "3"
})

app.listen(4000, () => {
    console.log('监听端口4000')
})
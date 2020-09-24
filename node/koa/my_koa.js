const { ESRCH } = require('constants')
const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')


class MyKoa {
    constructor() {
        // 初始化中间件数组
        this.middlewares = []
    }

    use(middleware) {
        // 将中间件加到数组⾥
        this.middlewares.push(middleware)
    }

    listen(...args) {
        const server = http.createServer((req, res) => {
            // this.callback(req, res)
            // step1: 创建上下文
            let ctx = this.createContext(req, res)
            // step2-1: 中间件合成
            const fn = this.compose(this.middlewares)
            // step2-2: 传⼊上下⽂, 并依次执行中间件
            await fn(ctx)
            this.callback(ctx)
            res.end(ctx.body)
        })
        server.listen(...args)
    }

    // step1: 构建上下⽂, 把res和req都挂载到ctx之上，并且在ctx.req和ctx.request.req同时保存
    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)
        ctx.req = ctx.request = req
        ctx.res = ctx.response = res
        return ctx
    }
    
    // step2: 中间件机制，Koa中间件机制就是函数组合的概念，将⼀组需要顺序执⾏的函数复合为⼀个函数，外层函数的参数实际是内层函数的返回值
    compose(middlewares) {
        return function (ctx) { // 传入上下文
            return dispatch(0)  // 执行第0个
            function dispatch(i) {
                let fn = middlewares[i]
                if (!fn) {
                    return Promise.resolve()
                }
                return Promise.resolve(
                    // 将上下文传入中间件，mid(ctx,next)
                    fn(ctx, function next() {
                        // promise完成后，再执行下一个
                        return dispatch(i + 1)
                    })
                )
            }
        }
    }

}

module.exports = MyKoa
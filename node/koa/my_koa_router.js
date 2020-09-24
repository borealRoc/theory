class Router {
    constructor() {
        this.stack = []
    }
    // 现在只⽀持get和post，其他的同理
    register(path, method, middleware) {
        let route = { path, method, middleware }
        this.stack.push(route)
    }
    // 执行 get 和 post 方法的时候都是先给 this.stack 数组收集子项
    get(path, middleware) {
        this.register(path, 'get', middleware)
    }
    post(path, middleware) {
        this.register(path, 'post', middleware)
    }
    // 执行 routes() 方法的时候才遍历 this.stack 的每一项，一一执行
    routes() {
        let stock = this.stack
        return async function (ctx, next) {
            let currentPath = ctx.url
            let route

            for (let i = 0; i < stock.length; i++) {
                let item = stock[i]
                if (currentPath === item.path && item.method.indexOf(ctx.method) >= 0) {
                    route = item.middleware
                    console.log('route', route)
                    break
                }
            }

            if (typeof route === 'function') {
                route(ctx, next)
                return
            }

            await next()
        }
    }
}

module.exports = Router
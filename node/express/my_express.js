// 手写简版 express
const http = require('http')
const url = require('url')

const routes = []

class Application {
    get(path, handler) {
        routes.push({
            path,
            method: 'GET',
            handler,
        })
    }

    listen() {
        http.createServer((req, res) => {
            const { pathname } = url.parse(req.url, true)
            for (const route of routes) {
                const {path, method, handler} = route
                if (path === pathname && method === req.method) {
                    handler(req, res)
                    return
                }
            }
        }).listen(...args)
    }
}

module.exports = config => new Application()
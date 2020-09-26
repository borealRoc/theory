const fs = require("fs");
const path = require("path");
const Router = require("koa-router");

// 读取指定目录下文件 
function load(dir, cb) {
    // 获取绝对路径 
    const url = path.resolve(__dirname, dir);
    // 读取路径下的文件 
    const files = fs.readdirSync(url);
    // 遍历路由文件，将路由配置解析到路由器中 
    files.forEach(filename => {
        // 去掉后缀名 
        filename = filename.replace(".js", "");
        // 导入文件 
        const file = require(url + "/" + filename);
        // 处理逻辑 
        cb(filename, file);
    });
}

function initRouter(app) {
    const router = new Router();
    load("routes", (filename, routes) => {
        // 若是index无前缀，别的文件前缀就是文件名 
        const prefix = filename === "index" ? "" : `/${filename}`;
        // 判断路由类型，若为函数需传递app进去 
        routes = typeof routes == "function" ? routes(app) : routes;
        // 遍历路由并添加到路由器 
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(" ");
            console.log(`initRouter ${method.toLocaleUpperCase()} ${prefix}${path}`);
            // 执行router.method(path, handler)注册路由 
            // router[method](prefix + path, routes[key]);
            router[method](prefix + path, async ctx => {
                app.ctx = ctx // 挂载⾄app
                await routes[key](app) //路由处理器现在接收到的是app
            })
        });
    });
    return router;
}

function initController(app) {
    const controllers = {}
    // 读取控制器目录 
    load("controller", (filename, controller) => {
        // 添加路由 
        console.log('initController', filename, controller)
        controllers[filename] = controller(app);
    });
    return controllers;
}

function initService(app) {
    const services = {}
    load('service', (filename, service) => {
        console.log('initService', filename, service)
        services[filename] = service(app)
    })
    return services
}

const Sequelize = require('sequelize')
function loadConfig(app) {
    load('config', (filename, conf) => {
        // 创建模型
        if (conf.db) {
            app.$db = new Sequelize(conf.db)
            // 加载模型
            app.$model = {}
            load('model', (filename, { schema, options }) => {
                app.$model[filename] = app.$db.define(filename, schema, options)
            })
            app.$db.sync()
        }
        // 执行中间件
        if (conf.middleware) {
            conf.middleware.forEach(mid => {
                const midPath = path.resolve(__dirname, 'middleware', mid)
                app.$app.use(require(midPath))
            })
        }
    })
}


const schedule = require('node-schedule')
function initSchedule() {
    load('schedule', (filename, scheduleConfig) => {
        schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler)
    })
}

module.exports = { initRouter, initController, initService, loadConfig, initSchedule };
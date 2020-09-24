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

function initRouter() {
    const router = new Router();
    load("routes", (filename, routes) => {
        // 若是index⽆前缀，别的⽂件前缀就是⽂件名
        const prefix = filename === "index" ? "" : `/${filename}`;
        // 遍历路由并添加到路由器
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(" ");
            console.log(`正在映射地址：${method.toLocaleUpperCase()}${prefix}${path}`);
            // 执⾏router.method(path, handler)注册路由
            router[method](prefix + path, routes[key]);
        });
    });
    return router;
}

module.exports = { initRouter };
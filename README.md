# 目录说明
## Node 相关
1. \node\express\my_express.js 手写简版 express
2. \node\koa\my_koa.js 手写简版 koa
    - 2.1 \node\koa\my_koa_router.js 手写简版 koa-router 中间件
    - 2.2 \node\koa\my_koa_static.js 手写简版 koa-static 中间件
3. \node\egg 模仿 egg 手写简单的 MVC 框架
    - 3.1 \node\egg\routes 路由
    - 3.2 \node\egg\controller 控制器
    - 3.3 \node\egg\service 服务层
    - 3.4 \node\egg\model 模型层
    - 3.5 \node\egg\config\index.js 数据库配置
    - 3.6 \node\egg\middle\ 中间件
    - 3.7 \node\egg\schedule\ 定时任务
    - 3.8 \node\egg\my_egg_roader.js 读取文件目类和代码，创建initRouter, initController, initService, loadConfig, initSchedule等类
    - 3.9 \node\egg\my_egg_application.js 创建 MyEgg 类，包含initRouter, initController, initService, loadConfig, initSchedule的实例
    - 3.10 \node\egg\index.js 创建 MyEgg 实例，启动项目
## Webpack 相关
1. \webpack\ 手写简版 webpack
    - 1.1 \webpack\dist 出口文件
    - 1.2 \webpack\src 入口文件
    - 1.3 \webpack\bundle.js 启动文件
    - 1.4 \webpack\webpack.config.js 配置文件
    - 1.5 \webpack\lib\parser.js 
        - getAst: 读取⼊⼝⽂件，分析代码
        - getDependcies: 拿到⽂件中依赖
        - getCode: 把代码处理成浏览器可运⾏的代码
    - 1.6 \webpack\lib\compiler.js 
        - build: 分析文件, 统一返回每个模块的 filename（文件名）, dependcies（依赖）, code（代码）
        - run： 遍历每个模块，调用 build 方法分析依赖模块的依赖模块。最后生成构建代码
        - file：执行打包（解析代码中的require和exports, 并用eval执行代码），生成打包文件
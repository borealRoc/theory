# 目录说明
## Node相关
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

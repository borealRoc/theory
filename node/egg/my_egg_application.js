const koa = require("koa");
const { initRouter, initController, initService, loadConfig, initSchedule } = require("./my_egg_roader");

class MyEgg {
    constructor(conf) {
        this.$app = new koa(conf);

        loadConfig(this) // model 在 service 前面初始化，因为 service 对 model 有依赖
        this.$service = initService(this) // service 在 controler 前面初始化，因为 controler 对 service 有依赖
        this.$ctrl = initController(this); // controler 在 routes 前面初始化，因为 routes 对 controler 有依赖
        this.$router = initRouter();
        this.$app.use(this.$router.routes());

        // 执行定时器任务
        initSchedule()
    }
    start(port) {
        this.$app.listen(port, () => {
            console.log("服务器启动成功，端口" + port);
        });
    }
}

module.exports = MyEgg;
// 每个 route 直接返回内容
// module.exports = {
//     'get /': async ctx => {
//         ctx.body = '首页'
//     },
//     'get /detail': async ctx => {
//         ctx.body = '首页详情'
//     }
// }

// 从controller获取
module.exports = app => ({
    'get /': app.$ctrl.home.index,
    'get /detail': app.$ctrl.home.detail,
})
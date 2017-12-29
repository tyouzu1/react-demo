
// 1.4.1
// 5.4.1
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

var categoryData = require('./nav/info.js')
router.get('/api/nav', function *(next) {
    this.body = categoryData
});

var userInfoData = require('./userInfo/info.js')
router.get('/api/userInfo', function *(next) {
    this.body = userInfoData
});

var carouselNewsData = require('./news/index.js')
var carouselNewsData2 = require('./news/index2.js')
var carouselNewsData3 = require('./news/index3.js')
router.post('/api/addNews', function *(ctx,next) {
    // 获取参数
    console.log(ctx);
    this.body = carouselNewsData
});

var newsData = require('./news/newsList.js')
var newsData2 = require('./news/newsList2.js')
var newsData3 = require('./news/newsList3.js')
router.get('/api/news/:type', function *(next) {
    const params = this.params
    console.log(params.type);
    if (['推荐','娱乐','女人','科技','国内','财经','教育','人文'].includes(params.type))
    {
        this.body = newsData
    }else if (['百家','社会','搞笑','生活','体育','房产','游戏'].includes(params.type)){
        this.body = newsData2
    }else if (['本地','军事','互联网','国际','汽车','时尚','旅游'].includes(params.type)){
        this.body = newsData3
    }
});

// // 首页 —— 推荐列表（猜你喜欢）
// var homeListData = require('./home/list.js')
// router.get('/api/homelist/:city/:page', function *(next) {
//     console.log('首页 —— 推荐列表（猜你喜欢）')
//
//     // 参数
//     const params = this.params
//     const paramsCity = params.city
//     const paramsPage = params.page
//
//     console.log('当前城市：' + paramsCity)
//     console.log('当前页数：' + paramsPage)
//
//     this.body = homeListData
// });
//
// // 搜索结果页 - 搜索结果 - 三个参数
// var searchListData = require('./search/list.js')
// router.get('/api/search/:page/:city/:nav/:keyword', function *(next) {
//     console.log('搜索结果页 - 搜索结果')
//
//     // 参数
//     const params = this.params
//     const paramsPage = params.page
//     const paramsCity = params.city
//     const paramsCategory = params.nav
//     const paramsKeyword = params.keyword
//
//     console.log('当前页数：' + paramsPage)
//     console.log('当前城市：' + paramsCity)
//     console.log('当前类别：' + paramsCategory)
//     console.log('关键字：' + paramsKeyword)
//
//     this.body = searchListData
// })
// // 搜索结果页 - 搜索结果 - 两个参数
// router.get('/api/search/:page/:city/:nav', function *(next) {
//     console.log('搜索结果页 - 搜索结果')
//
//     // 参数
//     const params = this.params
//     const paramsPage = params.page
//     const paramsCity = params.city
//     const paramsCategory = params.nav
//
//     console.log('当前页数：' + paramsPage)
//     console.log('当前城市：' + paramsCity)
//     console.log('当前类别：' + paramsCategory)
//
//     this.body = searchListData
// })
//
// // 详情页 - 商户信息
// const detailInfo = require('./nav/info.js')
// router.get('/api/nav/info/:id', function *(next) {
//     console.log('详情页 - 商户信息')
//
//     const params = this.params
//     const id = params.id
//
//     console.log('商户id: ' + id)
//
//     this.body = detailInfo
// })
// // 详情页 - 用户评论
// const detailComment = require('./nav/comment.js')
// router.get('/api/nav/comment/:page/:id', function *(next) {
//     console.log('详情页 - 用户点评')
//
//     const params = this.params
//     const page = params.page
//     const id = params.id
//
//     console.log('商户id: ' + id)
//     console.log('当前页数: ' + page)
//
//     this.body = detailComment
// })
//
// // 订单列表
// const orderList = require('./orderlist/orderList.js')
// router.get('/api/orderlist/:username', function *(next) {
//     console.log('订单列表')
//
//     const params = this.params
//     const username = params.username
//     console.log('用户名：' + username)
//
//     this.body = orderList
// })
//
// // 提交评论
// router.post('/api/submitComment', function *(next) {
//     console.log('提交评论')
//
//     // 获取参数
//
//     this.body = {
//         errno: 0,
//         msg: 'ok'
//     }
// })

// 开始服务并生成路由
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);

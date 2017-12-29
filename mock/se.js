const Koa = require('koa')
const app = new Koa()
const categoryData = require('./nav/info.js')
const userInfoData = require('./userInfo/info.js')
const newsData = require('./news/newsList.js')
const newsData2 = require('./news/newsList2.js')
const newsData3 = require('./news/newsList3.js')
const carouselNewsData = require('./news/index.js')
const carouselNewsData2 = require('./news/index2.js')
const carouselNewsData3 = require('./news/index3.js')
const carouselNewsData4 = require('./news/index4.js')
const carouselNewsData5 = require('./news/index5.js')
const Router = require('koa-router')
const koaBody = require('koa-body');

let home = new Router()

// 子路由1
home.get('/', async (ctx) => {
    ctx.body = '<h1>koa<h1/>'
})

// 子路由2
let page = new Router()
page.get('/nav', async (ctx) => {
    ctx.body = categoryData
}).get('/userInfo', async (ctx) => {
    ctx.body = userInfoData
}).get('/news/:type', async (ctx) => {
    const params = ctx.params
    console.log(params)
    if (['推荐', '娱乐', '女人', '科技', '国内', '财经', '教育', '人文'].includes(params.type)) {
        ctx.body = newsData
    } else if (['百家', '社会', '搞笑', '生活', '体育', '房产', '游戏'].includes(params.type)) {
        ctx.body = newsData2
    } else if (['本地', '军事', '互联网', '国际', '汽车', '时尚', '旅游'].includes(params.type)) {
        ctx.body = newsData3
    }
})

page.post('/addNews', koaBody(), async (ctx) => {
    const page = parseInt(ctx.request.body.page);
    console.log(page)
    const random = Math.random()

    if (random<0.2) {
        console.log('page2')
        ctx.body = carouselNewsData2
    }else if (0.2<random<0.4) {
        console.log('page3')
        ctx.body = carouselNewsData3
    }else if (0.4<random<0.6) {
        console.log('page4')
        ctx.body = carouselNewsData4
    }else if (0.6<random<0.8) {
        console.log('page5')
        ctx.body = carouselNewsData5
    } else {
        console.log('page1')
        ctx.body = carouselNewsData
    }
})
// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/api', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
})


// 解析上下文里node原生请求的POST参数
function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data
            })
            ctx.req.addListener("end", function () {
                let parseData = parseQueryStr(postdata)
                resolve(parseData)
            })
        } catch (err) {
            reject(err)
        }
    })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    console.log(queryStrList)
    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}

// app.listen(3000, () => {
//     console.log('[demo] request post is starting at port 3000')
// })

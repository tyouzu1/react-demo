const Koa = require('koa')
const app = new Koa()
let categoryData = require('./nav/info.js')
const userInfoData = require('./userInfo/info.js')
const newsData = require('./news/newsList.js')
const newsData2 = require('./news/newsList2.js')
const newsData3 = require('./news/newsList3.js')
const newsData4 = require('./news/newsList3.js')
const carouselNewsData = require('./news/index.js')
const carouselNewsData2 = require('./news/index2.js')
const carouselNewsData3 = require('./news/index3.js')
const carouselNewsData4 = require('./news/index4.js')
const carouselNewsData5 = require('./news/index5.js')
const subscribe = require('./subscribe/index.js')
const subscribe2 = require('./subscribe/index2.js')
const subscribe3 = require('./subscribe/index3.js')
const subscribe4 = require('./subscribe/index4.js')
const subscribe5 = require('./subscribe/index5.js')

let collect = require('./collect/index.js')

const detail = require('./news/detail/detail.js')
const comment = require('./news/comment.js')
const count = require('./news/count.js')
const Router = require('koa-router')
const koaBody = require('koa-body');

const detailArr = [];
const notice = [];

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

    } else {
        ctx.body = newsData
    }
}).get('/subscribe/newsList/:type', async (ctx) => {
    const params = ctx.params
    ctx.body = newsData4
}).get('/detail/:id', async (ctx) => {
    const params = ctx.params
    if (params.id) {
        const filter = detailArr.filter(item => item.nid == params.id)
        if (filter.length) {
            ctx.body = {
                "errno": 0,
                "request_id": "1113736397",
                "timestamp": 1515475113,
                "data": {
                    "news": [filter[0]]
                }
            }
        } else {
            let detail = {
                "nid": params.id,
                "sourcets": "1515466817000",
                "ts": "1515466999000",
                "url": "http:\/\/news.cctv.com\/2018\/01\/09\/ARTIY39UfcwYdRxfSGIhFvwM180109.shtml",
                "imageurls": [{
                    "url": "https:\/\/imgsa.baidu.com\/news\/q%3D100\/sign=53a24ca2952f070859052e00d925b865\/f7246b600c3387443f8c71915a0fd9f9d62aa096.jpg",
                    "height": 700,
                    "width": 900,
                    "url_webp": "https:\/\/timg01.bdimg.com\/timg?news&quality=80&size=f900_700&wh_rate=0&imgtype=4&sec=0&di=87d2481988501e23128b5a32c8580dfd&er=1&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fnews%2Fq%3D100%2Fsign%3D53a24ca2952f070859052e00d925b865%2Ff7246b600c3387443f8c71915a0fd9f9d62aa096.jpg"
                }],
                "type": "text",
                "display_type": 1,
                "display_url": "http:\/\/news.cctv.com\/2018\/01\/09\/ARTIY39UfcwYdRxfSGIhFvwM180109.shtml",
                "topic": [],
                "long_abs": "\u4e60\u8fd1\u5e73\u51fa\u5e2d\u5927\u4f1a\uff0c\u5e76\u5411\u83b7\u5f972017\u5e74\u5ea6\u56fd\u5bb6\u6700\u9ad8\u79d1\u5b66\u6280\u672f\u5956\u7684\u5357\u4eac\u7406\u5de5\u5927\u5b66\u738b\u6cfd\u5c71\u9662\u58eb\u548c\u4e2d\u56fd\u75be\u75c5\u9884\u9632\u63a7\u5236\u4e2d\u5fc3\u75c5\u6bd2\u75c5\u9884\u9632\u63a7\u5236\u6240\u4faf\u4e91\u5fb7\u9662\u58eb\u9881\u53d1\u5956\u52b1\u8bc1\u4e66\u3002\u4e94\u5e74\u591a\u6765\uff0c\u4ee5\u4e60\u8fd1\u5e73\u540c\u5fd7\u4e3a\u6838\u5fc3\u7684\u515a\u4e2d\u592e\u59cb\u7ec8\u628a\u79d1\u6280\u521b\u65b0\u6446\u5728\u66f4\u52a0\u91cd\u8981\u4f4d\u7f6e\u30022014\u5e745\u670823\u65e5\u81f324\u65e5\uff0c\u4e60\u8fd1\u5e73\u5728\u4e0a\u6d77\u8003\u5bdf\u65f6\u5f3a\u8c03\u3002",
                "has_related": [],
                "tag": ["\u4e60\u8fd1\u5e73", "\u4e2d\u592e\u65b0\u95fb", "\u5927\u56fd\u5143\u9996"],
                "content": [{ "type": "text", "data": "<b>id为" + params.id + "的新闻内容<\/b>" },
                { "type": "text", "data": "<b>id为" + params.id + "的新闻内容<\/b>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                { "type": "text", "data": "<span>id为" + params.id + "的新闻内容<\/span>" },
                ],
                "content_type": { "text": 1 },
                "comment": { "count": 0 },
                "like": { "count": 0, "like": false },
                "comments": {
                    "hasmore": 0,
                    "comments": [],
                },
                "token": "e51f9024"
            }
            const list = [...newsData.data.news,...newsData.data.top,...newsData.data.toppic].filter(item=>{
                return  item.nid==params.id
            })
            const list2 =  [...newsData2.data.news,...newsData2.data.top,...newsData2.data.toppic].filter(item=>{
                return  item.nid==params.id
            })
            const list3 =  [...newsData3.data.news,...newsData3.data.top,...newsData3.data.toppic].filter(item=>{
                return  item.nid==params.id
            })
            const list4 =  [...newsData4.data.news,...newsData4.data.top,...newsData4.data.toppic].filter(item=>{
                return  item.nid==params.id
            })
            console.log([...list,...list2,...list3,...list4].length)
            let selected = [...list,...list2,...list3,...list4][0]
            // detail.comment={count:0};
            // detail.comments={hasmore:0,comments:[]};
            // detail.content = [{"type": "text", "data": "<b>\u539f\u6807\u9898\uff1a<\/b>"}]
            // detailArr.push(detail)
            detail.title=selected.title
            detail.abs=selected.title
            detail.site=selected.site

            detailArr.push(detail)
            ctx.body = {
                "errno": 0,
                "request_id": "1113736397",
                "timestamp": 1515475113,
                "data": {
                    "news": [detail]
                }
            }
        }
    } else {
        ctx.body = detail
    }
}).get('/comment/:id', async (ctx) => {
    const params = ctx.params
    const filter = detailArr.filter(item => item.nid == params.id)
    ctx.body = {
        "errno": 0,
        "request_id": "1454259768",
        "timestamp": 1515734654,
        "data": filter[0].comments
    }
}).get('/commentCount/:id', async (ctx) => {
    const params = ctx.params
    const filter = detailArr.filter(item => item.nid == params.id)
    if (filter.length) {
        ctx.body = {
            "errno": 0,
            "request_id": "0350931988",
            "timestamp": 1515744351,
            "data": {
                "count": filter[0].comment.count,
                "like": filter[0].like
            }
        }
    } else {
        ctx.body = {
            "errno": 0,
            "request_id": "0350931988",
            "timestamp": 1515744351,
            "data": { "count": 0, "like": { count: 0, like: false } }
        }
    }
}).get('/getCollect', async (ctx) => {
    ctx.body = collect
}).get('/like/:id/:like', async (ctx) => {
    const params = ctx.params
    const filter = detailArr.filter((item, index) => {
        if (item.nid == params.id) {
            if (params.like == 1) {
                detailArr[index].like.count += 1;
                detailArr[index].like.like = true;
            } else {
                detailArr[index].like.count -= 1;
                detailArr[index].like.like = false;
            }
            console.log(params.like, detailArr[index].like)

        }
        return item.nid == params.id
    })

    if (filter.length) {
        ctx.body = {
            "errno": 0,
            "request_id": "0350931988",
            "timestamp": 1515744351,
            "data": filter[0].like
        }
    } else {
        ctx.body = {
            "errno": 1,
            "request_id": "0350931988",
            "timestamp": 1515744351,
            "data": {}
        }
    }


}).get('/getNotice/:id', async (ctx) => {
    const params = ctx.params
    const id = params.id
    ctx.body =  {
        "errno": 1,
        "request_id": "0350931988",
        "timestamp": 1515744351,
        "data": {
            "hasmore": 0,
            "notice": notice
        }
    }
}).get('/search/:key', async (ctx) => {
    const params = ctx.params
    const key = params.key
    const list = newsData.data.news.filter(item=>{
        return  item.title.indexOf(key)!=-1
    })
    const list2 = newsData2.data.news.filter(item=>{
        return  item.title.indexOf(key)!=-1
    })
    const list3 = newsData3.data.news.filter(item=>{
        return  item.title.indexOf(key)!=-1
    })
    const list4 = newsData4.data.news.filter(item=>{
        return  item.title.indexOf(key)!=-1
    })
    console.log(list.length,list2.length,list3.length,list4.length)
    ctx.body =  {
        "errno": 0,
        "request_id": "0350931988",
        "timestamp": 1515744351,
        "data": {
            "news": [...list,...list2,...list3,...list4]
        }
    }
})

let a = false;
let b = false;
page.post('/addNews', koaBody(), async (ctx) => {
    const page = parseInt(ctx.request.body.page);
    console.log(page)
    console.log(ctx.request.body)
    const random = Math.random()

    if (random < 0.2) {
        console.log('page2')
        ctx.body = carouselNewsData2
    } else if (0.2 < random < 0.4) {
        console.log('page3')
        ctx.body = carouselNewsData3
    } else if (0.4 < random < 0.6) {
        console.log('page4')
        ctx.body = carouselNewsData4
    } else if (0.6 < random < 0.8) {
        console.log('page5')
        ctx.body = carouselNewsData5
    } else {
        console.log('page1')
        ctx.body = carouselNewsData
    }
}).post('/subscribe', koaBody(), async (ctx) => {
    const type = ctx.request.body.type;
    const id = ctx.request.body.id;
    const key = ctx.request.body.key;
    if (parseInt(id) == 4) {
        const list1 = subscribe.data.media.filter(item=>item.name.indexOf(key)!=-1);
        const list2 = subscribe2.data.tag.filter(item=>item.name.indexOf(key)!=-1);
        const list3 = subscribe3.data.channel.filter(item=>item.name.indexOf(key)!=-1);
        const list4 = subscribe4.data.media.filter(item=>item.name.indexOf(key)!=-1);
        const list5 = subscribe5.data.tag.filter(item=>item.name.indexOf(key)!=-1);

        ctx.body = {
            "errno":
                0, "request_id":
                "3288632554", "timestamp":
                1515380088, "data":
                {
                    "tag":
                        [{ "id": "999", "name": key, "type": "tag" },...list1,...list2,...list3,...list4,...list5]
                }
        }
    } else if (parseInt(id) === 1) {
        if (type === '媒体') {
            ctx.body = subscribe
        } else if (type === '频道') {
            ctx.body = subscribe3
        } else if (type === '话题') {
            ctx.body = subscribe2
        }
    } else {
        if (type === '媒体') {
            if (a) {
                a = false
                ctx.body = subscribe
            } else {
                a = true
                ctx.body = subscribe4
            }
        } else if (type === '频道') {
            ctx.body = subscribe3
        } else if (type === '话题') {
            if (b) {
                b = false
                ctx.body = subscribe2
            } else {
                b = true
                ctx.body = subscribe5
            }
        }
    }

}).post('/setComment', koaBody(), async (ctx) => {
    const id = ctx.request.body.id;
    if (id) {
        const data = ctx.request.body.data;
        const filter = detailArr.filter((item,index) => {
            if(item.nid == id){
                detailArr[index].comments.comments.unshift(JSON.parse(data));
                detailArr[index].comment.count+=1;
                notice.unshift(JSON.parse(data));
            }
            return item.nid == id
        })
        ctx.body = { success: true, data: '发表成功' }
    } else {
        ctx.body = { success: false, data: '发表失败' }
    }
}).post('/setNav', koaBody(), async (ctx) => {
    let data = ctx.request.body;
    data.tag = JSON.parse(data.tag)
    categoryData = data;
    ctx.body = categoryData
}).post('/setCollect', koaBody(), async (ctx) => {
    let data = ctx.request.body;
    const filter = detailArr.filter(item => item.nid == data.id)
    if (filter.length) {
        let body = {
            abs: filter[0].abs,
            imageurls: filter[0].imageurls,
            nid: filter[0].nid,
            site: filter[0].site,
            title: filter[0].title,
            url: filter[0].url,
            tag: filter[0].tag,
            type: filter[0].type,
        }
        collect.push(body)
        ctx.body = {
            "code": 0,
            "errno": 0,
            "data": {}
        }
    } else {
        ctx.body = {
            "code": 999,
            "errno": 1,
            "data": {}
        }
    }
}).post('/deleteCollect', koaBody(), async (ctx) => {
    let data = ctx.request.body;
    const deleteItem = collect.filter(item => item.nid == data.id)
    if (!!deleteItem.length) {
        collect = collect.filter(item => item.nid != data.id)
    }
    ctx.body = {
        "code": 0,
        "errno": 0,
        "data": {}
    }
})

const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const config = require('./user/config')
const bodyParser = require('koa-bodyparser')

const userInfoController = require('./user/controllers/user-info')
page.post('/getUserInfo', koaBody(), userInfoController.getLoginUserInfo)
    .post('/signIn', koaBody(), userInfoController.signIn)
    .post('/signUp', koaBody(), userInfoController.signUp)
    .post('/userUpdate', koaBody(), userInfoController.update)

// session存储配置
const sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
}
// 配置ctx.body解析中间件
// app.use(bodyParser())
// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}))


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



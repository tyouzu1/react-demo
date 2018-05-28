## react新闻app

```js

  "scripts": {
    "start": "set NODE_ENV=dev && webpack-dev-server  --progress --colors",
    "mock": "node --harmony ./mock/se.js",
    "build": "rm -rf ./build && set NODE_ENV=production && webpack --config ./webpack.production.config.js --progress --colors",
    "init_sql": "node ./mock/user/init/index.js"
  },
  
```

## 命令行执行：

```js
npm install （加载所需的模块包）

npm run init_sql（数据库配置为/mock/user/config.js）

npm run mock (打开node服务器)

npm run start （启动项目）
```

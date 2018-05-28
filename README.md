## react新闻app

#### 先安装node.js（自动捆绑npm），安装完成在命令行内执行node -v，查看版本，执行npm -v，查看npm版本

#### 进入项目目录 react-demo 打开命令行 执行命令

#### package.json里面 script字段内的，都是可执行的脚本命令。

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

npm init_sql（数据库配置为/mock/user/config.js）

npm run mock (打开node服务器)

npm run start （启动项目）
```

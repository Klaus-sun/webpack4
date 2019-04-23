# Webpack入门到精通（1）
## 前言
* 什么是webpack 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
webpack 有哪些功能(代码转换 文件优化 代码分割 模块合并  自动刷新 代码校验 自动发布)
首先学习webpack 需要有简单的node 基础 ，打开node 官方网站进行安装node, http://nodejs.cn/ 下载最新版node包并进行安装。
## 学习目标：
1. webpack 常见配置 webpack高级配置 
2. webpack优化策略 
3. AST抽象语法树
4. webpack中的Tapable
5. 掌握webpack流程 手写 webpack
6. 手写webpack中常见的loader
7. 手写webpack 中常见的plugin
*  定义好学习目标让我们开启webpack 的新旅程。（本文学习主要针对webpack4.0 进行学习讲解）
---------------------------------------
### webpck--->基础搭建与使用：
*  安装完毕在终端 快速创建node项目 执行命令npm init -y 生成packge.json
* 在当前目录安装本地webpack
终端执行命令： 
* npm i webpack webpack-cli -d 
*i表示install ,d表示当前是开发环境安装完成会产生node_modules文件*
* webpack 可以进行0配置 并且webpack是打包工具(默认是js模块 通过入口进行打包输出打包后js结果)。
* 创建src目录 --> 创建index.js -> 输出:console.log('hello webpack');
* npx 语法进行把index.js 进行打包
终端执行命令： 
npx webpack
我们发现当前目录生成了一个dist 目录并且创建了一个main.js(如图:)
![main](https://leapfe.oss-cn-beijing.aliyuncs.com/klaus/webpack/img/main.png)
* 执行顺序:(默认找node_modules--->bin文件 --> webpack文件 )
![webpackbin](https://leapfe.oss-cn-beijing.aliyuncs.com/klaus/webpack/img/webpackbin.png)
这里我们明白了安装webpack 必须安装他的依赖 webpack-cli
* webpack打包默认支持js模块化 ->类似于common.js

* webpack:两种默两种模式如果没有创建webpack.config.js 配置文件指定mode (production/development)生成模式或开发模式，打包运行会直接默认生产模式打包并且进行压缩。
* 这里说一下webpack配置文件的默认名称有两种（webpack.config.js / webpackfile.js 一般情况下我们会选择前一种）

#### 如何手动配置webpack呢？其实比较简单
  (1)创建webpack.config.js 配置文件 由于webpack是node.js的框架所以配置文件中要采用node语法来进行编辑。
````JavaScript
const path = require("path"); //webpack内部方法path组件
module.exports = {
  mode: "development", //打包模式 development开发模式
  entry: "./src/index.js", //入口文件指定
  output: {
    //出口文件配置 配置出口打包路径
    filename: "build.js", //打包后的文件名称
    path: path.resolve(__dirname, "build") //resolve绝对路径引入
  }
};
   ````
* 我们分析一下build.js 打包出的结果,默认下是一个匿名函数 并且接收两个参数 接收一个对象,Key : value  (key:是当前模块的路径 value：是一个执行函数)
![build](https://leapfe.oss-cn-beijing.aliyuncs.com/klaus/webpack/img/build.png)
* 接收到modules 里 先定义一个缓存对象 installedModules先定一个缓存目的是如果我当前模块加载完成没有必要再进行加载
* __webpack_require__ 实现了一个require方法因为浏览器无法直接执行node的require方法 (详解如图)
![__webpack_require__1](https://leapfe.oss-cn-beijing.aliyuncs.com/klaus/webpack/img/__webpack_require__1.png)
执行__webpack_require__ 发现接收了一个入口模块
![__webpack_require__2](https://leapfe.oss-cn-beijing.aliyuncs.com/klaus/webpack/img/__webpack_require__2.png)

![__webpack_require__3](https://leapfe.oss-cn-beijing.aliyuncs.com/klaus/webpack/img/__webpack_require__3.png)
![__webpack_require__4](https://leapfe.oss-cn-beijing.aliyuncs.com/klaus/webpack/img/__webpack_require__3.png)
* 终端运行： npx webpack , 发现我们打包当前目录产生了文件夹build目录
* 分析了一下打包文件是不是感觉webpack 源码没有想象的那么难 继续我们webpack 的探索之旅。
如何更改webpack 配置文件名称呢其实很简单重命名webpack.config.js (webpack.test.js) 
执行命令:
* npx webpack --config webpack.test.js 发现可以执行webpack打包。
* 这样打包我发现命令很长所以我们利用packge.json 来配置打包脚本在scripts-->添加build.
   ````json
   "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js"
  }
   ```
* 终端运行 npm run build  发现执行打包结果一样.   
(2)webpack 其他配 -->置插件的使用不会生成文件会生成内存中的打包
* 安装webpck内置服务 webpack-dev-server 好处是
* 终端执行命令: npm i webpack-dev-server -d -save
* 安装完成可以执行 npx webpack-dev-server 按提示打开http://localhost:8080/ 
* 如何配置开发服务运行目录可以在配置文件中添加 在webpack.config.js添加devServer
````JavaScript
const path = require("path");
module.exports = {
  mode: "development", //打包模式
  entry: "./src/index.js", //入口文件指定
  output: {
    //出口文件配置 配置出口打包路径
    filename: "build.js", //打包的文件名称
    path: path.resolve(__dirname, "build") //resolve绝对路径引入
  },
  devServer: {
    //开发服务器配置
    contentBase: "./build", //指向打包目录
    port: 3000, //服务端口号
    progress: true, //打包进度
    open: true, //是否打开浏览器
    compress: false //是否压缩
  }
};
````
* 在packge.json中添加start 启动服务脚本
````json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js",
    "start":"webpack-dev-server"
  }
````
* 运行 npm run start 发现没有自动创建index.html 不能直观看到我们代码在浏览器的执行。
* 在src目录下创建html模板 index.html 并安装html-webpack-plugin 插件
* 终端运行: npm i -d html-webpack-plugin
在webpack.config.js 下添加插件配置plugins
````JavaScript
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development", //打包模式
  entry: "./src/index.js", //入口文件指定
  output: {
    //出口文件配置 配置出口打包路径
    filename: "build[hash:8].js", //打包的文件名称 filename: "build[hash:8] 添加哈希值
    path: path.resolve(__dirname, "build") //resolve绝对路径引入
  },
  devServer: {
    //开发服务器配置
    contentBase: "./build", //指向打包目录
    port: 3000, //服务端口号
    progress: true, //打包进度
    open: true, //是否打开浏览器
    compress: false //是否压缩
  },
  //插件
  plugins: [
    //数组形式 存放所有的webpack插件
    new HtmlWebPackPlugin({
      filename: "index.html", //生成打包文件名
      template: "./src/index.html", //模板路径
      minify: { //生产模式可以进行配置
        removeAttributeQuotes: true, //删除 html文件双引号
        collapseWhitespace: true //折叠控行
      },
      hash:true, //添加哈希值
    })
  ]
};
````
* 终端执行打包测试：npm run build (build目录下生成了我们想要生成的index.html文件)
#### 样式的配置 webpack配置css模块:
配置样式需要一个合适loader,loader会将我们的样式文件解析成模块(module)
* 终端：npm i -d --save css-loader style-loader 
如何使用样式loader进行配置呢？ 我们先在src下建立index.css并给body赋予简单样式
在webpack.config.js 进行简单配置
* css-loader主要解析我们样式中@import语法,style-loader是吧css样式插入head标签中.
````JavaScript
+ module: {
    //添加模块模块是对象
    rules: [
      //规则 css-loader主要解析我们样式中@import语法
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"] //执行顺序是重右向左执行 - >重下到上
      }
    ]
  }
````
在index.js中引入样式文件 import './index.css'
终端运行:npm run start 样式生效了同样我们也有对应的less less-loader
* 终端：npm i -d --save less less-loader 
在这里说一下loader 的另一种写法对象写法可以给loader添加一些属性options
````JavaScript
+ module: {
    //添加模块模块是对象
    rules: [
      //规则 css-loader主要解析我们样式中@import语法
      {
        test: /\.css$/,
        use: [ 
           {
            loader: "style-loader",
            options: {
              insertAt: "top" //把标签插入顶部
            }
          }, 
          "css-loader"
          ] //执行顺序是重右向左执行 - >重下到上
      },
      {
        test: /\.less$/,
        use: [
            {
            loader: "style-loader",
            options: {
              insertAt: "top" //把标签插入顶部
            }
          }, 
          "css-loader",
          "less-loader"
        ] //执行顺序是重右向左执行 - >重下到上
      }
    ]
  }
````
* css 样式的抽离 安装抽离插件 mini-css-extract-plugin 
 npm i -d --save  mini-css-extract-plugin  
 * 引入插件并在配置文件中进行配置
 ````JavaScript
 const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MinCssExtractPlugin = require("mini-css-extract-plugin"); //抽离css插件
module.exports = {
  mode: "development", //打包模式
  entry: "./src/index.js", //入口文件指定
  output: {
    //出口文件配置 配置出口打包路径
    filename: "[name][hash:8].js", //打包的文件名称 filename: "build[hash:8] 添加哈希值
    path: path.resolve(__dirname, "build") //resolve绝对路径引入
  },
  devServer: {
    //开发服务器配置
    contentBase: "./build", //指向打包目录
    port: 3000, //服务端口号
    progress: true, //打包进度
    open: true, //是否打开浏览器
    compress: false //是否压缩
  },
  //插件
  plugins: [
    //数组形式 存放所有的webpack插件
    new HtmlWebPackPlugin({
      filename: "index.html", //生成打包文件名
      template: "./src/index.html", //模板路径
      minify: {
        removeAttributeQuotes: true, //删除 html文件双引号
        collapseWhitespace: true //折叠控行
      },
      hash: true //添加哈希值
    }),
    new MinCssExtractPlugin({
      filename: "mian.css"
    })
  ],
  module: {
    //添加模块模块是对象
    rules: [
      //规则 css-loader主要解析我们样式中@import语法
      {
        test: /\.css$/,
        use: [
          MinCssExtractPlugin.loader, //创建link标签放入到main.css里
          "css-loader"
        ] //执行顺序是重右向左执行 - >重下到上
      },
      {
        test: /\.less$/,
        use: [
          MinCssExtractPlugin.loader, //创建link标签放入到main.css里
          "css-loader",
          "less-loader"
        ] //执行顺序是重右向左执行 - >重下到上
      }
    ]
  }
};
 ````
 * 添加样式前缀 postcss-loader autoprefixer
 npm i postcss-loader autoprefixer -d
````JavaScript
 module: {
    //添加模块模块是对象
    rules: [
      //规则 css-loader主要解析我们样式中@import语法
      {
        test: /\.css$/,
        use: [
          MinCssExtractPlugin.loader, //创建link标签放入到main.css里
          "css-loader",
          "postcss-loader"
        ] //执行顺序是重右向左执行 - >重下到上
      },
      {
        test: /\.less$/,
        use: [
          MinCssExtractPlugin.loader, //创建link标签放入到main.css里
          "css-loader",
           "postcss-loader",
          "less-loader" 
        ] //执行顺序是重右向左执行 - >重下到上
      }
    ]
 }
````
* 注意 postcss-loader 需要添加一个配置文件否则不会生效更目录创建postcss.config.js
````JavaScript
module.exports = {
  plugins: [require("autoprefixer")]
};
````
* 但是我们发现问题使用mini-css-extract-plugin插件导致我们css不会被压缩。
npm 官网有给出To minify the output, use a plugin like optimize-css-assets-webpack-plugin. Setting optimization.minimizer overrides the defaults provided by webpack, so make sure to also specify a JS minimizer:[参考链接](https://www.npmjs.com/package/mini-css-extract-plugin)

* 要使用optimize-css-assets-webpack-plugin 插件接下来我们安装配置一下.
npm i -d optimize-css-assets-webpack-plugin

````JavaScript
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩js
//配置文件中添加优化项
optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
````
使用optimize-css-assets-webpack-plugin我们发现js右不会被压缩 所以要使用uglifyjs-webpack-plugin --save-dev
$ npm install uglifyjs-webpack-plugin --save-dev
* [配置产考链接](https://www.npmjs.com/package/uglifyjs-webpack-plugin)
````JavaScript
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //压缩js
//配置文件中添加优化项
optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({}),new UglifyJsPlugin()]
  }
````
[demo](https://github.com/Klaus-sun/webpack4/tree/master/demo)
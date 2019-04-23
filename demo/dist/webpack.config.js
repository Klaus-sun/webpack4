/**
 * 由于webpack是node.js 的框架所以配置文件中要采用node语法来进行编辑
 * ***/
//导出配置相关属性和功能
/*path路径必须是一个绝对路径*/
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
};

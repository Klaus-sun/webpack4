/**
 * 由于webpack是node.js 的框架所以配置文件中要采用node语法来进行编辑
 * ***/
//导出配置相关属性和功能
/*path路径必须是一个绝对路径*/
const path = require("path");

module.exports = {
  mode: "development", //打包模式
  entry: "./src/index.js", //入口文件指定
  output: {
    //出口文件配置 配置出口打包路径
    filename: "test.js", //打包的文件名称
    path: path.resolve(__dirname, "build") //resolve绝对路径引入
  }
};

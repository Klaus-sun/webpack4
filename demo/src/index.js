import "./index.css";
import "./index.less";

// import "@babel/polyfill";
console.log("hello webpack");
let fn = () => {
  console.log("es6 webpack");
};
fn();
@log
class Test {
  // new Test() a =1 实例上添加a属性
  a = 1;
}
function log(target) {
  console.log("装饰器---", target);
}
// "abcd".includes("ABCD"); //includes 实例方法不被解析 需要一个补丁模块

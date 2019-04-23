/***分析结果***/

(function(modules) {
  // 1、installedModules 先定一个缓存目的是如果我当前模块加载完成没有必要再进行加载
  var installedModules = {}; // The require function
  // 2、实现了一个require方法因为浏览器无法直接执行node的require方法
  function __webpack_require__(moduleId) {
    //4 、接收入口文件参数 moduleId 并且检查是否在缓存中
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    } // Create a new module (and put it into the cache)
    //5、没有在缓存中就记录一下moduleId
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    });
    //6、并执行 modules[moduleId].下的exports导出
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    module.l = true; // Return the exports of the module
    //7、返回 module.exports
    return module.exports;
  } // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules; // expose the module cache

  __webpack_require__.c = installedModules; // define getter function for harmony exports
  __webpack_require__.d = function(exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
    }
  }; // define __esModule on exports
  __webpack_require__.r = function(exports) {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module"
      });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  __webpack_require__.t = function(value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if (mode & 4 && typeof value === "object" && value && value.__esModule)
      return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value
    });
    if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key];
          }.bind(null, key)
        );
    return ns;
  }; // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function(module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module["default"];
          }
        : function getModuleExports() {
            return module;
          };
    __webpack_require__.d(getter, "a", getter);
    return getter;
  };
  __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  __webpack_require__.p = "";
  //3、调用__webpack_require__ 方法 接收入口文件路径 （入口模块）
  return __webpack_require__((__webpack_require__.s = "./src/index.js"));
})({
  "./src/index.js": function(module, exports) {
    eval(
      'console.log("hello webpack");\n\n\n//# sourceURL=webpack:///./src/index.js?'
    );
  }
});

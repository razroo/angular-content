 Shared Modules 
===============

Within an Angular architecture, we have modules. Modules very commonly
use the same sort of imports time and time again. Coming up with a sort
of shared modules architecture, can help in two regards:

1.  Prevent circular dependency issues.

2.  Allow for easier imports within app.

Shared Modules in Practice
--------------------------

So in theory, a shared module is simple. If there are a series of
modules that need to be used time and time again, these are put into the
shared module. It can be a very confusing thing, because what goes into
a shared module. It can also be concerning because one has to know how
it might affect performance.

### Performance Impact of Unused Modules

The one potential issue with shared modules, is that they might affect
performance. So the question is, that if we implement shared modules,
and we include multiple modules, that are not actually used by the
component, will there be any performance issues to be concerned off. In
that regard, let's dissect the code base.

As a test, I imported the `MatButtonModule` into the razroo website page
module. The following code get's added to the general bundle as a
result:

``` {caption="Extra code for module"}
_angular_material__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
```

If using AOT, the above will look a bit different. However, the
resulting code is the same. It will call

Which will then call:

      _angular_material__WEBPACK_IMPORTED_MODULE_11__  = 
      __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/__ivy_ngcc__/esm2015/material.js");

``` {caption="webpack require source code"}
  // bundle.js
  /******/ (function(modules) { // webpackBootstrap
  /******/         // The module cache
  /******/         var installedModules = {};
  /******/
  /******/         // The require function
  /******/         function __webpack_require__(moduleId) {
  /******/
  /******/                 // Check if module is in cache
  /******/                 if(installedModules[moduleId]) {
  /******/                         return installedModules[moduleId].exports;
  /******/                 }
  /******/                 // Create a new module (and put it into the cache)
  /******/                 var module = installedModules[moduleId] = {
  /******/                         i: moduleId,
  /******/                         l: false,
  /******/                         exports: {}
  /******/                 };
  /******/
  /******/                 // Execute the module function
  /******/                 modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  /******/
  /******/                 // Flag the module as loaded
  /******/                 module.l = true;
  /******/
  /******/                 // Return the exports of the module
  /******/                 return module.exports;
  /******/         }
  /******/
  /******/
  /******/         // expose the modules object (__webpack_modules__)
  /******/         __webpack_require__.m = modules;
  /******/
  /******/         // expose the module cache
  /******/         __webpack_require__.c = installedModules;
  /******/
  /******/         // define getter function for harmony exports
  /******/         __webpack_require__.d = function(exports, name, getter) {
  /******/                 if(!__webpack_require__.o(exports, name)) {
  /******/                         Object.defineProperty(exports, name, {
  /******/                                 configurable: false,
  /******/                                 enumerable: true,
  /******/                                 get: getter
  /******/                         });
  /******/                 }
  /******/         };
  /******/
  /******/         // getDefaultExport function for compatibility with non-harmony modules
  /******/         __webpack_require__.n = function(module) {
  /******/                 var getter = module && module.__esModule ?
  /******/                         function getDefault() { return module['default']; } :
  /******/                         function getModuleExports() { return module; };
  /******/                 __webpack_require__.d(getter, 'a', getter);
  /******/                 return getter;
  /******/         };
  /******/
  /******/         // Object.prototype.hasOwnProperty.call
  /******/         __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /******/
  /******/         // __webpack_public_path__
  /******/         __webpack_require__.p = "";
  /******/
  /******/         // Load entry module and return exports
  /******/         return __webpack_require__(__webpack_require__.s = 0);
  /******/ })
  /************************************************************************/
  /******/ ([
  /* 0 */
  /***/ (function(module, exports) {
  /***/ })
  /******/ ]);  
```

Webpack require takes something like less than a millisecond to perform.
However, too many of them there in your application, and this can add a
1ms here, or there. Shared modules can potentially cause the following
issues:

1.  Performance issues. Shared modules only work within the context of
    services wherein one has the ability to use `providedIn: root`.
    However, for modules, they will be bundled regardless. So using
    shared modules within your app, can cause bloat in your application
    when it is not needed.

2.  Maintanability. Modules can be difficult to know what exactly is
    contained within. The only module that consistently get's used time
    and time again, is `CommonModules`. `CommonModules` is used across
    all modules. However, if it's an arbitrary module, not used
    consistently across the app, it will end up being confusing for all
    team members.

For the above reasons Razroo feels that the general concept of Shared
Modules does not make sense. It is something to be perhaps be
re-factored at a later time if unique to your app.

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/http"), require("@angular/core"), require("@angular/common"), require("rxjs/operators"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/http", "@angular/core", "@angular/common", "rxjs/operators"], factory);
	else if(typeof exports === 'object')
		exports["ngx-resource"] = factory(require("@angular/http"), require("@angular/core"), require("@angular/common"), require("rxjs/operators"));
	else
		root["ngx-resource"] = factory(root["@angular/http"], root["@angular/core"], root["@angular/common"], root["rxjs/operators"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_32__, __WEBPACK_EXTERNAL_MODULE_112__, __WEBPACK_EXTERNAL_MODULE_113__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_toSubscriber__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internal_symbol_observable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_pipe__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observable; });
/** PURE_IMPORTS_START _util_toSubscriber,_internal_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */




var Observable = /*@__PURE__*/ (function () {
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_toSubscriber__["a" /* toSubscriber */])(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink._addParentTeardownLogic(this.source || (__WEBPACK_IMPORTED_MODULE_3__config__["a" /* config */].useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                this._subscribe(sink) :
                this._trySubscribe(sink));
        }
        if (__WEBPACK_IMPORTED_MODULE_3__config__["a" /* config */].useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            if (__WEBPACK_IMPORTED_MODULE_3__config__["a" /* config */].useDeprecatedSynchronousErrorHandling) {
                sink.syncErrorThrown = true;
                sink.syncErrorValue = err;
            }
            sink.error(err);
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
    };
    Observable.prototype[__WEBPACK_IMPORTED_MODULE_1__internal_symbol_observable__["a" /* observable */]] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_pipe__["a" /* pipeFromArray */])(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());

function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* config */].Promise || Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}
//# sourceMappingURL=Observable.js.map


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = __extends;
/* unused harmony export __assign */
/* unused harmony export __rest */
/* unused harmony export __decorate */
/* unused harmony export __param */
/* unused harmony export __metadata */
/* unused harmony export __awaiter */
/* unused harmony export __generator */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/* unused harmony export __importStar */
/* unused harmony export __importDefault */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_isArray__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_isObject__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isFunction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_tryCatch__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_errorObject__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscription; });
/** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_tryCatch,_util_errorObject,_util_UnsubscriptionError PURE_IMPORTS_END */






var Subscription = /*@__PURE__*/ (function () {
    function Subscription(unsubscribe) {
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        while (_parent) {
            _parent.remove(this);
            _parent = ++index < len && _parents[index] || null;
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isFunction__["a" /* isFunction */])(_unsubscribe)) {
            var trial = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_tryCatch__["a" /* tryCatch */])(_unsubscribe).call(this);
            if (trial === __WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */]) {
                hasErrors = true;
                errors = errors || (__WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */].e instanceof __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__["a" /* UnsubscriptionError */] ?
                    flattenUnsubscriptionErrors(__WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */].e.errors) : [__WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */].e]);
            }
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_isArray__["a" /* isArray */])(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_isObject__["a" /* isObject */])(sub)) {
                    var trial = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_tryCatch__["a" /* tryCatch */])(sub.unsubscribe).call(sub);
                    if (trial === __WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */]) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = __WEBPACK_IMPORTED_MODULE_4__util_errorObject__["a" /* errorObject */].e;
                        if (err instanceof __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__["a" /* UnsubscriptionError */]) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__["a" /* UnsubscriptionError */](errors);
        }
    };
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function') {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            this._parent = parent;
        }
        else if (!_parents) {
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());

function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof __WEBPACK_IMPORTED_MODULE_5__util_UnsubscriptionError__["a" /* UnsubscriptionError */]) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_isFunction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Observer__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Subscription__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__internal_symbol_rxSubscriber__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_hostReportError__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscriber; });
/* unused harmony export SafeSubscriber */
/** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */







var Subscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        _this._parentSubscription = null;
        switch (arguments.length) {
            case 0:
                _this.destination = __WEBPACK_IMPORTED_MODULE_2__Observer__["a" /* empty */];
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = __WEBPACK_IMPORTED_MODULE_2__Observer__["a" /* empty */];
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (isTrustedSubscriber(destinationOrNext)) {
                        var trustedSubscriber = destinationOrNext[__WEBPACK_IMPORTED_MODULE_4__internal_symbol_rxSubscriber__["a" /* rxSubscriber */]]();
                        _this.syncErrorThrowable = trustedSubscriber.syncErrorThrowable;
                        _this.destination = trustedSubscriber;
                        trustedSubscriber._addParentTeardownLogic(_this);
                    }
                    else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }
    Subscriber.prototype[__WEBPACK_IMPORTED_MODULE_4__internal_symbol_rxSubscriber__["a" /* rxSubscriber */]] = function () { return this; };
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
            this._unsubscribeParentSubscription();
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
            this._unsubscribeParentSubscription();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._addParentTeardownLogic = function (parentTeardownLogic) {
        if (parentTeardownLogic !== this) {
            this._parentSubscription = this.add(parentTeardownLogic);
        }
    };
    Subscriber.prototype._unsubscribeParentSubscription = function () {
        if (this._parentSubscription !== null) {
            this._parentSubscription.unsubscribe();
        }
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        this._parentSubscription = null;
        return this;
    };
    return Subscriber;
}(__WEBPACK_IMPORTED_MODULE_3__Subscription__["a" /* Subscription */]));

var SafeSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_isFunction__["a" /* isFunction */])(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== __WEBPACK_IMPORTED_MODULE_2__Observer__["a" /* empty */]) {
                context = Object.create(observerOrNext);
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_isFunction__["a" /* isFunction */])(context.unsubscribe)) {
                    _this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = _this.unsubscribe.bind(_this);
            }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!__WEBPACK_IMPORTED_MODULE_5__config__["a" /* config */].useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = __WEBPACK_IMPORTED_MODULE_5__config__["a" /* config */].useDeprecatedSynchronousErrorHandling;
            if (this._error) {
                if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                if (useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util_hostReportError__["a" /* hostReportError */])(err);
            }
            else {
                if (useDeprecatedSynchronousErrorHandling) {
                    _parentSubscriber.syncErrorValue = err;
                    _parentSubscriber.syncErrorThrown = true;
                }
                else {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util_hostReportError__["a" /* hostReportError */])(err);
                }
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!__WEBPACK_IMPORTED_MODULE_5__config__["a" /* config */].useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            if (__WEBPACK_IMPORTED_MODULE_5__config__["a" /* config */].useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util_hostReportError__["a" /* hostReportError */])(err);
            }
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!__WEBPACK_IMPORTED_MODULE_5__config__["a" /* config */].useDeprecatedSynchronousErrorHandling) {
            throw new Error('bad call');
        }
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            if (__WEBPACK_IMPORTED_MODULE_5__config__["a" /* config */].useDeprecatedSynchronousErrorHandling) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            }
            else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__util_hostReportError__["a" /* hostReportError */])(err);
                return true;
            }
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));

function isTrustedSubscriber(obj) {
    return obj instanceof Subscriber || ('_addParentTeardownLogic' in obj && obj[__WEBPACK_IMPORTED_MODULE_4__internal_symbol_rxSubscriber__["a" /* rxSubscriber */]]);
}
//# sourceMappingURL=Subscriber.js.map


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isArray; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EMPTY; });
/* harmony export (immutable) */ __webpack_exports__["b"] = empty;
/* unused harmony export emptyScheduled */
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

var EMPTY = /*@__PURE__*/ new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) { return subscriber.complete(); });
function empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
    return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}
//# sourceMappingURL=empty.js.map


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isScheduler;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
//# sourceMappingURL=isScheduler.js.map


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Subscriber__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Subscription__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_ObjectUnsubscribedError__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SubjectSubscription__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__internal_symbol_rxSubscriber__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SubjectSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subject; });
/* unused harmony export AnonymousSubject */
/** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */







var SubjectSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        return _this;
    }
    return SubjectSubscriber;
}(__WEBPACK_IMPORTED_MODULE_2__Subscriber__["a" /* Subscriber */]));

var Subject = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](Subject, _super);
    function Subject() {
        var _this = _super.call(this) || this;
        _this.observers = [];
        _this.closed = false;
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
    }
    Subject.prototype[__WEBPACK_IMPORTED_MODULE_6__internal_symbol_rxSubscriber__["a" /* rxSubscriber */]] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_4__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_4__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_4__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_4__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_4__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return __WEBPACK_IMPORTED_MODULE_3__Subscription__["a" /* Subscription */].EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return __WEBPACK_IMPORTED_MODULE_3__Subscription__["a" /* Subscription */].EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new __WEBPACK_IMPORTED_MODULE_5__SubjectSubscription__["a" /* SubjectSubscription */](this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new __WEBPACK_IMPORTED_MODULE_1__Observable__["a" /* Observable */]();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(__WEBPACK_IMPORTED_MODULE_1__Observable__["a" /* Observable */]));

var AnonymousSubject = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_3__Subscription__["a" /* Subscription */].EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));

//# sourceMappingURL=Subject.js.map


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_isPromise__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isArrayLike__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_isInteropObservable__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_isIterable__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fromArray__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__fromPromise__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__fromIterable__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__fromObservable__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__util_subscribeTo__ = __webpack_require__(51);
/* harmony export (immutable) */ __webpack_exports__["a"] = from;
/** PURE_IMPORTS_START _Observable,_util_isPromise,_util_isArrayLike,_util_isInteropObservable,_util_isIterable,_fromArray,_fromPromise,_fromIterable,_fromObservable,_util_subscribeTo PURE_IMPORTS_END */










function from(input, scheduler) {
    if (!scheduler) {
        if (input instanceof __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]) {
            return input;
        }
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__util_subscribeTo__["a" /* subscribeTo */])(input));
    }
    if (input != null) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_isInteropObservable__["a" /* isInteropObservable */])(input)) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__fromObservable__["a" /* fromObservable */])(input, scheduler);
        }
        else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_isPromise__["a" /* isPromise */])(input)) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__fromPromise__["a" /* fromPromise */])(input, scheduler);
        }
        else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isArrayLike__["a" /* isArrayLike */])(input)) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__fromArray__["a" /* fromArray */])(input, scheduler);
        }
        else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_isIterable__["a" /* isIterable */])(input) || typeof input === 'string') {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__fromIterable__["a" /* fromIterable */])(input, scheduler);
        }
    }
    throw new TypeError((input !== null && typeof input || input) + ' is not observable');
}
//# sourceMappingURL=from.js.map


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscription__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_subscribeToArray__ = __webpack_require__(52);
/* harmony export (immutable) */ __webpack_exports__["a"] = fromArray;
/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToArray PURE_IMPORTS_END */



function fromArray(input, scheduler) {
    if (!scheduler) {
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_subscribeToArray__["a" /* subscribeToArray */])(input));
    }
    else {
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
            var sub = new __WEBPACK_IMPORTED_MODULE_1__Subscription__["a" /* Subscription */]();
            var i = 0;
            sub.add(scheduler.schedule(function () {
                if (i === input.length) {
                    subscriber.complete();
                    return;
                }
                subscriber.next(input[i++]);
                if (!subscriber.closed) {
                    sub.add(this.schedule());
                }
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromArray.js.map


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscriber__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["a"] = map;
/* unused harmony export MapOperator */
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
var MapOperator = /*@__PURE__*/ (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());

var MapSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(__WEBPACK_IMPORTED_MODULE_1__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=map.js.map


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return observable; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';
//# sourceMappingURL=observable.js.map


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Resource; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Resource = /** @class */ (function () {
    function Resource(http) {
        this.http = http;
        this.$url = null;
        this.$path = null;
        this.$headers = null;
        this.$params = null;
        this.$data = null;
    }
    Resource_1 = Resource;
    Resource.$cleanData = function (obj) {
        if (Array.isArray(obj)) {
            return this.$cleanDataArray(obj);
        }
        else {
            return this.$cleanDataObject(obj);
        }
    };
    Resource.$cleanDataArray = function (obj) {
        for (var propName in obj) {
            if (typeof obj[propName] === 'function' || this.$cleanDataFields.indexOf(propName) > -1) {
                delete obj[propName];
            }
        }
        return obj;
    };
    Resource.$cleanDataObject = function (obj) {
        var cleanedObj = {};
        for (var propName in obj) {
            if (typeof obj[propName] !== 'function' && this.$cleanDataFields.indexOf(propName) === -1) {
                cleanedObj[propName] = obj[propName];
            }
        }
        return cleanedObj;
    };
    /**
     * Get main url of the resource
     * @returns {string|Promise<string>}
     */
    Resource.prototype.$getUrl = function (methodOptions) {
        return this.$url || this.$_getUrl(methodOptions) || __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].url || '';
    };
    /**
     * Set resource url
     * @param url
     */
    Resource.prototype.$setUrl = function (url) {
        this.$url = url;
    };
    /**
     * Get path of the resource
     * @returns {string|Promise<string>}
     */
    Resource.prototype.$getPath = function (methodOptions) {
        return this.$path || this.$_getPath(methodOptions) || __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].path || '';
    };
    /**
     * Set resource path
     * @param path
     */
    Resource.prototype.$setPath = function (path) {
        this.$path = path;
    };
    /**
     * Get headers
     * @returns {any|Promise<any>}
     */
    Resource.prototype.$getHeaders = function (methodOptions) {
        return this.$headers || this.$_getHeaders(methodOptions) || __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].headers || {};
    };
    /**
     * Set resource headers
     * @param headers
     */
    Resource.prototype.$setHeaders = function (headers) {
        this.$headers = headers;
    };
    /**
     * Get default params
     * @returns {any|Promise<any>|{}}
     */
    Resource.prototype.$getParams = function (methodOptions) {
        return this.$params || this.$_getParams(methodOptions) || __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].params || {};
    };
    /**
     * Set default resource params
     * @param params
     */
    Resource.prototype.$setParams = function (params) {
        this.$params = params;
    };
    /**
     * Get default data
     * @returns {any|Promise<any>|{}}
     */
    Resource.prototype.$getData = function (methodOptions) {
        return this.$data || this.$_getData(methodOptions) || __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].data || {};
    };
    /**
     * Set default resource params
     * @param data
     */
    Resource.prototype.$setData = function (data) {
        this.$data = data;
    };
    /**
     * Create the model
     *
     * @returns {any}
     */
    Resource.prototype.$createModel = function () {
        var ret = this.$initResultObject();
        ret.$resource = this;
        return ret;
    };
    /**
     * Body serializer
     *
     * @param body
     * @returns {string}
     */
    Resource.prototype.$bodySerializer = function (body) {
        return JSON.stringify(body);
    };
    /**
     * That is called before executing request
     * @param req
     */
    Resource.prototype.$requestInterceptor = function (req, methodOptions) {
        return req;
    };
    /**
     * Request observable interceptor
     * @param observable
     * @returns {Observable<any>}
     */
    Resource.prototype.$responseInterceptor = function (observable, req, methodOptions) {
        return observable.pipe(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["map"])(function (res) { return res._body ? res.json() : null; }));
    };
    // removeTrailingSlash(): boolean {
    //   return true;
    // }
    Resource.prototype.$initResultObject = function (methodOptions) {
        if (methodOptions === void 0) { methodOptions = null; }
        return {};
    };
    Resource.prototype.$map = function (item) {
        return item;
    };
    Resource.prototype.$filter = function (item) {
        return true;
    };
    Resource.prototype.$getResourceOptions = function () {
        return null;
    };
    Resource.prototype.$request = function (req, methodOptions) {
        if (methodOptions === void 0) { methodOptions = {}; }
        var requestObservable = this.http.request(req);
        // noinspection TypeScriptValidateTypes
        return methodOptions.responseInterceptor ?
            methodOptions.responseInterceptor(requestObservable, req, methodOptions) :
            this.$responseInterceptor(requestObservable, req, methodOptions);
    };
    Resource.prototype.$resourceAction = function (data, params, callback, onError, methodOptions) {
        this.$_setGlobalsToOptions(methodOptions);
        if (methodOptions.toObservable && methodOptions.isLazy === undefined) {
            methodOptions.isLazy = true;
        }
        var shell = {
            returnInternal: this.$_createReturnData(data, methodOptions),
            data: data,
            params: params,
            options: methodOptions,
            callback: callback,
            onError: onError
        };
        shell.returnExternal = methodOptions.lean ? this.$_createReturnData(data, methodOptions) : shell.returnInternal;
        this.$_cleanData(shell);
        this.$_fillInternal(shell);
        this.$_mainRequest(shell);
        var $observable = methodOptions.lean ? shell.returnInternal.$observable : shell.returnExternal.$observable;
        if (methodOptions.toObservable) {
            return $observable;
        }
        if (methodOptions.toPromise) {
            return $observable.toPromise();
        }
        return shell.returnExternal;
    };
    Resource.prototype.$_createReturnData = function (data, methodOptions) {
        if (methodOptions.isLazy) {
            return {};
        }
        if (methodOptions.isArray) {
            return [];
        }
        if (methodOptions.lean || !data || data.$resource !== this) {
            return this.$_initResultObject(methodOptions);
        }
        return data;
    };
    Resource.prototype.$_initResultObject = function (methodOptions) {
        return methodOptions.initResultObject ? methodOptions.initResultObject() : this.$initResultObject(methodOptions);
    };
    Resource.prototype.$_map = function (methodOptions) {
        return methodOptions.map ? methodOptions.map : this.$map;
    };
    Resource.prototype.$_filter = function (methodOptions) {
        return methodOptions.filter ? methodOptions.filter : this.$filter;
    };
    Resource.prototype.$_cleanData = function (shell) {
        if (shell.data && !shell.options.skipDataCleaning) {
            shell.data = shell.data.toJSON ? shell.data.toJSON() : Resource_1.$cleanData(shell.data);
        }
    };
    Resource.prototype.$_fillInternal = function (shell) {
        var returnInternal = shell.returnInternal;
        var $observable = __WEBPACK_IMPORTED_MODULE_2_rxjs__["a" /* Observable */].create(function (subscriber) {
            shell.mainDeferredSubscriber = subscriber;
        }).pipe(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["flatMap"])(function () { return shell.mainObservable; }));
        var $abortRequest = function () {
            returnInternal.$resolved = true;
        };
        if (!shell.options.isLazy) {
            $observable = $observable.pipe(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["publish"])());
            $observable.connect();
        }
        Object.defineProperty(returnInternal, '$resolved', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(returnInternal, '$observable', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: $observable
        });
        Object.defineProperty(returnInternal, '$abortRequest', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: $abortRequest
        });
        Object.defineProperty(returnInternal, '$resource', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: this
        });
    };
    Resource.prototype.$_mainRequest = function (shell) {
        var _this = this;
        this.$_resolveMainOptions(shell)
            .then(function (extraOptions) {
            shell.extraOptions = extraOptions;
            if (shell.returnInternal.$resolved) {
                shell.mainObservable = __WEBPACK_IMPORTED_MODULE_2_rxjs__["a" /* Observable */].create(function (subscriber) {
                    subscriber.next(null);
                });
                _this.$_releaseMainDeferredSubscriber(shell);
                return;
            }
            shell.url = extraOptions.url + extraOptions.path;
            _this.$_prepareDataParams(shell);
            _this.$_prepareBody(shell);
            _this.$_prepareSearch(shell);
            _this.$_createRequestOptions(shell);
            var mainRequest = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Request"](shell.requestOptions);
            mainRequest = shell.options.requestInterceptor ?
                shell.options.requestInterceptor(mainRequest, shell.options) :
                _this.$requestInterceptor(mainRequest, shell.options);
            if (!mainRequest) {
                shell.mainObservable = __WEBPACK_IMPORTED_MODULE_2_rxjs__["a" /* Observable */].create(function (observer) {
                    observer.error(new Error('Request is null'));
                });
                console.warn('Request is null');
                _this.$_releaseMainDeferredSubscriber(shell);
                return;
            }
            // Doing the request
            var requestObservable = _this.$request(mainRequest, shell.options);
            shell.mainObservable = shell.options.isLazy ? requestObservable : _this.$_createMainObservable(shell, requestObservable);
            _this.$_releaseMainDeferredSubscriber(shell);
        });
    };
    Resource.prototype.$_resolveMainOptions = function (shell) {
        return Promise
            .all([
            Promise.resolve(shell.options.url || this.$getUrl(shell.options)),
            Promise.resolve(shell.options.path || this.$getPath(shell.options)),
            Promise.resolve(shell.options.headers || this.$getHeaders(shell.options)),
            Promise.resolve(shell.options.params || this.$getParams(shell.options)),
            Promise.resolve(shell.options.data || this.$getData(shell.options))
        ])
            .then(function (data) {
            if (shell.options.pathPrefix) {
                data[1] = shell.options.pathPrefix + data[1];
            }
            return {
                url: data[0],
                path: data[1],
                headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"](data[2] ? Object.assign({}, data[2]) : data[2]),
                params: data[3] ? Object.assign({}, data[3]) : data[3],
                data: data[4]
            };
        });
    };
    Resource.prototype.$_releaseMainDeferredSubscriber = function (shell) {
        if (shell.mainDeferredSubscriber) {
            shell.mainDeferredSubscriber.next();
            shell.mainDeferredSubscriber.complete();
            shell.mainDeferredSubscriber = null;
        }
    };
    Resource.prototype.$_prepareDataParams = function (shell) {
        var usedPathParams = {};
        shell.usedPathParams = usedPathParams;
        if (!Array.isArray(shell.data) || shell.params) {
            if (!Array.isArray(shell.data)) {
                shell.data = Object.assign({}, shell.extraOptions.data, shell.data);
            }
            var pathParams = shell.url.match(/{([^}]*)}/g) || [];
            var _loop_1 = function (i) {
                var pathParam = pathParams[i];
                var pathKey = pathParam.substr(1, pathParam.length - 2);
                var isMandatory = pathKey[0] === '!';
                if (isMandatory) {
                    pathKey = pathKey.substr(1);
                }
                var isGetOnly = pathKey[0] === ':';
                if (isGetOnly) {
                    pathKey = pathKey.substr(1);
                }
                var value = this_1.$_getValueForPath(pathKey, shell.extraOptions.params, shell.params || shell.data, usedPathParams);
                if (isGetOnly && !shell.params) {
                    delete shell.data[pathKey];
                }
                if (this_1.$_isNullOrUndefined(value)) {
                    if (isMandatory) {
                        var consoleMsg_1 = "Mandatory " + pathParam + " path parameter is missing";
                        shell.mainObservable = __WEBPACK_IMPORTED_MODULE_2_rxjs__["a" /* Observable */].create(function (observer) {
                            observer.error(new Error(consoleMsg_1));
                        });
                        console.warn(consoleMsg_1);
                        this_1.$_releaseMainDeferredSubscriber(shell);
                        throw new Error(consoleMsg_1);
                    }
                    shell.url = shell.url.substr(0, shell.url.indexOf(pathParam));
                    return "break";
                }
                // Replacing in the url
                shell.url = shell.url.replace(pathParam, value);
            };
            var this_1 = this;
            for (var i = 0; i < pathParams.length; i++) {
                var state_1 = _loop_1(i);
                if (state_1 === "break")
                    break;
            }
        }
        // Removing double slashed from final url
        shell.url = shell.url.replace(/\/\/+/g, '/');
        if (shell.url.startsWith('http')) {
            shell.url = shell.url.replace(':/', '://');
        }
        // Remove trailing slash
        if (typeof shell.options.removeTrailingSlash === 'undefined') {
            shell.options.removeTrailingSlash = true;
        }
        if (shell.options.removeTrailingSlash) {
            while (shell.url[shell.url.length - 1] === '/') {
                shell.url = shell.url.substr(0, shell.url.length - 1);
            }
        }
        // Remove mapped params
        for (var key in shell.extraOptions.params) {
            if (shell.extraOptions.params[key][0] === '@') {
                delete shell.extraOptions.params[key];
            }
        }
    };
    Resource.prototype.$_prepareBody = function (shell) {
        if (shell.options.method === __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestMethod"].Get) {
            // GET
            shell.searchParams = Object.assign({}, shell.extraOptions.params, shell.data);
        }
        else {
            // NON GET
            if (shell.data) {
                var _body = {};
                if (shell.options.rootNode) {
                    _body["" + shell.options.rootNode] = shell.data;
                }
                else {
                    _body = shell.data;
                }
                // shell.body = JSON.stringify(_body);
                shell.body = shell.options.bodySerializer ? shell.options.bodySerializer(_body) : this.$bodySerializer(_body);
            }
            shell.searchParams = shell.params;
        }
        if (!shell.body) {
            shell.extraOptions.headers.delete('content-type');
        }
    };
    Resource.prototype.$_prepareSearch = function (shell) {
        shell.search = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
        if (!shell.params) {
            for (var key in shell.searchParams) {
                if (shell.searchParams.hasOwnProperty(key) && !shell.usedPathParams[key]) {
                    var value = shell.searchParams[key];
                    this.$_appendSearchParams(shell.search, key, value);
                }
            }
        }
        var tsName = shell.options.addTimestamp;
        if (tsName) {
            if (tsName === true) {
                tsName = 'ts';
            }
            shell.search.append(tsName, '' + Date.now());
        }
    };
    Resource.prototype.$_createRequestOptions = function (shell) {
        shell.requestOptions = {
            method: shell.options.method,
            headers: shell.extraOptions.headers,
            body: shell.body,
            url: shell.url,
            withCredentials: shell.options.withCredentials
        };
        if (shell.options.angularV2) {
            shell.requestOptions.search = shell.search;
        }
        else {
            shell.requestOptions.params = shell.search;
        }
    };
    Resource.prototype.$_createMainObservable = function (shell, requestObservable) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs__["a" /* Observable */].create(function (subscriber) {
            var reqSubscr = requestObservable.subscribe(function (resp) {
                var _a;
                var filter = _this.$_filter(shell.options);
                var map = _this.$_map(shell.options);
                if (resp !== null) {
                    if (shell.options.isArray) {
                        // Expecting array
                        if (!Array.isArray(resp)) {
                            console.error('Returned data should be an array. Received', resp);
                        }
                        else {
                            (_a = shell.returnExternal).push.apply(_a, resp
                                .filter(filter)
                                .map(map)
                                .map(function (respItem) {
                                if (!respItem) {
                                    return respItem;
                                }
                                if (typeof respItem === 'object') {
                                    if (!shell.options.lean) {
                                        respItem.$resource = _this;
                                    }
                                    return _this.$_setDataToObject(_this.$_initResultObject(shell.options), respItem);
                                }
                                return respItem;
                            }));
                        }
                    }
                    else {
                        // Expecting object
                        if (Array.isArray(resp)) {
                            console.error('Returned data should be an object. Received', resp);
                        }
                        else {
                            if (filter(resp)) {
                                shell.returnExternal = _this.$_setDataToObject(shell.returnExternal, map(resp));
                            }
                        }
                    }
                }
                shell.returnInternal.$resolved = true;
                subscriber.next(shell.returnExternal);
            }, function (err) {
                subscriber.error(err);
                if (shell.onError) {
                    shell.onError(err);
                }
            }, function () {
                // shell.returnInternal.$resolved = true;
                subscriber.complete();
                if (shell.callback) {
                    shell.callback(shell.returnExternal);
                }
            });
            shell.returnInternal.$abortRequest = function () {
                if (shell.returnInternal.$resolved) {
                    return;
                }
                reqSubscr.unsubscribe();
                shell.returnInternal.$resolved = true;
            };
        });
    };
    Resource.prototype.$_setDataToObject = function (ret, resp) {
        if (ret.$setData) {
            ret.$setData(resp);
        }
        else {
            if (Array.isArray(resp)) {
                ret = resp;
            }
            else {
                Object.assign(ret, resp);
            }
        }
        return ret;
    };
    Resource.prototype.$_getValueForPath = function (key, params, data, usedPathParams) {
        if (!this.$_isNullOrUndefined(data[key]) && typeof data[key] !== 'object') {
            usedPathParams[key] = true;
            return data[key];
        }
        if (this.$_isNullOrUndefined(params[key])) {
            return null;
        }
        if (params[key][0] === '@') {
            return this.$_getValueForPath(params[key].substr(1), params, data, usedPathParams);
        }
        usedPathParams[key] = true;
        return params[key];
    };
    Resource.prototype.$_isNullOrUndefined = function (value) {
        return value === null || value === undefined;
    };
    Resource.prototype.$_appendSearchParams = function (search, key, value) {
        /// Convert dates to ISO format string
        if (value instanceof Date) {
            search.append(key, value.toISOString());
            return;
        }
        if (typeof value === 'object') {
            switch (__WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].getParamsMappingType) {
                case __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["a" /* TGetParamsMappingType */].Plain:
                    if (Array.isArray(value)) {
                        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                            var arr_value = value_1[_i];
                            search.append(key, arr_value);
                        }
                    }
                    else {
                        if (value && typeof value === 'object') {
                            /// Convert dates to ISO format string
                            if (value instanceof Date) {
                                value = value.toISOString();
                            }
                            else {
                                value = JSON.stringify(value);
                            }
                        }
                        search.append(key, value);
                    }
                    break;
                case __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["a" /* TGetParamsMappingType */].Bracket:
                    /// Convert object and arrays to query params
                    for (var k in value) {
                        if (value.hasOwnProperty(k)) {
                            this.$_appendSearchParams(search, key + '[' + k + ']', value[k]);
                        }
                    }
                    break;
                case __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["a" /* TGetParamsMappingType */].JQueryParamsBracket:
                    /// Convert object and arrays to query params according to $.params
                    for (var k in value) {
                        if (value.hasOwnProperty(k)) {
                            var path = key + "[" + k + "]";
                            if (Array.isArray(value) && typeof value[k] !== 'object') {
                                path = key + "[]";
                            }
                            this.$_appendSearchParams(search, path, value[k]);
                        }
                    }
                    break;
            }
            return;
        }
        search.append(key, value);
    };
    /**
     * Get url to be replaced by ResourceParamsBase
     *
     * @param methodOptions
     * @returns { any | Promise<any>}
     * @private
     */
    Resource.prototype.$_getUrl = function (methodOptions) {
        return null;
    };
    /**
     * Get get path to be replaced by ResourceParamsBase
     *
     * @param methodOptions
     * @returns { any | Promise<any>}
     * @private
     */
    Resource.prototype.$_getPath = function (methodOptions) {
        return null;
    };
    /**
     * Get headers to be replaced by ResourceParamsBase
     *
     * @param methodOptions
     * @returns { any | Promise<any>}
     * @private
     */
    Resource.prototype.$_getHeaders = function (methodOptions) {
        return null;
    };
    /**
     * Get params to be replaced by ResourceParamsBase
     *
     * @param methodOptions
     * @returns { any | Promise<any>}
     * @private
     */
    Resource.prototype.$_getParams = function (methodOptions) {
        return null;
    };
    /**
     * Get data to be replaced by ResourceParamsBase
     *
     * @param methodOptions
     * @returns { any | Promise<any>}
     * @private
     */
    Resource.prototype.$_getData = function (methodOptions) {
        return null;
    };
    Resource.prototype.$_setGlobalsToOptions = function (methodOptions) {
        if (methodOptions.toPromise === undefined && __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].toPromise !== null) {
            methodOptions.toPromise = __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].toPromise;
        }
        if (methodOptions.toObservable === undefined && __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].toObservable !== null) {
            methodOptions.toObservable = __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].toObservable;
        }
        if (methodOptions.lean === undefined && __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].lean !== null) {
            methodOptions.lean = __WEBPACK_IMPORTED_MODULE_3__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].lean;
        }
    };
    var Resource_1;
    Resource.$cleanDataFields = [
        '$cleanDataFields',
        '$resolved',
        '$observable',
        '$abortRequest',
        '$resource'
    ];
    Resource = Resource_1 = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], Resource);
    return Resource;
}());



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscriber__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OuterSubscriber; });
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


var OuterSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](OuterSubscriber, _super);
    function OuterSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(__WEBPACK_IMPORTED_MODULE_1__Subscriber__["a" /* Subscriber */]));

//# sourceMappingURL=OuterSubscriber.js.map


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Action__ = __webpack_require__(93);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsyncAction; });
/** PURE_IMPORTS_START tslib,_Action PURE_IMPORTS_END */


var AsyncAction = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](AsyncAction, _super);
    function AsyncAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
    }
    AsyncAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (this.closed) {
            return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    };
    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return setInterval(scheduler.flush.bind(scheduler, this), delay);
    };
    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        clearInterval(id);
    };
    AsyncAction.prototype.execute = function (state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    };
    AsyncAction.prototype._execute = function (state, delay) {
        var errored = false;
        var errorValue = undefined;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    };
    AsyncAction.prototype._unsubscribe = function () {
        var id = this.id;
        var scheduler = this.scheduler;
        var actions = scheduler.actions;
        var index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    };
    return AsyncAction;
}(__WEBPACK_IMPORTED_MODULE_1__Action__["a" /* Action */]));

//# sourceMappingURL=AsyncAction.js.map


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Scheduler__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsyncScheduler; });
/** PURE_IMPORTS_START tslib,_Scheduler PURE_IMPORTS_END */


var AsyncScheduler = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](AsyncScheduler, _super);
    function AsyncScheduler(SchedulerAction, now) {
        if (now === void 0) {
            now = __WEBPACK_IMPORTED_MODULE_1__Scheduler__["a" /* Scheduler */].now;
        }
        var _this = _super.call(this, SchedulerAction, function () {
            if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
                return AsyncScheduler.delegate.now();
            }
            else {
                return now();
            }
        }) || this;
        _this.actions = [];
        _this.active = false;
        _this.scheduled = undefined;
        return _this;
    }
    AsyncScheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
            delay = 0;
        }
        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
            return AsyncScheduler.delegate.schedule(work, delay, state);
        }
        else {
            return _super.prototype.schedule.call(this, work, delay, state);
        }
    };
    AsyncScheduler.prototype.flush = function (action) {
        var actions = this.actions;
        if (this.active) {
            actions.push(action);
            return;
        }
        var error;
        this.active = true;
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift());
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsyncScheduler;
}(__WEBPACK_IMPORTED_MODULE_1__Scheduler__["a" /* Scheduler */]));

//# sourceMappingURL=AsyncScheduler.js.map


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getSymbolIterator */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return iterator; });
/* unused harmony export $$iterator */
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = /*@__PURE__*/ getSymbolIterator();
var $$iterator = iterator;
//# sourceMappingURL=iterator.js.map


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InnerSubscriber__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subscribeTo__ = __webpack_require__(51);
/* harmony export (immutable) */ __webpack_exports__["a"] = subscribeToResult;
/** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo PURE_IMPORTS_END */


function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination) {
    if (destination === void 0) {
        destination = new __WEBPACK_IMPORTED_MODULE_0__InnerSubscriber__["a" /* InnerSubscriber */](outerSubscriber, outerValue, outerIndex);
    }
    if (destination.closed) {
        return;
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__subscribeTo__["a" /* subscribeTo */])(result)(destination);
}
//# sourceMappingURL=subscribeToResult.js.map


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_http__);
/* harmony export (immutable) */ __webpack_exports__["a"] = ResourceAction;

function ResourceAction(methodOptions) {
    methodOptions = methodOptions || {};
    if (methodOptions.method === undefined) {
        methodOptions.method = __WEBPACK_IMPORTED_MODULE_0__angular_http__["RequestMethod"].Get;
    }
    return function (target, propertyKey) {
        target[propertyKey] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var data = null;
            var params = null;
            var callback = null;
            var onError = null;
            args.forEach(function (arg) {
                if (typeof arg === 'function') {
                    if (callback) {
                        onError = arg;
                    }
                    else {
                        callback = arg;
                    }
                }
                else {
                    if (data) {
                        params = arg;
                    }
                    else {
                        data = arg;
                    }
                }
            });
            var options = Object.assign({}, this.getResourceOptions(), methodOptions);
            return this.$resourceAction(data, params, callback, onError, options);
        };
    };
}


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var _enable_super_gross_mode_that_will_cause_bad_things = false;
var config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
            var error = /*@__PURE__*/ new Error();
            /*@__PURE__*/ console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
        }
        else if (_enable_super_gross_mode_that_will_cause_bad_things) {
            /*@__PURE__*/ console.log('RxJS: Back to a better error behavior. Thank you. <3');
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
    },
};
//# sourceMappingURL=config.js.map


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectUnsubscribedError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function ObjectUnsubscribedErrorImpl() {
    Error.call(this);
    this.message = 'object unsubscribed';
    this.name = 'ObjectUnsubscribedError';
    return this;
}
ObjectUnsubscribedErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;
//# sourceMappingURL=ObjectUnsubscribedError.js.map


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isFunction;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isFunction(x) {
    return typeof x === 'function';
}
//# sourceMappingURL=isFunction.js.map


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TGetParamsMappingType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ResourceGlobalConfig; });
var TGetParamsMappingType;
(function (TGetParamsMappingType) {
    TGetParamsMappingType[TGetParamsMappingType["Plain"] = 0] = "Plain";
    TGetParamsMappingType[TGetParamsMappingType["Bracket"] = 1] = "Bracket";
    TGetParamsMappingType[TGetParamsMappingType["JQueryParamsBracket"] = 2] = "JQueryParamsBracket";
})(TGetParamsMappingType || (TGetParamsMappingType = {}));
var ResourceGlobalConfig = /** @class */ (function () {
    function ResourceGlobalConfig() {
    }
    ResourceGlobalConfig.url = null;
    ResourceGlobalConfig.path = null;
    ResourceGlobalConfig.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    ResourceGlobalConfig.params = null;
    ResourceGlobalConfig.data = null;
    ResourceGlobalConfig.add2Provides = null;
    ResourceGlobalConfig.lean = null;
    ResourceGlobalConfig.toPromise = null;
    ResourceGlobalConfig.toObservable = null;
    ResourceGlobalConfig.getParamsMappingType = TGetParamsMappingType.Plain;
    return ResourceGlobalConfig;
}());



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_http__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceProviders; });

var ResourceProviders = /** @class */ (function () {
    function ResourceProviders() {
    }
    ResourceProviders.add = function (resource, subSet) {
        if (subSet === void 0) { subSet = null; }
        if (!subSet) {
            subSet = this.mainProvidersName;
        }
        if (!this.providers[subSet]) {
            this.providers[subSet] = [];
        }
        var deps = Reflect.getMetadata('design:paramtypes', resource);
        if (!deps || deps.length === 0) {
            deps = [__WEBPACK_IMPORTED_MODULE_0__angular_http__["Http"]];
        }
        this.providers[subSet].push({
            provide: resource,
            useFactory: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return new (resource.bind.apply(resource, [void 0].concat(args)))();
            },
            deps: deps
        });
    };
    ResourceProviders.get = function (subSet) {
        if (subSet === void 0) { subSet = null; }
        if (!subSet) {
            subSet = this.mainProvidersName;
        }
        return this.providers[subSet] || [];
    };
    ResourceProviders.mainProvidersName = '__mainProviders';
    ResourceProviders.providers = {
        __mainProviders: []
    };
    return ResourceProviders;
}());



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subject__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Subscription__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsyncSubject; });
/** PURE_IMPORTS_START tslib,_Subject,_Subscription PURE_IMPORTS_END */



var AsyncSubject = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](AsyncSubject, _super);
    function AsyncSubject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = null;
        _this.hasNext = false;
        _this.hasCompleted = false;
        return _this;
    }
    AsyncSubject.prototype._subscribe = function (subscriber) {
        if (this.hasError) {
            subscriber.error(this.thrownError);
            return __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */].EMPTY;
        }
        else if (this.hasCompleted && this.hasNext) {
            subscriber.next(this.value);
            subscriber.complete();
            return __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */].EMPTY;
        }
        return _super.prototype._subscribe.call(this, subscriber);
    };
    AsyncSubject.prototype.next = function (value) {
        if (!this.hasCompleted) {
            this.value = value;
            this.hasNext = true;
        }
    };
    AsyncSubject.prototype.error = function (error) {
        if (!this.hasCompleted) {
            _super.prototype.error.call(this, error);
        }
    };
    AsyncSubject.prototype.complete = function () {
        this.hasCompleted = true;
        if (this.hasNext) {
            _super.prototype.next.call(this, this.value);
        }
        _super.prototype.complete.call(this);
    };
    return AsyncSubject;
}(__WEBPACK_IMPORTED_MODULE_1__Subject__["a" /* Subject */]));

//# sourceMappingURL=AsyncSubject.js.map


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_isScheduler__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fromArray__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__empty__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scalar__ = __webpack_require__(84);
/* harmony export (immutable) */ __webpack_exports__["a"] = of;
/** PURE_IMPORTS_START _util_isScheduler,_fromArray,_empty,_scalar PURE_IMPORTS_END */




function of() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var scheduler = args[args.length - 1];
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_isScheduler__["a" /* isScheduler */])(scheduler)) {
        args.pop();
    }
    else {
        scheduler = undefined;
    }
    switch (args.length) {
        case 0:
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__empty__["b" /* empty */])(scheduler);
        case 1:
            return scheduler ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__fromArray__["a" /* fromArray */])(args, scheduler) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__scalar__["a" /* scalar */])(args[0]);
        default:
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__fromArray__["a" /* fromArray */])(args, scheduler);
    }
}
//# sourceMappingURL=of.js.map


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AsyncAction__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AsyncScheduler__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return async; });
/** PURE_IMPORTS_START _AsyncAction,_AsyncScheduler PURE_IMPORTS_END */


var async = /*@__PURE__*/ new __WEBPACK_IMPORTED_MODULE_1__AsyncScheduler__["a" /* AsyncScheduler */](__WEBPACK_IMPORTED_MODULE_0__AsyncAction__["a" /* AsyncAction */]);
//# sourceMappingURL=async.js.map


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rxSubscriber; });
/* unused harmony export $$rxSubscriber */
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function')
    ? /*@__PURE__*/ Symbol.for('rxSubscriber')
    : '@@rxSubscriber';
var $$rxSubscriber = rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = hostReportError;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function hostReportError(err) {
    setTimeout(function () { throw err; });
}
//# sourceMappingURL=hostReportError.js.map


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = identity;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function identity(x) {
    return x;
}
//# sourceMappingURL=identity.js.map


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = noop;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function noop() { }
//# sourceMappingURL=noop.js.map


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ResourceProviders__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ResourceGlobalConfig__ = __webpack_require__(23);
/* harmony export (immutable) */ __webpack_exports__["a"] = ResourceParams;


function ResourceParams(params) {
    if (params === void 0) { params = {}; }
    return function (target) {
        target.prototype.getResourceOptions = function () {
            return params;
        };
        if (params.add2Provides === undefined && __WEBPACK_IMPORTED_MODULE_1__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].add2Provides !== null) {
            params.add2Provides = __WEBPACK_IMPORTED_MODULE_1__ResourceGlobalConfig__["b" /* ResourceGlobalConfig */].add2Provides;
        }
        if (params.add2Provides !== false) {
            __WEBPACK_IMPORTED_MODULE_0__ResourceProviders__["a" /* ResourceProviders */].add(target, params.providersSubSet);
        }
        if (typeof params.removeTrailingSlash !== 'undefined') {
            target.prototype.removeTrailingSlash = function () {
                return !!params.removeTrailingSlash;
            };
        }
        if (params.url) {
            target.prototype.$_getUrl = function () {
                return params.url;
            };
        }
        if (params.path) {
            target.prototype.$_getPath = function () {
                return params.path;
            };
        }
        if (params.headers) {
            target.prototype.$_getHeaders = function () {
                return params.headers;
            };
        }
        if (params.params) {
            target.prototype.$_getParams = function () {
                return params.params;
            };
        }
        if (params.data) {
            target.prototype.$_getData = function () {
                return params.data;
            };
        }
    };
}


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscriber__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InnerSubscriber; });
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


var InnerSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.outerValue = outerValue;
        _this.outerIndex = outerIndex;
        _this.index = 0;
        return _this;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(__WEBPACK_IMPORTED_MODULE_1__Subscriber__["a" /* Subscriber */]));

//# sourceMappingURL=InnerSubscriber.js.map


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observable_empty__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__observable_of__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__observable_throwError__ = __webpack_require__(41);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Notification; });
/** PURE_IMPORTS_START _observable_empty,_observable_of,_observable_throwError PURE_IMPORTS_END */



var Notification = /*@__PURE__*/ (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__observable_of__["a" /* of */])(this.value);
            case 'E':
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__observable_throwError__["a" /* throwError */])(this.error);
            case 'C':
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__observable_empty__["b" /* empty */])();
        }
        throw new Error('unexpected notification kind value');
    };
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());

//# sourceMappingURL=Notification.js.map


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_hostReportError__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return empty; });
/** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */


var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) {
        if (__WEBPACK_IMPORTED_MODULE_0__config__["a" /* config */].useDeprecatedSynchronousErrorHandling) {
            throw err;
        }
        else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_hostReportError__["a" /* hostReportError */])(err);
        }
    },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scheduler; });
var Scheduler = /*@__PURE__*/ (function () {
    function Scheduler(SchedulerAction, now) {
        if (now === void 0) {
            now = Scheduler.now;
        }
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    Scheduler.prototype.schedule = function (work, delay, state) {
        if (delay === void 0) {
            delay = 0;
        }
        return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = function () { return Date.now(); };
    return Scheduler;
}());

//# sourceMappingURL=Scheduler.js.map


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscription__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubjectSubscription; });
/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */


var SubjectSubscription = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        var _this = _super.call(this) || this;
        _this.subject = subject;
        _this.subscriber = subscriber;
        _this.closed = false;
        return _this;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(__WEBPACK_IMPORTED_MODULE_1__Subscription__["a" /* Subscription */]));

//# sourceMappingURL=SubjectSubscription.js.map


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__from__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__empty__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["a"] = defer;
/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */



function defer(observableFactory) {
    return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
        var input;
        try {
            input = observableFactory();
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
        var source = input ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__from__["a" /* from */])(input) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__empty__["b" /* empty */])();
        return source.subscribe(subscriber);
    });
}
//# sourceMappingURL=defer.js.map


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_noop__ = __webpack_require__(31);
/* unused harmony export NEVER */
/* unused harmony export never */
/** PURE_IMPORTS_START _Observable,_util_noop PURE_IMPORTS_END */


var NEVER = /*@__PURE__*/ new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](__WEBPACK_IMPORTED_MODULE_1__util_noop__["a" /* noop */]);
function never() {
    return NEVER;
}
//# sourceMappingURL=never.js.map


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = throwError;
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function throwError(error, scheduler) {
    if (!scheduler) {
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) { return subscriber.error(error); });
    }
    else {
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) { return scheduler.schedule(dispatch, 0, { error: error, subscriber: subscriber }); });
    }
}
function dispatch(_a) {
    var error = _a.error, subscriber = _a.subscriber;
    subscriber.error(error);
}
//# sourceMappingURL=throwError.js.map


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mergeMap__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_identity__ = __webpack_require__(30);
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeAll;
/** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */


function mergeAll(concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__mergeMap__["a" /* mergeMap */])(__WEBPACK_IMPORTED_MODULE_1__util_identity__["a" /* identity */], concurrent);
}
//# sourceMappingURL=mergeAll.js.map


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QueueAction__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__QueueScheduler__ = __webpack_require__(99);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return queue; });
/** PURE_IMPORTS_START _QueueAction,_QueueScheduler PURE_IMPORTS_END */


var queue = /*@__PURE__*/ new __WEBPACK_IMPORTED_MODULE_1__QueueScheduler__["a" /* QueueScheduler */](__WEBPACK_IMPORTED_MODULE_0__QueueAction__["a" /* QueueAction */]);
//# sourceMappingURL=queue.js.map


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnsubscriptionError; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function UnsubscriptionErrorImpl(errors) {
    Error.call(this);
    this.message = errors ?
        errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
    return this;
}
UnsubscriptionErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
var UnsubscriptionError = UnsubscriptionErrorImpl;
//# sourceMappingURL=UnsubscriptionError.js.map


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return errorObject; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isArrayLike; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });
//# sourceMappingURL=isArrayLike.js.map


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__isArray__ = __webpack_require__(4);
/* harmony export (immutable) */ __webpack_exports__["a"] = isNumeric;
/** PURE_IMPORTS_START _isArray PURE_IMPORTS_END */

function isNumeric(val) {
    return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__isArray__["a" /* isArray */])(val) && (val - parseFloat(val) + 1) >= 0;
}
//# sourceMappingURL=isNumeric.js.map


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isObject;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isObject(x) {
    return x != null && typeof x === 'object';
}
//# sourceMappingURL=isObject.js.map


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isPromise;
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
//# sourceMappingURL=isPromise.js.map


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__noop__ = __webpack_require__(31);
/* unused harmony export pipe */
/* harmony export (immutable) */ __webpack_exports__["a"] = pipeFromArray;
/** PURE_IMPORTS_START _noop PURE_IMPORTS_END */

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
function pipeFromArray(fns) {
    if (!fns) {
        return __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* noop */];
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
//# sourceMappingURL=pipe.js.map


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subscribeToArray__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subscribeToPromise__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__subscribeToIterable__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__subscribeToObservable__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__isArrayLike__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__isPromise__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__isObject__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__symbol_iterator__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__symbol_observable__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return subscribeTo; });
/** PURE_IMPORTS_START _Observable,_subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */










var subscribeTo = function (result) {
    if (result instanceof __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]) {
        return function (subscriber) {
            if (result._isScalar) {
                subscriber.next(result.value);
                subscriber.complete();
                return undefined;
            }
            else {
                return result.subscribe(subscriber);
            }
        };
    }
    else if (result && typeof result[__WEBPACK_IMPORTED_MODULE_9__symbol_observable__["a" /* observable */]] === 'function') {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__subscribeToObservable__["a" /* subscribeToObservable */])(result);
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__isArrayLike__["a" /* isArrayLike */])(result)) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__subscribeToArray__["a" /* subscribeToArray */])(result);
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__isPromise__["a" /* isPromise */])(result)) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__subscribeToPromise__["a" /* subscribeToPromise */])(result);
    }
    else if (result && typeof result[__WEBPACK_IMPORTED_MODULE_8__symbol_iterator__["a" /* iterator */]] === 'function') {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__subscribeToIterable__["a" /* subscribeToIterable */])(result);
    }
    else {
        var value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__isObject__["a" /* isObject */])(result) ? 'an invalid object' : "'" + result + "'";
        var msg = "You provided " + value + " where a stream was expected."
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
    }
};
//# sourceMappingURL=subscribeTo.js.map


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return subscribeToArray; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var subscribeToArray = function (array) {
    return function (subscriber) {
        for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        if (!subscriber.closed) {
            subscriber.complete();
        }
    };
};
//# sourceMappingURL=subscribeToArray.js.map


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__symbol_iterator__ = __webpack_require__(17);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return subscribeToIterable; });
/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

var subscribeToIterable = function (iterable) {
    return function (subscriber) {
        var iterator = iterable[__WEBPACK_IMPORTED_MODULE_0__symbol_iterator__["a" /* iterator */]]();
        do {
            var item = iterator.next();
            if (item.done) {
                subscriber.complete();
                break;
            }
            subscriber.next(item.value);
            if (subscriber.closed) {
                break;
            }
        } while (true);
        if (typeof iterator.return === 'function') {
            subscriber.add(function () {
                if (iterator.return) {
                    iterator.return();
                }
            });
        }
        return subscriber;
    };
};
//# sourceMappingURL=subscribeToIterable.js.map


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__symbol_observable__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return subscribeToObservable; });
/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

var subscribeToObservable = function (obj) {
    return function (subscriber) {
        var obs = obj[__WEBPACK_IMPORTED_MODULE_0__symbol_observable__["a" /* observable */]]();
        if (typeof obs.subscribe !== 'function') {
            throw new TypeError('Provided object does not correctly implement Symbol.observable');
        }
        else {
            return obs.subscribe(subscriber);
        }
    };
};
//# sourceMappingURL=subscribeToObservable.js.map


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hostReportError__ = __webpack_require__(29);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return subscribeToPromise; });
/** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */

var subscribeToPromise = function (promise) {
    return function (subscriber) {
        promise.then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, __WEBPACK_IMPORTED_MODULE_0__hostReportError__["a" /* hostReportError */]);
        return subscriber;
    };
};
//# sourceMappingURL=subscribeToPromise.js.map


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angular_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ResourceProviders__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_Resource__ = __webpack_require__(13);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__src_Resource__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_ResourceAction__ = __webpack_require__(19);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__src_ResourceAction__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_ResourceCRUD__ = __webpack_require__(58);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__src_ResourceCRUD__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_ResourceCRUDBase__ = __webpack_require__(59);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_7__src_ResourceCRUDBase__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_ResourceGlobalConfig__ = __webpack_require__(23);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_8__src_ResourceGlobalConfig__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_8__src_ResourceGlobalConfig__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_ResourceModel__ = __webpack_require__(60);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_9__src_ResourceModel__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_ResourceODATA__ = __webpack_require__(61);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_10__src_ResourceODATA__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_10__src_ResourceODATA__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_ResourceParams__ = __webpack_require__(33);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_11__src_ResourceParams__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_3__src_ResourceProviders__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var ResourceModule = /** @class */ (function () {
    function ResourceModule() {
    }
    ResourceModule_1 = ResourceModule;
    ResourceModule.forRoot = function () {
        return {
            ngModule: ResourceModule_1,
            providers: __WEBPACK_IMPORTED_MODULE_3__src_ResourceProviders__["a" /* ResourceProviders */].providers[__WEBPACK_IMPORTED_MODULE_3__src_ResourceProviders__["a" /* ResourceProviders */].mainProvidersName]
        };
    };
    ResourceModule.forChild = function (subSet) {
        return {
            ngModule: ResourceModule_1,
            providers: __WEBPACK_IMPORTED_MODULE_3__src_ResourceProviders__["a" /* ResourceProviders */].providers[subSet] ? __WEBPACK_IMPORTED_MODULE_3__src_ResourceProviders__["a" /* ResourceProviders */].providers[subSet] : []
        };
    };
    var ResourceModule_1;
    ResourceModule = ResourceModule_1 = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_2__angular_http__["HttpModule"]]
        })
    ], ResourceModule);
    return ResourceModule;
}());



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(56);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResourceModule", function() { return __WEBPACK_IMPORTED_MODULE_0__index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Resource", function() { return __WEBPACK_IMPORTED_MODULE_0__index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResourceAction", function() { return __WEBPACK_IMPORTED_MODULE_0__index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResourceCRUD", function() { return __WEBPACK_IMPORTED_MODULE_0__index__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResourceCRUDBase", function() { return __WEBPACK_IMPORTED_MODULE_0__index__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TGetParamsMappingType", function() { return __WEBPACK_IMPORTED_MODULE_0__index__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResourceGlobalConfig", function() { return __WEBPACK_IMPORTED_MODULE_0__index__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResourceModel", function() { return __WEBPACK_IMPORTED_MODULE_0__index__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResourceODATA", function() { return __WEBPACK_IMPORTED_MODULE_0__index__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResourceODATAParams", function() { return __WEBPACK_IMPORTED_MODULE_0__index__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResourceParams", function() { return __WEBPACK_IMPORTED_MODULE_0__index__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ResourceProviders", function() { return __WEBPACK_IMPORTED_MODULE_0__index__["l"]; });



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Resource__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResourceAction__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceCRUD; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResourceCRUD = /** @class */ (function (_super) {
    __extends(ResourceCRUD, _super);
    function ResourceCRUD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Alias to save
    ResourceCRUD.prototype.create = function (data, callback) {
        return this.save(data, callback);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ResourceAction__["a" /* ResourceAction */])({
            isArray: true
        }),
        __metadata("design:type", Function)
    ], ResourceCRUD.prototype, "query", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ResourceAction__["a" /* ResourceAction */])({
            path: '/{!id}'
        }),
        __metadata("design:type", Function)
    ], ResourceCRUD.prototype, "get", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ResourceAction__["a" /* ResourceAction */])({
            method: __WEBPACK_IMPORTED_MODULE_0__angular_http__["RequestMethod"].Post
        }),
        __metadata("design:type", Function)
    ], ResourceCRUD.prototype, "save", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ResourceAction__["a" /* ResourceAction */])({
            method: __WEBPACK_IMPORTED_MODULE_0__angular_http__["RequestMethod"].Put,
            path: '/{!id}'
        }),
        __metadata("design:type", Function)
    ], ResourceCRUD.prototype, "update", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ResourceAction__["a" /* ResourceAction */])({
            method: __WEBPACK_IMPORTED_MODULE_0__angular_http__["RequestMethod"].Delete,
            path: '/{!id}'
        }),
        __metadata("design:type", Function)
    ], ResourceCRUD.prototype, "remove", void 0);
    return ResourceCRUD;
}(__WEBPACK_IMPORTED_MODULE_1__Resource__["a" /* Resource */]));



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Resource__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResourceAction__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceCRUDBase; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResourceCRUDBase = /** @class */ (function (_super) {
    __extends(ResourceCRUDBase, _super);
    function ResourceCRUDBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Alias to save
    ResourceCRUDBase.prototype.create = function (data, callback) {
        return this.save(data, callback);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ResourceAction__["a" /* ResourceAction */])({
            isArray: true
        }),
        __metadata("design:type", Function)
    ], ResourceCRUDBase.prototype, "query", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ResourceAction__["a" /* ResourceAction */])(),
        __metadata("design:type", Function)
    ], ResourceCRUDBase.prototype, "get", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ResourceAction__["a" /* ResourceAction */])({
            method: __WEBPACK_IMPORTED_MODULE_0__angular_http__["RequestMethod"].Post
        }),
        __metadata("design:type", Function)
    ], ResourceCRUDBase.prototype, "save", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ResourceAction__["a" /* ResourceAction */])({
            method: __WEBPACK_IMPORTED_MODULE_0__angular_http__["RequestMethod"].Put
        }),
        __metadata("design:type", Function)
    ], ResourceCRUDBase.prototype, "update", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ResourceAction__["a" /* ResourceAction */])({
            method: __WEBPACK_IMPORTED_MODULE_0__angular_http__["RequestMethod"].Delete
        }),
        __metadata("design:type", Function)
    ], ResourceCRUDBase.prototype, "remove", void 0);
    return ResourceCRUDBase;
}(__WEBPACK_IMPORTED_MODULE_1__Resource__["a" /* Resource */]));



/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Resource__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceModel; });

var ResourceModel = /** @class */ (function () {
    function ResourceModel() {
    }
    ResourceModel.prototype.$setData = function (data) {
        Object.assign(this, data);
        return this;
    };
    ResourceModel.prototype.$save = function () {
        if (this.isNew()) {
            return this.$create();
        }
        else {
            return this.$update();
        }
    };
    ResourceModel.prototype.$create = function () {
        return this.$resource_method('create');
    };
    ResourceModel.prototype.$update = function () {
        return this.$resource_method('update');
    };
    ResourceModel.prototype.$remove = function () {
        return this.$resource_method('remove');
    };
    ResourceModel.prototype.toJSON = function () {
        return __WEBPACK_IMPORTED_MODULE_0__Resource__["a" /* Resource */].$cleanData(this);
    };
    ResourceModel.prototype.isNew = function () {
        return !this['id'];
    };
    ResourceModel.prototype.$resource_method = function (methodName) {
        if (!this.$resource) {
            console.error("Your Resource is not set. Please use resource.createModel() method to create model.");
            return this;
        }
        if (!this.$resource[methodName]) {
            console.error("Your Resource has no implemented " + methodName + " method.");
            return this;
        }
        this.$resource[methodName](this);
        return this;
    };
    return ResourceModel;
}());



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Resource__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ResourceAction__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ResourceParams__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceODATA; });
/* harmony export (immutable) */ __webpack_exports__["b"] = ResourceODATAParams;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/** A Resource base class for ODATA entities. To create a resource is just
 * enough to extend this class and all the base ODATA functionalities will be present.
 */
var ResourceODATA = /** @class */ (function (_super) {
    __extends(ResourceODATA, _super);
    function ResourceODATA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceODATA.prototype.$getUrl = function () {
        return _super.prototype.$getUrl.call(this) + "/" + this.getEntitySetName();
    };
    ResourceODATA.prototype.getEntityName = function () {
        return null;
    };
    ResourceODATA.prototype.getEntitySetName = function () {
        return this.getEntityName() + "s";
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ResourceAction__["a" /* ResourceAction */])({
            path: '/{!id}'
        }),
        __metadata("design:type", Function)
    ], ResourceODATA.prototype, "get", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ResourceAction__["a" /* ResourceAction */])({
            method: __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestMethod"].Post
        }),
        __metadata("design:type", Function)
    ], ResourceODATA.prototype, "save", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__ResourceAction__["a" /* ResourceAction */])({
            params: {
                "$filter": "@$filter",
                "$search": "@$search",
                "$expand": "@$expand",
                "$limit": "@$limit",
                "query": "@query"
            },
            isArray: true
        }),
        __metadata("design:type", Function)
    ], ResourceODATA.prototype, "search", void 0);
    return ResourceODATA;
}(__WEBPACK_IMPORTED_MODULE_2__Resource__["a" /* Resource */]));

/**
 * A ODATA annotation for a resource for a ODATA entity resource extending {@link ResourceODATA}.
 */
function ResourceODATAParams(params) {
    var injectable = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])();
    var zuper = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__ResourceParams__["a" /* ResourceParams */])(params);
    return function (target) {
        injectable(target);
        zuper(target);
        target.prototype.getEntityName = function () {
            if (params.name) {
                return params.name;
            }
            return typeof params.entity === "string" ? params.entity : params.entity.name;
        };
    };
}


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__internal_Observable__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__internal_Observable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__internal_observable_ConnectableObservable__ = __webpack_require__(65);
/* unused harmony reexport ConnectableObservable */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__internal_operators_groupBy__ = __webpack_require__(89);
/* unused harmony reexport GroupedObservable */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__internal_symbol_observable__ = __webpack_require__(12);
/* unused harmony reexport observable */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__internal_Subject__ = __webpack_require__(8);
/* unused harmony reexport Subject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__internal_BehaviorSubject__ = __webpack_require__(63);
/* unused harmony reexport BehaviorSubject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__internal_ReplaySubject__ = __webpack_require__(64);
/* unused harmony reexport ReplaySubject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__internal_AsyncSubject__ = __webpack_require__(25);
/* unused harmony reexport AsyncSubject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__internal_scheduler_asap__ = __webpack_require__(102);
/* unused harmony reexport asapScheduler */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__internal_scheduler_async__ = __webpack_require__(27);
/* unused harmony reexport asyncScheduler */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__internal_scheduler_queue__ = __webpack_require__(43);
/* unused harmony reexport queueScheduler */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__internal_scheduler_animationFrame__ = __webpack_require__(101);
/* unused harmony reexport animationFrameScheduler */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__internal_scheduler_VirtualTimeScheduler__ = __webpack_require__(100);
/* unused harmony reexport VirtualTimeScheduler */
/* unused harmony reexport VirtualAction */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__internal_Scheduler__ = __webpack_require__(37);
/* unused harmony reexport Scheduler */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__internal_Subscription__ = __webpack_require__(2);
/* unused harmony reexport Subscription */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__internal_Subscriber__ = __webpack_require__(3);
/* unused harmony reexport Subscriber */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__internal_Notification__ = __webpack_require__(35);
/* unused harmony reexport Notification */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__internal_util_pipe__ = __webpack_require__(50);
/* unused harmony reexport pipe */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__internal_util_noop__ = __webpack_require__(31);
/* unused harmony reexport noop */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__internal_util_identity__ = __webpack_require__(30);
/* unused harmony reexport identity */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__internal_util_isObservable__ = __webpack_require__(109);
/* unused harmony reexport isObservable */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__internal_util_ArgumentOutOfRangeError__ = __webpack_require__(103);
/* unused harmony reexport ArgumentOutOfRangeError */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__internal_util_EmptyError__ = __webpack_require__(104);
/* unused harmony reexport EmptyError */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__internal_util_ObjectUnsubscribedError__ = __webpack_require__(21);
/* unused harmony reexport ObjectUnsubscribedError */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__internal_util_UnsubscriptionError__ = __webpack_require__(44);
/* unused harmony reexport UnsubscriptionError */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__internal_util_TimeoutError__ = __webpack_require__(106);
/* unused harmony reexport TimeoutError */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__internal_observable_bindCallback__ = __webpack_require__(66);
/* unused harmony reexport bindCallback */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__internal_observable_bindNodeCallback__ = __webpack_require__(67);
/* unused harmony reexport bindNodeCallback */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__internal_observable_combineLatest__ = __webpack_require__(68);
/* unused harmony reexport combineLatest */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__internal_observable_concat__ = __webpack_require__(69);
/* unused harmony reexport concat */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__internal_observable_defer__ = __webpack_require__(39);
/* unused harmony reexport defer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__internal_observable_empty__ = __webpack_require__(5);
/* unused harmony reexport empty */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__internal_observable_forkJoin__ = __webpack_require__(70);
/* unused harmony reexport forkJoin */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__internal_observable_from__ = __webpack_require__(9);
/* unused harmony reexport from */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__internal_observable_fromEvent__ = __webpack_require__(71);
/* unused harmony reexport fromEvent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__internal_observable_fromEventPattern__ = __webpack_require__(72);
/* unused harmony reexport fromEventPattern */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__internal_observable_generate__ = __webpack_require__(76);
/* unused harmony reexport generate */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__internal_observable_iif__ = __webpack_require__(77);
/* unused harmony reexport iif */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__internal_observable_interval__ = __webpack_require__(78);
/* unused harmony reexport interval */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__internal_observable_merge__ = __webpack_require__(79);
/* unused harmony reexport merge */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__internal_observable_never__ = __webpack_require__(40);
/* unused harmony reexport never */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__internal_observable_of__ = __webpack_require__(26);
/* unused harmony reexport of */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__internal_observable_onErrorResumeNext__ = __webpack_require__(80);
/* unused harmony reexport onErrorResumeNext */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__internal_observable_pairs__ = __webpack_require__(81);
/* unused harmony reexport pairs */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__internal_observable_race__ = __webpack_require__(82);
/* unused harmony reexport race */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__internal_observable_range__ = __webpack_require__(83);
/* unused harmony reexport range */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__internal_observable_throwError__ = __webpack_require__(41);
/* unused harmony reexport throwError */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__internal_observable_timer__ = __webpack_require__(85);
/* unused harmony reexport timer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__internal_observable_using__ = __webpack_require__(86);
/* unused harmony reexport using */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__internal_observable_zip__ = __webpack_require__(87);
/* unused harmony reexport zip */
/* unused harmony reexport EMPTY */
/* unused harmony reexport NEVER */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__internal_config__ = __webpack_require__(20);
/* unused harmony reexport config */
/** PURE_IMPORTS_START  PURE_IMPORTS_END */





















































//# sourceMappingURL=index.js.map


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subject__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_ObjectUnsubscribedError__ = __webpack_require__(21);
/* unused harmony export BehaviorSubject */
/** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */



var BehaviorSubject = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_2__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        else {
            return this._value;
        }
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject;
}(__WEBPACK_IMPORTED_MODULE_1__Subject__["a" /* Subject */]));

//# sourceMappingURL=BehaviorSubject.js.map


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subject__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scheduler_queue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Subscription__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__operators_observeOn__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_ObjectUnsubscribedError__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__SubjectSubscription__ = __webpack_require__(38);
/* unused harmony export ReplaySubject */
/** PURE_IMPORTS_START tslib,_Subject,_scheduler_queue,_Subscription,_operators_observeOn,_util_ObjectUnsubscribedError,_SubjectSubscription PURE_IMPORTS_END */







var ReplaySubject = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) {
            bufferSize = Number.POSITIVE_INFINITY;
        }
        if (windowTime === void 0) {
            windowTime = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this) || this;
        _this.scheduler = scheduler;
        _this._events = [];
        _this._infiniteTimeWindow = false;
        _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        _this._windowTime = windowTime < 1 ? 1 : windowTime;
        if (windowTime === Number.POSITIVE_INFINITY) {
            _this._infiniteTimeWindow = true;
            _this.next = _this.nextInfiniteTimeWindow;
        }
        else {
            _this.next = _this.nextTimeWindow;
        }
        return _this;
    }
    ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
        var _events = this._events;
        _events.push(value);
        if (_events.length > this._bufferSize) {
            _events.shift();
        }
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype.nextTimeWindow = function (value) {
        this._events.push(new ReplayEvent(this._getNow(), value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _infiniteTimeWindow = this._infiniteTimeWindow;
        var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var len = _events.length;
        var subscription;
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_5__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        else if (this.isStopped || this.hasError) {
            subscription = __WEBPACK_IMPORTED_MODULE_3__Subscription__["a" /* Subscription */].EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new __WEBPACK_IMPORTED_MODULE_6__SubjectSubscription__["a" /* SubjectSubscription */](this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new __WEBPACK_IMPORTED_MODULE_4__operators_observeOn__["a" /* ObserveOnSubscriber */](subscriber, scheduler));
        }
        if (_infiniteTimeWindow) {
            for (var i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i]);
            }
        }
        else {
            for (var i = 0; i < len && !subscriber.closed; i++) {
                subscriber.next(_events[i].value);
            }
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || __WEBPACK_IMPORTED_MODULE_2__scheduler_queue__["a" /* queue */]).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(__WEBPACK_IMPORTED_MODULE_1__Subject__["a" /* Subject */]));

var ReplayEvent = /*@__PURE__*/ (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());
//# sourceMappingURL=ReplaySubject.js.map


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subject__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Subscriber__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Subscription__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__operators_refCount__ = __webpack_require__(92);
/* unused harmony export ConnectableObservable */
/* unused harmony export connectableObservableDescriptor */
/** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */






var ConnectableObservable = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._refCount = 0;
        _this._isComplete = false;
        return _this;
    }
    ConnectableObservable.prototype._subscribe = function (subscriber) {
        return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function () {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
        }
        return this._subject;
    };
    ConnectableObservable.prototype.connect = function () {
        var connection = this._connection;
        if (!connection) {
            this._isComplete = false;
            connection = this._connection = new __WEBPACK_IMPORTED_MODULE_4__Subscription__["a" /* Subscription */]();
            connection.add(this.source
                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
                this._connection = null;
                connection = __WEBPACK_IMPORTED_MODULE_4__Subscription__["a" /* Subscription */].EMPTY;
            }
            else {
                this._connection = connection;
            }
        }
        return connection;
    };
    ConnectableObservable.prototype.refCount = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__operators_refCount__["a" /* refCount */])()(this);
    };
    return ConnectableObservable;
}(__WEBPACK_IMPORTED_MODULE_2__Observable__["a" /* Observable */]));

var connectableProto = ConnectableObservable.prototype;
var connectableObservableDescriptor = {
    operator: { value: null },
    _refCount: { value: 0, writable: true },
    _subject: { value: null, writable: true },
    _connection: { value: null, writable: true },
    _subscribe: { value: connectableProto._subscribe },
    _isComplete: { value: connectableProto._isComplete, writable: true },
    getSubject: { value: connectableProto.getSubject },
    connect: { value: connectableProto.connect },
    refCount: { value: connectableProto.refCount }
};
var ConnectableSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](ConnectableSubscriber, _super);
    function ConnectableSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    ConnectableSubscriber.prototype._error = function (err) {
        this._unsubscribe();
        _super.prototype._error.call(this, err);
    };
    ConnectableSubscriber.prototype._complete = function () {
        this.connectable._isComplete = true;
        this._unsubscribe();
        _super.prototype._complete.call(this);
    };
    ConnectableSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
                connection.unsubscribe();
            }
        }
    };
    return ConnectableSubscriber;
}(__WEBPACK_IMPORTED_MODULE_1__Subject__["b" /* SubjectSubscriber */]));
var RefCountOperator = /*@__PURE__*/ (function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(__WEBPACK_IMPORTED_MODULE_3__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=ConnectableObservable.js.map


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AsyncSubject__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__operators_map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_isArray__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_isScheduler__ = __webpack_require__(6);
/* unused harmony export bindCallback */
/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_isArray,_util_isScheduler PURE_IMPORTS_END */





function bindCallback(callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_isScheduler__["a" /* isScheduler */])(resultSelector)) {
            scheduler = resultSelector;
        }
        else {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return bindCallback(callbackFunc, scheduler).apply(void 0, args).pipe(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__operators_map__["a" /* map */])(function (args) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_isArray__["a" /* isArray */])(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
            };
        }
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var context = this;
        var subject;
        var params = {
            context: context,
            subject: subject,
            callbackFunc: callbackFunc,
            scheduler: scheduler,
        };
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
            if (!scheduler) {
                if (!subject) {
                    subject = new __WEBPACK_IMPORTED_MODULE_1__AsyncSubject__["a" /* AsyncSubject */]();
                    var handler = function () {
                        var innerArgs = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            innerArgs[_i] = arguments[_i];
                        }
                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    };
                    try {
                        callbackFunc.apply(context, args.concat([handler]));
                    }
                    catch (err) {
                        subject.error(err);
                    }
                }
                return subject.subscribe(subscriber);
            }
            else {
                var state = {
                    args: args, subscriber: subscriber, params: params,
                };
                return scheduler.schedule(dispatch, 0, state);
            }
        });
    };
}
function dispatch(state) {
    var _this = this;
    var self = this;
    var args = state.args, subscriber = state.subscriber, params = state.params;
    var callbackFunc = params.callbackFunc, context = params.context, scheduler = params.scheduler;
    var subject = params.subject;
    if (!subject) {
        subject = params.subject = new __WEBPACK_IMPORTED_MODULE_1__AsyncSubject__["a" /* AsyncSubject */]();
        var handler = function () {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i] = arguments[_i];
            }
            var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
            _this.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
        };
        try {
            callbackFunc.apply(context, args.concat([handler]));
        }
        catch (err) {
            subject.error(err);
        }
    }
    this.add(subject.subscribe(subscriber));
}
function dispatchNext(state) {
    var value = state.value, subject = state.subject;
    subject.next(value);
    subject.complete();
}
function dispatchError(state) {
    var err = state.err, subject = state.subject;
    subject.error(err);
}
//# sourceMappingURL=bindCallback.js.map


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AsyncSubject__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__operators_map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_isScheduler__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_isArray__ = __webpack_require__(4);
/* unused harmony export bindNodeCallback */
/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_isScheduler,_util_isArray PURE_IMPORTS_END */





function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_isScheduler__["a" /* isScheduler */])(resultSelector)) {
            scheduler = resultSelector;
        }
        else {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return bindNodeCallback(callbackFunc, scheduler).apply(void 0, args).pipe(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__operators_map__["a" /* map */])(function (args) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_isArray__["a" /* isArray */])(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
            };
        }
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var params = {
            subject: undefined,
            args: args,
            callbackFunc: callbackFunc,
            scheduler: scheduler,
            context: this,
        };
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
            var context = params.context;
            var subject = params.subject;
            if (!scheduler) {
                if (!subject) {
                    subject = params.subject = new __WEBPACK_IMPORTED_MODULE_1__AsyncSubject__["a" /* AsyncSubject */]();
                    var handler = function () {
                        var innerArgs = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            innerArgs[_i] = arguments[_i];
                        }
                        var err = innerArgs.shift();
                        if (err) {
                            subject.error(err);
                            return;
                        }
                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                        subject.complete();
                    };
                    try {
                        callbackFunc.apply(context, args.concat([handler]));
                    }
                    catch (err) {
                        subject.error(err);
                    }
                }
                return subject.subscribe(subscriber);
            }
            else {
                return scheduler.schedule(dispatch, 0, { params: params, subscriber: subscriber, context: context });
            }
        });
    };
}
function dispatch(state) {
    var _this = this;
    var params = state.params, subscriber = state.subscriber, context = state.context;
    var callbackFunc = params.callbackFunc, args = params.args, scheduler = params.scheduler;
    var subject = params.subject;
    if (!subject) {
        subject = params.subject = new __WEBPACK_IMPORTED_MODULE_1__AsyncSubject__["a" /* AsyncSubject */]();
        var handler = function () {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                innerArgs[_i] = arguments[_i];
            }
            var err = innerArgs.shift();
            if (err) {
                _this.add(scheduler.schedule(dispatchError, 0, { err: err, subject: subject }));
            }
            else {
                var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
                _this.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
            }
        };
        try {
            callbackFunc.apply(context, args.concat([handler]));
        }
        catch (err) {
            this.add(scheduler.schedule(dispatchError, 0, { err: err, subject: subject }));
        }
    }
    this.add(subject.subscribe(subscriber));
}
function dispatchNext(arg) {
    var value = arg.value, subject = arg.subject;
    subject.next(value);
    subject.complete();
}
function dispatchError(arg) {
    var err = arg.err, subject = arg.subject;
    subject.error(err);
}
//# sourceMappingURL=bindNodeCallback.js.map


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_isScheduler__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isArray__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__OuterSubscriber__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_subscribeToResult__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fromArray__ = __webpack_require__(10);
/* unused harmony export combineLatest */
/* unused harmony export CombineLatestOperator */
/* unused harmony export CombineLatestSubscriber */
/** PURE_IMPORTS_START tslib,_util_isScheduler,_util_isArray,_OuterSubscriber,_util_subscribeToResult,_fromArray PURE_IMPORTS_END */






var NONE = {};
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var resultSelector = null;
    var scheduler = null;
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_isScheduler__["a" /* isScheduler */])(observables[observables.length - 1])) {
        scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
        resultSelector = observables.pop();
    }
    if (observables.length === 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isArray__["a" /* isArray */])(observables[0])) {
        observables = observables[0];
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__fromArray__["a" /* fromArray */])(observables, scheduler).lift(new CombineLatestOperator(resultSelector));
}
var CombineLatestOperator = /*@__PURE__*/ (function () {
    function CombineLatestOperator(resultSelector) {
        this.resultSelector = resultSelector;
    }
    CombineLatestOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new CombineLatestSubscriber(subscriber, this.resultSelector));
    };
    return CombineLatestOperator;
}());

var CombineLatestSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, resultSelector) {
        var _this = _super.call(this, destination) || this;
        _this.resultSelector = resultSelector;
        _this.active = 0;
        _this.values = [];
        _this.observables = [];
        return _this;
    }
    CombineLatestSubscriber.prototype._next = function (observable) {
        this.values.push(NONE);
        this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            this.active = len;
            this.toRespond = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_subscribeToResult__["a" /* subscribeToResult */])(this, observable, observable, i));
            }
        }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };
    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var values = this.values;
        var oldVal = values[outerIndex];
        var toRespond = !this.toRespond
            ? 0
            : oldVal === NONE ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
            if (this.resultSelector) {
                this._tryResultSelector(values);
            }
            else {
                this.destination.next(values.slice());
            }
        }
    };
    CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
        var result;
        try {
            result = this.resultSelector.apply(this, values);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return CombineLatestSubscriber;
}(__WEBPACK_IMPORTED_MODULE_3__OuterSubscriber__["a" /* OuterSubscriber */]));

//# sourceMappingURL=combineLatest.js.map


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_isScheduler__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__of__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__from__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__operators_concatAll__ = __webpack_require__(88);
/* unused harmony export concat */
/** PURE_IMPORTS_START _util_isScheduler,_of,_from,_operators_concatAll PURE_IMPORTS_END */




function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    if (observables.length === 1 || (observables.length === 2 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_isScheduler__["a" /* isScheduler */])(observables[1]))) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__from__["a" /* from */])(observables[0]);
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__operators_concatAll__["a" /* concatAll */])()(__WEBPACK_IMPORTED_MODULE_1__of__["a" /* of */].apply(void 0, observables));
}
//# sourceMappingURL=concat.js.map


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isArray__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__empty__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_subscribeToResult__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__OuterSubscriber__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__operators_map__ = __webpack_require__(11);
/* unused harmony export forkJoin */
/** PURE_IMPORTS_START tslib,_Observable,_util_isArray,_empty,_util_subscribeToResult,_OuterSubscriber,_operators_map PURE_IMPORTS_END */







function forkJoin() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var resultSelector;
    if (typeof sources[sources.length - 1] === 'function') {
        resultSelector = sources.pop();
    }
    if (sources.length === 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isArray__["a" /* isArray */])(sources[0])) {
        sources = sources[0];
    }
    if (sources.length === 0) {
        return __WEBPACK_IMPORTED_MODULE_3__empty__["a" /* EMPTY */];
    }
    if (resultSelector) {
        return forkJoin(sources).pipe(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__operators_map__["a" /* map */])(function (args) { return resultSelector.apply(void 0, args); }));
    }
    return new __WEBPACK_IMPORTED_MODULE_1__Observable__["a" /* Observable */](function (subscriber) {
        return new ForkJoinSubscriber(subscriber, sources);
    });
}
var ForkJoinSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](ForkJoinSubscriber, _super);
    function ForkJoinSubscriber(destination, sources) {
        var _this = _super.call(this, destination) || this;
        _this.sources = sources;
        _this.completed = 0;
        _this.haveValues = 0;
        var len = sources.length;
        _this.values = new Array(len);
        for (var i = 0; i < len; i++) {
            var source = sources[i];
            var innerSubscription = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_subscribeToResult__["a" /* subscribeToResult */])(_this, source, null, i);
            if (innerSubscription) {
                _this.add(innerSubscription);
            }
        }
        return _this;
    }
    ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.values[outerIndex] = innerValue;
        if (!innerSub._hasValue) {
            innerSub._hasValue = true;
            this.haveValues++;
        }
    };
    ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
        var _a = this, destination = _a.destination, haveValues = _a.haveValues, values = _a.values;
        var len = values.length;
        if (!innerSub._hasValue) {
            destination.complete();
            return;
        }
        this.completed++;
        if (this.completed !== len) {
            return;
        }
        if (haveValues === len) {
            destination.next(values);
        }
        destination.complete();
    };
    return ForkJoinSubscriber;
}(__WEBPACK_IMPORTED_MODULE_5__OuterSubscriber__["a" /* OuterSubscriber */]));
//# sourceMappingURL=forkJoin.js.map


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_isArray__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isFunction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__operators_map__ = __webpack_require__(11);
/* unused harmony export fromEvent */
/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */




var toString = Object.prototype.toString;
function fromEvent(target, eventName, options, resultSelector) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isFunction__["a" /* isFunction */])(options)) {
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__operators_map__["a" /* map */])(function (args) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_isArray__["a" /* isArray */])(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
    }
    return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
        function handler(e) {
            if (arguments.length > 1) {
                subscriber.next(Array.prototype.slice.call(arguments));
            }
            else {
                subscriber.next(e);
            }
        }
        setupSubscription(target, eventName, handler, subscriber, options);
    });
}
function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
    var unsubscribe;
    if (isEventTarget(sourceObj)) {
        var source_1 = sourceObj;
        sourceObj.addEventListener(eventName, handler, options);
        unsubscribe = function () { return source_1.removeEventListener(eventName, handler, options); };
    }
    else if (isJQueryStyleEventEmitter(sourceObj)) {
        var source_2 = sourceObj;
        sourceObj.on(eventName, handler);
        unsubscribe = function () { return source_2.off(eventName, handler); };
    }
    else if (isNodeStyleEventEmitter(sourceObj)) {
        var source_3 = sourceObj;
        sourceObj.addListener(eventName, handler);
        unsubscribe = function () { return source_3.removeListener(eventName, handler); };
    }
    else if (sourceObj && sourceObj.length) {
        for (var i = 0, len = sourceObj.length; i < len; i++) {
            setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
        }
    }
    else {
        throw new TypeError('Invalid event target');
    }
    subscriber.add(unsubscribe);
}
function isNodeStyleEventEmitter(sourceObj) {
    return sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isEventTarget(sourceObj) {
    return sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
//# sourceMappingURL=fromEvent.js.map


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_isArray__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isFunction__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__operators_map__ = __webpack_require__(11);
/* unused harmony export fromEventPattern */
/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */




function fromEventPattern(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
        return fromEventPattern(addHandler, removeHandler).pipe(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__operators_map__["a" /* map */])(function (args) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_isArray__["a" /* isArray */])(args) ? resultSelector.apply(void 0, args) : resultSelector(args); }));
    }
    return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
        var handler = function () {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                e[_i] = arguments[_i];
            }
            return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue;
        try {
            retValue = addHandler(handler);
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isFunction__["a" /* isFunction */])(removeHandler)) {
            return undefined;
        }
        return function () { return removeHandler(handler, retValue); };
    });
}
//# sourceMappingURL=fromEventPattern.js.map


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscription__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__symbol_iterator__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_subscribeToIterable__ = __webpack_require__(53);
/* harmony export (immutable) */ __webpack_exports__["a"] = fromIterable;
/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator,_util_subscribeToIterable PURE_IMPORTS_END */




function fromIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    if (!scheduler) {
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_subscribeToIterable__["a" /* subscribeToIterable */])(input));
    }
    else {
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
            var sub = new __WEBPACK_IMPORTED_MODULE_1__Subscription__["a" /* Subscription */]();
            var iterator;
            sub.add(function () {
                if (iterator && typeof iterator.return === 'function') {
                    iterator.return();
                }
            });
            sub.add(scheduler.schedule(function () {
                iterator = input[__WEBPACK_IMPORTED_MODULE_2__symbol_iterator__["a" /* iterator */]]();
                sub.add(scheduler.schedule(function () {
                    if (subscriber.closed) {
                        return;
                    }
                    var value;
                    var done;
                    try {
                        var result = iterator.next();
                        value = result.value;
                        done = result.done;
                    }
                    catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(value);
                        this.schedule();
                    }
                }));
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromIterable.js.map


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscription__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__symbol_observable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_subscribeToObservable__ = __webpack_require__(54);
/* harmony export (immutable) */ __webpack_exports__["a"] = fromObservable;
/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable,_util_subscribeToObservable PURE_IMPORTS_END */




function fromObservable(input, scheduler) {
    if (!scheduler) {
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_subscribeToObservable__["a" /* subscribeToObservable */])(input));
    }
    else {
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
            var sub = new __WEBPACK_IMPORTED_MODULE_1__Subscription__["a" /* Subscription */]();
            sub.add(scheduler.schedule(function () {
                var observable = input[__WEBPACK_IMPORTED_MODULE_2__symbol_observable__["a" /* observable */]]();
                sub.add(observable.subscribe({
                    next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
                    error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
                    complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
                }));
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromObservable.js.map


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscription__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_subscribeToPromise__ = __webpack_require__(55);
/* harmony export (immutable) */ __webpack_exports__["a"] = fromPromise;
/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToPromise PURE_IMPORTS_END */



function fromPromise(input, scheduler) {
    if (!scheduler) {
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_subscribeToPromise__["a" /* subscribeToPromise */])(input));
    }
    else {
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
            var sub = new __WEBPACK_IMPORTED_MODULE_1__Subscription__["a" /* Subscription */]();
            sub.add(scheduler.schedule(function () {
                return input.then(function (value) {
                    sub.add(scheduler.schedule(function () {
                        subscriber.next(value);
                        sub.add(scheduler.schedule(function () { return subscriber.complete(); }));
                    }));
                }, function (err) {
                    sub.add(scheduler.schedule(function () { return subscriber.error(err); }));
                });
            }));
            return sub;
        });
    }
}
//# sourceMappingURL=fromPromise.js.map


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_identity__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isScheduler__ = __webpack_require__(6);
/* unused harmony export generate */
/** PURE_IMPORTS_START _Observable,_util_identity,_util_isScheduler PURE_IMPORTS_END */



function generate(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
    var resultSelector;
    var initialState;
    if (arguments.length == 1) {
        var options = initialStateOrOptions;
        initialState = options.initialState;
        condition = options.condition;
        iterate = options.iterate;
        resultSelector = options.resultSelector || __WEBPACK_IMPORTED_MODULE_1__util_identity__["a" /* identity */];
        scheduler = options.scheduler;
    }
    else if (resultSelectorOrObservable === undefined || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isScheduler__["a" /* isScheduler */])(resultSelectorOrObservable)) {
        initialState = initialStateOrOptions;
        resultSelector = __WEBPACK_IMPORTED_MODULE_1__util_identity__["a" /* identity */];
        scheduler = resultSelectorOrObservable;
    }
    else {
        initialState = initialStateOrOptions;
        resultSelector = resultSelectorOrObservable;
    }
    return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
        var state = initialState;
        if (scheduler) {
            return scheduler.schedule(dispatch, 0, {
                subscriber: subscriber,
                iterate: iterate,
                condition: condition,
                resultSelector: resultSelector,
                state: state
            });
        }
        do {
            if (condition) {
                var conditionResult = void 0;
                try {
                    conditionResult = condition(state);
                }
                catch (err) {
                    subscriber.error(err);
                    return undefined;
                }
                if (!conditionResult) {
                    subscriber.complete();
                    break;
                }
            }
            var value = void 0;
            try {
                value = resultSelector(state);
            }
            catch (err) {
                subscriber.error(err);
                return undefined;
            }
            subscriber.next(value);
            if (subscriber.closed) {
                break;
            }
            try {
                state = iterate(state);
            }
            catch (err) {
                subscriber.error(err);
                return undefined;
            }
        } while (true);
        return undefined;
    });
}
function dispatch(state) {
    var subscriber = state.subscriber, condition = state.condition;
    if (subscriber.closed) {
        return undefined;
    }
    if (state.needIterate) {
        try {
            state.state = state.iterate(state.state);
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
    }
    else {
        state.needIterate = true;
    }
    if (condition) {
        var conditionResult = void 0;
        try {
            conditionResult = condition(state.state);
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
        if (!conditionResult) {
            subscriber.complete();
            return undefined;
        }
        if (subscriber.closed) {
            return undefined;
        }
    }
    var value;
    try {
        value = state.resultSelector(state.state);
    }
    catch (err) {
        subscriber.error(err);
        return undefined;
    }
    if (subscriber.closed) {
        return undefined;
    }
    subscriber.next(value);
    if (subscriber.closed) {
        return undefined;
    }
    return this.schedule(state);
}
//# sourceMappingURL=generate.js.map


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__defer__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__empty__ = __webpack_require__(5);
/* unused harmony export iif */
/** PURE_IMPORTS_START _defer,_empty PURE_IMPORTS_END */


function iif(condition, trueResult, falseResult) {
    if (trueResult === void 0) {
        trueResult = __WEBPACK_IMPORTED_MODULE_1__empty__["a" /* EMPTY */];
    }
    if (falseResult === void 0) {
        falseResult = __WEBPACK_IMPORTED_MODULE_1__empty__["a" /* EMPTY */];
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__defer__["a" /* defer */])(function () { return condition() ? trueResult : falseResult; });
}
//# sourceMappingURL=iif.js.map


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler_async__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isNumeric__ = __webpack_require__(47);
/* unused harmony export interval */
/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric PURE_IMPORTS_END */



function interval(period, scheduler) {
    if (period === void 0) {
        period = 0;
    }
    if (scheduler === void 0) {
        scheduler = __WEBPACK_IMPORTED_MODULE_1__scheduler_async__["a" /* async */];
    }
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isNumeric__["a" /* isNumeric */])(period) || period < 0) {
        period = 0;
    }
    if (!scheduler || typeof scheduler.schedule !== 'function') {
        scheduler = __WEBPACK_IMPORTED_MODULE_1__scheduler_async__["a" /* async */];
    }
    return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
        subscriber.add(scheduler.schedule(dispatch, period, { subscriber: subscriber, counter: 0, period: period }));
        return subscriber;
    });
}
function dispatch(state) {
    var subscriber = state.subscriber, counter = state.counter, period = state.period;
    subscriber.next(counter);
    this.schedule({ subscriber: subscriber, counter: counter + 1, period: period }, period);
}
//# sourceMappingURL=interval.js.map


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_isScheduler__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__operators_mergeAll__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__fromArray__ = __webpack_require__(10);
/* unused harmony export merge */
/** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */




function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_isScheduler__["a" /* isScheduler */])(last)) {
        scheduler = observables.pop();
        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
            concurrent = observables.pop();
        }
    }
    else if (typeof last === 'number') {
        concurrent = observables.pop();
    }
    if (scheduler === null && observables.length === 1 && observables[0] instanceof __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */]) {
        return observables[0];
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__operators_mergeAll__["a" /* mergeAll */])(concurrent)(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__fromArray__["a" /* fromArray */])(observables, scheduler));
}
//# sourceMappingURL=merge.js.map


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__from__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isArray__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__empty__ = __webpack_require__(5);
/* unused harmony export onErrorResumeNext */
/** PURE_IMPORTS_START _Observable,_from,_util_isArray,_empty PURE_IMPORTS_END */




function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    if (sources.length === 0) {
        return __WEBPACK_IMPORTED_MODULE_3__empty__["a" /* EMPTY */];
    }
    var first = sources[0], remainder = sources.slice(1);
    if (sources.length === 1 && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isArray__["a" /* isArray */])(first)) {
        return onErrorResumeNext.apply(void 0, first);
    }
    return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
        var subNext = function () { return subscriber.add(onErrorResumeNext.apply(void 0, remainder).subscribe(subscriber)); };
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__from__["a" /* from */])(first).subscribe({
            next: function (value) { subscriber.next(value); },
            error: subNext,
            complete: subNext,
        });
    });
}
//# sourceMappingURL=onErrorResumeNext.js.map


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscription__ = __webpack_require__(2);
/* unused harmony export pairs */
/* unused harmony export dispatch */
/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */


function pairs(obj, scheduler) {
    if (!scheduler) {
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length && !subscriber.closed; i++) {
                var key = keys[i];
                if (obj.hasOwnProperty(key)) {
                    subscriber.next([key, obj[key]]);
                }
            }
            subscriber.complete();
        });
    }
    else {
        return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
            var keys = Object.keys(obj);
            var subscription = new __WEBPACK_IMPORTED_MODULE_1__Subscription__["a" /* Subscription */]();
            subscription.add(scheduler.schedule(dispatch, 0, { keys: keys, index: 0, subscriber: subscriber, subscription: subscription, obj: obj }));
            return subscription;
        });
    }
}
function dispatch(state) {
    var keys = state.keys, index = state.index, subscriber = state.subscriber, subscription = state.subscription, obj = state.obj;
    if (!subscriber.closed) {
        if (index < keys.length) {
            var key = keys[index];
            subscriber.next([key, obj[key]]);
            subscription.add(this.schedule({ keys: keys, index: index + 1, subscriber: subscriber, subscription: subscription, obj: obj }));
        }
        else {
            subscriber.complete();
        }
    }
}
//# sourceMappingURL=pairs.js.map


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_isArray__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fromArray__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__OuterSubscriber__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_subscribeToResult__ = __webpack_require__(18);
/* unused harmony export race */
/* unused harmony export RaceOperator */
/* unused harmony export RaceSubscriber */
/** PURE_IMPORTS_START tslib,_util_isArray,_fromArray,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */





function race() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    if (observables.length === 1) {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_isArray__["a" /* isArray */])(observables[0])) {
            observables = observables[0];
        }
        else {
            return observables[0];
        }
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fromArray__["a" /* fromArray */])(observables, undefined).lift(new RaceOperator());
}
var RaceOperator = /*@__PURE__*/ (function () {
    function RaceOperator() {
    }
    RaceOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new RaceSubscriber(subscriber));
    };
    return RaceOperator;
}());

var RaceSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](RaceSubscriber, _super);
    function RaceSubscriber(destination) {
        var _this = _super.call(this, destination) || this;
        _this.hasFirst = false;
        _this.observables = [];
        _this.subscriptions = [];
        return _this;
    }
    RaceSubscriber.prototype._next = function (observable) {
        this.observables.push(observable);
    };
    RaceSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            for (var i = 0; i < len && !this.hasFirst; i++) {
                var observable = observables[i];
                var subscription = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_subscribeToResult__["a" /* subscribeToResult */])(this, observable, observable, i);
                if (this.subscriptions) {
                    this.subscriptions.push(subscription);
                }
                this.add(subscription);
            }
            this.observables = null;
        }
    };
    RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (!this.hasFirst) {
            this.hasFirst = true;
            for (var i = 0; i < this.subscriptions.length; i++) {
                if (i !== outerIndex) {
                    var subscription = this.subscriptions[i];
                    subscription.unsubscribe();
                    this.remove(subscription);
                }
            }
            this.subscriptions = null;
        }
        this.destination.next(innerValue);
    };
    return RaceSubscriber;
}(__WEBPACK_IMPORTED_MODULE_3__OuterSubscriber__["a" /* OuterSubscriber */]));

//# sourceMappingURL=race.js.map


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* unused harmony export range */
/* unused harmony export dispatch */
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function range(start, count, scheduler) {
    if (start === void 0) {
        start = 0;
    }
    if (count === void 0) {
        count = 0;
    }
    return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
        var index = 0;
        var current = start;
        if (scheduler) {
            return scheduler.schedule(dispatch, 0, {
                index: index, count: count, start: start, subscriber: subscriber
            });
        }
        else {
            do {
                if (index++ >= count) {
                    subscriber.complete();
                    break;
                }
                subscriber.next(current++);
                if (subscriber.closed) {
                    break;
                }
            } while (true);
        }
        return undefined;
    });
}
function dispatch(state) {
    var start = state.start, index = state.index, count = state.count, subscriber = state.subscriber;
    if (index >= count) {
        subscriber.complete();
        return;
    }
    subscriber.next(start);
    if (subscriber.closed) {
        return;
    }
    state.index = index + 1;
    state.start = start + 1;
    this.schedule(state);
}
//# sourceMappingURL=range.js.map


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = scalar;
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function scalar(value) {
    var result = new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
        subscriber.next(value);
        subscriber.complete();
    });
    result._isScalar = true;
    result.value = value;
    return result;
}
//# sourceMappingURL=scalar.js.map


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler_async__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isNumeric__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_isScheduler__ = __webpack_require__(6);
/* unused harmony export timer */
/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */




function timer(dueTime, periodOrScheduler, scheduler) {
    if (dueTime === void 0) {
        dueTime = 0;
    }
    var period = -1;
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isNumeric__["a" /* isNumeric */])(periodOrScheduler)) {
        period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
    }
    else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_isScheduler__["a" /* isScheduler */])(periodOrScheduler)) {
        scheduler = periodOrScheduler;
    }
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util_isScheduler__["a" /* isScheduler */])(scheduler)) {
        scheduler = __WEBPACK_IMPORTED_MODULE_1__scheduler_async__["a" /* async */];
    }
    return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
        var due = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isNumeric__["a" /* isNumeric */])(dueTime)
            ? dueTime
            : (+dueTime - scheduler.now());
        return scheduler.schedule(dispatch, due, {
            index: 0, period: period, subscriber: subscriber
        });
    });
}
function dispatch(state) {
    var index = state.index, period = state.period, subscriber = state.subscriber;
    subscriber.next(index);
    if (subscriber.closed) {
        return;
    }
    else if (period === -1) {
        return subscriber.complete();
    }
    state.index = index + 1;
    this.schedule(state, period);
}
//# sourceMappingURL=timer.js.map


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__from__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__empty__ = __webpack_require__(5);
/* unused harmony export using */
/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */



function using(resourceFactory, observableFactory) {
    return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (subscriber) {
        var resource;
        try {
            resource = resourceFactory();
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
        var result;
        try {
            result = observableFactory(resource);
        }
        catch (err) {
            subscriber.error(err);
            return undefined;
        }
        var source = result ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__from__["a" /* from */])(result) : __WEBPACK_IMPORTED_MODULE_2__empty__["a" /* EMPTY */];
        var subscription = source.subscribe(subscriber);
        return function () {
            subscription.unsubscribe();
            if (resource) {
                resource.unsubscribe();
            }
        };
    });
}
//# sourceMappingURL=using.js.map


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fromArray__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_isArray__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Subscriber__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__OuterSubscriber__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_subscribeToResult__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__internal_symbol_iterator__ = __webpack_require__(17);
/* unused harmony export zip */
/* unused harmony export ZipOperator */
/* unused harmony export ZipSubscriber */
/** PURE_IMPORTS_START tslib,_fromArray,_util_isArray,_Subscriber,_OuterSubscriber,_util_subscribeToResult,_.._internal_symbol_iterator PURE_IMPORTS_END */







function zip() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var resultSelector = observables[observables.length - 1];
    if (typeof resultSelector === 'function') {
        observables.pop();
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__fromArray__["a" /* fromArray */])(observables, undefined).lift(new ZipOperator(resultSelector));
}
var ZipOperator = /*@__PURE__*/ (function () {
    function ZipOperator(resultSelector) {
        this.resultSelector = resultSelector;
    }
    ZipOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ZipSubscriber(subscriber, this.resultSelector));
    };
    return ZipOperator;
}());

var ZipSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](ZipSubscriber, _super);
    function ZipSubscriber(destination, resultSelector, values) {
        if (values === void 0) {
            values = Object.create(null);
        }
        var _this = _super.call(this, destination) || this;
        _this.iterators = [];
        _this.active = 0;
        _this.resultSelector = (typeof resultSelector === 'function') ? resultSelector : null;
        _this.values = values;
        return _this;
    }
    ZipSubscriber.prototype._next = function (value) {
        var iterators = this.iterators;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_isArray__["a" /* isArray */])(value)) {
            iterators.push(new StaticArrayIterator(value));
        }
        else if (typeof value[__WEBPACK_IMPORTED_MODULE_6__internal_symbol_iterator__["a" /* iterator */]] === 'function') {
            iterators.push(new StaticIterator(value[__WEBPACK_IMPORTED_MODULE_6__internal_symbol_iterator__["a" /* iterator */]]()));
        }
        else {
            iterators.push(new ZipBufferIterator(this.destination, this, value));
        }
    };
    ZipSubscriber.prototype._complete = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        if (len === 0) {
            this.destination.complete();
            return;
        }
        this.active = len;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (iterator.stillUnsubscribed) {
                this.add(iterator.subscribe(iterator, i));
            }
            else {
                this.active--;
            }
        }
    };
    ZipSubscriber.prototype.notifyInactive = function () {
        this.active--;
        if (this.active === 0) {
            this.destination.complete();
        }
    };
    ZipSubscriber.prototype.checkIterators = function () {
        var iterators = this.iterators;
        var len = iterators.length;
        var destination = this.destination;
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                return;
            }
        }
        var shouldComplete = false;
        var args = [];
        for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            var result = iterator.next();
            if (iterator.hasCompleted()) {
                shouldComplete = true;
            }
            if (result.done) {
                destination.complete();
                return;
            }
            args.push(result.value);
        }
        if (this.resultSelector) {
            this._tryresultSelector(args);
        }
        else {
            destination.next(args);
        }
        if (shouldComplete) {
            destination.complete();
        }
    };
    ZipSubscriber.prototype._tryresultSelector = function (args) {
        var result;
        try {
            result = this.resultSelector.apply(this, args);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return ZipSubscriber;
}(__WEBPACK_IMPORTED_MODULE_3__Subscriber__["a" /* Subscriber */]));

var StaticIterator = /*@__PURE__*/ (function () {
    function StaticIterator(iterator) {
        this.iterator = iterator;
        this.nextResult = iterator.next();
    }
    StaticIterator.prototype.hasValue = function () {
        return true;
    };
    StaticIterator.prototype.next = function () {
        var result = this.nextResult;
        this.nextResult = this.iterator.next();
        return result;
    };
    StaticIterator.prototype.hasCompleted = function () {
        var nextResult = this.nextResult;
        return nextResult && nextResult.done;
    };
    return StaticIterator;
}());
var StaticArrayIterator = /*@__PURE__*/ (function () {
    function StaticArrayIterator(array) {
        this.array = array;
        this.index = 0;
        this.length = 0;
        this.length = array.length;
    }
    StaticArrayIterator.prototype[__WEBPACK_IMPORTED_MODULE_6__internal_symbol_iterator__["a" /* iterator */]] = function () {
        return this;
    };
    StaticArrayIterator.prototype.next = function (value) {
        var i = this.index++;
        var array = this.array;
        return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
    };
    StaticArrayIterator.prototype.hasValue = function () {
        return this.array.length > this.index;
    };
    StaticArrayIterator.prototype.hasCompleted = function () {
        return this.array.length === this.index;
    };
    return StaticArrayIterator;
}());
var ZipBufferIterator = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](ZipBufferIterator, _super);
    function ZipBufferIterator(destination, parent, observable) {
        var _this = _super.call(this, destination) || this;
        _this.parent = parent;
        _this.observable = observable;
        _this.stillUnsubscribed = true;
        _this.buffer = [];
        _this.isComplete = false;
        return _this;
    }
    ZipBufferIterator.prototype[__WEBPACK_IMPORTED_MODULE_6__internal_symbol_iterator__["a" /* iterator */]] = function () {
        return this;
    };
    ZipBufferIterator.prototype.next = function () {
        var buffer = this.buffer;
        if (buffer.length === 0 && this.isComplete) {
            return { value: null, done: true };
        }
        else {
            return { value: buffer.shift(), done: false };
        }
    };
    ZipBufferIterator.prototype.hasValue = function () {
        return this.buffer.length > 0;
    };
    ZipBufferIterator.prototype.hasCompleted = function () {
        return this.buffer.length === 0 && this.isComplete;
    };
    ZipBufferIterator.prototype.notifyComplete = function () {
        if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
        }
        else {
            this.destination.complete();
        }
    };
    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.buffer.push(innerValue);
        this.parent.checkIterators();
    };
    ZipBufferIterator.prototype.subscribe = function (value, index) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util_subscribeToResult__["a" /* subscribeToResult */])(this, this.observable, this, index);
    };
    return ZipBufferIterator;
}(__WEBPACK_IMPORTED_MODULE_4__OuterSubscriber__["a" /* OuterSubscriber */]));
//# sourceMappingURL=zip.js.map


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mergeAll__ = __webpack_require__(42);
/* harmony export (immutable) */ __webpack_exports__["a"] = concatAll;
/** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */

function concatAll() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__mergeAll__["a" /* mergeAll */])(1);
}
//# sourceMappingURL=concatAll.js.map


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscriber__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Subscription__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Subject__ = __webpack_require__(8);
/* unused harmony export groupBy */
/* unused harmony export GroupedObservable */
/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription,_Observable,_Subject PURE_IMPORTS_END */





function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
    return function (source) {
        return source.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
    };
}
var GroupByOperator = /*@__PURE__*/ (function () {
    function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
    }
    GroupByOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
    };
    return GroupByOperator;
}());
var GroupBySubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](GroupBySubscriber, _super);
    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        var _this = _super.call(this, destination) || this;
        _this.keySelector = keySelector;
        _this.elementSelector = elementSelector;
        _this.durationSelector = durationSelector;
        _this.subjectSelector = subjectSelector;
        _this.groups = null;
        _this.attemptedToUnsubscribe = false;
        _this.count = 0;
        return _this;
    }
    GroupBySubscriber.prototype._next = function (value) {
        var key;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            this.error(err);
            return;
        }
        this._group(value, key);
    };
    GroupBySubscriber.prototype._group = function (value, key) {
        var groups = this.groups;
        if (!groups) {
            groups = this.groups = new Map();
        }
        var group = groups.get(key);
        var element;
        if (this.elementSelector) {
            try {
                element = this.elementSelector(value);
            }
            catch (err) {
                this.error(err);
            }
        }
        else {
            element = value;
        }
        if (!group) {
            group = (this.subjectSelector ? this.subjectSelector() : new __WEBPACK_IMPORTED_MODULE_4__Subject__["a" /* Subject */]());
            groups.set(key, group);
            var groupedObservable = new GroupedObservable(key, group, this);
            this.destination.next(groupedObservable);
            if (this.durationSelector) {
                var duration = void 0;
                try {
                    duration = this.durationSelector(new GroupedObservable(key, group));
                }
                catch (err) {
                    this.error(err);
                    return;
                }
                this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
            }
        }
        if (!group.closed) {
            group.next(element);
        }
    };
    GroupBySubscriber.prototype._error = function (err) {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.error(err);
            });
            groups.clear();
        }
        this.destination.error(err);
    };
    GroupBySubscriber.prototype._complete = function () {
        var groups = this.groups;
        if (groups) {
            groups.forEach(function (group, key) {
                group.complete();
            });
            groups.clear();
        }
        this.destination.complete();
    };
    GroupBySubscriber.prototype.removeGroup = function (key) {
        this.groups.delete(key);
    };
    GroupBySubscriber.prototype.unsubscribe = function () {
        if (!this.closed) {
            this.attemptedToUnsubscribe = true;
            if (this.count === 0) {
                _super.prototype.unsubscribe.call(this);
            }
        }
    };
    return GroupBySubscriber;
}(__WEBPACK_IMPORTED_MODULE_1__Subscriber__["a" /* Subscriber */]));
var GroupDurationSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](GroupDurationSubscriber, _super);
    function GroupDurationSubscriber(key, group, parent) {
        var _this = _super.call(this, group) || this;
        _this.key = key;
        _this.group = group;
        _this.parent = parent;
        return _this;
    }
    GroupDurationSubscriber.prototype._next = function (value) {
        this.complete();
    };
    GroupDurationSubscriber.prototype._unsubscribe = function () {
        var _a = this, parent = _a.parent, key = _a.key;
        this.key = this.parent = null;
        if (parent) {
            parent.removeGroup(key);
        }
    };
    return GroupDurationSubscriber;
}(__WEBPACK_IMPORTED_MODULE_1__Subscriber__["a" /* Subscriber */]));
var GroupedObservable = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](GroupedObservable, _super);
    function GroupedObservable(key, groupSubject, refCountSubscription) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.groupSubject = groupSubject;
        _this.refCountSubscription = refCountSubscription;
        return _this;
    }
    GroupedObservable.prototype._subscribe = function (subscriber) {
        var subscription = new __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */]();
        var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
        if (refCountSubscription && !refCountSubscription.closed) {
            subscription.add(new InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
    };
    return GroupedObservable;
}(__WEBPACK_IMPORTED_MODULE_3__Observable__["a" /* Observable */]));

var InnerRefCountSubscription = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](InnerRefCountSubscription, _super);
    function InnerRefCountSubscription(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        parent.count++;
        return _this;
    }
    InnerRefCountSubscription.prototype.unsubscribe = function () {
        var parent = this.parent;
        if (!parent.closed && !this.closed) {
            _super.prototype.unsubscribe.call(this);
            parent.count -= 1;
            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                parent.unsubscribe();
            }
        }
    };
    return InnerRefCountSubscription;
}(__WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */]));
//# sourceMappingURL=groupBy.js.map


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_subscribeToResult__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__OuterSubscriber__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__InnerSubscriber__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__map__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__observable_from__ = __webpack_require__(9);
/* harmony export (immutable) */ __webpack_exports__["a"] = mergeMap;
/* unused harmony export MergeMapOperator */
/* unused harmony export MergeMapSubscriber */
/** PURE_IMPORTS_START tslib,_util_subscribeToResult,_OuterSubscriber,_InnerSubscriber,_map,_observable_from PURE_IMPORTS_END */






function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'function') {
        return function (source) { return source.pipe(mergeMap(function (a, i) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__observable_from__["a" /* from */])(project(a, i)).pipe(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__map__["a" /* map */])(function (b, ii) { return resultSelector(a, b, i, ii); })); }, concurrent)); };
    }
    else if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
    }
    return function (source) { return source.lift(new MergeMapOperator(project, concurrent)); };
}
var MergeMapOperator = /*@__PURE__*/ (function () {
    function MergeMapOperator(project, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        this.project = project;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
    };
    return MergeMapOperator;
}());

var MergeMapSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, concurrent) {
        if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.concurrent = concurrent;
        _this.hasCompleted = false;
        _this.buffer = [];
        _this.active = 0;
        _this.index = 0;
        return _this;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        var innerSubscriber = new __WEBPACK_IMPORTED_MODULE_3__InnerSubscriber__["a" /* InnerSubscriber */](this, undefined, undefined);
        this.add(innerSubscriber);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_subscribeToResult__["a" /* subscribeToResult */])(this, ish, value, index, innerSubscriber);
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(__WEBPACK_IMPORTED_MODULE_2__OuterSubscriber__["a" /* OuterSubscriber */]));

//# sourceMappingURL=mergeMap.js.map


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscriber__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Notification__ = __webpack_require__(35);
/* unused harmony export observeOn */
/* unused harmony export ObserveOnOperator */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObserveOnSubscriber; });
/* unused harmony export ObserveOnMessage */
/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */



function observeOn(scheduler, delay) {
    if (delay === void 0) {
        delay = 0;
    }
    return function observeOnOperatorFunction(source) {
        return source.lift(new ObserveOnOperator(scheduler, delay));
    };
}
var ObserveOnOperator = /*@__PURE__*/ (function () {
    function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
}());

var ObserveOnSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        var _this = _super.call(this, destination) || this;
        _this.scheduler = scheduler;
        _this.delay = delay;
        return _this;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification, destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(__WEBPACK_IMPORTED_MODULE_2__Notification__["a" /* Notification */].createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(__WEBPACK_IMPORTED_MODULE_2__Notification__["a" /* Notification */].createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(__WEBPACK_IMPORTED_MODULE_2__Notification__["a" /* Notification */].createComplete());
    };
    return ObserveOnSubscriber;
}(__WEBPACK_IMPORTED_MODULE_1__Subscriber__["a" /* Subscriber */]));

var ObserveOnMessage = /*@__PURE__*/ (function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
}());

//# sourceMappingURL=observeOn.js.map


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscriber__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["a"] = refCount;
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function refCount() {
    return function refCountOperatorFunction(source) {
        return source.lift(new RefCountOperator(source));
    };
}
var RefCountOperator = /*@__PURE__*/ (function () {
    function RefCountOperator(connectable) {
        this.connectable = connectable;
    }
    RefCountOperator.prototype.call = function (subscriber, source) {
        var connectable = this.connectable;
        connectable._refCount++;
        var refCounter = new RefCountSubscriber(subscriber, connectable);
        var subscription = source.subscribe(refCounter);
        if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
        }
        return subscription;
    };
    return RefCountOperator;
}());
var RefCountSubscriber = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](RefCountSubscriber, _super);
    function RefCountSubscriber(destination, connectable) {
        var _this = _super.call(this, destination) || this;
        _this.connectable = connectable;
        return _this;
    }
    RefCountSubscriber.prototype._unsubscribe = function () {
        var connectable = this.connectable;
        if (!connectable) {
            this.connection = null;
            return;
        }
        this.connectable = null;
        var refCount = connectable._refCount;
        if (refCount <= 0) {
            this.connection = null;
            return;
        }
        connectable._refCount = refCount - 1;
        if (refCount > 1) {
            this.connection = null;
            return;
        }
        var connection = this.connection;
        var sharedConnection = connectable._connection;
        this.connection = null;
        if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
        }
    };
    return RefCountSubscriber;
}(__WEBPACK_IMPORTED_MODULE_1__Subscriber__["a" /* Subscriber */]));
//# sourceMappingURL=refCount.js.map


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Subscription__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Action; });
/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */


var Action = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](Action, _super);
    function Action(scheduler, work) {
        return _super.call(this) || this;
    }
    Action.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return this;
    };
    return Action;
}(__WEBPACK_IMPORTED_MODULE_1__Subscription__["a" /* Subscription */]));

//# sourceMappingURL=Action.js.map


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AsyncAction__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationFrameAction; });
/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */


var AnimationFrameAction = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](AnimationFrameAction, _super);
    function AnimationFrameAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () { return scheduler.flush(null); }));
    };
    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            cancelAnimationFrame(id);
            scheduler.scheduled = undefined;
        }
        return undefined;
    };
    return AnimationFrameAction;
}(__WEBPACK_IMPORTED_MODULE_1__AsyncAction__["a" /* AsyncAction */]));

//# sourceMappingURL=AnimationFrameAction.js.map


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AsyncScheduler__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationFrameScheduler; });
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */


var AnimationFrameScheduler = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](AnimationFrameScheduler, _super);
    function AnimationFrameScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AnimationFrameScheduler;
}(__WEBPACK_IMPORTED_MODULE_1__AsyncScheduler__["a" /* AsyncScheduler */]));

//# sourceMappingURL=AnimationFrameScheduler.js.map


/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_Immediate__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AsyncAction__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsapAction; });
/** PURE_IMPORTS_START tslib,_util_Immediate,_AsyncAction PURE_IMPORTS_END */



var AsapAction = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](AsapAction, _super);
    function AsapAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler.scheduled || (scheduler.scheduled = __WEBPACK_IMPORTED_MODULE_1__util_Immediate__["a" /* Immediate */].setImmediate(scheduler.flush.bind(scheduler, null)));
    };
    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        if (scheduler.actions.length === 0) {
            __WEBPACK_IMPORTED_MODULE_1__util_Immediate__["a" /* Immediate */].clearImmediate(id);
            scheduler.scheduled = undefined;
        }
        return undefined;
    };
    return AsapAction;
}(__WEBPACK_IMPORTED_MODULE_2__AsyncAction__["a" /* AsyncAction */]));

//# sourceMappingURL=AsapAction.js.map


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AsyncScheduler__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsapScheduler; });
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */


var AsapScheduler = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](AsapScheduler, _super);
    function AsapScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsapScheduler.prototype.flush = function (action) {
        this.active = true;
        this.scheduled = undefined;
        var actions = this.actions;
        var error;
        var index = -1;
        var count = actions.length;
        action = action || actions.shift();
        do {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    return AsapScheduler;
}(__WEBPACK_IMPORTED_MODULE_1__AsyncScheduler__["a" /* AsyncScheduler */]));

//# sourceMappingURL=AsapScheduler.js.map


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AsyncAction__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueueAction; });
/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */


var QueueAction = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](QueueAction, _super);
    function QueueAction(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
    }
    QueueAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    };
    QueueAction.prototype.execute = function (state, delay) {
        return (delay > 0 || this.closed) ?
            _super.prototype.execute.call(this, state, delay) :
            this._execute(state, delay);
    };
    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        return scheduler.flush(this);
    };
    return QueueAction;
}(__WEBPACK_IMPORTED_MODULE_1__AsyncAction__["a" /* AsyncAction */]));

//# sourceMappingURL=QueueAction.js.map


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AsyncScheduler__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueueScheduler; });
/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */


var QueueScheduler = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](QueueScheduler, _super);
    function QueueScheduler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueueScheduler;
}(__WEBPACK_IMPORTED_MODULE_1__AsyncScheduler__["a" /* AsyncScheduler */]));

//# sourceMappingURL=QueueScheduler.js.map


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AsyncAction__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AsyncScheduler__ = __webpack_require__(16);
/* unused harmony export VirtualTimeScheduler */
/* unused harmony export VirtualAction */
/** PURE_IMPORTS_START tslib,_AsyncAction,_AsyncScheduler PURE_IMPORTS_END */



var VirtualTimeScheduler = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](VirtualTimeScheduler, _super);
    function VirtualTimeScheduler(SchedulerAction, maxFrames) {
        if (SchedulerAction === void 0) {
            SchedulerAction = VirtualAction;
        }
        if (maxFrames === void 0) {
            maxFrames = Number.POSITIVE_INFINITY;
        }
        var _this = _super.call(this, SchedulerAction, function () { return _this.frame; }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
    }
    VirtualTimeScheduler.prototype.flush = function () {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error, action;
        while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        }
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    };
    VirtualTimeScheduler.frameTimeFactor = 10;
    return VirtualTimeScheduler;
}(__WEBPACK_IMPORTED_MODULE_2__AsyncScheduler__["a" /* AsyncScheduler */]));

var VirtualAction = /*@__PURE__*/ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](VirtualAction, _super);
    function VirtualAction(scheduler, work, index) {
        if (index === void 0) {
            index = scheduler.index += 1;
        }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
    }
    VirtualAction.prototype.schedule = function (state, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        if (!this.id) {
            return _super.prototype.schedule.call(this, state, delay);
        }
        this.active = false;
        var action = new VirtualAction(this.scheduler, this.work);
        this.add(action);
        return action.schedule(state, delay);
    };
    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
    };
    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
        if (delay === void 0) {
            delay = 0;
        }
        return undefined;
    };
    VirtualAction.prototype._execute = function (state, delay) {
        if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
        }
    };
    VirtualAction.sortActions = function (a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (a.delay > b.delay) {
            return 1;
        }
        else {
            return -1;
        }
    };
    return VirtualAction;
}(__WEBPACK_IMPORTED_MODULE_1__AsyncAction__["a" /* AsyncAction */]));

//# sourceMappingURL=VirtualTimeScheduler.js.map


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AnimationFrameAction__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AnimationFrameScheduler__ = __webpack_require__(95);
/* unused harmony export animationFrame */
/** PURE_IMPORTS_START _AnimationFrameAction,_AnimationFrameScheduler PURE_IMPORTS_END */


var animationFrame = /*@__PURE__*/ new __WEBPACK_IMPORTED_MODULE_1__AnimationFrameScheduler__["a" /* AnimationFrameScheduler */](__WEBPACK_IMPORTED_MODULE_0__AnimationFrameAction__["a" /* AnimationFrameAction */]);
//# sourceMappingURL=animationFrame.js.map


/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AsapAction__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AsapScheduler__ = __webpack_require__(97);
/* unused harmony export asap */
/** PURE_IMPORTS_START _AsapAction,_AsapScheduler PURE_IMPORTS_END */


var asap = /*@__PURE__*/ new __WEBPACK_IMPORTED_MODULE_1__AsapScheduler__["a" /* AsapScheduler */](__WEBPACK_IMPORTED_MODULE_0__AsapAction__["a" /* AsapAction */]);
//# sourceMappingURL=asap.js.map


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ArgumentOutOfRangeError */
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function ArgumentOutOfRangeErrorImpl() {
    Error.call(this);
    this.message = 'argument out of range';
    this.name = 'ArgumentOutOfRangeError';
    return this;
}
ArgumentOutOfRangeErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
var ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;
//# sourceMappingURL=ArgumentOutOfRangeError.js.map


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EmptyError */
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function EmptyErrorImpl() {
    Error.call(this);
    this.message = 'no elements in sequence';
    this.name = 'EmptyError';
    return this;
}
EmptyErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
var EmptyError = EmptyErrorImpl;
//# sourceMappingURL=EmptyError.js.map


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Immediate; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var nextHandle = 1;
var tasksByHandle = {};
function runIfPresent(handle) {
    var cb = tasksByHandle[handle];
    if (cb) {
        cb();
    }
}
var Immediate = {
    setImmediate: function (cb) {
        var handle = nextHandle++;
        tasksByHandle[handle] = cb;
        Promise.resolve().then(function () { return runIfPresent(handle); });
        return handle;
    },
    clearImmediate: function (handle) {
        delete tasksByHandle[handle];
    },
};
//# sourceMappingURL=Immediate.js.map


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TimeoutError */
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function TimeoutErrorImpl() {
    Error.call(this);
    this.message = 'Timeout has occurred';
    this.name = 'TimeoutError';
    return this;
}
TimeoutErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
var TimeoutError = TimeoutErrorImpl;
//# sourceMappingURL=TimeoutError.js.map


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__symbol_observable__ = __webpack_require__(12);
/* harmony export (immutable) */ __webpack_exports__["a"] = isInteropObservable;
/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

function isInteropObservable(input) {
    return input && typeof input[__WEBPACK_IMPORTED_MODULE_0__symbol_observable__["a" /* observable */]] === 'function';
}
//# sourceMappingURL=isInteropObservable.js.map


/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__symbol_iterator__ = __webpack_require__(17);
/* harmony export (immutable) */ __webpack_exports__["a"] = isIterable;
/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

function isIterable(input) {
    return input && typeof input[__WEBPACK_IMPORTED_MODULE_0__symbol_iterator__["a" /* iterator */]] === 'function';
}
//# sourceMappingURL=isIterable.js.map


/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* unused harmony export isObservable */
/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

function isObservable(obj) {
    return !!obj && (obj instanceof __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */] || (typeof obj.lift === 'function' && typeof obj.subscribe === 'function'));
}
//# sourceMappingURL=isObservable.js.map


/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscriber__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__symbol_rxSubscriber__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Observer__ = __webpack_require__(36);
/* harmony export (immutable) */ __webpack_exports__["a"] = toSubscriber;
/** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */



function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof __WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */]) {
            return nextOrObserver;
        }
        if (nextOrObserver[__WEBPACK_IMPORTED_MODULE_1__symbol_rxSubscriber__["a" /* rxSubscriber */]]) {
            return nextOrObserver[__WEBPACK_IMPORTED_MODULE_1__symbol_rxSubscriber__["a" /* rxSubscriber */]]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new __WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */](__WEBPACK_IMPORTED_MODULE_2__Observer__["a" /* empty */]);
    }
    return new __WEBPACK_IMPORTED_MODULE_0__Subscriber__["a" /* Subscriber */](nextOrObserver, error, complete);
}
//# sourceMappingURL=toSubscriber.js.map


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__errorObject__ = __webpack_require__(45);
/* harmony export (immutable) */ __webpack_exports__["a"] = tryCatch;
/** PURE_IMPORTS_START _errorObject PURE_IMPORTS_END */

var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        __WEBPACK_IMPORTED_MODULE_0__errorObject__["a" /* errorObject */].e = e;
        return __WEBPACK_IMPORTED_MODULE_0__errorObject__["a" /* errorObject */];
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
//# sourceMappingURL=tryCatch.js.map


/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_112__;

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_113__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjOTg2N2JmYmM1N2RlZTIyMTcwNiIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3RzbGliL3RzbGliLmVzNi5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvU3Vic2NyaXB0aW9uLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9TdWJzY3JpYmVyLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL2lzQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvZW1wdHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvaXNTY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGFuZ3VsYXIvaHR0cFwiIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9TdWJqZWN0LmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb20uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvZnJvbUFycmF5LmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvbWFwLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zeW1ib2wvb2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVzb3VyY2UudHMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL091dGVyU3Vic2NyaWJlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL0FzeW5jQWN0aW9uLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvQXN5bmNTY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL3N5bWJvbC9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVzb3VyY2VBY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9pc0Z1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9SZXNvdXJjZUdsb2JhbENvbmZpZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVzb3VyY2VQcm92aWRlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL0FzeW5jU3ViamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9vZi5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL2FzeW5jLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zeW1ib2wvcnhTdWJzY3JpYmVyLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL2hvc3RSZXBvcnRFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9ub29wLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBhbmd1bGFyL2NvcmVcIiIsIndlYnBhY2s6Ly8vLi9zcmMvUmVzb3VyY2VQYXJhbXMudHMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL0lubmVyU3Vic2NyaWJlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvTm90aWZpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9PYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvU2NoZWR1bGVyLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9TdWJqZWN0U3Vic2NyaXB0aW9uLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2RlZmVyLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL25ldmVyLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL3Rocm93RXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL29wZXJhdG9ycy9tZXJnZUFsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL3F1ZXVlLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvZXJyb3JPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvaXNBcnJheUxpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvaXNOdW1lcmljLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL2lzT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL2lzUHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9waXBlLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL3N1YnNjcmliZVRvLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL3N1YnNjcmliZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvc3Vic2NyaWJlVG9JdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9zdWJzY3JpYmVUb09ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvc3Vic2NyaWJlVG9Qcm9taXNlLmpzIiwid2VicGFjazovLy8uL2luZGV4LnRzIiwid2VicGFjazovLy8uL25neC1yZXNvdXJjZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVzb3VyY2VDUlVELnRzIiwid2VicGFjazovLy8uL3NyYy9SZXNvdXJjZUNSVURCYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9SZXNvdXJjZU1vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9SZXNvdXJjZU9EQVRBLnRzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvQmVoYXZpb3JTdWJqZWN0LmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9SZXBsYXlTdWJqZWN0LmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL0Nvbm5lY3RhYmxlT2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9iaW5kQ2FsbGJhY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvYmluZE5vZGVDYWxsYmFjay5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0LmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2NvbmNhdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mb3JrSm9pbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tRXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvZnJvbUV2ZW50UGF0dGVybi5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tSXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvZnJvbU9ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvZnJvbVByb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvZ2VuZXJhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvaWlmLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2ludGVydmFsLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL21lcmdlLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL29uRXJyb3JSZXN1bWVOZXh0LmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL3BhaXJzLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL3JhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvcmFuZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvc2NhbGFyLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL3RpbWVyLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL3VzaW5nLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL3ppcC5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL2NvbmNhdEFsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL2dyb3VwQnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL29wZXJhdG9ycy9tZXJnZU1hcC5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL29ic2VydmVPbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL3JlZkNvdW50LmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvQWN0aW9uLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvQW5pbWF0aW9uRnJhbWVBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL3NjaGVkdWxlci9BbmltYXRpb25GcmFtZVNjaGVkdWxlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL0FzYXBBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL3NjaGVkdWxlci9Bc2FwU2NoZWR1bGVyLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvUXVldWVBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL3NjaGVkdWxlci9RdWV1ZVNjaGVkdWxlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL1ZpcnR1YWxUaW1lU2NoZWR1bGVyLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvYW5pbWF0aW9uRnJhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL3NjaGVkdWxlci9hc2FwLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL0VtcHR5RXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvSW1tZWRpYXRlLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL1RpbWVvdXRFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9pc0ludGVyb3BPYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL2lzSXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvaXNPYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8uL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL3RvU3Vic2NyaWJlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC90cnlDYXRjaC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYW5ndWxhci9jb21tb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyeGpzL29wZXJhdG9yc1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQUE7QUFDdUI7QUFDbUI7QUFDbEI7QUFDUDtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ087QUFDUjtBQUNBLCtDQUErQyxnSkFBNkUsRUFBRTtBQUM5SDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbklBO0FBQUE7QUFDQTtBQUNxQjtBQUNZO0FBQ1Y7QUFDc0I7QUFDNUI7QUFDUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkhBQTRELGFBQWE7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDTztBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsNkNBQTZDO0FBQ2hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNPO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDNVBBO0FBQUE7QUFDQSw4Q0FBcUQsMENBQTBDLEVBQUU7QUFDakc7Ozs7Ozs7Ozs7O0FDRkE7QUFBQTtBQUNxQjtBQUNyQixxSEFBdUUsOEJBQThCLEVBQUU7QUFDdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzR0FBaUQsd0NBQXdDLDhCQUE4QixFQUFFLEVBQUUsRUFBRTtBQUM3SDtBQUNBOzs7Ozs7OztBQ1RBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBLCtDOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUNBO0FBQ3FCO0FBQ0E7QUFDRTtBQUNXO0FBQ0o7QUFDZTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNPO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNPO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNPO0FBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdKQTtBQUFBO0FBQ3FCO0FBQ0Q7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7QUN2TkE7QUFBQTtBQUNtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUFBO0FBQ0E7QUFDcUI7QUFDRTtBQUNGO0FBQ0g7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDTztBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7O0FDckxBO0FBQUE7QUFDQTtBQUM0QjtBQUNGO0FBQ0E7QUFDWjtBQUNDO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyw4Q0FBOEMsNk1BQXVELG9DQUFvQyxFQUFFLEdBQUcsRUFBRSxlQUFlO0FBQ2pNO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLCtEQUErRDtBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDTztBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ087QUFDUjs7Ozs7Ozs7Ozs7Ozs7QUNqR0E7QUFBQTtBQUNBO0FBQ3FCO0FBQ0U7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDTztBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ087QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ087QUFDUjs7Ozs7Ozs7OztBQ2pFQTtBQUFBO0FBQ0E7QUFDcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7O0FDekRBO0FBQUE7QUFDQTtBQUN1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ087QUFDUjs7Ozs7Ozs7OztBQ2pCQTtBQUFBO0FBQ0E7QUFDc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDVEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNUQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLDZCQUE2QixFQUFFO0FBQzNFO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7QUNwQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDVEE7QUFBQTtBQUMwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDTEE7QUFBQTtBQUNzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDTEE7QUFBQTtBQUNxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNMQTtBQUFBO0FBQ3FCO0FBQ3dCO0FBQ1o7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNsQkE7QUFBQTtBQUNzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoQkEsaUQ7Ozs7OztBQ0FBLGlEIiwiZmlsZSI6Im5neC1yZXNvdXJjZS51bWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJAYW5ndWxhci9odHRwXCIpLCByZXF1aXJlKFwiQGFuZ3VsYXIvY29yZVwiKSwgcmVxdWlyZShcIkBhbmd1bGFyL2NvbW1vblwiKSwgcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcIkBhbmd1bGFyL2h0dHBcIiwgXCJAYW5ndWxhci9jb3JlXCIsIFwiQGFuZ3VsYXIvY29tbW9uXCIsIFwicnhqcy9vcGVyYXRvcnNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibmd4LXJlc291cmNlXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiQGFuZ3VsYXIvaHR0cFwiKSwgcmVxdWlyZShcIkBhbmd1bGFyL2NvcmVcIiksIHJlcXVpcmUoXCJAYW5ndWxhci9jb21tb25cIiksIHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibmd4LXJlc291cmNlXCJdID0gZmFjdG9yeShyb290W1wiQGFuZ3VsYXIvaHR0cFwiXSwgcm9vdFtcIkBhbmd1bGFyL2NvcmVcIl0sIHJvb3RbXCJAYW5ndWxhci9jb21tb25cIl0sIHJvb3RbXCJyeGpzL29wZXJhdG9yc1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzExMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzExM19fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1Nyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzk4NjdiZmJjNTdkZWUyMjE3MDYiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF91dGlsX3RvU3Vic2NyaWJlcixfaW50ZXJuYWxfc3ltYm9sX29ic2VydmFibGUsX3V0aWxfcGlwZSxfY29uZmlnIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IHRvU3Vic2NyaWJlciB9IGZyb20gJy4vdXRpbC90b1N1YnNjcmliZXInO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4uL2ludGVybmFsL3N5bWJvbC9vYnNlcnZhYmxlJztcbmltcG9ydCB7IHBpcGVGcm9tQXJyYXkgfSBmcm9tICcuL3V0aWwvcGlwZSc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG52YXIgT2JzZXJ2YWJsZSA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKHN1YnNjcmliZSkge1xuICAgICAgICB0aGlzLl9pc1NjYWxhciA9IGZhbHNlO1xuICAgICAgICBpZiAoc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgb2JzZXJ2YWJsZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBvcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XG4gICAgICAgIHZhciBzaW5rID0gdG9TdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBpZiAob3BlcmF0b3IpIHtcbiAgICAgICAgICAgIG9wZXJhdG9yLmNhbGwoc2luaywgdGhpcy5zb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2luay5fYWRkUGFyZW50VGVhcmRvd25Mb2dpYyh0aGlzLnNvdXJjZSB8fCAoY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcgJiYgIXNpbmsuc3luY0Vycm9yVGhyb3dhYmxlKSA/XG4gICAgICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlKHNpbmspIDpcbiAgICAgICAgICAgICAgICB0aGlzLl90cnlTdWJzY3JpYmUoc2luaykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZykge1xuICAgICAgICAgICAgaWYgKHNpbmsuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgc2luay5zeW5jRXJyb3JUaHJvd2FibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgc2luay5zeW5jRXJyb3JWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNpbms7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5fdHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gKHNpbmspIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJzY3JpYmUoc2luayk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgICAgICAgICAgc2luay5zeW5jRXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVmFsdWUgPSBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaW5rLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAobmV4dCwgcHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcik7XG4gICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IF90aGlzLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCByZWplY3QsIHJlc29sdmUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgc291cmNlID0gdGhpcy5zb3VyY2U7XG4gICAgICAgIHJldHVybiBzb3VyY2UgJiYgc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlW1N5bWJvbF9vYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3BlcmF0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgb3BlcmF0aW9uc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcGVyYXRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBpcGVGcm9tQXJyYXkob3BlcmF0aW9ucykodGhpcyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS50b1Byb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcik7XG4gICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh4KSB7IHJldHVybiB2YWx1ZSA9IHg7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHJlamVjdChlcnIpOyB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiByZXNvbHZlKHZhbHVlKTsgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5jcmVhdGUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlKSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmUpO1xuICAgIH07XG4gICAgcmV0dXJuIE9ic2VydmFibGU7XG59KCkpO1xuZXhwb3J0IHsgT2JzZXJ2YWJsZSB9O1xuZnVuY3Rpb24gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpIHtcbiAgICBpZiAoIXByb21pc2VDdG9yKSB7XG4gICAgICAgIHByb21pc2VDdG9yID0gY29uZmlnLlByb21pc2UgfHwgUHJvbWlzZTtcbiAgICB9XG4gICAgaWYgKCFwcm9taXNlQ3Rvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIFByb21pc2UgaW1wbCBmb3VuZCcpO1xuICAgIH1cbiAgICByZXR1cm4gcHJvbWlzZUN0b3I7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvT2JzZXJ2YWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi90c2xpYi90c2xpYi5lczYuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfdXRpbF9pc0FycmF5LF91dGlsX2lzT2JqZWN0LF91dGlsX2lzRnVuY3Rpb24sX3V0aWxfdHJ5Q2F0Y2gsX3V0aWxfZXJyb3JPYmplY3QsX3V0aWxfVW5zdWJzY3JpcHRpb25FcnJvciBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuL3V0aWwvaXNPYmplY3QnO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSAnLi91dGlsL3RyeUNhdGNoJztcbmltcG9ydCB7IGVycm9yT2JqZWN0IH0gZnJvbSAnLi91dGlsL2Vycm9yT2JqZWN0JztcbmltcG9ydCB7IFVuc3Vic2NyaXB0aW9uRXJyb3IgfSBmcm9tICcuL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvcic7XG52YXIgU3Vic2NyaXB0aW9uID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN1YnNjcmlwdGlvbih1bnN1YnNjcmliZSkge1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJlbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IG51bGw7XG4gICAgICAgIGlmICh1bnN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmUgPSB1bnN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaGFzRXJyb3JzID0gZmFsc2U7XG4gICAgICAgIHZhciBlcnJvcnM7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIF9wYXJlbnQgPSBfYS5fcGFyZW50LCBfcGFyZW50cyA9IF9hLl9wYXJlbnRzLCBfdW5zdWJzY3JpYmUgPSBfYS5fdW5zdWJzY3JpYmUsIF9zdWJzY3JpcHRpb25zID0gX2EuX3N1YnNjcmlwdGlvbnM7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFyZW50cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBudWxsO1xuICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgdmFyIGxlbiA9IF9wYXJlbnRzID8gX3BhcmVudHMubGVuZ3RoIDogMDtcbiAgICAgICAgd2hpbGUgKF9wYXJlbnQpIHtcbiAgICAgICAgICAgIF9wYXJlbnQucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgX3BhcmVudCA9ICsraW5kZXggPCBsZW4gJiYgX3BhcmVudHNbaW5kZXhdIHx8IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24oX3Vuc3Vic2NyaWJlKSkge1xuICAgICAgICAgICAgdmFyIHRyaWFsID0gdHJ5Q2F0Y2goX3Vuc3Vic2NyaWJlKS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRyaWFsID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzIHx8IChlcnJvck9iamVjdC5lIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvciA/XG4gICAgICAgICAgICAgICAgICAgIGZsYXR0ZW5VbnN1YnNjcmlwdGlvbkVycm9ycyhlcnJvck9iamVjdC5lLmVycm9ycykgOiBbZXJyb3JPYmplY3QuZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5KF9zdWJzY3JpcHRpb25zKSkge1xuICAgICAgICAgICAgaW5kZXggPSAtMTtcbiAgICAgICAgICAgIGxlbiA9IF9zdWJzY3JpcHRpb25zLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1YiA9IF9zdWJzY3JpcHRpb25zW2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3Qoc3ViKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJpYWwgPSB0cnlDYXRjaChzdWIudW5zdWJzY3JpYmUpLmNhbGwoc3ViKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyaWFsID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnIgPSBlcnJvck9iamVjdC5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KGZsYXR0ZW5VbnN1YnNjcmlwdGlvbkVycm9ycyhlcnIuZXJyb3JzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNFcnJvcnMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBVbnN1YnNjcmlwdGlvbkVycm9yKGVycm9ycyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHRlYXJkb3duKSB7XG4gICAgICAgIGlmICghdGVhcmRvd24gfHwgKHRlYXJkb3duID09PSBTdWJzY3JpcHRpb24uRU1QVFkpKSB7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZWFyZG93biA9PT0gdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRlYXJkb3duO1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB0ZWFyZG93bikge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24odGVhcmRvd24pO1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uLmNsb3NlZCB8fCB0eXBlb2Ygc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygc3Vic2NyaXB0aW9uLl9hZGRQYXJlbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uX3N1YnNjcmlwdGlvbnMgPSBbdG1wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5yZWNvZ25pemVkIHRlYXJkb3duICcgKyB0ZWFyZG93biArICcgYWRkZWQgdG8gU3Vic2NyaXB0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaXB0aW9ucyB8fCAodGhpcy5fc3Vic2NyaXB0aW9ucyA9IFtdKTtcbiAgICAgICAgc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIHN1YnNjcmlwdGlvbi5fYWRkUGFyZW50KHRoaXMpO1xuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaXB0aW9ucztcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb25JbmRleCA9IHN1YnNjcmlwdGlvbnMuaW5kZXhPZihzdWJzY3JpcHRpb24pO1xuICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbnMuc3BsaWNlKHN1YnNjcmlwdGlvbkluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5fYWRkUGFyZW50ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB2YXIgX2EgPSB0aGlzLCBfcGFyZW50ID0gX2EuX3BhcmVudCwgX3BhcmVudHMgPSBfYS5fcGFyZW50cztcbiAgICAgICAgaWYgKCFfcGFyZW50IHx8IF9wYXJlbnQgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFfcGFyZW50cykge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50cyA9IFtwYXJlbnRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKF9wYXJlbnRzLmluZGV4T2YocGFyZW50KSA9PT0gLTEpIHtcbiAgICAgICAgICAgIF9wYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLkVNUFRZID0gKGZ1bmN0aW9uIChlbXB0eSkge1xuICAgICAgICBlbXB0eS5jbG9zZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZW1wdHk7XG4gICAgfShuZXcgU3Vic2NyaXB0aW9uKCkpKTtcbiAgICByZXR1cm4gU3Vic2NyaXB0aW9uO1xufSgpKTtcbmV4cG9ydCB7IFN1YnNjcmlwdGlvbiB9O1xuZnVuY3Rpb24gZmxhdHRlblVuc3Vic2NyaXB0aW9uRXJyb3JzKGVycm9ycykge1xuICAgIHJldHVybiBlcnJvcnMucmVkdWNlKGZ1bmN0aW9uIChlcnJzLCBlcnIpIHsgcmV0dXJuIGVycnMuY29uY2F0KChlcnIgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yKSA/IGVyci5lcnJvcnMgOiBlcnIpOyB9LCBbXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpcHRpb24uanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9TdWJzY3JpcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCB0c2xpYixfdXRpbF9pc0Z1bmN0aW9uLF9PYnNlcnZlcixfU3Vic2NyaXB0aW9uLF9pbnRlcm5hbF9zeW1ib2xfcnhTdWJzY3JpYmVyLF9jb25maWcsX3V0aWxfaG9zdFJlcG9ydEVycm9yIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgZW1wdHkgYXMgZW1wdHlPYnNlcnZlciB9IGZyb20gJy4vT2JzZXJ2ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgcnhTdWJzY3JpYmVyIGFzIHJ4U3Vic2NyaWJlclN5bWJvbCB9IGZyb20gJy4uL2ludGVybmFsL3N5bWJvbC9yeFN1YnNjcmliZXInO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgaG9zdFJlcG9ydEVycm9yIH0gZnJvbSAnLi91dGlsL2hvc3RSZXBvcnRFcnJvcic7XG52YXIgU3Vic2NyaWJlciA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YnNjcmliZXIoZGVzdGluYXRpb25Pck5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zeW5jRXJyb3JWYWx1ZSA9IG51bGw7XG4gICAgICAgIF90aGlzLnN5bmNFcnJvclRocm93biA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5zeW5jRXJyb3JUaHJvd2FibGUgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLl9wYXJlbnRTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IGVtcHR5T2JzZXJ2ZXI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgaWYgKCFkZXN0aW5hdGlvbk9yTmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IGVtcHR5T2JzZXJ2ZXI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRlc3RpbmF0aW9uT3JOZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUcnVzdGVkU3Vic2NyaWJlcihkZXN0aW5hdGlvbk9yTmV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cnVzdGVkU3Vic2NyaWJlciA9IGRlc3RpbmF0aW9uT3JOZXh0W3J4U3Vic2NyaWJlclN5bWJvbF0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IHRydXN0ZWRTdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRlc3RpbmF0aW9uID0gdHJ1c3RlZFN1YnNjcmliZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnVzdGVkU3Vic2NyaWJlci5fYWRkUGFyZW50VGVhcmRvd25Mb2dpYyhfdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zeW5jRXJyb3JUaHJvd2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBuZXcgU2FmZVN1YnNjcmliZXIoX3RoaXMsIGRlc3RpbmF0aW9uT3JOZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIF90aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBuZXcgU2FmZVN1YnNjcmliZXIoX3RoaXMsIGRlc3RpbmF0aW9uT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGVbcnhTdWJzY3JpYmVyU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG4gICAgU3Vic2NyaWJlci5jcmVhdGUgPSBmdW5jdGlvbiAobmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0gbmV3IFN1YnNjcmliZXIobmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgc3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX25leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlUGFyZW50U3Vic2NyaXB0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9jb21wbGV0ZSgpO1xuICAgICAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVQYXJlbnRTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX2FkZFBhcmVudFRlYXJkb3duTG9naWMgPSBmdW5jdGlvbiAocGFyZW50VGVhcmRvd25Mb2dpYykge1xuICAgICAgICBpZiAocGFyZW50VGVhcmRvd25Mb2dpYyAhPT0gdGhpcykge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uID0gdGhpcy5hZGQocGFyZW50VGVhcmRvd25Mb2dpYyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl91bnN1YnNjcmliZVBhcmVudFN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl91bnN1YnNjcmliZUFuZFJlY3ljbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIF9wYXJlbnQgPSBfYS5fcGFyZW50LCBfcGFyZW50cyA9IF9hLl9wYXJlbnRzO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJlbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBfcGFyZW50O1xuICAgICAgICB0aGlzLl9wYXJlbnRzID0gX3BhcmVudHM7XG4gICAgICAgIHRoaXMuX3BhcmVudFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIFN1YnNjcmliZXI7XG59KFN1YnNjcmlwdGlvbikpO1xuZXhwb3J0IHsgU3Vic2NyaWJlciB9O1xudmFyIFNhZmVTdWJzY3JpYmVyID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKFNhZmVTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNhZmVTdWJzY3JpYmVyKF9wYXJlbnRTdWJzY3JpYmVyLCBvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9wYXJlbnRTdWJzY3JpYmVyID0gX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgIHZhciBuZXh0O1xuICAgICAgICB2YXIgY29udGV4dCA9IF90aGlzO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihvYnNlcnZlck9yTmV4dCkpIHtcbiAgICAgICAgICAgIG5leHQgPSBvYnNlcnZlck9yTmV4dDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvYnNlcnZlck9yTmV4dCkge1xuICAgICAgICAgICAgbmV4dCA9IG9ic2VydmVyT3JOZXh0Lm5leHQ7XG4gICAgICAgICAgICBlcnJvciA9IG9ic2VydmVyT3JOZXh0LmVycm9yO1xuICAgICAgICAgICAgY29tcGxldGUgPSBvYnNlcnZlck9yTmV4dC5jb21wbGV0ZTtcbiAgICAgICAgICAgIGlmIChvYnNlcnZlck9yTmV4dCAhPT0gZW1wdHlPYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBPYmplY3QuY3JlYXRlKG9ic2VydmVyT3JOZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0LnVuc3Vic2NyaWJlKSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hZGQoY29udGV4dC51bnN1YnNjcmliZS5iaW5kKGNvbnRleHQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGV4dC51bnN1YnNjcmliZSA9IF90aGlzLnVuc3Vic2NyaWJlLmJpbmQoX3RoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLl9jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgX3RoaXMuX25leHQgPSBuZXh0O1xuICAgICAgICBfdGhpcy5fZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgX3RoaXMuX2NvbXBsZXRlID0gY29tcGxldGU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCAmJiB0aGlzLl9uZXh0KSB7XG4gICAgICAgICAgICB2YXIgX3BhcmVudFN1YnNjcmliZXIgPSB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICAgICAgaWYgKCFjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZyB8fCAhX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIodGhpcy5fbmV4dCwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudFN1YnNjcmliZXIsIHRoaXMuX25leHQsIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB2YXIgX3BhcmVudFN1YnNjcmliZXIgPSB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICAgICAgdmFyIHVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcgPSBjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZztcbiAgICAgICAgICAgIGlmICh0aGlzLl9lcnJvcikge1xuICAgICAgICAgICAgICAgIGlmICghdXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZyB8fCAhX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclVuc3ViKHRoaXMuX2Vycm9yLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JTZXRFcnJvcihfcGFyZW50U3Vic2NyaWJlciwgdGhpcy5fZXJyb3IsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIGlmICh1c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaG9zdFJlcG9ydEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZykge1xuICAgICAgICAgICAgICAgICAgICBfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgICAgICAgICAgICAgICAgX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhvc3RSZXBvcnRFcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdmFyIF9wYXJlbnRTdWJzY3JpYmVyID0gdGhpcy5fcGFyZW50U3Vic2NyaWJlcjtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIHZhciB3cmFwcGVkQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fY29tcGxldGUuY2FsbChfdGhpcy5fY29udGV4dCk7IH07XG4gICAgICAgICAgICAgICAgaWYgKCFjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZyB8fCAhX3BhcmVudFN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclVuc3ViKHdyYXBwZWRDb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclNldEVycm9yKF9wYXJlbnRTdWJzY3JpYmVyLCB3cmFwcGVkQ29tcGxldGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuX190cnlPclVuc3ViID0gZnVuY3Rpb24gKGZuLCB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLl9jb250ZXh0LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaG9zdFJlcG9ydEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5fX3RyeU9yU2V0RXJyb3IgPSBmdW5jdGlvbiAocGFyZW50LCBmbiwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCFjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYWQgY2FsbCcpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMuX2NvbnRleHQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQuc3luY0Vycm9yVmFsdWUgPSBlcnI7XG4gICAgICAgICAgICAgICAgcGFyZW50LnN5bmNFcnJvclRocm93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBob3N0UmVwb3J0RXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuX3Vuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3BhcmVudFN1YnNjcmliZXIgPSB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGFyZW50U3Vic2NyaWJlciA9IG51bGw7XG4gICAgICAgIF9wYXJlbnRTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gU2FmZVN1YnNjcmliZXI7XG59KFN1YnNjcmliZXIpKTtcbmV4cG9ydCB7IFNhZmVTdWJzY3JpYmVyIH07XG5mdW5jdGlvbiBpc1RydXN0ZWRTdWJzY3JpYmVyKG9iaikge1xuICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBTdWJzY3JpYmVyIHx8ICgnX2FkZFBhcmVudFRlYXJkb3duTG9naWMnIGluIG9iaiAmJiBvYmpbcnhTdWJzY3JpYmVyU3ltYm9sXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpYmVyLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvU3Vic2NyaWJlci5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUICBQVVJFX0lNUE9SVFNfRU5EICovXG5leHBvcnQgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IChmdW5jdGlvbiAoeCkgeyByZXR1cm4geCAmJiB0eXBlb2YgeC5sZW5ndGggPT09ICdudW1iZXInOyB9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzQXJyYXkuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL2lzQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfT2JzZXJ2YWJsZSBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5leHBvcnQgdmFyIEVNUFRZID0gLypAX19QVVJFX18qLyBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9KTtcbmV4cG9ydCBmdW5jdGlvbiBlbXB0eShzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVyID8gZW1wdHlTY2hlZHVsZWQoc2NoZWR1bGVyKSA6IEVNUFRZO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5U2NoZWR1bGVkKHNjaGVkdWxlcikge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikgeyByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuY29tcGxldGUoKTsgfSk7IH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW1wdHkuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2VtcHR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NjaGVkdWxlcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUuc2NoZWR1bGUgPT09ICdmdW5jdGlvbic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc1NjaGVkdWxlci5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvaXNTY2hlZHVsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkBhbmd1bGFyL2h0dHBcIlxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIHRzbGliLF9PYnNlcnZhYmxlLF9TdWJzY3JpYmVyLF9TdWJzY3JpcHRpb24sX3V0aWxfT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IsX1N1YmplY3RTdWJzY3JpcHRpb24sX2ludGVybmFsX3N5bWJvbF9yeFN1YnNjcmliZXIgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBPYmplY3RVbnN1YnNjcmliZWRFcnJvciB9IGZyb20gJy4vdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG5pbXBvcnQgeyBTdWJqZWN0U3Vic2NyaXB0aW9uIH0gZnJvbSAnLi9TdWJqZWN0U3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IHJ4U3Vic2NyaWJlciBhcyByeFN1YnNjcmliZXJTeW1ib2wgfSBmcm9tICcuLi9pbnRlcm5hbC9zeW1ib2wvcnhTdWJzY3JpYmVyJztcbnZhciBTdWJqZWN0U3Vic2NyaWJlciA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhTdWJqZWN0U3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJqZWN0U3Vic2NyaWJlcihkZXN0aW5hdGlvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU3ViamVjdFN1YnNjcmliZXI7XG59KFN1YnNjcmliZXIpKTtcbmV4cG9ydCB7IFN1YmplY3RTdWJzY3JpYmVyIH07XG52YXIgU3ViamVjdCA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YmplY3QoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm9ic2VydmVycyA9IFtdO1xuICAgICAgICBfdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmhhc0Vycm9yID0gZmFsc2U7XG4gICAgICAgIF90aGlzLnRocm93bkVycm9yID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTdWJqZWN0LnByb3RvdHlwZVtyeFN1YnNjcmliZXJTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFN1YmplY3RTdWJzY3JpYmVyKHRoaXMpO1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgc3ViamVjdCA9IG5ldyBBbm9ueW1vdXNTdWJqZWN0KHRoaXMsIHRoaXMpO1xuICAgICAgICBzdWJqZWN0Lm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHJldHVybiBzdWJqZWN0O1xuICAgIH07XG4gICAgU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycztcbiAgICAgICAgICAgIHZhciBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNvcHkgPSBvYnNlcnZlcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb3B5W2ldLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50aHJvd25FcnJvciA9IGVycjtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnM7XG4gICAgICAgIHZhciBsZW4gPSBvYnNlcnZlcnMubGVuZ3RoO1xuICAgICAgICB2YXIgY29weSA9IG9ic2VydmVycy5zbGljZSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb3B5W2ldLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vYnNlcnZlcnMubGVuZ3RoID0gMDtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzO1xuICAgICAgICB2YXIgbGVuID0gb2JzZXJ2ZXJzLmxlbmd0aDtcbiAgICAgICAgdmFyIGNvcHkgPSBvYnNlcnZlcnMuc2xpY2UoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29weVtpXS5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gbnVsbDtcbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLl90cnlTdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuX3RyeVN1YnNjcmliZS5jYWxsKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmhhc0Vycm9yKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKHRoaXMudGhyb3duRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFN1YmplY3RTdWJzY3JpcHRpb24odGhpcywgc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YmplY3QucHJvdG90eXBlLmFzT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnNvdXJjZSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gICAgU3ViamVjdC5jcmVhdGUgPSBmdW5jdGlvbiAoZGVzdGluYXRpb24sIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gbmV3IEFub255bW91c1N1YmplY3QoZGVzdGluYXRpb24sIHNvdXJjZSk7XG4gICAgfTtcbiAgICByZXR1cm4gU3ViamVjdDtcbn0oT2JzZXJ2YWJsZSkpO1xuZXhwb3J0IHsgU3ViamVjdCB9O1xudmFyIEFub255bW91c1N1YmplY3QgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoQW5vbnltb3VzU3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBbm9ueW1vdXNTdWJqZWN0KGRlc3RpbmF0aW9uLCBzb3VyY2UpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgX3RoaXMuc291cmNlID0gc291cmNlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uICYmIGRlc3RpbmF0aW9uLm5leHQpIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBbm9ueW1vdXNTdWJqZWN0LnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uICYmIGRlc3RpbmF0aW9uLmVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFub255bW91c1N1YmplY3QucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgICAgICBpZiAoZGVzdGluYXRpb24gJiYgZGVzdGluYXRpb24uY29tcGxldGUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5vbnltb3VzU3ViamVjdC5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSB0aGlzLnNvdXJjZTtcbiAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBbm9ueW1vdXNTdWJqZWN0O1xufShTdWJqZWN0KSk7XG5leHBvcnQgeyBBbm9ueW1vdXNTdWJqZWN0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJqZWN0LmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvU3ViamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9PYnNlcnZhYmxlLF91dGlsX2lzUHJvbWlzZSxfdXRpbF9pc0FycmF5TGlrZSxfdXRpbF9pc0ludGVyb3BPYnNlcnZhYmxlLF91dGlsX2lzSXRlcmFibGUsX2Zyb21BcnJheSxfZnJvbVByb21pc2UsX2Zyb21JdGVyYWJsZSxfZnJvbU9ic2VydmFibGUsX3V0aWxfc3Vic2NyaWJlVG8gUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNQcm9taXNlIH0gZnJvbSAnLi4vdXRpbC9pc1Byb21pc2UnO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICcuLi91dGlsL2lzQXJyYXlMaWtlJztcbmltcG9ydCB7IGlzSW50ZXJvcE9ic2VydmFibGUgfSBmcm9tICcuLi91dGlsL2lzSW50ZXJvcE9ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNJdGVyYWJsZSB9IGZyb20gJy4uL3V0aWwvaXNJdGVyYWJsZSc7XG5pbXBvcnQgeyBmcm9tQXJyYXkgfSBmcm9tICcuL2Zyb21BcnJheSc7XG5pbXBvcnQgeyBmcm9tUHJvbWlzZSB9IGZyb20gJy4vZnJvbVByb21pc2UnO1xuaW1wb3J0IHsgZnJvbUl0ZXJhYmxlIH0gZnJvbSAnLi9mcm9tSXRlcmFibGUnO1xuaW1wb3J0IHsgZnJvbU9ic2VydmFibGUgfSBmcm9tICcuL2Zyb21PYnNlcnZhYmxlJztcbmltcG9ydCB7IHN1YnNjcmliZVRvIH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUbyc7XG5leHBvcnQgZnVuY3Rpb24gZnJvbShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKCFzY2hlZHVsZXIpIHtcbiAgICAgICAgaWYgKGlucHV0IGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmVUbyhpbnB1dCkpO1xuICAgIH1cbiAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNJbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tT2JzZXJ2YWJsZShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc1Byb21pc2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbVByb21pc2UoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNBcnJheUxpa2UoaW5wdXQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJvbUFycmF5KGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzSXRlcmFibGUoaW5wdXQpIHx8IHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigoaW5wdXQgIT09IG51bGwgJiYgdHlwZW9mIGlucHV0IHx8IGlucHV0KSArICcgaXMgbm90IG9ic2VydmFibGUnKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb20uanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfT2JzZXJ2YWJsZSxfU3Vic2NyaXB0aW9uLF91dGlsX3N1YnNjcmliZVRvQXJyYXkgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IHN1YnNjcmliZVRvQXJyYXkgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvQXJyYXknO1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21BcnJheShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKCFzY2hlZHVsZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZVRvQXJyYXkoaW5wdXQpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgdmFyIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIHN1Yi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoaW5wdXRbaSsrXSk7XG4gICAgICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWIuYWRkKHRoaXMuc2NoZWR1bGUoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIHN1YjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbUFycmF5LmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9mcm9tQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgdHNsaWIsX1N1YnNjcmliZXIgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiBtYXAocHJvamVjdCwgdGhpc0FyZykge1xuICAgIHJldHVybiBmdW5jdGlvbiBtYXBPcGVyYXRpb24oc291cmNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvamVjdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgaXMgbm90IGEgZnVuY3Rpb24uIEFyZSB5b3UgbG9va2luZyBmb3IgYG1hcFRvKClgPycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb3VyY2UubGlmdChuZXcgTWFwT3BlcmF0b3IocHJvamVjdCwgdGhpc0FyZykpO1xuICAgIH07XG59XG52YXIgTWFwT3BlcmF0b3IgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFwT3BlcmF0b3IocHJvamVjdCwgdGhpc0FyZykge1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnO1xuICAgIH1cbiAgICBNYXBPcGVyYXRvci5wcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyLCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IE1hcFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5wcm9qZWN0LCB0aGlzLnRoaXNBcmcpKTtcbiAgICB9O1xuICAgIHJldHVybiBNYXBPcGVyYXRvcjtcbn0oKSk7XG5leHBvcnQgeyBNYXBPcGVyYXRvciB9O1xudmFyIE1hcFN1YnNjcmliZXIgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoTWFwU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBNYXBTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBwcm9qZWN0LCB0aGlzQXJnKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgX3RoaXMuY291bnQgPSAwO1xuICAgICAgICBfdGhpcy50aGlzQXJnID0gdGhpc0FyZyB8fCBfdGhpcztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBNYXBTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5wcm9qZWN0LmNhbGwodGhpcy50aGlzQXJnLCB2YWx1ZSwgdGhpcy5jb3VudCsrKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHJlc3VsdCk7XG4gICAgfTtcbiAgICByZXR1cm4gTWFwU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL21hcC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCAgUFVSRV9JTVBPUlRTX0VORCAqL1xuZXhwb3J0IHZhciBvYnNlcnZhYmxlID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wub2JzZXJ2YWJsZSB8fCAnQEBvYnNlcnZhYmxlJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zeW1ib2wvb2JzZXJ2YWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSGVhZGVycywgSHR0cCwgUmVxdWVzdCwgUmVxdWVzdE1ldGhvZCwgUmVzcG9uc2UsIFVSTFNlYXJjaFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgUmVxdWVzdEFyZ3MgfSBmcm9tICdAYW5ndWxhci9odHRwL3NyYy9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbm5lY3RhYmxlT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZSwgU3Vic2NyaWJlciwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFJlc291cmNlR2xvYmFsQ29uZmlnLCBUR2V0UGFyYW1zTWFwcGluZ1R5cGUgfSBmcm9tICcuL1Jlc291cmNlR2xvYmFsQ29uZmlnJztcbmltcG9ydCB7IFJlc291cmNlTW9kZWwgfSBmcm9tICcuL1Jlc291cmNlTW9kZWwnO1xuaW1wb3J0IHtcbiAgUmVzb3VyY2VBY3Rpb25CYXNlLFxuICBSZXNvdXJjZVBhcmFtc0Jhc2UsXG4gIFJlc291cmNlUmVzcG9uc2VGaWx0ZXIsXG4gIFJlc291cmNlUmVzcG9uc2VJbml0UmVzdWx0LFxuICBSZXNvdXJjZVJlc3BvbnNlTWFwLFxuICBSZXNvdXJjZVJlc3VsdFxufSBmcm9tICcuL0ludGVyZmFjZXMnO1xuaW1wb3J0IHsgZmxhdE1hcCwgbWFwLCBwdWJsaXNoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZSB7XG5cbiAgc3RhdGljICRjbGVhbkRhdGFGaWVsZHM6IHN0cmluZ1tdID0gW1xuICAgICckY2xlYW5EYXRhRmllbGRzJyxcbiAgICAnJHJlc29sdmVkJyxcbiAgICAnJG9ic2VydmFibGUnLFxuICAgICckYWJvcnRSZXF1ZXN0JyxcbiAgICAnJHJlc291cmNlJ1xuICBdO1xuXG4gIHByaXZhdGUgJHVybDogc3RyaW5nID0gbnVsbDtcbiAgcHJpdmF0ZSAkcGF0aDogc3RyaW5nID0gbnVsbDtcbiAgcHJpdmF0ZSAkaGVhZGVyczogYW55ID0gbnVsbDtcbiAgcHJpdmF0ZSAkcGFyYW1zOiBhbnkgPSBudWxsO1xuICBwcml2YXRlICRkYXRhOiBhbnkgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwKSB7XG4gIH1cblxuICBzdGF0aWMgJGNsZWFuRGF0YShvYmo6IFJlc291cmNlUmVzdWx0PGFueT4pOiBhbnkge1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNsZWFuRGF0YUFycmF5KG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLiRjbGVhbkRhdGFPYmplY3Qob2JqKTtcbiAgICB9XG5cbiAgfVxuXG4gIHN0YXRpYyAkY2xlYW5EYXRhQXJyYXkob2JqOiBhbnlbXSk6IGFueVtdIHtcbiAgICBmb3IgKGxldCBwcm9wTmFtZSBpbiBvYmopIHtcblxuICAgICAgaWYgKHR5cGVvZiBvYmpbcHJvcE5hbWVdID09PSAnZnVuY3Rpb24nIHx8IHRoaXMuJGNsZWFuRGF0YUZpZWxkcy5pbmRleE9mKHByb3BOYW1lKSA+IC0xKSB7XG4gICAgICAgIGRlbGV0ZSBvYmpbcHJvcE5hbWVdO1xuICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBzdGF0aWMgJGNsZWFuRGF0YU9iamVjdChvYmo6IFJlc291cmNlUmVzdWx0PGFueT4pOiBhbnkge1xuICAgIGNvbnN0IGNsZWFuZWRPYmo6IGFueSA9IHt9O1xuXG4gICAgZm9yIChsZXQgcHJvcE5hbWUgaW4gb2JqKSB7XG5cbiAgICAgIGlmICh0eXBlb2Ygb2JqW3Byb3BOYW1lXSAhPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLiRjbGVhbkRhdGFGaWVsZHMuaW5kZXhPZihwcm9wTmFtZSkgPT09IC0xKSB7XG4gICAgICAgIGNsZWFuZWRPYmpbcHJvcE5hbWVdID0gb2JqW3Byb3BOYW1lXTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBjbGVhbmVkT2JqO1xuICB9XG5cblxuICAvKipcbiAgICogR2V0IG1haW4gdXJsIG9mIHRoZSByZXNvdXJjZVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfFByb21pc2U8c3RyaW5nPn1cbiAgICovXG4gICRnZXRVcmwobWV0aG9kT3B0aW9ucz86IFJlc291cmNlQWN0aW9uQmFzZSk6IHN0cmluZyB8IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuJHVybCB8fCB0aGlzLiRfZ2V0VXJsKG1ldGhvZE9wdGlvbnMpIHx8IFJlc291cmNlR2xvYmFsQ29uZmlnLnVybCB8fCAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgcmVzb3VyY2UgdXJsXG4gICAqIEBwYXJhbSB1cmxcbiAgICovXG4gICRzZXRVcmwodXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLiR1cmwgPSB1cmw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHBhdGggb2YgdGhlIHJlc291cmNlXG4gICAqIEByZXR1cm5zIHtzdHJpbmd8UHJvbWlzZTxzdHJpbmc+fVxuICAgKi9cbiAgJGdldFBhdGgobWV0aG9kT3B0aW9ucz86IFJlc291cmNlQWN0aW9uQmFzZSk6IHN0cmluZyB8IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuJHBhdGggfHwgdGhpcy4kX2dldFBhdGgobWV0aG9kT3B0aW9ucykgfHwgUmVzb3VyY2VHbG9iYWxDb25maWcucGF0aCB8fCAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgcmVzb3VyY2UgcGF0aFxuICAgKiBAcGFyYW0gcGF0aFxuICAgKi9cbiAgJHNldFBhdGgocGF0aDogc3RyaW5nKSB7XG4gICAgdGhpcy4kcGF0aCA9IHBhdGg7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGhlYWRlcnNcbiAgICogQHJldHVybnMge2FueXxQcm9taXNlPGFueT59XG4gICAqL1xuICAkZ2V0SGVhZGVycyhtZXRob2RPcHRpb25zPzogUmVzb3VyY2VBY3Rpb25CYXNlKTogYW55IHwgUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy4kaGVhZGVycyB8fCB0aGlzLiRfZ2V0SGVhZGVycyhtZXRob2RPcHRpb25zKSB8fCBSZXNvdXJjZUdsb2JhbENvbmZpZy5oZWFkZXJzIHx8IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCByZXNvdXJjZSBoZWFkZXJzXG4gICAqIEBwYXJhbSBoZWFkZXJzXG4gICAqL1xuICAkc2V0SGVhZGVycyhoZWFkZXJzOiBhbnkpIHtcbiAgICB0aGlzLiRoZWFkZXJzID0gaGVhZGVycztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGVmYXVsdCBwYXJhbXNcbiAgICogQHJldHVybnMge2FueXxQcm9taXNlPGFueT58e319XG4gICAqL1xuICAkZ2V0UGFyYW1zKG1ldGhvZE9wdGlvbnM/OiBSZXNvdXJjZUFjdGlvbkJhc2UpOiBhbnkgfCBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLiRwYXJhbXMgfHwgdGhpcy4kX2dldFBhcmFtcyhtZXRob2RPcHRpb25zKSB8fCBSZXNvdXJjZUdsb2JhbENvbmZpZy5wYXJhbXMgfHwge307XG4gIH1cblxuICAvKipcbiAgICogU2V0IGRlZmF1bHQgcmVzb3VyY2UgcGFyYW1zXG4gICAqIEBwYXJhbSBwYXJhbXNcbiAgICovXG4gICRzZXRQYXJhbXMocGFyYW1zOiBhbnkpIHtcbiAgICB0aGlzLiRwYXJhbXMgPSBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRlZmF1bHQgZGF0YVxuICAgKiBAcmV0dXJucyB7YW55fFByb21pc2U8YW55Pnx7fX1cbiAgICovXG4gICRnZXREYXRhKG1ldGhvZE9wdGlvbnM/OiBSZXNvdXJjZUFjdGlvbkJhc2UpOiBhbnkgfCBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLiRkYXRhIHx8IHRoaXMuJF9nZXREYXRhKG1ldGhvZE9wdGlvbnMpIHx8IFJlc291cmNlR2xvYmFsQ29uZmlnLmRhdGEgfHwge307XG4gIH1cblxuICAvKipcbiAgICogU2V0IGRlZmF1bHQgcmVzb3VyY2UgcGFyYW1zXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqL1xuICAkc2V0RGF0YShkYXRhOiBhbnkpIHtcbiAgICB0aGlzLiRkYXRhID0gZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIG1vZGVsXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9XG4gICAqL1xuICAkY3JlYXRlTW9kZWwoKTogUmVzb3VyY2VNb2RlbDxhbnk+IHtcbiAgICBsZXQgcmV0ID0gdGhpcy4kaW5pdFJlc3VsdE9iamVjdCgpO1xuICAgIHJldC4kcmVzb3VyY2UgPSB0aGlzO1xuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvKipcbiAgICogQm9keSBzZXJpYWxpemVyXG4gICAqXG4gICAqIEBwYXJhbSBib2R5XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICAkYm9keVNlcmlhbGl6ZXIoYm9keTogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBUaGF0IGlzIGNhbGxlZCBiZWZvcmUgZXhlY3V0aW5nIHJlcXVlc3RcbiAgICogQHBhcmFtIHJlcVxuICAgKi9cbiAgcHJvdGVjdGVkICRyZXF1ZXN0SW50ZXJjZXB0b3IocmVxOiBSZXF1ZXN0LCBtZXRob2RPcHRpb25zPzogUmVzb3VyY2VBY3Rpb25CYXNlKTogUmVxdWVzdCB7XG4gICAgcmV0dXJuIHJlcTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXF1ZXN0IG9ic2VydmFibGUgaW50ZXJjZXB0b3JcbiAgICogQHBhcmFtIG9ic2VydmFibGVcbiAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICovXG4gIHByb3RlY3RlZCAkcmVzcG9uc2VJbnRlcmNlcHRvcihvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPGFueT4sIHJlcTogUmVxdWVzdCwgbWV0aG9kT3B0aW9ucz86IFJlc291cmNlQWN0aW9uQmFzZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUucGlwZShtYXAocmVzID0+IHJlcy5fYm9keSA/IHJlcy5qc29uKCkgOiBudWxsKSk7XG4gIH1cblxuICAvLyByZW1vdmVUcmFpbGluZ1NsYXNoKCk6IGJvb2xlYW4ge1xuICAvLyAgIHJldHVybiB0cnVlO1xuICAvLyB9XG5cbiAgcHJvdGVjdGVkICRpbml0UmVzdWx0T2JqZWN0KG1ldGhvZE9wdGlvbnM6IFJlc291cmNlQWN0aW9uQmFzZSA9IG51bGwpOiBhbnkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHByb3RlY3RlZCAkbWFwKGl0ZW06IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cblxuICBwcm90ZWN0ZWQgJGZpbHRlcihpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByb3RlY3RlZCAkZ2V0UmVzb3VyY2VPcHRpb25zKCk6IFJlc291cmNlUGFyYW1zQmFzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgJHJlcXVlc3QocmVxOiBSZXF1ZXN0LCBtZXRob2RPcHRpb25zOiBSZXNvdXJjZUFjdGlvbkJhc2UgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICBsZXQgcmVxdWVzdE9ic2VydmFibGUgPSB0aGlzLmh0dHAucmVxdWVzdChyZXEpO1xuXG4gICAgLy8gbm9pbnNwZWN0aW9uIFR5cGVTY3JpcHRWYWxpZGF0ZVR5cGVzXG4gICAgcmV0dXJuIG1ldGhvZE9wdGlvbnMucmVzcG9uc2VJbnRlcmNlcHRvciA/XG4gICAgICBtZXRob2RPcHRpb25zLnJlc3BvbnNlSW50ZXJjZXB0b3IocmVxdWVzdE9ic2VydmFibGUsIHJlcSwgbWV0aG9kT3B0aW9ucykgOlxuICAgICAgdGhpcy4kcmVzcG9uc2VJbnRlcmNlcHRvcihyZXF1ZXN0T2JzZXJ2YWJsZSwgcmVxLCBtZXRob2RPcHRpb25zKTtcblxuICB9XG5cbiAgcHJvdGVjdGVkICRyZXNvdXJjZUFjdGlvbihkYXRhOiBhbnksIHBhcmFtczogYW55LCBjYWxsYmFjazogKCkgPT4gYW55LCBvbkVycm9yOiAocmVzOiBSZXNwb25zZSkgPT4gYW55LCBtZXRob2RPcHRpb25zOiBSZXNvdXJjZUFjdGlvbkJhc2UpOiBSZXNvdXJjZVJlc3VsdDxhbnk+IHwgUmVzb3VyY2VNb2RlbDxSZXNvdXJjZT4gfCBQcm9taXNlPGFueT4ge1xuXG4gICAgdGhpcy4kX3NldEdsb2JhbHNUb09wdGlvbnMobWV0aG9kT3B0aW9ucyk7XG5cbiAgICBpZiAobWV0aG9kT3B0aW9ucy50b09ic2VydmFibGUgJiYgbWV0aG9kT3B0aW9ucy5pc0xhenkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbWV0aG9kT3B0aW9ucy5pc0xhenkgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHNoZWxsOiBJUmVzb3VyY2VBY3Rpb25TaGVsbCA9IDxJUmVzb3VyY2VBY3Rpb25TaGVsbD57XG4gICAgICByZXR1cm5JbnRlcm5hbDogdGhpcy4kX2NyZWF0ZVJldHVybkRhdGEoZGF0YSwgbWV0aG9kT3B0aW9ucyksXG4gICAgICBkYXRhLFxuICAgICAgcGFyYW1zLFxuICAgICAgb3B0aW9uczogbWV0aG9kT3B0aW9ucyxcbiAgICAgIGNhbGxiYWNrLFxuICAgICAgb25FcnJvclxuICAgIH07XG5cbiAgICBzaGVsbC5yZXR1cm5FeHRlcm5hbCA9IG1ldGhvZE9wdGlvbnMubGVhbiA/IHRoaXMuJF9jcmVhdGVSZXR1cm5EYXRhKGRhdGEsIG1ldGhvZE9wdGlvbnMpIDogc2hlbGwucmV0dXJuSW50ZXJuYWw7XG5cbiAgICB0aGlzLiRfY2xlYW5EYXRhKHNoZWxsKTtcbiAgICB0aGlzLiRfZmlsbEludGVybmFsKHNoZWxsKTtcblxuICAgIHRoaXMuJF9tYWluUmVxdWVzdChzaGVsbCk7XG5cblxuICAgIGNvbnN0ICRvYnNlcnZhYmxlID0gbWV0aG9kT3B0aW9ucy5sZWFuID8gc2hlbGwucmV0dXJuSW50ZXJuYWwuJG9ic2VydmFibGUgOiBzaGVsbC5yZXR1cm5FeHRlcm5hbC4kb2JzZXJ2YWJsZTtcblxuICAgIGlmIChtZXRob2RPcHRpb25zLnRvT2JzZXJ2YWJsZSkge1xuICAgICAgcmV0dXJuICRvYnNlcnZhYmxlO1xuICAgIH1cblxuICAgIGlmIChtZXRob2RPcHRpb25zLnRvUHJvbWlzZSkge1xuICAgICAgcmV0dXJuICRvYnNlcnZhYmxlLnRvUHJvbWlzZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBzaGVsbC5yZXR1cm5FeHRlcm5hbDtcblxuICB9XG5cbiAgcHJpdmF0ZSAkX2NyZWF0ZVJldHVybkRhdGEoZGF0YTogYW55LCBtZXRob2RPcHRpb25zOiBSZXNvdXJjZUFjdGlvbkJhc2UpOiBSZXNvdXJjZVJlc3VsdDxhbnk+IHwgUmVzb3VyY2VNb2RlbDxSZXNvdXJjZT4ge1xuXG4gICAgaWYgKG1ldGhvZE9wdGlvbnMuaXNMYXp5KSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgaWYgKG1ldGhvZE9wdGlvbnMuaXNBcnJheSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGlmIChtZXRob2RPcHRpb25zLmxlYW4gfHwgIWRhdGEgfHwgZGF0YS4kcmVzb3VyY2UgIT09IHRoaXMpIHtcbiAgICAgIHJldHVybiB0aGlzLiRfaW5pdFJlc3VsdE9iamVjdChtZXRob2RPcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcblxuICB9XG5cbiAgcHJpdmF0ZSAkX2luaXRSZXN1bHRPYmplY3QobWV0aG9kT3B0aW9uczogUmVzb3VyY2VBY3Rpb25CYXNlKTogUmVzb3VyY2VSZXNwb25zZUluaXRSZXN1bHQge1xuICAgIHJldHVybiBtZXRob2RPcHRpb25zLmluaXRSZXN1bHRPYmplY3QgPyBtZXRob2RPcHRpb25zLmluaXRSZXN1bHRPYmplY3QoKSA6IHRoaXMuJGluaXRSZXN1bHRPYmplY3QobWV0aG9kT3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlICRfbWFwKG1ldGhvZE9wdGlvbnM6IFJlc291cmNlQWN0aW9uQmFzZSk6IFJlc291cmNlUmVzcG9uc2VNYXAge1xuICAgIHJldHVybiBtZXRob2RPcHRpb25zLm1hcCA/IG1ldGhvZE9wdGlvbnMubWFwIDogdGhpcy4kbWFwO1xuICB9XG5cbiAgcHJpdmF0ZSAkX2ZpbHRlcihtZXRob2RPcHRpb25zOiBSZXNvdXJjZUFjdGlvbkJhc2UpOiBSZXNvdXJjZVJlc3BvbnNlRmlsdGVyIHtcbiAgICByZXR1cm4gbWV0aG9kT3B0aW9ucy5maWx0ZXIgPyBtZXRob2RPcHRpb25zLmZpbHRlciA6IHRoaXMuJGZpbHRlcjtcbiAgfVxuXG4gIHByaXZhdGUgJF9jbGVhbkRhdGEoc2hlbGw6IElSZXNvdXJjZUFjdGlvblNoZWxsKSB7XG5cbiAgICBpZiAoc2hlbGwuZGF0YSAmJiAhc2hlbGwub3B0aW9ucy5za2lwRGF0YUNsZWFuaW5nKSB7XG4gICAgICBzaGVsbC5kYXRhID0gc2hlbGwuZGF0YS50b0pTT04gPyBzaGVsbC5kYXRhLnRvSlNPTigpIDogUmVzb3VyY2UuJGNsZWFuRGF0YShzaGVsbC5kYXRhKTtcbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgJF9maWxsSW50ZXJuYWwoc2hlbGw6IElSZXNvdXJjZUFjdGlvblNoZWxsKSB7XG5cbiAgICBjb25zdCByZXR1cm5JbnRlcm5hbCA9IHNoZWxsLnJldHVybkludGVybmFsO1xuXG4gICAgbGV0ICRvYnNlcnZhYmxlID0gT2JzZXJ2YWJsZS5jcmVhdGUoKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8YW55PikgPT4ge1xuICAgICAgc2hlbGwubWFpbkRlZmVycmVkU3Vic2NyaWJlciA9IHN1YnNjcmliZXI7XG4gICAgfSkucGlwZShmbGF0TWFwKCgpID0+IHNoZWxsLm1haW5PYnNlcnZhYmxlKSk7XG5cblxuICAgIGNvbnN0ICRhYm9ydFJlcXVlc3QgPSAoKSA9PiB7XG4gICAgICByZXR1cm5JbnRlcm5hbC4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICBpZiAoIXNoZWxsLm9wdGlvbnMuaXNMYXp5KSB7XG4gICAgICAkb2JzZXJ2YWJsZSA9ICRvYnNlcnZhYmxlLnBpcGUocHVibGlzaCgpKTtcbiAgICAgICg8Q29ubmVjdGFibGVPYnNlcnZhYmxlPGFueT4+JG9ic2VydmFibGUpLmNvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmV0dXJuSW50ZXJuYWwsICckcmVzb2x2ZWQnLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmV0dXJuSW50ZXJuYWwsICckb2JzZXJ2YWJsZScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogJG9ic2VydmFibGVcbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXR1cm5JbnRlcm5hbCwgJyRhYm9ydFJlcXVlc3QnLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6ICRhYm9ydFJlcXVlc3RcbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXR1cm5JbnRlcm5hbCwgJyRyZXNvdXJjZScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogdGhpc1xuICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlICRfbWFpblJlcXVlc3Qoc2hlbGw6IElSZXNvdXJjZUFjdGlvblNoZWxsKSB7XG5cbiAgICB0aGlzLiRfcmVzb2x2ZU1haW5PcHRpb25zKHNoZWxsKVxuICAgICAgLnRoZW4oKGV4dHJhT3B0aW9uczogSVJlc291cmNlQWN0aW9uTWFpbk9wdGlvbnMpID0+IHtcblxuICAgICAgICBzaGVsbC5leHRyYU9wdGlvbnMgPSBleHRyYU9wdGlvbnM7XG5cbiAgICAgICAgaWYgKHNoZWxsLnJldHVybkludGVybmFsLiRyZXNvbHZlZCkge1xuICAgICAgICAgIHNoZWxsLm1haW5PYnNlcnZhYmxlID0gT2JzZXJ2YWJsZS5jcmVhdGUoKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8YW55PikgPT4ge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KG51bGwpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy4kX3JlbGVhc2VNYWluRGVmZXJyZWRTdWJzY3JpYmVyKHNoZWxsKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzaGVsbC51cmwgPSBleHRyYU9wdGlvbnMudXJsICsgZXh0cmFPcHRpb25zLnBhdGg7XG5cbiAgICAgICAgdGhpcy4kX3ByZXBhcmVEYXRhUGFyYW1zKHNoZWxsKTtcbiAgICAgICAgdGhpcy4kX3ByZXBhcmVCb2R5KHNoZWxsKTtcbiAgICAgICAgdGhpcy4kX3ByZXBhcmVTZWFyY2goc2hlbGwpO1xuICAgICAgICB0aGlzLiRfY3JlYXRlUmVxdWVzdE9wdGlvbnMoc2hlbGwpO1xuXG4gICAgICAgIGxldCBtYWluUmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHNoZWxsLnJlcXVlc3RPcHRpb25zKTtcblxuICAgICAgICBtYWluUmVxdWVzdCA9IHNoZWxsLm9wdGlvbnMucmVxdWVzdEludGVyY2VwdG9yID9cbiAgICAgICAgICBzaGVsbC5vcHRpb25zLnJlcXVlc3RJbnRlcmNlcHRvcihtYWluUmVxdWVzdCwgc2hlbGwub3B0aW9ucykgOlxuICAgICAgICAgIHRoaXMuJHJlcXVlc3RJbnRlcmNlcHRvcihtYWluUmVxdWVzdCwgc2hlbGwub3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKCFtYWluUmVxdWVzdCkge1xuICAgICAgICAgIHNoZWxsLm1haW5PYnNlcnZhYmxlID0gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBFcnJvcignUmVxdWVzdCBpcyBudWxsJykpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc29sZS53YXJuKCdSZXF1ZXN0IGlzIG51bGwnKTtcblxuICAgICAgICAgIHRoaXMuJF9yZWxlYXNlTWFpbkRlZmVycmVkU3Vic2NyaWJlcihzaGVsbCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRG9pbmcgdGhlIHJlcXVlc3RcbiAgICAgICAgY29uc3QgcmVxdWVzdE9ic2VydmFibGUgPSB0aGlzLiRyZXF1ZXN0KG1haW5SZXF1ZXN0LCBzaGVsbC5vcHRpb25zKTtcblxuICAgICAgICBzaGVsbC5tYWluT2JzZXJ2YWJsZSA9IHNoZWxsLm9wdGlvbnMuaXNMYXp5ID8gcmVxdWVzdE9ic2VydmFibGUgOiB0aGlzLiRfY3JlYXRlTWFpbk9ic2VydmFibGUoc2hlbGwsIHJlcXVlc3RPYnNlcnZhYmxlKTtcblxuICAgICAgICB0aGlzLiRfcmVsZWFzZU1haW5EZWZlcnJlZFN1YnNjcmliZXIoc2hlbGwpO1xuXG4gICAgICB9KTtcblxuICB9XG5cbiAgcHJpdmF0ZSAkX3Jlc29sdmVNYWluT3B0aW9ucyhzaGVsbDogSVJlc291cmNlQWN0aW9uU2hlbGwpOiBQcm9taXNlPElSZXNvdXJjZUFjdGlvbk1haW5PcHRpb25zPiB7XG4gICAgcmV0dXJuIFByb21pc2VcbiAgICAgIC5hbGwoW1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoc2hlbGwub3B0aW9ucy51cmwgfHwgdGhpcy4kZ2V0VXJsKHNoZWxsLm9wdGlvbnMpKSxcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHNoZWxsLm9wdGlvbnMucGF0aCB8fCB0aGlzLiRnZXRQYXRoKHNoZWxsLm9wdGlvbnMpKSxcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHNoZWxsLm9wdGlvbnMuaGVhZGVycyB8fCB0aGlzLiRnZXRIZWFkZXJzKHNoZWxsLm9wdGlvbnMpKSxcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHNoZWxsLm9wdGlvbnMucGFyYW1zIHx8IHRoaXMuJGdldFBhcmFtcyhzaGVsbC5vcHRpb25zKSksXG4gICAgICAgIFByb21pc2UucmVzb2x2ZShzaGVsbC5vcHRpb25zLmRhdGEgfHwgdGhpcy4kZ2V0RGF0YShzaGVsbC5vcHRpb25zKSlcbiAgICAgIF0pXG4gICAgICAudGhlbigoZGF0YTogYW55W10pID0+IHtcblxuICAgICAgICBpZiAoc2hlbGwub3B0aW9ucy5wYXRoUHJlZml4KSB7XG4gICAgICAgICAgZGF0YVsxXSA9IHNoZWxsLm9wdGlvbnMucGF0aFByZWZpeCArIGRhdGFbMV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gPElSZXNvdXJjZUFjdGlvbk1haW5PcHRpb25zPiB7XG4gICAgICAgICAgdXJsOiBkYXRhWzBdLFxuICAgICAgICAgIHBhdGg6IGRhdGFbMV0sXG4gICAgICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoZGF0YVsyXSA/IE9iamVjdC5hc3NpZ24oe30sIGRhdGFbMl0pIDogZGF0YVsyXSksXG4gICAgICAgICAgcGFyYW1zOiBkYXRhWzNdID8gT2JqZWN0LmFzc2lnbih7fSwgZGF0YVszXSkgOiBkYXRhWzNdLFxuICAgICAgICAgIGRhdGE6IGRhdGFbNF1cbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSAkX3JlbGVhc2VNYWluRGVmZXJyZWRTdWJzY3JpYmVyKHNoZWxsOiBJUmVzb3VyY2VBY3Rpb25TaGVsbCkge1xuICAgIGlmIChzaGVsbC5tYWluRGVmZXJyZWRTdWJzY3JpYmVyKSB7XG4gICAgICBzaGVsbC5tYWluRGVmZXJyZWRTdWJzY3JpYmVyLm5leHQoKTtcbiAgICAgIHNoZWxsLm1haW5EZWZlcnJlZFN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgIHNoZWxsLm1haW5EZWZlcnJlZFN1YnNjcmliZXIgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgJF9wcmVwYXJlRGF0YVBhcmFtcyhzaGVsbDogSVJlc291cmNlQWN0aW9uU2hlbGwpIHtcblxuICAgIGNvbnN0IHVzZWRQYXRoUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBzaGVsbC51c2VkUGF0aFBhcmFtcyA9IHVzZWRQYXRoUGFyYW1zO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNoZWxsLmRhdGEpIHx8IHNoZWxsLnBhcmFtcykge1xuXG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2hlbGwuZGF0YSkpIHtcbiAgICAgICAgc2hlbGwuZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHNoZWxsLmV4dHJhT3B0aW9ucy5kYXRhLCBzaGVsbC5kYXRhKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGF0aFBhcmFtcyA9IHNoZWxsLnVybC5tYXRjaCgveyhbXn1dKil9L2cpIHx8IFtdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhQYXJhbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHBhdGhQYXJhbSA9IHBhdGhQYXJhbXNbaV07XG5cbiAgICAgICAgbGV0IHBhdGhLZXkgPSBwYXRoUGFyYW0uc3Vic3RyKDEsIHBhdGhQYXJhbS5sZW5ndGggLSAyKTtcbiAgICAgICAgbGV0IGlzTWFuZGF0b3J5ID0gcGF0aEtleVswXSA9PT0gJyEnO1xuICAgICAgICBpZiAoaXNNYW5kYXRvcnkpIHtcbiAgICAgICAgICBwYXRoS2V5ID0gcGF0aEtleS5zdWJzdHIoMSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXNHZXRPbmx5ID0gcGF0aEtleVswXSA9PT0gJzonO1xuICAgICAgICBpZiAoaXNHZXRPbmx5KSB7XG4gICAgICAgICAgcGF0aEtleSA9IHBhdGhLZXkuc3Vic3RyKDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy4kX2dldFZhbHVlRm9yUGF0aChwYXRoS2V5LCBzaGVsbC5leHRyYU9wdGlvbnMucGFyYW1zLCBzaGVsbC5wYXJhbXMgfHwgc2hlbGwuZGF0YSwgdXNlZFBhdGhQYXJhbXMpO1xuICAgICAgICBpZiAoaXNHZXRPbmx5ICYmICFzaGVsbC5wYXJhbXMpIHtcbiAgICAgICAgICBkZWxldGUgc2hlbGwuZGF0YVtwYXRoS2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLiRfaXNOdWxsT3JVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgICAgaWYgKGlzTWFuZGF0b3J5KSB7XG5cbiAgICAgICAgICAgIGxldCBjb25zb2xlTXNnID0gYE1hbmRhdG9yeSAke3BhdGhQYXJhbX0gcGF0aCBwYXJhbWV0ZXIgaXMgbWlzc2luZ2A7XG5cbiAgICAgICAgICAgIHNoZWxsLm1haW5PYnNlcnZhYmxlID0gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEVycm9yKGNvbnNvbGVNc2cpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oY29uc29sZU1zZyk7XG5cbiAgICAgICAgICAgIHRoaXMuJF9yZWxlYXNlTWFpbkRlZmVycmVkU3Vic2NyaWJlcihzaGVsbCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoY29uc29sZU1zZyk7XG5cbiAgICAgICAgICB9XG4gICAgICAgICAgc2hlbGwudXJsID0gc2hlbGwudXJsLnN1YnN0cigwLCBzaGVsbC51cmwuaW5kZXhPZihwYXRoUGFyYW0pKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlcGxhY2luZyBpbiB0aGUgdXJsXG4gICAgICAgIHNoZWxsLnVybCA9IHNoZWxsLnVybC5yZXBsYWNlKHBhdGhQYXJhbSwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gUmVtb3ZpbmcgZG91YmxlIHNsYXNoZWQgZnJvbSBmaW5hbCB1cmxcbiAgICBzaGVsbC51cmwgPSBzaGVsbC51cmwucmVwbGFjZSgvXFwvXFwvKy9nLCAnLycpO1xuICAgIGlmIChzaGVsbC51cmwuc3RhcnRzV2l0aCgnaHR0cCcpKSB7XG4gICAgICBzaGVsbC51cmwgPSBzaGVsbC51cmwucmVwbGFjZSgnOi8nLCAnOi8vJyk7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIHRyYWlsaW5nIHNsYXNoXG4gICAgaWYgKHR5cGVvZiBzaGVsbC5vcHRpb25zLnJlbW92ZVRyYWlsaW5nU2xhc2ggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBzaGVsbC5vcHRpb25zLnJlbW92ZVRyYWlsaW5nU2xhc2ggPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoc2hlbGwub3B0aW9ucy5yZW1vdmVUcmFpbGluZ1NsYXNoKSB7XG4gICAgICB3aGlsZSAoc2hlbGwudXJsW3NoZWxsLnVybC5sZW5ndGggLSAxXSA9PT0gJy8nKSB7XG4gICAgICAgIHNoZWxsLnVybCA9IHNoZWxsLnVybC5zdWJzdHIoMCwgc2hlbGwudXJsLmxlbmd0aCAtIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBtYXBwZWQgcGFyYW1zXG4gICAgZm9yIChsZXQga2V5IGluIHNoZWxsLmV4dHJhT3B0aW9ucy5wYXJhbXMpIHtcbiAgICAgIGlmIChzaGVsbC5leHRyYU9wdGlvbnMucGFyYW1zW2tleV1bMF0gPT09ICdAJykge1xuICAgICAgICBkZWxldGUgc2hlbGwuZXh0cmFPcHRpb25zLnBhcmFtc1trZXldO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSAkX3ByZXBhcmVCb2R5KHNoZWxsOiBJUmVzb3VyY2VBY3Rpb25TaGVsbCkge1xuXG4gICAgaWYgKHNoZWxsLm9wdGlvbnMubWV0aG9kID09PSBSZXF1ZXN0TWV0aG9kLkdldCkge1xuICAgICAgLy8gR0VUXG4gICAgICBzaGVsbC5zZWFyY2hQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBzaGVsbC5leHRyYU9wdGlvbnMucGFyYW1zLCBzaGVsbC5kYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTk9OIEdFVFxuICAgICAgaWYgKHNoZWxsLmRhdGEpIHtcbiAgICAgICAgbGV0IF9ib2R5OiBhbnkgPSB7fTtcbiAgICAgICAgaWYgKHNoZWxsLm9wdGlvbnMucm9vdE5vZGUpIHtcbiAgICAgICAgICBfYm9keVtgJHtzaGVsbC5vcHRpb25zLnJvb3ROb2RlfWBdID0gc2hlbGwuZGF0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfYm9keSA9IHNoZWxsLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hlbGwuYm9keSA9IEpTT04uc3RyaW5naWZ5KF9ib2R5KTtcbiAgICAgICAgc2hlbGwuYm9keSA9IHNoZWxsLm9wdGlvbnMuYm9keVNlcmlhbGl6ZXIgPyBzaGVsbC5vcHRpb25zLmJvZHlTZXJpYWxpemVyKF9ib2R5KSA6IHRoaXMuJGJvZHlTZXJpYWxpemVyKF9ib2R5KTtcbiAgICAgIH1cbiAgICAgIHNoZWxsLnNlYXJjaFBhcmFtcyA9IHNoZWxsLnBhcmFtcztcbiAgICB9XG5cbiAgICBpZiAoIXNoZWxsLmJvZHkpIHtcbiAgICAgIHNoZWxsLmV4dHJhT3B0aW9ucy5oZWFkZXJzLmRlbGV0ZSgnY29udGVudC10eXBlJyk7XG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlICRfcHJlcGFyZVNlYXJjaChzaGVsbDogSVJlc291cmNlQWN0aW9uU2hlbGwpIHtcbiAgICBzaGVsbC5zZWFyY2ggPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgICBpZiAoIXNoZWxsLnBhcmFtcykge1xuICAgICAgZm9yIChsZXQga2V5IGluIHNoZWxsLnNlYXJjaFBhcmFtcykge1xuICAgICAgICBpZiAoc2hlbGwuc2VhcmNoUGFyYW1zLmhhc093blByb3BlcnR5KGtleSkgJiYgIXNoZWxsLnVzZWRQYXRoUGFyYW1zW2tleV0pIHtcbiAgICAgICAgICBsZXQgdmFsdWU6IGFueSA9IHNoZWxsLnNlYXJjaFBhcmFtc1trZXldO1xuICAgICAgICAgIHRoaXMuJF9hcHBlbmRTZWFyY2hQYXJhbXMoc2hlbGwuc2VhcmNoLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB0c05hbWUgPSBzaGVsbC5vcHRpb25zLmFkZFRpbWVzdGFtcDtcbiAgICBpZiAodHNOYW1lKSB7XG4gICAgICBpZiAodHNOYW1lID09PSB0cnVlKSB7XG4gICAgICAgIHRzTmFtZSA9ICd0cyc7XG4gICAgICB9XG4gICAgICBzaGVsbC5zZWFyY2guYXBwZW5kKHRzTmFtZSwgJycgKyBEYXRlLm5vdygpKTtcbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgJF9jcmVhdGVSZXF1ZXN0T3B0aW9ucyhzaGVsbDogSVJlc291cmNlQWN0aW9uU2hlbGwpIHtcbiAgICBzaGVsbC5yZXF1ZXN0T3B0aW9ucyA9IDxSZXF1ZXN0QXJncz57XG4gICAgICBtZXRob2Q6IHNoZWxsLm9wdGlvbnMubWV0aG9kLFxuICAgICAgaGVhZGVyczogc2hlbGwuZXh0cmFPcHRpb25zLmhlYWRlcnMsXG4gICAgICBib2R5OiBzaGVsbC5ib2R5LFxuICAgICAgdXJsOiBzaGVsbC51cmwsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHNoZWxsLm9wdGlvbnMud2l0aENyZWRlbnRpYWxzXG4gICAgfTtcblxuICAgIGlmIChzaGVsbC5vcHRpb25zLmFuZ3VsYXJWMikge1xuICAgICAgc2hlbGwucmVxdWVzdE9wdGlvbnMuc2VhcmNoID0gc2hlbGwuc2VhcmNoO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaGVsbC5yZXF1ZXN0T3B0aW9ucy5wYXJhbXMgPSBzaGVsbC5zZWFyY2g7XG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlICRfY3JlYXRlTWFpbk9ic2VydmFibGUoc2hlbGw6IElSZXNvdXJjZUFjdGlvblNoZWxsLCByZXF1ZXN0T2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxSZXNwb25zZT4pOiBPYnNlcnZhYmxlPGFueT4ge1xuXG4gICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGFueT4pID0+IHtcblxuICAgICAgbGV0IHJlcVN1YnNjcjogU3Vic2NyaXB0aW9uID0gcmVxdWVzdE9ic2VydmFibGUuc3Vic2NyaWJlKFxuICAgICAgICAocmVzcDogYW55KSA9PiB7XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXIgPSB0aGlzLiRfZmlsdGVyKHNoZWxsLm9wdGlvbnMpO1xuICAgICAgICAgIGNvbnN0IG1hcCA9IHRoaXMuJF9tYXAoc2hlbGwub3B0aW9ucyk7XG5cbiAgICAgICAgICBpZiAocmVzcCAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICBpZiAoc2hlbGwub3B0aW9ucy5pc0FycmF5KSB7XG5cbiAgICAgICAgICAgICAgLy8gRXhwZWN0aW5nIGFycmF5XG5cbiAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlc3ApKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUmV0dXJuZWQgZGF0YSBzaG91bGQgYmUgYW4gYXJyYXkuIFJlY2VpdmVkJywgcmVzcCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBzaGVsbC5yZXR1cm5FeHRlcm5hbC5wdXNoKFxuICAgICAgICAgICAgICAgICAgLi4ucmVzcFxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGZpbHRlcilcbiAgICAgICAgICAgICAgICAgICAgLm1hcChtYXApXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHJlc3BJdGVtOiBhbnkpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwSXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BJdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaGVsbC5vcHRpb25zLmxlYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcEl0ZW0uJHJlc291cmNlID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRfc2V0RGF0YVRvT2JqZWN0KHRoaXMuJF9pbml0UmVzdWx0T2JqZWN0KHNoZWxsLm9wdGlvbnMpLCByZXNwSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BJdGVtO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgLy8gRXhwZWN0aW5nIG9iamVjdFxuXG4gICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3ApKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUmV0dXJuZWQgZGF0YSBzaG91bGQgYmUgYW4gb2JqZWN0LiBSZWNlaXZlZCcsIHJlc3ApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcihyZXNwKSkge1xuXG4gICAgICAgICAgICAgICAgICBzaGVsbC5yZXR1cm5FeHRlcm5hbCA9IHRoaXMuJF9zZXREYXRhVG9PYmplY3Qoc2hlbGwucmV0dXJuRXh0ZXJuYWwsIG1hcChyZXNwKSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHNoZWxsLnJldHVybkludGVybmFsLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHNoZWxsLnJldHVybkV4dGVybmFsKTtcblxuICAgICAgICB9LFxuICAgICAgICAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgICAgaWYgKHNoZWxsLm9uRXJyb3IpIHtcbiAgICAgICAgICAgIHNoZWxsLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAvLyBzaGVsbC5yZXR1cm5JbnRlcm5hbC4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICBpZiAoc2hlbGwuY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHNoZWxsLmNhbGxiYWNrKHNoZWxsLnJldHVybkV4dGVybmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIHNoZWxsLnJldHVybkludGVybmFsLiRhYm9ydFJlcXVlc3QgPSAoKSA9PiB7XG4gICAgICAgIGlmIChzaGVsbC5yZXR1cm5JbnRlcm5hbC4kcmVzb2x2ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVxU3Vic2NyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHNoZWxsLnJldHVybkludGVybmFsLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICB9O1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIHByaXZhdGUgJF9zZXREYXRhVG9PYmplY3QocmV0OiBhbnksIHJlc3A6IGFueSk6IGFueSB7XG5cbiAgICBpZiAocmV0LiRzZXREYXRhKSB7XG4gICAgICByZXQuJHNldERhdGEocmVzcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3ApKSB7XG4gICAgICAgIHJldCA9IHJlc3A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3QuYXNzaWduKHJldCwgcmVzcCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcblxuICB9XG5cbiAgcHJpdmF0ZSAkX2dldFZhbHVlRm9yUGF0aChrZXk6IHN0cmluZywgcGFyYW1zOiBhbnksIGRhdGE6IGFueSwgdXNlZFBhdGhQYXJhbXM6IGFueSk6IHN0cmluZyB7XG5cbiAgICBpZiAoIXRoaXMuJF9pc051bGxPclVuZGVmaW5lZChkYXRhW2tleV0pICYmIHR5cGVvZiBkYXRhW2tleV0gIT09ICdvYmplY3QnKSB7XG4gICAgICB1c2VkUGF0aFBhcmFtc1trZXldID0gdHJ1ZTtcbiAgICAgIHJldHVybiBkYXRhW2tleV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJF9pc051bGxPclVuZGVmaW5lZChwYXJhbXNba2V5XSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXNba2V5XVswXSA9PT0gJ0AnKSB7XG4gICAgICByZXR1cm4gdGhpcy4kX2dldFZhbHVlRm9yUGF0aChwYXJhbXNba2V5XS5zdWJzdHIoMSksIHBhcmFtcywgZGF0YSwgdXNlZFBhdGhQYXJhbXMpO1xuICAgIH1cblxuICAgIHVzZWRQYXRoUGFyYW1zW2tleV0gPSB0cnVlO1xuICAgIHJldHVybiBwYXJhbXNba2V5XTtcblxuICB9XG5cbiAgcHJpdmF0ZSAkX2lzTnVsbE9yVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgJF9hcHBlbmRTZWFyY2hQYXJhbXMoc2VhcmNoOiBVUkxTZWFyY2hQYXJhbXMsIGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgLy8vIENvbnZlcnQgZGF0ZXMgdG8gSVNPIGZvcm1hdCBzdHJpbmdcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICBzZWFyY2guYXBwZW5kKGtleSwgdmFsdWUudG9JU09TdHJpbmcoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblxuICAgICAgc3dpdGNoIChSZXNvdXJjZUdsb2JhbENvbmZpZy5nZXRQYXJhbXNNYXBwaW5nVHlwZSkge1xuXG4gICAgICAgIGNhc2UgVEdldFBhcmFtc01hcHBpbmdUeXBlLlBsYWluOlxuXG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBhcnJfdmFsdWUgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgICAgc2VhcmNoLmFwcGVuZChrZXksIGFycl92YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgLy8vIENvbnZlcnQgZGF0ZXMgdG8gSVNPIGZvcm1hdCBzdHJpbmdcbiAgICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VhcmNoLmFwcGVuZChrZXksIHZhbHVlKTtcblxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFRHZXRQYXJhbXNNYXBwaW5nVHlwZS5CcmFja2V0OlxuICAgICAgICAgIC8vLyBDb252ZXJ0IG9iamVjdCBhbmQgYXJyYXlzIHRvIHF1ZXJ5IHBhcmFtc1xuICAgICAgICAgIGZvciAobGV0IGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgICB0aGlzLiRfYXBwZW5kU2VhcmNoUGFyYW1zKHNlYXJjaCwga2V5ICsgJ1snICsgayArICddJywgdmFsdWVba10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFRHZXRQYXJhbXNNYXBwaW5nVHlwZS5KUXVlcnlQYXJhbXNCcmFja2V0OlxuICAgICAgICAgIC8vLyBDb252ZXJ0IG9iamVjdCBhbmQgYXJyYXlzIHRvIHF1ZXJ5IHBhcmFtcyBhY2NvcmRpbmcgdG8gJC5wYXJhbXNcbiAgICAgICAgICBmb3IgKGxldCBrIGluIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgICAgbGV0IHBhdGggPSBgJHtrZXl9WyR7a31dYDtcbiAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHR5cGVvZiB2YWx1ZVs8YW55PmtdICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHBhdGggPSBgJHtrZXl9W11gO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuJF9hcHBlbmRTZWFyY2hQYXJhbXMoc2VhcmNoLCBwYXRoLCB2YWx1ZVtrXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICBzZWFyY2guYXBwZW5kKGtleSwgdmFsdWUpO1xuXG4gIH1cblxuICAvKipcbiAgICogR2V0IHVybCB0byBiZSByZXBsYWNlZCBieSBSZXNvdXJjZVBhcmFtc0Jhc2VcbiAgICpcbiAgICogQHBhcmFtIG1ldGhvZE9wdGlvbnNcbiAgICogQHJldHVybnMgeyBhbnkgfCBQcm9taXNlPGFueT59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlICRfZ2V0VXJsKG1ldGhvZE9wdGlvbnM/OiBSZXNvdXJjZUFjdGlvbkJhc2UpOiBzdHJpbmcgfCBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBnZXQgcGF0aCB0byBiZSByZXBsYWNlZCBieSBSZXNvdXJjZVBhcmFtc0Jhc2VcbiAgICpcbiAgICogQHBhcmFtIG1ldGhvZE9wdGlvbnNcbiAgICogQHJldHVybnMgeyBhbnkgfCBQcm9taXNlPGFueT59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlICRfZ2V0UGF0aChtZXRob2RPcHRpb25zPzogUmVzb3VyY2VBY3Rpb25CYXNlKTogc3RyaW5nIHwgUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaGVhZGVycyB0byBiZSByZXBsYWNlZCBieSBSZXNvdXJjZVBhcmFtc0Jhc2VcbiAgICpcbiAgICogQHBhcmFtIG1ldGhvZE9wdGlvbnNcbiAgICogQHJldHVybnMgeyBhbnkgfCBQcm9taXNlPGFueT59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlICRfZ2V0SGVhZGVycyhtZXRob2RPcHRpb25zPzogUmVzb3VyY2VBY3Rpb25CYXNlKTogYW55IHwgUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcGFyYW1zIHRvIGJlIHJlcGxhY2VkIGJ5IFJlc291cmNlUGFyYW1zQmFzZVxuICAgKlxuICAgKiBAcGFyYW0gbWV0aG9kT3B0aW9uc1xuICAgKiBAcmV0dXJucyB7IGFueSB8IFByb21pc2U8YW55Pn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgJF9nZXRQYXJhbXMobWV0aG9kT3B0aW9ucz86IFJlc291cmNlQWN0aW9uQmFzZSk6IGFueSB8IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRhdGEgdG8gYmUgcmVwbGFjZWQgYnkgUmVzb3VyY2VQYXJhbXNCYXNlXG4gICAqXG4gICAqIEBwYXJhbSBtZXRob2RPcHRpb25zXG4gICAqIEByZXR1cm5zIHsgYW55IHwgUHJvbWlzZTxhbnk+fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSAkX2dldERhdGEobWV0aG9kT3B0aW9ucz86IFJlc291cmNlQWN0aW9uQmFzZSk6IGFueSB8IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlICRfc2V0R2xvYmFsc1RvT3B0aW9ucyhtZXRob2RPcHRpb25zOiBSZXNvdXJjZUFjdGlvbkJhc2UpIHtcbiAgICBpZiAobWV0aG9kT3B0aW9ucy50b1Byb21pc2UgPT09IHVuZGVmaW5lZCAmJiBSZXNvdXJjZUdsb2JhbENvbmZpZy50b1Byb21pc2UgIT09IG51bGwpIHtcbiAgICAgIG1ldGhvZE9wdGlvbnMudG9Qcm9taXNlID0gUmVzb3VyY2VHbG9iYWxDb25maWcudG9Qcm9taXNlO1xuICAgIH1cblxuICAgIGlmIChtZXRob2RPcHRpb25zLnRvT2JzZXJ2YWJsZSA9PT0gdW5kZWZpbmVkICYmIFJlc291cmNlR2xvYmFsQ29uZmlnLnRvT2JzZXJ2YWJsZSAhPT0gbnVsbCkge1xuICAgICAgbWV0aG9kT3B0aW9ucy50b09ic2VydmFibGUgPSBSZXNvdXJjZUdsb2JhbENvbmZpZy50b09ic2VydmFibGU7XG4gICAgfVxuXG4gICAgaWYgKG1ldGhvZE9wdGlvbnMubGVhbiA9PT0gdW5kZWZpbmVkICYmIFJlc291cmNlR2xvYmFsQ29uZmlnLmxlYW4gIT09IG51bGwpIHtcbiAgICAgIG1ldGhvZE9wdGlvbnMubGVhbiA9IFJlc291cmNlR2xvYmFsQ29uZmlnLmxlYW47XG4gICAgfVxuICB9XG5cbn1cblxuXG5pbnRlcmZhY2UgSVJlc291cmNlQWN0aW9uU2hlbGwge1xuICB1cmw/OiBzdHJpbmc7XG4gIGJvZHk/OiBzdHJpbmc7XG4gIHNlYXJjaD86IFVSTFNlYXJjaFBhcmFtcztcbiAgc2VhcmNoUGFyYW1zPzogYW55O1xuICB1c2VkUGF0aFBhcmFtcz86IGFueTtcbiAgcmV0dXJuSW50ZXJuYWw/OiBSZXNvdXJjZVJlc3VsdDxhbnk+IHwgUmVzb3VyY2VNb2RlbDxSZXNvdXJjZT47XG4gIHJldHVybkV4dGVybmFsPzogUmVzb3VyY2VSZXN1bHQ8YW55PiB8IFJlc291cmNlTW9kZWw8UmVzb3VyY2U+O1xuICBkYXRhPzogYW55O1xuICBwYXJhbXM/OiBhbnk7XG4gIG9wdGlvbnM/OiBSZXNvdXJjZUFjdGlvbkJhc2U7XG4gIG1haW5EZWZlcnJlZFN1YnNjcmliZXI/OiBTdWJzY3JpYmVyPGFueT47XG4gIG1haW5PYnNlcnZhYmxlPzogT2JzZXJ2YWJsZTxSZXNwb25zZT47XG4gIGV4dHJhT3B0aW9ucz86IElSZXNvdXJjZUFjdGlvbk1haW5PcHRpb25zO1xuICByZXF1ZXN0T3B0aW9ucz86IFJlcXVlc3RBcmdzO1xuICBjYWxsYmFjaz86IChkYXRhPzogYW55KSA9PiBhbnk7XG4gIG9uRXJyb3I/OiAoZXJyPzogUmVzcG9uc2UpID0+IGFueTtcbn1cblxuaW50ZXJmYWNlIElSZXNvdXJjZUFjdGlvbk1haW5PcHRpb25zIHtcbiAgdXJsOiBzdHJpbmc7XG4gIHBhdGg6IHN0cmluZztcbiAgaGVhZGVyczogSGVhZGVycztcbiAgcGFyYW1zOiBhbnk7XG4gIGRhdGE6IGFueTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL3NyYy9SZXNvdXJjZS50cyIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgdHNsaWIsX1N1YnNjcmliZXIgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuL1N1YnNjcmliZXInO1xudmFyIE91dGVyU3Vic2NyaWJlciA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhPdXRlclN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gT3V0ZXJTdWJzY3JpYmVyKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIE91dGVyU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5TmV4dCA9IGZ1bmN0aW9uIChvdXRlclZhbHVlLCBpbm5lclZhbHVlLCBvdXRlckluZGV4LCBpbm5lckluZGV4LCBpbm5lclN1Yikge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoaW5uZXJWYWx1ZSk7XG4gICAgfTtcbiAgICBPdXRlclN1YnNjcmliZXIucHJvdG90eXBlLm5vdGlmeUVycm9yID0gZnVuY3Rpb24gKGVycm9yLCBpbm5lclN1Yikge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycm9yKTtcbiAgICB9O1xuICAgIE91dGVyU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5Q29tcGxldGUgPSBmdW5jdGlvbiAoaW5uZXJTdWIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIE91dGVyU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PdXRlclN1YnNjcmliZXIuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9PdXRlclN1YnNjcmliZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgdHNsaWIsX0FjdGlvbiBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9BY3Rpb24nO1xudmFyIEFzeW5jQWN0aW9uID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKEFzeW5jQWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFzeW5jQWN0aW9uKHNjaGVkdWxlciwgd29yaykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzY2hlZHVsZXIsIHdvcmspIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgX3RoaXMud29yayA9IHdvcms7XG4gICAgICAgIF90aGlzLnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAoc3RhdGUsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBkZWxheSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHZhciBpZCA9IHRoaXMuaWQ7XG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSB0aGlzLnJlY3ljbGVBc3luY0lkKHNjaGVkdWxlciwgaWQsIGRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlbmRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRlbGF5ID0gZGVsYXk7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmlkIHx8IHRoaXMucmVxdWVzdEFzeW5jSWQoc2NoZWR1bGVyLCB0aGlzLmlkLCBkZWxheSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBkZWxheSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldEludGVydmFsKHNjaGVkdWxlci5mbHVzaC5iaW5kKHNjaGVkdWxlciwgdGhpcyksIGRlbGF5KTtcbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5yZWN5Y2xlQXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgZGVsYXkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWxheSAhPT0gbnVsbCAmJiB0aGlzLmRlbGF5ID09PSBkZWxheSAmJiB0aGlzLnBlbmRpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICAgICAgY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgfTtcbiAgICBBc3luY0FjdGlvbi5wcm90b3R5cGUuZXhlY3V0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdleGVjdXRpbmcgYSBjYW5jZWxsZWQgYWN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIHZhciBlcnJvciA9IHRoaXMuX2V4ZWN1dGUoc3RhdGUsIGRlbGF5KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wZW5kaW5nID09PSBmYWxzZSAmJiB0aGlzLmlkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSB0aGlzLnJlY3ljbGVBc3luY0lkKHRoaXMuc2NoZWR1bGVyLCB0aGlzLmlkLCBudWxsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQXN5bmNBY3Rpb24ucHJvdG90eXBlLl9leGVjdXRlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICB2YXIgZXJyb3JlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3JWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMud29yayhzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgZXJyb3JWYWx1ZSA9ICEhZSAmJiBlIHx8IG5ldyBFcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3JlZCkge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yVmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFzeW5jQWN0aW9uLnByb3RvdHlwZS5fdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXMuaWQ7XG4gICAgICAgIHZhciBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBzY2hlZHVsZXIuYWN0aW9ucztcbiAgICAgICAgdmFyIGluZGV4ID0gYWN0aW9ucy5pbmRleE9mKHRoaXMpO1xuICAgICAgICB0aGlzLndvcmsgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyID0gbnVsbDtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgYWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gdGhpcy5yZWN5Y2xlQXN5bmNJZChzY2hlZHVsZXIsIGlkLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlbGF5ID0gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBBc3luY0FjdGlvbjtcbn0oQWN0aW9uKSk7XG5leHBvcnQgeyBBc3luY0FjdGlvbiB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXN5bmNBY3Rpb24uanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvQXN5bmNBY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgdHNsaWIsX1NjaGVkdWxlciBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbnZhciBBc3luY1NjaGVkdWxlciA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhBc3luY1NjaGVkdWxlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBc3luY1NjaGVkdWxlcihTY2hlZHVsZXJBY3Rpb24sIG5vdykge1xuICAgICAgICBpZiAobm93ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIG5vdyA9IFNjaGVkdWxlci5ub3c7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgU2NoZWR1bGVyQWN0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoQXN5bmNTY2hlZHVsZXIuZGVsZWdhdGUgJiYgQXN5bmNTY2hlZHVsZXIuZGVsZWdhdGUgIT09IF90aGlzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jU2NoZWR1bGVyLmRlbGVnYXRlLm5vdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5hY3Rpb25zID0gW107XG4gICAgICAgIF90aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQXN5bmNTY2hlZHVsZXIucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKHdvcmssIGRlbGF5LCBzdGF0ZSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgZGVsYXkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBc3luY1NjaGVkdWxlci5kZWxlZ2F0ZSAmJiBBc3luY1NjaGVkdWxlci5kZWxlZ2F0ZSAhPT0gdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIEFzeW5jU2NoZWR1bGVyLmRlbGVnYXRlLnNjaGVkdWxlKHdvcmssIGRlbGF5LCBzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5zY2hlZHVsZS5jYWxsKHRoaXMsIHdvcmssIGRlbGF5LCBzdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFzeW5jU2NoZWR1bGVyLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSB0aGlzLmFjdGlvbnM7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmIChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHdoaWxlIChhY3Rpb24gPSBhY3Rpb25zLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQXN5bmNTY2hlZHVsZXI7XG59KFNjaGVkdWxlcikpO1xuZXhwb3J0IHsgQXN5bmNTY2hlZHVsZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFzeW5jU2NoZWR1bGVyLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL0FzeW5jU2NoZWR1bGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUICBQVVJFX0lNUE9SVFNfRU5EICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ltYm9sSXRlcmF0b3IoKSB7XG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgIVN5bWJvbC5pdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gJ0BAaXRlcmF0b3InO1xuICAgIH1cbiAgICByZXR1cm4gU3ltYm9sLml0ZXJhdG9yO1xufVxuZXhwb3J0IHZhciBpdGVyYXRvciA9IC8qQF9fUFVSRV9fKi8gZ2V0U3ltYm9sSXRlcmF0b3IoKTtcbmV4cG9ydCB2YXIgJCRpdGVyYXRvciA9IGl0ZXJhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXRlcmF0b3IuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zeW1ib2wvaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX0lubmVyU3Vic2NyaWJlcixfc3Vic2NyaWJlVG8gUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvIH0gZnJvbSAnLi9zdWJzY3JpYmVUbyc7XG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlVG9SZXN1bHQob3V0ZXJTdWJzY3JpYmVyLCByZXN1bHQsIG91dGVyVmFsdWUsIG91dGVySW5kZXgsIGRlc3RpbmF0aW9uKSB7XG4gICAgaWYgKGRlc3RpbmF0aW9uID09PSB2b2lkIDApIHtcbiAgICAgICAgZGVzdGluYXRpb24gPSBuZXcgSW5uZXJTdWJzY3JpYmVyKG91dGVyU3Vic2NyaWJlciwgb3V0ZXJWYWx1ZSwgb3V0ZXJJbmRleCk7XG4gICAgfVxuICAgIGlmIChkZXN0aW5hdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gc3Vic2NyaWJlVG8ocmVzdWx0KShkZXN0aW5hdGlvbik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdWJzY3JpYmVUb1Jlc3VsdC5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFJlcXVlc3RNZXRob2QgfSBmcm9tICdAYW5ndWxhci9odHRwJztcblxuaW1wb3J0IHtcbiAgUmVzb3VyY2VBY3Rpb25CYXNlLFxuICBSZXNvdXJjZVJlc3VsdFxufSBmcm9tICcuL0ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICcuL1Jlc291cmNlJztcbmltcG9ydCB7IFJlc291cmNlTW9kZWwgfSBmcm9tICcuL1Jlc291cmNlTW9kZWwnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBSZXNvdXJjZUFjdGlvbihtZXRob2RPcHRpb25zPzogUmVzb3VyY2VBY3Rpb25CYXNlKSB7XG5cbiAgbWV0aG9kT3B0aW9ucyA9IG1ldGhvZE9wdGlvbnMgfHwge307XG5cbiAgaWYgKG1ldGhvZE9wdGlvbnMubWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICBtZXRob2RPcHRpb25zLm1ldGhvZCA9IFJlcXVlc3RNZXRob2QuR2V0O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQ6IFJlc291cmNlLCBwcm9wZXJ0eUtleTogc3RyaW5nKSB7XG5cbiAgICAoPGFueT50YXJnZXQpW3Byb3BlcnR5S2V5XSA9IGZ1bmN0aW9uICguLi5hcmdzOiBhbnlbXSk6IFJlc291cmNlUmVzdWx0PGFueT4gfCBSZXNvdXJjZU1vZGVsPFJlc291cmNlPiB7XG5cbiAgICAgIGxldCBkYXRhOiBhbnkgPSBudWxsO1xuICAgICAgbGV0IHBhcmFtczogYW55ID0gbnVsbDtcbiAgICAgIGxldCBjYWxsYmFjazogYW55ID0gbnVsbDtcbiAgICAgIGxldCBvbkVycm9yOiBhbnkgPSBudWxsO1xuXG4gICAgICBhcmdzLmZvckVhY2goKGFyZzogYW55KSA9PiB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIG9uRXJyb3IgPSBhcmc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gYXJnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgcGFyYW1zID0gYXJnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhID0gYXJnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0UmVzb3VyY2VPcHRpb25zKCksIG1ldGhvZE9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gdGhpcy4kcmVzb3VyY2VBY3Rpb24oZGF0YSwgcGFyYW1zLCBjYWxsYmFjaywgb25FcnJvciwgb3B0aW9ucyk7XG5cbiAgICB9O1xuXG4gIH07XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL3NyYy9SZXNvdXJjZUFjdGlvbi50cyIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbnZhciBfZW5hYmxlX3N1cGVyX2dyb3NzX21vZGVfdGhhdF93aWxsX2NhdXNlX2JhZF90aGluZ3MgPSBmYWxzZTtcbmV4cG9ydCB2YXIgY29uZmlnID0ge1xuICAgIFByb21pc2U6IHVuZGVmaW5lZCxcbiAgICBzZXQgdXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZyh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBlcnJvciA9IC8qQF9fUFVSRV9fKi8gbmV3IEVycm9yKCk7XG4gICAgICAgICAgICAvKkBfX1BVUkVfXyovIGNvbnNvbGUud2FybignREVQUkVDQVRFRCEgUnhKUyB3YXMgc2V0IHRvIHVzZSBkZXByZWNhdGVkIHN5bmNocm9ub3VzIGVycm9yIGhhbmRsaW5nIGJlaGF2aW9yIGJ5IGNvZGUgYXQ6IFxcbicgKyBlcnJvci5zdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoX2VuYWJsZV9zdXBlcl9ncm9zc19tb2RlX3RoYXRfd2lsbF9jYXVzZV9iYWRfdGhpbmdzKSB7XG4gICAgICAgICAgICAvKkBfX1BVUkVfXyovIGNvbnNvbGUubG9nKCdSeEpTOiBCYWNrIHRvIGEgYmV0dGVyIGVycm9yIGJlaGF2aW9yLiBUaGFuayB5b3UuIDwzJyk7XG4gICAgICAgIH1cbiAgICAgICAgX2VuYWJsZV9zdXBlcl9ncm9zc19tb2RlX3RoYXRfd2lsbF9jYXVzZV9iYWRfdGhpbmdzID0gdmFsdWU7XG4gICAgfSxcbiAgICBnZXQgdXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZygpIHtcbiAgICAgICAgcmV0dXJuIF9lbmFibGVfc3VwZXJfZ3Jvc3NfbW9kZV90aGF0X3dpbGxfY2F1c2VfYmFkX3RoaW5ncztcbiAgICB9LFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL2NvbmZpZy5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCAgUFVSRV9JTVBPUlRTX0VORCAqL1xuZnVuY3Rpb24gT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JJbXBsKCkge1xuICAgIEVycm9yLmNhbGwodGhpcyk7XG4gICAgdGhpcy5tZXNzYWdlID0gJ29iamVjdCB1bnN1YnNjcmliZWQnO1xuICAgIHRoaXMubmFtZSA9ICdPYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG4gICAgcmV0dXJuIHRoaXM7XG59XG5PYmplY3RVbnN1YnNjcmliZWRFcnJvckltcGwucHJvdG90eXBlID0gLypAX19QVVJFX18qLyBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5leHBvcnQgdmFyIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yID0gT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JJbXBsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL09iamVjdFVuc3Vic2NyaWJlZEVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUICBQVVJFX0lNUE9SVFNfRU5EICovXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNGdW5jdGlvbi5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvaXNGdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGVudW0gVEdldFBhcmFtc01hcHBpbmdUeXBlIHtcbiAgUGxhaW4sXG4gIEJyYWNrZXQsXG4gIEpRdWVyeVBhcmFtc0JyYWNrZXRcbn1cblxuZXhwb3J0IGNsYXNzIFJlc291cmNlR2xvYmFsQ29uZmlnIHtcbiAgc3RhdGljIHVybDogc3RyaW5nIHwgUHJvbWlzZTxzdHJpbmc+ID0gbnVsbDtcbiAgc3RhdGljIHBhdGg6IHN0cmluZyB8IFByb21pc2U8c3RyaW5nPiA9IG51bGw7XG4gIHN0YXRpYyBoZWFkZXJzOiBhbnkgfCBQcm9taXNlPGFueT4gPSB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gIH07XG4gIHN0YXRpYyBwYXJhbXM6IGFueSB8IFByb21pc2U8YW55PiA9IG51bGw7XG4gIHN0YXRpYyBkYXRhOiBhbnkgfCBQcm9taXNlPGFueT4gPSBudWxsO1xuXG4gIHN0YXRpYyBhZGQyUHJvdmlkZXM6IGJvb2xlYW4gPSBudWxsO1xuXG4gIHN0YXRpYyBsZWFuOiBib29sZWFuID0gbnVsbDtcblxuICBzdGF0aWMgdG9Qcm9taXNlOiBib29sZWFuID0gbnVsbDtcbiAgc3RhdGljIHRvT2JzZXJ2YWJsZTogYm9vbGVhbiA9IG51bGw7XG5cbiAgc3RhdGljIGdldFBhcmFtc01hcHBpbmdUeXBlOiBhbnkgPSBUR2V0UGFyYW1zTWFwcGluZ1R5cGUuUGxhaW47XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3RzbGludC1sb2FkZXIhLi9zcmMvUmVzb3VyY2VHbG9iYWxDb25maWcudHMiLCJpbXBvcnQgeyBQcm92aWRlciwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuXG5pbXBvcnQgeyBSZXNvdXJjZSB9IGZyb20gJy4vUmVzb3VyY2UnO1xuXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VQcm92aWRlcnMge1xuXG4gIHN0YXRpYyBtYWluUHJvdmlkZXJzTmFtZTogc3RyaW5nID0gJ19fbWFpblByb3ZpZGVycyc7XG4gIHN0YXRpYyBwcm92aWRlcnM6IHsgW2lkOiBzdHJpbmddOiBQcm92aWRlcltdIH0gPSB7XG4gICAgX19tYWluUHJvdmlkZXJzOiBbXVxuICB9O1xuXG4gIHN0YXRpYyBhZGQocmVzb3VyY2U6IFR5cGU8UmVzb3VyY2U+LCBzdWJTZXQ6IHN0cmluZyA9IG51bGwpIHtcblxuICAgIGlmICghc3ViU2V0KSB7XG4gICAgICBzdWJTZXQgPSB0aGlzLm1haW5Qcm92aWRlcnNOYW1lO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5wcm92aWRlcnNbc3ViU2V0XSkge1xuICAgICAgdGhpcy5wcm92aWRlcnNbc3ViU2V0XSA9IFtdO1xuICAgIH1cblxuICAgIGxldCBkZXBzOiBhbnlbXSA9ICg8YW55PlJlZmxlY3QpLmdldE1ldGFkYXRhKCdkZXNpZ246cGFyYW10eXBlcycsIHJlc291cmNlKTtcblxuICAgIGlmICghZGVwcyB8fCBkZXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZGVwcyA9IFtIdHRwXTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3ZpZGVyc1tzdWJTZXRdLnB1c2goXG4gICAgICB7XG4gICAgICAgIHByb3ZpZGU6IHJlc291cmNlLFxuICAgICAgICB1c2VGYWN0b3J5OiAoLi4uYXJnczogYW55W10pID0+IG5ldyByZXNvdXJjZSguLi5hcmdzKSxcbiAgICAgICAgZGVwczogZGVwc1xuICAgICAgfVxuICAgICk7XG5cbiAgfVxuXG4gIHN0YXRpYyBnZXQoc3ViU2V0OiBzdHJpbmcgPSBudWxsKTogUHJvdmlkZXJbXSB7XG5cbiAgICBpZiAoIXN1YlNldCkge1xuICAgICAgc3ViU2V0ID0gdGhpcy5tYWluUHJvdmlkZXJzTmFtZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wcm92aWRlcnNbc3ViU2V0XSB8fCBbXTtcblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL3NyYy9SZXNvdXJjZVByb3ZpZGVycy50cyIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgdHNsaWIsX1N1YmplY3QsX1N1YnNjcmlwdGlvbiBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4vU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG52YXIgQXN5bmNTdWJqZWN0ID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKEFzeW5jU3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBc3luY1N1YmplY3QoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgIF90aGlzLmhhc05leHQgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuaGFzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQXN5bmNTdWJqZWN0LnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IodGhpcy50aHJvd25FcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaGFzQ29tcGxldGVkICYmIHRoaXMuaGFzTmV4dCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5fc3Vic2NyaWJlLmNhbGwodGhpcywgc3Vic2NyaWJlcik7XG4gICAgfTtcbiAgICBBc3luY1N1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0NvbXBsZXRlZCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5oYXNOZXh0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQXN5bmNTdWJqZWN0LnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBpZiAoIXRoaXMuaGFzQ29tcGxldGVkKSB7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmVycm9yLmNhbGwodGhpcywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBc3luY1N1YmplY3QucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmhhc0NvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmhhc05leHQpIHtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUubmV4dC5jYWxsKHRoaXMsIHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuY29tcGxldGUuY2FsbCh0aGlzKTtcbiAgICB9O1xuICAgIHJldHVybiBBc3luY1N1YmplY3Q7XG59KFN1YmplY3QpKTtcbmV4cG9ydCB7IEFzeW5jU3ViamVjdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXN5bmNTdWJqZWN0LmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvQXN5bmNTdWJqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF91dGlsX2lzU2NoZWR1bGVyLF9mcm9tQXJyYXksX2VtcHR5LF9zY2FsYXIgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgaXNTY2hlZHVsZXIgfSBmcm9tICcuLi91dGlsL2lzU2NoZWR1bGVyJztcbmltcG9ydCB7IGZyb21BcnJheSB9IGZyb20gJy4vZnJvbUFycmF5JztcbmltcG9ydCB7IGVtcHR5IH0gZnJvbSAnLi9lbXB0eSc7XG5pbXBvcnQgeyBzY2FsYXIgfSBmcm9tICcuL3NjYWxhcic7XG5leHBvcnQgZnVuY3Rpb24gb2YoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBzY2hlZHVsZXIgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgaWYgKGlzU2NoZWR1bGVyKHNjaGVkdWxlcikpIHtcbiAgICAgICAgYXJncy5wb3AoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNjaGVkdWxlciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gZW1wdHkoc2NoZWR1bGVyKTtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlciA/IGZyb21BcnJheShhcmdzLCBzY2hlZHVsZXIpIDogc2NhbGFyKGFyZ3NbMF0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGZyb21BcnJheShhcmdzLCBzY2hlZHVsZXIpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9mLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9vZi5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfQXN5bmNBY3Rpb24sX0FzeW5jU2NoZWR1bGVyIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IEFzeW5jQWN0aW9uIH0gZnJvbSAnLi9Bc3luY0FjdGlvbic7XG5pbXBvcnQgeyBBc3luY1NjaGVkdWxlciB9IGZyb20gJy4vQXN5bmNTY2hlZHVsZXInO1xuZXhwb3J0IHZhciBhc3luYyA9IC8qQF9fUFVSRV9fKi8gbmV3IEFzeW5jU2NoZWR1bGVyKEFzeW5jQWN0aW9uKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzeW5jLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL2FzeW5jLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUICBQVVJFX0lNUE9SVFNfRU5EICovXG5leHBvcnQgdmFyIHJ4U3Vic2NyaWJlciA9ICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wuZm9yID09PSAnZnVuY3Rpb24nKVxuICAgID8gLypAX19QVVJFX18qLyBTeW1ib2wuZm9yKCdyeFN1YnNjcmliZXInKVxuICAgIDogJ0BAcnhTdWJzY3JpYmVyJztcbmV4cG9ydCB2YXIgJCRyeFN1YnNjcmliZXIgPSByeFN1YnNjcmliZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yeFN1YnNjcmliZXIuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zeW1ib2wvcnhTdWJzY3JpYmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUICBQVVJFX0lNUE9SVFNfRU5EICovXG5leHBvcnQgZnVuY3Rpb24gaG9zdFJlcG9ydEVycm9yKGVycikge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB0aHJvdyBlcnI7IH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aG9zdFJlcG9ydEVycm9yLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9ob3N0UmVwb3J0RXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGl0eSh4KSB7XG4gICAgcmV0dXJuIHg7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZGVudGl0eS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvaWRlbnRpdHkuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbmV4cG9ydCBmdW5jdGlvbiBub29wKCkgeyB9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub29wLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9ub29wLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMzJfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkBhbmd1bGFyL2NvcmVcIlxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBSZXNvdXJjZVBhcmFtc0Jhc2UgfSBmcm9tICcuL0ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUmVzb3VyY2VQcm92aWRlcnMgfSBmcm9tICcuL1Jlc291cmNlUHJvdmlkZXJzJztcbmltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnLi9SZXNvdXJjZSc7XG5pbXBvcnQgeyBSZXNvdXJjZUdsb2JhbENvbmZpZyB9IGZyb20gJy4vUmVzb3VyY2VHbG9iYWxDb25maWcnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBSZXNvdXJjZVBhcmFtcyhwYXJhbXM6IFJlc291cmNlUGFyYW1zQmFzZSA9IHt9KSB7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQ6IFR5cGU8UmVzb3VyY2U+KSB7XG5cblxuICAgIHRhcmdldC5wcm90b3R5cGUuZ2V0UmVzb3VyY2VPcHRpb25zID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9O1xuXG4gICAgaWYgKHBhcmFtcy5hZGQyUHJvdmlkZXMgPT09IHVuZGVmaW5lZCAmJiBSZXNvdXJjZUdsb2JhbENvbmZpZy5hZGQyUHJvdmlkZXMgIT09IG51bGwpIHtcbiAgICAgIHBhcmFtcy5hZGQyUHJvdmlkZXMgPSBSZXNvdXJjZUdsb2JhbENvbmZpZy5hZGQyUHJvdmlkZXM7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5hZGQyUHJvdmlkZXMgIT09IGZhbHNlKSB7XG4gICAgICBSZXNvdXJjZVByb3ZpZGVycy5hZGQodGFyZ2V0LCBwYXJhbXMucHJvdmlkZXJzU3ViU2V0KTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHBhcmFtcy5yZW1vdmVUcmFpbGluZ1NsYXNoICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGFyZ2V0LnByb3RvdHlwZS5yZW1vdmVUcmFpbGluZ1NsYXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gISFwYXJhbXMucmVtb3ZlVHJhaWxpbmdTbGFzaDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy51cmwpIHtcbiAgICAgIHRhcmdldC5wcm90b3R5cGUuJF9nZXRVcmwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMudXJsO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLnBhdGgpIHtcbiAgICAgIHRhcmdldC5wcm90b3R5cGUuJF9nZXRQYXRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zLnBhdGg7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMuaGVhZGVycykge1xuICAgICAgdGFyZ2V0LnByb3RvdHlwZS4kX2dldEhlYWRlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMuaGVhZGVycztcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5wYXJhbXMpIHtcbiAgICAgIHRhcmdldC5wcm90b3R5cGUuJF9nZXRQYXJhbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMucGFyYW1zO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmRhdGEpIHtcbiAgICAgIHRhcmdldC5wcm90b3R5cGUuJF9nZXREYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zLmRhdGE7XG4gICAgICB9O1xuICAgIH1cblxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vfi90c2xpbnQtbG9hZGVyIS4vc3JjL1Jlc291cmNlUGFyYW1zLnRzIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCB0c2xpYixfU3Vic2NyaWJlciBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4vU3Vic2NyaWJlcic7XG52YXIgSW5uZXJTdWJzY3JpYmVyID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKElubmVyU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBJbm5lclN1YnNjcmliZXIocGFyZW50LCBvdXRlclZhbHVlLCBvdXRlckluZGV4KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgX3RoaXMub3V0ZXJWYWx1ZSA9IG91dGVyVmFsdWU7XG4gICAgICAgIF90aGlzLm91dGVySW5kZXggPSBvdXRlckluZGV4O1xuICAgICAgICBfdGhpcy5pbmRleCA9IDA7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgSW5uZXJTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnBhcmVudC5ub3RpZnlOZXh0KHRoaXMub3V0ZXJWYWx1ZSwgdmFsdWUsIHRoaXMub3V0ZXJJbmRleCwgdGhpcy5pbmRleCsrLCB0aGlzKTtcbiAgICB9O1xuICAgIElubmVyU3Vic2NyaWJlci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIHRoaXMucGFyZW50Lm5vdGlmeUVycm9yKGVycm9yLCB0aGlzKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgSW5uZXJTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGFyZW50Lm5vdGlmeUNvbXBsZXRlKHRoaXMpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gSW5uZXJTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyKSk7XG5leHBvcnQgeyBJbm5lclN1YnNjcmliZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlubmVyU3Vic2NyaWJlci5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL0lubmVyU3Vic2NyaWJlci5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfb2JzZXJ2YWJsZV9lbXB0eSxfb2JzZXJ2YWJsZV9vZixfb2JzZXJ2YWJsZV90aHJvd0Vycm9yIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IGVtcHR5IH0gZnJvbSAnLi9vYnNlcnZhYmxlL2VtcHR5JztcbmltcG9ydCB7IG9mIH0gZnJvbSAnLi9vYnNlcnZhYmxlL29mJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICcuL29ic2VydmFibGUvdGhyb3dFcnJvcic7XG52YXIgTm90aWZpY2F0aW9uID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5vdGlmaWNhdGlvbihraW5kLCB2YWx1ZSwgZXJyb3IpIHtcbiAgICAgICAgdGhpcy5raW5kID0ga2luZDtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgIHRoaXMuaGFzVmFsdWUgPSBraW5kID09PSAnTic7XG4gICAgfVxuICAgIE5vdGlmaWNhdGlvbi5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICBzd2l0Y2ggKHRoaXMua2luZCkge1xuICAgICAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLm5leHQgJiYgb2JzZXJ2ZXIubmV4dCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvciAmJiBvYnNlcnZlci5lcnJvcih0aGlzLmVycm9yKTtcbiAgICAgICAgICAgIGNhc2UgJ0MnOlxuICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5jb21wbGV0ZSAmJiBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb3RpZmljYXRpb24ucHJvdG90eXBlLmRvID0gZnVuY3Rpb24gKG5leHQsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgICAgICB2YXIga2luZCA9IHRoaXMua2luZDtcbiAgICAgICAgc3dpdGNoIChraW5kKSB7XG4gICAgICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dCAmJiBuZXh0KHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yICYmIGVycm9yKHRoaXMuZXJyb3IpO1xuICAgICAgICAgICAgY2FzZSAnQyc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRlICYmIGNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vdGlmaWNhdGlvbi5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24gKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgaWYgKG5leHRPck9ic2VydmVyICYmIHR5cGVvZiBuZXh0T3JPYnNlcnZlci5uZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYnNlcnZlKG5leHRPck9ic2VydmVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRvKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb3RpZmljYXRpb24ucHJvdG90eXBlLnRvT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGtpbmQgPSB0aGlzLmtpbmQ7XG4gICAgICAgIHN3aXRjaCAoa2luZCkge1xuICAgICAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IodGhpcy5lcnJvcik7XG4gICAgICAgICAgICBjYXNlICdDJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgbm90aWZpY2F0aW9uIGtpbmQgdmFsdWUnKTtcbiAgICB9O1xuICAgIE5vdGlmaWNhdGlvbi5jcmVhdGVOZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE5vdGlmaWNhdGlvbignTicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTm90aWZpY2F0aW9uLnVuZGVmaW5lZFZhbHVlTm90aWZpY2F0aW9uO1xuICAgIH07XG4gICAgTm90aWZpY2F0aW9uLmNyZWF0ZUVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICByZXR1cm4gbmV3IE5vdGlmaWNhdGlvbignRScsIHVuZGVmaW5lZCwgZXJyKTtcbiAgICB9O1xuICAgIE5vdGlmaWNhdGlvbi5jcmVhdGVDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE5vdGlmaWNhdGlvbi5jb21wbGV0ZU5vdGlmaWNhdGlvbjtcbiAgICB9O1xuICAgIE5vdGlmaWNhdGlvbi5jb21wbGV0ZU5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24oJ0MnKTtcbiAgICBOb3RpZmljYXRpb24udW5kZWZpbmVkVmFsdWVOb3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKCdOJywgdW5kZWZpbmVkKTtcbiAgICByZXR1cm4gTm90aWZpY2F0aW9uO1xufSgpKTtcbmV4cG9ydCB7IE5vdGlmaWNhdGlvbiB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Tm90aWZpY2F0aW9uLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvTm90aWZpY2F0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9jb25maWcsX3V0aWxfaG9zdFJlcG9ydEVycm9yIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGhvc3RSZXBvcnRFcnJvciB9IGZyb20gJy4vdXRpbC9ob3N0UmVwb3J0RXJyb3InO1xuZXhwb3J0IHZhciBlbXB0eSA9IHtcbiAgICBjbG9zZWQ6IHRydWUsXG4gICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7IH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBob3N0UmVwb3J0RXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHsgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9ic2VydmVyLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvT2JzZXJ2ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBTY2hlZHVsZXIgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2NoZWR1bGVyKFNjaGVkdWxlckFjdGlvbiwgbm93KSB7XG4gICAgICAgIGlmIChub3cgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgbm93ID0gU2NoZWR1bGVyLm5vdztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLlNjaGVkdWxlckFjdGlvbiA9IFNjaGVkdWxlckFjdGlvbjtcbiAgICAgICAgdGhpcy5ub3cgPSBub3c7XG4gICAgfVxuICAgIFNjaGVkdWxlci5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAod29yaywgZGVsYXksIHN0YXRlKSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBkZWxheSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLlNjaGVkdWxlckFjdGlvbih0aGlzLCB3b3JrKS5zY2hlZHVsZShzdGF0ZSwgZGVsYXkpO1xuICAgIH07XG4gICAgU2NoZWR1bGVyLm5vdyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIERhdGUubm93KCk7IH07XG4gICAgcmV0dXJuIFNjaGVkdWxlcjtcbn0oKSk7XG5leHBvcnQgeyBTY2hlZHVsZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNjaGVkdWxlci5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL1NjaGVkdWxlci5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCB0c2xpYixfU3Vic2NyaXB0aW9uIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG52YXIgU3ViamVjdFN1YnNjcmlwdGlvbiA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhTdWJqZWN0U3Vic2NyaXB0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN1YmplY3RTdWJzY3JpcHRpb24oc3ViamVjdCwgc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICAgICAgX3RoaXMuc3Vic2NyaWJlciA9IHN1YnNjcmliZXI7XG4gICAgICAgIF90aGlzLmNsb3NlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFN1YmplY3RTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gdGhpcy5zdWJqZWN0O1xuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gc3ViamVjdC5vYnNlcnZlcnM7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IG51bGw7XG4gICAgICAgIGlmICghb2JzZXJ2ZXJzIHx8IG9ic2VydmVycy5sZW5ndGggPT09IDAgfHwgc3ViamVjdC5pc1N0b3BwZWQgfHwgc3ViamVjdC5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3Vic2NyaWJlckluZGV4ID0gb2JzZXJ2ZXJzLmluZGV4T2YodGhpcy5zdWJzY3JpYmVyKTtcbiAgICAgICAgaWYgKHN1YnNjcmliZXJJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2Uoc3Vic2NyaWJlckluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFN1YmplY3RTdWJzY3JpcHRpb247XG59KFN1YnNjcmlwdGlvbikpO1xuZXhwb3J0IHsgU3ViamVjdFN1YnNjcmlwdGlvbiB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3ViamVjdFN1YnNjcmlwdGlvbi5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL1N1YmplY3RTdWJzY3JpcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUsX2Zyb20sX2VtcHR5IFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGZyb20gfSBmcm9tICcuL2Zyb20nO1xuaW1wb3J0IHsgZW1wdHkgfSBmcm9tICcuL2VtcHR5JztcbmV4cG9ydCBmdW5jdGlvbiBkZWZlcihvYnNlcnZhYmxlRmFjdG9yeSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaW5wdXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpbnB1dCA9IG9ic2VydmFibGVGYWN0b3J5KCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc291cmNlID0gaW5wdXQgPyBmcm9tKGlucHV0KSA6IGVtcHR5KCk7XG4gICAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVmZXIuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2RlZmVyLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9PYnNlcnZhYmxlLF91dGlsX25vb3AgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJy4uL3V0aWwvbm9vcCc7XG5leHBvcnQgdmFyIE5FVkVSID0gLypAX19QVVJFX18qLyBuZXcgT2JzZXJ2YWJsZShub29wKTtcbmV4cG9ydCBmdW5jdGlvbiBuZXZlcigpIHtcbiAgICByZXR1cm4gTkVWRVI7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uZXZlci5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvbmV2ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93RXJyb3IoZXJyb3IsIHNjaGVkdWxlcikge1xuICAgIGlmICghc2NoZWR1bGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnJvcik7IH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7IHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2gsIDAsIHsgZXJyb3I6IGVycm9yLCBzdWJzY3JpYmVyOiBzdWJzY3JpYmVyIH0pOyB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBkaXNwYXRjaChfYSkge1xuICAgIHZhciBlcnJvciA9IF9hLmVycm9yLCBzdWJzY3JpYmVyID0gX2Euc3Vic2NyaWJlcjtcbiAgICBzdWJzY3JpYmVyLmVycm9yKGVycm9yKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRocm93RXJyb3IuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL3Rocm93RXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX21lcmdlTWFwLF91dGlsX2lkZW50aXR5IFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAnLi9tZXJnZU1hcCc7XG5pbXBvcnQgeyBpZGVudGl0eSB9IGZyb20gJy4uL3V0aWwvaWRlbnRpdHknO1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQWxsKGNvbmN1cnJlbnQpIHtcbiAgICBpZiAoY29uY3VycmVudCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbmN1cnJlbnQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgfVxuICAgIHJldHVybiBtZXJnZU1hcChpZGVudGl0eSwgY29uY3VycmVudCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZUFsbC5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29wZXJhdG9ycy9tZXJnZUFsbC5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfUXVldWVBY3Rpb24sX1F1ZXVlU2NoZWR1bGVyIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IFF1ZXVlQWN0aW9uIH0gZnJvbSAnLi9RdWV1ZUFjdGlvbic7XG5pbXBvcnQgeyBRdWV1ZVNjaGVkdWxlciB9IGZyb20gJy4vUXVldWVTY2hlZHVsZXInO1xuZXhwb3J0IHZhciBxdWV1ZSA9IC8qQF9fUFVSRV9fKi8gbmV3IFF1ZXVlU2NoZWR1bGVyKFF1ZXVlQWN0aW9uKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXF1ZXVlLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL3F1ZXVlLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUICBQVVJFX0lNUE9SVFNfRU5EICovXG5mdW5jdGlvbiBVbnN1YnNjcmlwdGlvbkVycm9ySW1wbChlcnJvcnMpIHtcbiAgICBFcnJvci5jYWxsKHRoaXMpO1xuICAgIHRoaXMubWVzc2FnZSA9IGVycm9ycyA/XG4gICAgICAgIGVycm9ycy5sZW5ndGggKyBcIiBlcnJvcnMgb2NjdXJyZWQgZHVyaW5nIHVuc3Vic2NyaXB0aW9uOlxcblwiICsgZXJyb3JzLm1hcChmdW5jdGlvbiAoZXJyLCBpKSB7IHJldHVybiBpICsgMSArIFwiKSBcIiArIGVyci50b1N0cmluZygpOyB9KS5qb2luKCdcXG4gICcpIDogJyc7XG4gICAgdGhpcy5uYW1lID0gJ1Vuc3Vic2NyaXB0aW9uRXJyb3InO1xuICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgIHJldHVybiB0aGlzO1xufVxuVW5zdWJzY3JpcHRpb25FcnJvckltcGwucHJvdG90eXBlID0gLypAX19QVVJFX18qLyBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5leHBvcnQgdmFyIFVuc3Vic2NyaXB0aW9uRXJyb3IgPSBVbnN1YnNjcmlwdGlvbkVycm9ySW1wbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3Vic2NyaXB0aW9uRXJyb3IuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbmV4cG9ydCB2YXIgZXJyb3JPYmplY3QgPSB7IGU6IHt9IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvck9iamVjdC5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvZXJyb3JPYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbmV4cG9ydCB2YXIgaXNBcnJheUxpa2UgPSAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggJiYgdHlwZW9mIHgubGVuZ3RoID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgeCAhPT0gJ2Z1bmN0aW9uJzsgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0FycmF5TGlrZS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvaXNBcnJheUxpa2UuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX2lzQXJyYXkgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJy4vaXNBcnJheSc7XG5leHBvcnQgZnVuY3Rpb24gaXNOdW1lcmljKHZhbCkge1xuICAgIHJldHVybiAhaXNBcnJheSh2YWwpICYmICh2YWwgLSBwYXJzZUZsb2F0KHZhbCkgKyAxKSA+PSAwO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNOdW1lcmljLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9pc051bWVyaWMuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gICAgcmV0dXJuIHggIT0gbnVsbCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCc7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc09iamVjdC5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvaXNPYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb21pc2UodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzUHJvbWlzZS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvaXNQcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9ub29wIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IG5vb3AgfSBmcm9tICcuL25vb3AnO1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgdmFyIGZucyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGZuc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gcGlwZUZyb21BcnJheShmbnMpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBpcGVGcm9tQXJyYXkoZm5zKSB7XG4gICAgaWYgKCFmbnMpIHtcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuICAgIGlmIChmbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmbnNbMF07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBwaXBlZChpbnB1dCkge1xuICAgICAgICByZXR1cm4gZm5zLnJlZHVjZShmdW5jdGlvbiAocHJldiwgZm4pIHsgcmV0dXJuIGZuKHByZXYpOyB9LCBpbnB1dCk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBpcGUuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL3BpcGUuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUsX3N1YnNjcmliZVRvQXJyYXksX3N1YnNjcmliZVRvUHJvbWlzZSxfc3Vic2NyaWJlVG9JdGVyYWJsZSxfc3Vic2NyaWJlVG9PYnNlcnZhYmxlLF9pc0FycmF5TGlrZSxfaXNQcm9taXNlLF9pc09iamVjdCxfc3ltYm9sX2l0ZXJhdG9yLF9zeW1ib2xfb2JzZXJ2YWJsZSBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb0FycmF5IH0gZnJvbSAnLi9zdWJzY3JpYmVUb0FycmF5JztcbmltcG9ydCB7IHN1YnNjcmliZVRvUHJvbWlzZSB9IGZyb20gJy4vc3Vic2NyaWJlVG9Qcm9taXNlJztcbmltcG9ydCB7IHN1YnNjcmliZVRvSXRlcmFibGUgfSBmcm9tICcuL3N1YnNjcmliZVRvSXRlcmFibGUnO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9PYnNlcnZhYmxlIH0gZnJvbSAnLi9zdWJzY3JpYmVUb09ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICcuL2lzQXJyYXlMaWtlJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJy4vaXNQcm9taXNlJztcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi9pc09iamVjdCc7XG5pbXBvcnQgeyBpdGVyYXRvciBhcyBTeW1ib2xfaXRlcmF0b3IgfSBmcm9tICcuLi9zeW1ib2wvaXRlcmF0b3InO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4uL3N5bWJvbC9vYnNlcnZhYmxlJztcbmV4cG9ydCB2YXIgc3Vic2NyaWJlVG8gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0Ll9pc1NjYWxhcikge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0W1N5bWJvbF9vYnNlcnZhYmxlXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlVG9PYnNlcnZhYmxlKHJlc3VsdCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzQXJyYXlMaWtlKHJlc3VsdCkpIHtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZVRvQXJyYXkocmVzdWx0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZVRvUHJvbWlzZShyZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdFtTeW1ib2xfaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBzdWJzY3JpYmVUb0l0ZXJhYmxlKHJlc3VsdCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgdmFsdWUgPSBpc09iamVjdChyZXN1bHQpID8gJ2FuIGludmFsaWQgb2JqZWN0JyA6IFwiJ1wiICsgcmVzdWx0ICsgXCInXCI7XG4gICAgICAgIHZhciBtc2cgPSBcIllvdSBwcm92aWRlZCBcIiArIHZhbHVlICsgXCIgd2hlcmUgYSBzdHJlYW0gd2FzIGV4cGVjdGVkLlwiXG4gICAgICAgICAgICArICcgWW91IGNhbiBwcm92aWRlIGFuIE9ic2VydmFibGUsIFByb21pc2UsIEFycmF5LCBvciBJdGVyYWJsZS4nO1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKG1zZyk7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN1YnNjcmliZVRvLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9zdWJzY3JpYmVUby5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCAgUFVSRV9JTVBPUlRTX0VORCAqL1xuZXhwb3J0IHZhciBzdWJzY3JpYmVUb0FycmF5ID0gZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW4gJiYgIXN1YnNjcmliZXIuY2xvc2VkOyBpKyspIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChhcnJheVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdWJzY3JpYmVUb0FycmF5LmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9zdWJzY3JpYmVUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9zeW1ib2xfaXRlcmF0b3IgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgaXRlcmF0b3IgYXMgU3ltYm9sX2l0ZXJhdG9yIH0gZnJvbSAnLi4vc3ltYm9sL2l0ZXJhdG9yJztcbmV4cG9ydCB2YXIgc3Vic2NyaWJlVG9JdGVyYWJsZSA9IGZ1bmN0aW9uIChpdGVyYWJsZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYWJsZVtTeW1ib2xfaXRlcmF0b3JdKCk7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgaWYgKGl0ZW0uZG9uZSkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChpdGVtLnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0cnVlKTtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVyYXRvci5yZXR1cm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJzY3JpYmVyO1xuICAgIH07XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3Vic2NyaWJlVG9JdGVyYWJsZS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvc3Vic2NyaWJlVG9JdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfc3ltYm9sX29ic2VydmFibGUgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4uL3N5bWJvbC9vYnNlcnZhYmxlJztcbmV4cG9ydCB2YXIgc3Vic2NyaWJlVG9PYnNlcnZhYmxlID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgb2JzID0gb2JqW1N5bWJvbF9vYnNlcnZhYmxlXSgpO1xuICAgICAgICBpZiAodHlwZW9mIG9icy5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb3ZpZGVkIG9iamVjdCBkb2VzIG5vdCBjb3JyZWN0bHkgaW1wbGVtZW50IFN5bWJvbC5vYnNlcnZhYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2JzLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3Vic2NyaWJlVG9PYnNlcnZhYmxlLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9zdWJzY3JpYmVUb09ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX2hvc3RSZXBvcnRFcnJvciBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBob3N0UmVwb3J0RXJyb3IgfSBmcm9tICcuL2hvc3RSZXBvcnRFcnJvcic7XG5leHBvcnQgdmFyIHN1YnNjcmliZVRvUHJvbWlzZSA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnIpOyB9KVxuICAgICAgICAgICAgLnRoZW4obnVsbCwgaG9zdFJlcG9ydEVycm9yKTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdWJzY3JpYmVUb1Byb21pc2UuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL3N1YnNjcmliZVRvUHJvbWlzZS5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbmltcG9ydCB7IFJlc291cmNlUHJvdmlkZXJzIH0gZnJvbSAnLi9zcmMvUmVzb3VyY2VQcm92aWRlcnMnO1xuXG5leHBvcnQgKiBmcm9tICcuL3NyYy9SZXNvdXJjZSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9SZXNvdXJjZUFjdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9SZXNvdXJjZUNSVUQnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvUmVzb3VyY2VDUlVEQmFzZSc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9SZXNvdXJjZUdsb2JhbENvbmZpZyc7XG5leHBvcnQgKiBmcm9tICcuL3NyYy9SZXNvdXJjZU1vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vc3JjL1Jlc291cmNlT0RBVEEnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvUmVzb3VyY2VQYXJhbXMnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvUmVzb3VyY2VQcm92aWRlcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvSW50ZXJmYWNlcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEh0dHBNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBSZXNvdXJjZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogUmVzb3VyY2VQcm92aWRlcnMucHJvdmlkZXJzW1Jlc291cmNlUHJvdmlkZXJzLm1haW5Qcm92aWRlcnNOYW1lXVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQoc3ViU2V0OiBzdHJpbmcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFJlc291cmNlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBSZXNvdXJjZVByb3ZpZGVycy5wcm92aWRlcnNbc3ViU2V0XSA/IFJlc291cmNlUHJvdmlkZXJzLnByb3ZpZGVyc1tzdWJTZXRdIDogW11cbiAgICB9O1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL2luZGV4LnRzIiwiZXhwb3J0ICogZnJvbSAnLi9pbmRleCc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9+L3RzbGludC1sb2FkZXIhLi9uZ3gtcmVzb3VyY2UudHMiLCJpbXBvcnQgeyBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbmltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnLi9SZXNvdXJjZSc7XG5pbXBvcnQgeyBSZXNvdXJjZU1ldGhvZCB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBSZXNvdXJjZUFjdGlvbiB9IGZyb20gJy4vUmVzb3VyY2VBY3Rpb24nO1xuXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDUlVEPFRRdWVyeSwgVFNob3J0LCBURnVsbD4gZXh0ZW5kcyBSZXNvdXJjZSB7XG5cbiAgQFJlc291cmNlQWN0aW9uKHtcbiAgICBpc0FycmF5OiB0cnVlXG4gIH0pXG4gIHF1ZXJ5OiBSZXNvdXJjZU1ldGhvZDxUUXVlcnksIFRTaG9ydFtdPjtcblxuICBAUmVzb3VyY2VBY3Rpb24oe1xuICAgIHBhdGg6ICcveyFpZH0nXG4gIH0pXG4gIGdldDogUmVzb3VyY2VNZXRob2Q8eyBpZDogYW55IH0sIFRGdWxsPjtcblxuICBAUmVzb3VyY2VBY3Rpb24oe1xuICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZC5Qb3N0XG4gIH0pXG4gIHNhdmU6IFJlc291cmNlTWV0aG9kPFRGdWxsLCBURnVsbD47XG5cbiAgQFJlc291cmNlQWN0aW9uKHtcbiAgICBtZXRob2Q6IFJlcXVlc3RNZXRob2QuUHV0LFxuICAgIHBhdGg6ICcveyFpZH0nXG4gIH0pXG4gIHVwZGF0ZTogUmVzb3VyY2VNZXRob2Q8VEZ1bGwsIFRGdWxsPjtcblxuICBAUmVzb3VyY2VBY3Rpb24oe1xuICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZC5EZWxldGUsXG4gICAgcGF0aDogJy97IWlkfSdcbiAgfSlcbiAgcmVtb3ZlOiBSZXNvdXJjZU1ldGhvZDx7IGlkOiBhbnkgfSwgYW55PjtcblxuICAvLyBBbGlhcyB0byBzYXZlXG4gIGNyZWF0ZShkYXRhOiBURnVsbCwgY2FsbGJhY2s/OiAocmVzOiBURnVsbCkgPT4gYW55KTogVEZ1bGwge1xuICAgIHJldHVybiB0aGlzLnNhdmUoZGF0YSwgY2FsbGJhY2spO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL3NyYy9SZXNvdXJjZUNSVUQudHMiLCJpbXBvcnQgeyBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbmltcG9ydCB7IFJlc291cmNlIH0gZnJvbSAnLi9SZXNvdXJjZSc7XG5pbXBvcnQgeyBSZXNvdXJjZU1ldGhvZCB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBSZXNvdXJjZUFjdGlvbiB9IGZyb20gJy4vUmVzb3VyY2VBY3Rpb24nO1xuXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDUlVEQmFzZTxUUXVlcnksIFRLZXlzLCBUU2hvcnQsIFRGdWxsPiBleHRlbmRzIFJlc291cmNlIHtcblxuICBAUmVzb3VyY2VBY3Rpb24oe1xuICAgIGlzQXJyYXk6IHRydWVcbiAgfSlcbiAgcXVlcnk6IFJlc291cmNlTWV0aG9kPFRRdWVyeSwgVFNob3J0W10+O1xuXG4gIEBSZXNvdXJjZUFjdGlvbigpXG4gIGdldDogUmVzb3VyY2VNZXRob2Q8VEtleXMsIFRGdWxsPjtcblxuICBAUmVzb3VyY2VBY3Rpb24oe1xuICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZC5Qb3N0XG4gIH0pXG4gIHNhdmU6IFJlc291cmNlTWV0aG9kPFRGdWxsLCBURnVsbD47XG5cbiAgQFJlc291cmNlQWN0aW9uKHtcbiAgICBtZXRob2Q6IFJlcXVlc3RNZXRob2QuUHV0XG4gIH0pXG4gIHVwZGF0ZTogUmVzb3VyY2VNZXRob2Q8VEZ1bGwsIFRGdWxsPjtcblxuICBAUmVzb3VyY2VBY3Rpb24oe1xuICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZC5EZWxldGVcbiAgfSlcbiAgcmVtb3ZlOiBSZXNvdXJjZU1ldGhvZDxUS2V5cywgYW55PjtcblxuICAvLyBBbGlhcyB0byBzYXZlXG4gIGNyZWF0ZShkYXRhOiBURnVsbCwgY2FsbGJhY2s/OiAocmVzOiBURnVsbCkgPT4gYW55KTogVEZ1bGwge1xuICAgIHJldHVybiB0aGlzLnNhdmUoZGF0YSwgY2FsbGJhY2spO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL3NyYy9SZXNvdXJjZUNSVURCYXNlLnRzIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUmVzb3VyY2UgfSBmcm9tICcuL1Jlc291cmNlJztcblxuXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VNb2RlbDxSPiB7XG5cbiAgJHJlc29sdmVkOiBib29sZWFuO1xuICAkb2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+O1xuICAkYWJvcnRSZXF1ZXN0OiAoKSA9PiB2b2lkO1xuICAkcmVzb3VyY2U6IFI7XG5cbiAgcHVibGljICRzZXREYXRhKGRhdGE6IGFueSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgJHNhdmUoKSB7XG5cbiAgICBpZiAodGhpcy5pc05ldygpKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLiR1cGRhdGUoKTtcbiAgICB9XG5cbiAgfVxuXG4gIHB1YmxpYyAkY3JlYXRlKCkge1xuICAgIHJldHVybiB0aGlzLiRyZXNvdXJjZV9tZXRob2QoJ2NyZWF0ZScpO1xuICB9XG5cbiAgcHVibGljICR1cGRhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuJHJlc291cmNlX21ldGhvZCgndXBkYXRlJyk7XG4gIH1cblxuICBwdWJsaWMgJHJlbW92ZSgpIHtcbiAgICByZXR1cm4gdGhpcy4kcmVzb3VyY2VfbWV0aG9kKCdyZW1vdmUnKTtcbiAgfVxuXG4gIHB1YmxpYyB0b0pTT04oKTphbnkge1xuICAgIHJldHVybiBSZXNvdXJjZS4kY2xlYW5EYXRhKHRoaXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzTmV3KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKDxhbnk+dGhpcylbJ2lkJ107XG4gIH1cblxuICBwcml2YXRlICRyZXNvdXJjZV9tZXRob2QobWV0aG9kTmFtZTogc3RyaW5nKSB7XG5cbiAgICBpZiAoIXRoaXMuJHJlc291cmNlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBZb3VyIFJlc291cmNlIGlzIG5vdCBzZXQuIFBsZWFzZSB1c2UgcmVzb3VyY2UuY3JlYXRlTW9kZWwoKSBtZXRob2QgdG8gY3JlYXRlIG1vZGVsLmApO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKCEoPGFueT50aGlzLiRyZXNvdXJjZSlbbWV0aG9kTmFtZV0pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFlvdXIgUmVzb3VyY2UgaGFzIG5vIGltcGxlbWVudGVkICR7bWV0aG9kTmFtZX0gbWV0aG9kLmApO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgKDxhbnk+dGhpcy4kcmVzb3VyY2UpW21ldGhvZE5hbWVdKHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL3NyYy9SZXNvdXJjZU1vZGVsLnRzIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVxdWVzdE1ldGhvZCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvc3JjL3R5cGUnO1xuXG5pbXBvcnQgeyBSZXNvdXJjZSB9IGZyb20gJy4vUmVzb3VyY2UnO1xuaW1wb3J0IHsgUmVzb3VyY2VNZXRob2QsIFJlc291cmNlUGFyYW1zQmFzZSB9IGZyb20gJy4vSW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBSZXNvdXJjZUFjdGlvbiB9IGZyb20gJy4vUmVzb3VyY2VBY3Rpb24nO1xuaW1wb3J0IHsgUmVzb3VyY2VQYXJhbXMgfSBmcm9tICcuL1Jlc291cmNlUGFyYW1zJztcblxuLyoqXG4gKiBBIE9EQVRBIG9iamVjdCBmb3IgcXVlcnlpbmcgZW50aXRpZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVJlc291cmNlT0RBVEFRdWVyeSB7XG4gICRmaWx0ZXI/OiBzdHJpbmc7XG4gICRzZWFyY2g/OiBzdHJpbmc7XG4gICRleHBhbmQ/OiBzdHJpbmc7XG4gICRsaW1pdD86IG51bWJlcjtcbn1cblxuLyoqIEEgT0RBVEEgb2JqZWN0IGZvciBxdWVyeWluZyBhIHNpbmdsZSBlbnRpdHkuICovXG5leHBvcnQgaW50ZXJmYWNlIElSZXNvdXJjZU9EQVRBUXVlcnlTaW5nbGUgZXh0ZW5kcyBJUmVzb3VyY2VPREFUQVF1ZXJ5IHtcbiAgaWQ6IGFueTtcbn1cblxuLyoqIEEgUmVzb3VyY2UgYmFzZSBjbGFzcyBmb3IgT0RBVEEgZW50aXRpZXMuIFRvIGNyZWF0ZSBhIHJlc291cmNlIGlzIGp1c3RcbiAqIGVub3VnaCB0byBleHRlbmQgdGhpcyBjbGFzcyBhbmQgYWxsIHRoZSBiYXNlIE9EQVRBIGZ1bmN0aW9uYWxpdGllcyB3aWxsIGJlIHByZXNlbnQuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZXNvdXJjZU9EQVRBPFI+IGV4dGVuZHMgUmVzb3VyY2Uge1xuICBAUmVzb3VyY2VBY3Rpb24oe1xuICAgIHBhdGg6ICcveyFpZH0nXG4gIH0pXG4gIGdldDogUmVzb3VyY2VNZXRob2Q8SVJlc291cmNlT0RBVEFRdWVyeVNpbmdsZSwgUj47XG5cbiAgQFJlc291cmNlQWN0aW9uKHtcbiAgICBtZXRob2Q6IFJlcXVlc3RNZXRob2QuUG9zdFxuICB9KVxuICBzYXZlOiBSZXNvdXJjZU1ldGhvZDxSLCBSPjtcblxuICBAUmVzb3VyY2VBY3Rpb24oe1xuICAgIHBhcmFtczoge1xuICAgICAgXCIkZmlsdGVyXCI6IFwiQCRmaWx0ZXJcIixcbiAgICAgIFwiJHNlYXJjaFwiOiBcIkAkc2VhcmNoXCIsXG4gICAgICBcIiRleHBhbmRcIjogXCJAJGV4cGFuZFwiLFxuICAgICAgXCIkbGltaXRcIjogXCJAJGxpbWl0XCIsXG4gICAgICBcInF1ZXJ5XCI6IFwiQHF1ZXJ5XCJcbiAgICB9LFxuICAgIGlzQXJyYXk6IHRydWVcbiAgfSlcbiAgc2VhcmNoOiBSZXNvdXJjZU1ldGhvZDxJUmVzb3VyY2VPREFUQVF1ZXJ5LCBSW10+O1xuXG4gICRnZXRVcmwoKTogc3RyaW5nIHwgUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gc3VwZXIuJGdldFVybCgpICsgXCIvXCIgKyB0aGlzLmdldEVudGl0eVNldE5hbWUoKTtcbiAgfVxuXG4gIGdldEVudGl0eU5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RW50aXR5U2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbnRpdHlOYW1lKCkgKyBcInNcIjtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlc291cmNlT0RBVEFQYXJhbXNCYXNlIGV4dGVuZHMgUmVzb3VyY2VQYXJhbXNCYXNlIHtcbiAgLyoqIFRoZSBlbnRpdHkgYXNzb2NpYXRlZCB3aXRoIHRoaXMgcmVzb3VyY2UuICovXG4gIGVudGl0eTogYW55O1xuICAvKiogVGhlIGVudGl0eSBuYW1lIGluIGNhc2UgaXQgaXMgZGlmZmVyZW50IHRoYW4gdGhlIGVudGl0eS5cbiAgICogSXQgaXMgZ29vZCB0byBzcGVjaWZ5IGl0IGFzIHRoZSBlbnRpdHkgY291bGQgYmUgbWluaWZpZWQuXG4gICAqL1xuICBuYW1lPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEEgT0RBVEEgYW5ub3RhdGlvbiBmb3IgYSByZXNvdXJjZSBmb3IgYSBPREFUQSBlbnRpdHkgcmVzb3VyY2UgZXh0ZW5kaW5nIHtAbGluayBSZXNvdXJjZU9EQVRBfS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJlc291cmNlT0RBVEFQYXJhbXMocGFyYW1zOiBSZXNvdXJjZU9EQVRBUGFyYW1zQmFzZSkge1xuICBjb25zdCBpbmplY3RhYmxlID0gSW5qZWN0YWJsZSgpO1xuICBjb25zdCB6dXBlciA9IFJlc291cmNlUGFyYW1zKHBhcmFtcyk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQ6IFR5cGU8UmVzb3VyY2U+KSB7XG4gICAgaW5qZWN0YWJsZSh0YXJnZXQpO1xuICAgIHp1cGVyKHRhcmdldCk7XG4gICAgdGFyZ2V0LnByb3RvdHlwZS5nZXRFbnRpdHlOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHBhcmFtcy5uYW1lKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMubmFtZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0eXBlb2YgcGFyYW1zLmVudGl0eSA9PT0gXCJzdHJpbmdcIiA/IHBhcmFtcy5lbnRpdHkgOiBwYXJhbXMuZW50aXR5Lm5hbWU7XG4gICAgfTtcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL34vdHNsaW50LWxvYWRlciEuL3NyYy9SZXNvdXJjZU9EQVRBLnRzIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCAgUFVSRV9JTVBPUlRTX0VORCAqL1xuZXhwb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4vaW50ZXJuYWwvT2JzZXJ2YWJsZSc7XG5leHBvcnQgeyBDb25uZWN0YWJsZU9ic2VydmFibGUgfSBmcm9tICcuL2ludGVybmFsL29ic2VydmFibGUvQ29ubmVjdGFibGVPYnNlcnZhYmxlJztcbmV4cG9ydCB7IEdyb3VwZWRPYnNlcnZhYmxlIH0gZnJvbSAnLi9pbnRlcm5hbC9vcGVyYXRvcnMvZ3JvdXBCeSc7XG5leHBvcnQgeyBvYnNlcnZhYmxlIH0gZnJvbSAnLi9pbnRlcm5hbC9zeW1ib2wvb2JzZXJ2YWJsZSc7XG5leHBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi9pbnRlcm5hbC9TdWJqZWN0JztcbmV4cG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJy4vaW50ZXJuYWwvQmVoYXZpb3JTdWJqZWN0JztcbmV4cG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICcuL2ludGVybmFsL1JlcGxheVN1YmplY3QnO1xuZXhwb3J0IHsgQXN5bmNTdWJqZWN0IH0gZnJvbSAnLi9pbnRlcm5hbC9Bc3luY1N1YmplY3QnO1xuZXhwb3J0IHsgYXNhcCBhcyBhc2FwU2NoZWR1bGVyIH0gZnJvbSAnLi9pbnRlcm5hbC9zY2hlZHVsZXIvYXNhcCc7XG5leHBvcnQgeyBhc3luYyBhcyBhc3luY1NjaGVkdWxlciB9IGZyb20gJy4vaW50ZXJuYWwvc2NoZWR1bGVyL2FzeW5jJztcbmV4cG9ydCB7IHF1ZXVlIGFzIHF1ZXVlU2NoZWR1bGVyIH0gZnJvbSAnLi9pbnRlcm5hbC9zY2hlZHVsZXIvcXVldWUnO1xuZXhwb3J0IHsgYW5pbWF0aW9uRnJhbWUgYXMgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgfSBmcm9tICcuL2ludGVybmFsL3NjaGVkdWxlci9hbmltYXRpb25GcmFtZSc7XG5leHBvcnQgeyBWaXJ0dWFsVGltZVNjaGVkdWxlciwgVmlydHVhbEFjdGlvbiB9IGZyb20gJy4vaW50ZXJuYWwvc2NoZWR1bGVyL1ZpcnR1YWxUaW1lU2NoZWR1bGVyJztcbmV4cG9ydCB7IFNjaGVkdWxlciB9IGZyb20gJy4vaW50ZXJuYWwvU2NoZWR1bGVyJztcbmV4cG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vaW50ZXJuYWwvU3Vic2NyaXB0aW9uJztcbmV4cG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuL2ludGVybmFsL1N1YnNjcmliZXInO1xuZXhwb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9pbnRlcm5hbC9Ob3RpZmljYXRpb24nO1xuZXhwb3J0IHsgcGlwZSB9IGZyb20gJy4vaW50ZXJuYWwvdXRpbC9waXBlJztcbmV4cG9ydCB7IG5vb3AgfSBmcm9tICcuL2ludGVybmFsL3V0aWwvbm9vcCc7XG5leHBvcnQgeyBpZGVudGl0eSB9IGZyb20gJy4vaW50ZXJuYWwvdXRpbC9pZGVudGl0eSc7XG5leHBvcnQgeyBpc09ic2VydmFibGUgfSBmcm9tICcuL2ludGVybmFsL3V0aWwvaXNPYnNlcnZhYmxlJztcbmV4cG9ydCB7IEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yIH0gZnJvbSAnLi9pbnRlcm5hbC91dGlsL0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yJztcbmV4cG9ydCB7IEVtcHR5RXJyb3IgfSBmcm9tICcuL2ludGVybmFsL3V0aWwvRW1wdHlFcnJvcic7XG5leHBvcnQgeyBPYmplY3RVbnN1YnNjcmliZWRFcnJvciB9IGZyb20gJy4vaW50ZXJuYWwvdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG5leHBvcnQgeyBVbnN1YnNjcmlwdGlvbkVycm9yIH0gZnJvbSAnLi9pbnRlcm5hbC91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3InO1xuZXhwb3J0IHsgVGltZW91dEVycm9yIH0gZnJvbSAnLi9pbnRlcm5hbC91dGlsL1RpbWVvdXRFcnJvcic7XG5leHBvcnQgeyBiaW5kQ2FsbGJhY2sgfSBmcm9tICcuL2ludGVybmFsL29ic2VydmFibGUvYmluZENhbGxiYWNrJztcbmV4cG9ydCB7IGJpbmROb2RlQ2FsbGJhY2sgfSBmcm9tICcuL2ludGVybmFsL29ic2VydmFibGUvYmluZE5vZGVDYWxsYmFjayc7XG5leHBvcnQgeyBjb21iaW5lTGF0ZXN0IH0gZnJvbSAnLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2NvbWJpbmVMYXRlc3QnO1xuZXhwb3J0IHsgY29uY2F0IH0gZnJvbSAnLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2NvbmNhdCc7XG5leHBvcnQgeyBkZWZlciB9IGZyb20gJy4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9kZWZlcic7XG5leHBvcnQgeyBlbXB0eSB9IGZyb20gJy4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9lbXB0eSc7XG5leHBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJy4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9mb3JrSm9pbic7XG5leHBvcnQgeyBmcm9tIH0gZnJvbSAnLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb20nO1xuZXhwb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAnLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5leHBvcnQgeyBmcm9tRXZlbnRQYXR0ZXJuIH0gZnJvbSAnLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21FdmVudFBhdHRlcm4nO1xuZXhwb3J0IHsgZ2VuZXJhdGUgfSBmcm9tICcuL2ludGVybmFsL29ic2VydmFibGUvZ2VuZXJhdGUnO1xuZXhwb3J0IHsgaWlmIH0gZnJvbSAnLi9pbnRlcm5hbC9vYnNlcnZhYmxlL2lpZic7XG5leHBvcnQgeyBpbnRlcnZhbCB9IGZyb20gJy4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9pbnRlcnZhbCc7XG5leHBvcnQgeyBtZXJnZSB9IGZyb20gJy4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9tZXJnZSc7XG5leHBvcnQgeyBuZXZlciB9IGZyb20gJy4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9uZXZlcic7XG5leHBvcnQgeyBvZiB9IGZyb20gJy4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9vZic7XG5leHBvcnQgeyBvbkVycm9yUmVzdW1lTmV4dCB9IGZyb20gJy4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9vbkVycm9yUmVzdW1lTmV4dCc7XG5leHBvcnQgeyBwYWlycyB9IGZyb20gJy4vaW50ZXJuYWwvb2JzZXJ2YWJsZS9wYWlycyc7XG5leHBvcnQgeyByYWNlIH0gZnJvbSAnLi9pbnRlcm5hbC9vYnNlcnZhYmxlL3JhY2UnO1xuZXhwb3J0IHsgcmFuZ2UgfSBmcm9tICcuL2ludGVybmFsL29ic2VydmFibGUvcmFuZ2UnO1xuZXhwb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJy4vaW50ZXJuYWwvb2JzZXJ2YWJsZS90aHJvd0Vycm9yJztcbmV4cG9ydCB7IHRpbWVyIH0gZnJvbSAnLi9pbnRlcm5hbC9vYnNlcnZhYmxlL3RpbWVyJztcbmV4cG9ydCB7IHVzaW5nIH0gZnJvbSAnLi9pbnRlcm5hbC9vYnNlcnZhYmxlL3VzaW5nJztcbmV4cG9ydCB7IHppcCB9IGZyb20gJy4vaW50ZXJuYWwvb2JzZXJ2YWJsZS96aXAnO1xuZXhwb3J0IHsgRU1QVFkgfSBmcm9tICcuL2ludGVybmFsL29ic2VydmFibGUvZW1wdHknO1xuZXhwb3J0IHsgTkVWRVIgfSBmcm9tICcuL2ludGVybmFsL29ic2VydmFibGUvbmV2ZXInO1xuZXhwb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9pbnRlcm5hbC9jb25maWcnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCB0c2xpYixfU3ViamVjdCxfdXRpbF9PYmplY3RVbnN1YnNjcmliZWRFcnJvciBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4vU3ViamVjdCc7XG5pbXBvcnQgeyBPYmplY3RVbnN1YnNjcmliZWRFcnJvciB9IGZyb20gJy4vdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG52YXIgQmVoYXZpb3JTdWJqZWN0ID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKEJlaGF2aW9yU3ViamVjdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCZWhhdmlvclN1YmplY3QoX3ZhbHVlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl92YWx1ZSA9IF92YWx1ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQmVoYXZpb3JTdWJqZWN0LnByb3RvdHlwZSwgXCJ2YWx1ZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgQmVoYXZpb3JTdWJqZWN0LnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IF9zdXBlci5wcm90b3R5cGUuX3N1YnNjcmliZS5jYWxsKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uICYmICFzdWJzY3JpcHRpb24uY2xvc2VkKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodGhpcy5fdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICBCZWhhdmlvclN1YmplY3QucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNFcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgdGhpcy50aHJvd25FcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEJlaGF2aW9yU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLm5leHQuY2FsbCh0aGlzLCB0aGlzLl92YWx1ZSA9IHZhbHVlKTtcbiAgICB9O1xuICAgIHJldHVybiBCZWhhdmlvclN1YmplY3Q7XG59KFN1YmplY3QpKTtcbmV4cG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QmVoYXZpb3JTdWJqZWN0LmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvQmVoYXZpb3JTdWJqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIHRzbGliLF9TdWJqZWN0LF9zY2hlZHVsZXJfcXVldWUsX1N1YnNjcmlwdGlvbixfb3BlcmF0b3JzX29ic2VydmVPbixfdXRpbF9PYmplY3RVbnN1YnNjcmliZWRFcnJvcixfU3ViamVjdFN1YnNjcmlwdGlvbiBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4vU3ViamVjdCc7XG5pbXBvcnQgeyBxdWV1ZSB9IGZyb20gJy4vc2NoZWR1bGVyL3F1ZXVlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE9ic2VydmVPblN1YnNjcmliZXIgfSBmcm9tICcuL29wZXJhdG9ycy9vYnNlcnZlT24nO1xuaW1wb3J0IHsgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IgfSBmcm9tICcuL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3InO1xuaW1wb3J0IHsgU3ViamVjdFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3ViamVjdFN1YnNjcmlwdGlvbic7XG52YXIgUmVwbGF5U3ViamVjdCA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhSZXBsYXlTdWJqZWN0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJlcGxheVN1YmplY3QoYnVmZmVyU2l6ZSwgd2luZG93VGltZSwgc2NoZWR1bGVyKSB7XG4gICAgICAgIGlmIChidWZmZXJTaXplID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGJ1ZmZlclNpemUgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvd1RpbWUgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgd2luZG93VGltZSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLl9ldmVudHMgPSBbXTtcbiAgICAgICAgX3RoaXMuX2luZmluaXRlVGltZVdpbmRvdyA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5fYnVmZmVyU2l6ZSA9IGJ1ZmZlclNpemUgPCAxID8gMSA6IGJ1ZmZlclNpemU7XG4gICAgICAgIF90aGlzLl93aW5kb3dUaW1lID0gd2luZG93VGltZSA8IDEgPyAxIDogd2luZG93VGltZTtcbiAgICAgICAgaWYgKHdpbmRvd1RpbWUgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuICAgICAgICAgICAgX3RoaXMuX2luZmluaXRlVGltZVdpbmRvdyA9IHRydWU7XG4gICAgICAgICAgICBfdGhpcy5uZXh0ID0gX3RoaXMubmV4dEluZmluaXRlVGltZVdpbmRvdztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLm5leHQgPSBfdGhpcy5uZXh0VGltZVdpbmRvdztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJlcGxheVN1YmplY3QucHJvdG90eXBlLm5leHRJbmZpbml0ZVRpbWVXaW5kb3cgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIF9ldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICAgIF9ldmVudHMucHVzaCh2YWx1ZSk7XG4gICAgICAgIGlmIChfZXZlbnRzLmxlbmd0aCA+IHRoaXMuX2J1ZmZlclNpemUpIHtcbiAgICAgICAgICAgIF9ldmVudHMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICBfc3VwZXIucHJvdG90eXBlLm5leHQuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBSZXBsYXlTdWJqZWN0LnByb3RvdHlwZS5uZXh0VGltZVdpbmRvdyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChuZXcgUmVwbGF5RXZlbnQodGhpcy5fZ2V0Tm93KCksIHZhbHVlKSk7XG4gICAgICAgIHRoaXMuX3RyaW1CdWZmZXJUaGVuR2V0RXZlbnRzKCk7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUubmV4dC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICB9O1xuICAgIFJlcGxheVN1YmplY3QucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgX2luZmluaXRlVGltZVdpbmRvdyA9IHRoaXMuX2luZmluaXRlVGltZVdpbmRvdztcbiAgICAgICAgdmFyIF9ldmVudHMgPSBfaW5maW5pdGVUaW1lV2luZG93ID8gdGhpcy5fZXZlbnRzIDogdGhpcy5fdHJpbUJ1ZmZlclRoZW5HZXRFdmVudHMoKTtcbiAgICAgICAgdmFyIHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgICAgICB2YXIgbGVuID0gX2V2ZW50cy5sZW5ndGg7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb247XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc1N0b3BwZWQgfHwgdGhpcy5oYXNFcnJvcikge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJqZWN0U3Vic2NyaXB0aW9uKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuYWRkKHN1YnNjcmliZXIgPSBuZXcgT2JzZXJ2ZU9uU3Vic2NyaWJlcihzdWJzY3JpYmVyLCBzY2hlZHVsZXIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoX2luZmluaXRlVGltZVdpbmRvdykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW4gJiYgIXN1YnNjcmliZXIuY2xvc2VkOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoX2V2ZW50c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbiAmJiAhc3Vic2NyaWJlci5jbG9zZWQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChfZXZlbnRzW2ldLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oYXNFcnJvcikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcih0aGlzLnRocm93bkVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICBSZXBsYXlTdWJqZWN0LnByb3RvdHlwZS5fZ2V0Tm93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuc2NoZWR1bGVyIHx8IHF1ZXVlKS5ub3coKTtcbiAgICB9O1xuICAgIFJlcGxheVN1YmplY3QucHJvdG90eXBlLl90cmltQnVmZmVyVGhlbkdldEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vdyA9IHRoaXMuX2dldE5vdygpO1xuICAgICAgICB2YXIgX2J1ZmZlclNpemUgPSB0aGlzLl9idWZmZXJTaXplO1xuICAgICAgICB2YXIgX3dpbmRvd1RpbWUgPSB0aGlzLl93aW5kb3dUaW1lO1xuICAgICAgICB2YXIgX2V2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgICAgdmFyIGV2ZW50c0NvdW50ID0gX2V2ZW50cy5sZW5ndGg7XG4gICAgICAgIHZhciBzcGxpY2VDb3VudCA9IDA7XG4gICAgICAgIHdoaWxlIChzcGxpY2VDb3VudCA8IGV2ZW50c0NvdW50KSB7XG4gICAgICAgICAgICBpZiAoKG5vdyAtIF9ldmVudHNbc3BsaWNlQ291bnRdLnRpbWUpIDwgX3dpbmRvd1RpbWUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNwbGljZUNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50c0NvdW50ID4gX2J1ZmZlclNpemUpIHtcbiAgICAgICAgICAgIHNwbGljZUNvdW50ID0gTWF0aC5tYXgoc3BsaWNlQ291bnQsIGV2ZW50c0NvdW50IC0gX2J1ZmZlclNpemUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcGxpY2VDb3VudCA+IDApIHtcbiAgICAgICAgICAgIF9ldmVudHMuc3BsaWNlKDAsIHNwbGljZUNvdW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX2V2ZW50cztcbiAgICB9O1xuICAgIHJldHVybiBSZXBsYXlTdWJqZWN0O1xufShTdWJqZWN0KSk7XG5leHBvcnQgeyBSZXBsYXlTdWJqZWN0IH07XG52YXIgUmVwbGF5RXZlbnQgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVwbGF5RXZlbnQodGltZSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy50aW1lID0gdGltZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gUmVwbGF5RXZlbnQ7XG59KCkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmVwbGF5U3ViamVjdC5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL1JlcGxheVN1YmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgdHNsaWIsX1N1YmplY3QsX09ic2VydmFibGUsX1N1YnNjcmliZXIsX1N1YnNjcmlwdGlvbixfb3BlcmF0b3JzX3JlZkNvdW50IFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdWJqZWN0U3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IHJlZkNvdW50IGFzIGhpZ2hlck9yZGVyUmVmQ291bnQgfSBmcm9tICcuLi9vcGVyYXRvcnMvcmVmQ291bnQnO1xudmFyIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhDb25uZWN0YWJsZU9ic2VydmFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29ubmVjdGFibGVPYnNlcnZhYmxlKHNvdXJjZSwgc3ViamVjdEZhY3RvcnkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc291cmNlID0gc291cmNlO1xuICAgICAgICBfdGhpcy5zdWJqZWN0RmFjdG9yeSA9IHN1YmplY3RGYWN0b3J5O1xuICAgICAgICBfdGhpcy5fcmVmQ291bnQgPSAwO1xuICAgICAgICBfdGhpcy5faXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIENvbm5lY3RhYmxlT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3N1YnNjcmliZSA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN1YmplY3QoKS5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgfTtcbiAgICBDb25uZWN0YWJsZU9ic2VydmFibGUucHJvdG90eXBlLmdldFN1YmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gdGhpcy5fc3ViamVjdDtcbiAgICAgICAgaWYgKCFzdWJqZWN0IHx8IHN1YmplY3QuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0ID0gdGhpcy5zdWJqZWN0RmFjdG9yeSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdWJqZWN0O1xuICAgIH07XG4gICAgQ29ubmVjdGFibGVPYnNlcnZhYmxlLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXMuX2Nvbm5lY3Rpb247XG4gICAgICAgIGlmICghY29ubmVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5faXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgY29ubmVjdGlvbiA9IHRoaXMuX2Nvbm5lY3Rpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgICAgICBjb25uZWN0aW9uLmFkZCh0aGlzLnNvdXJjZVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUobmV3IENvbm5lY3RhYmxlU3Vic2NyaWJlcih0aGlzLmdldFN1YmplY3QoKSwgdGhpcykpKTtcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29ubmVjdGlvbjtcbiAgICB9O1xuICAgIENvbm5lY3RhYmxlT2JzZXJ2YWJsZS5wcm90b3R5cGUucmVmQ291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBoaWdoZXJPcmRlclJlZkNvdW50KCkodGhpcyk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29ubmVjdGFibGVPYnNlcnZhYmxlO1xufShPYnNlcnZhYmxlKSk7XG5leHBvcnQgeyBDb25uZWN0YWJsZU9ic2VydmFibGUgfTtcbnZhciBjb25uZWN0YWJsZVByb3RvID0gQ29ubmVjdGFibGVPYnNlcnZhYmxlLnByb3RvdHlwZTtcbmV4cG9ydCB2YXIgY29ubmVjdGFibGVPYnNlcnZhYmxlRGVzY3JpcHRvciA9IHtcbiAgICBvcGVyYXRvcjogeyB2YWx1ZTogbnVsbCB9LFxuICAgIF9yZWZDb3VudDogeyB2YWx1ZTogMCwgd3JpdGFibGU6IHRydWUgfSxcbiAgICBfc3ViamVjdDogeyB2YWx1ZTogbnVsbCwgd3JpdGFibGU6IHRydWUgfSxcbiAgICBfY29ubmVjdGlvbjogeyB2YWx1ZTogbnVsbCwgd3JpdGFibGU6IHRydWUgfSxcbiAgICBfc3Vic2NyaWJlOiB7IHZhbHVlOiBjb25uZWN0YWJsZVByb3RvLl9zdWJzY3JpYmUgfSxcbiAgICBfaXNDb21wbGV0ZTogeyB2YWx1ZTogY29ubmVjdGFibGVQcm90by5faXNDb21wbGV0ZSwgd3JpdGFibGU6IHRydWUgfSxcbiAgICBnZXRTdWJqZWN0OiB7IHZhbHVlOiBjb25uZWN0YWJsZVByb3RvLmdldFN1YmplY3QgfSxcbiAgICBjb25uZWN0OiB7IHZhbHVlOiBjb25uZWN0YWJsZVByb3RvLmNvbm5lY3QgfSxcbiAgICByZWZDb3VudDogeyB2YWx1ZTogY29ubmVjdGFibGVQcm90by5yZWZDb3VudCB9XG59O1xudmFyIENvbm5lY3RhYmxlU3Vic2NyaWJlciA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhDb25uZWN0YWJsZVN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29ubmVjdGFibGVTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBjb25uZWN0YWJsZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY29ubmVjdGFibGUgPSBjb25uZWN0YWJsZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBDb25uZWN0YWJsZVN1YnNjcmliZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5fZXJyb3IuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH07XG4gICAgQ29ubmVjdGFibGVTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGFibGUuX2lzQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZSgpO1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLl9jb21wbGV0ZS5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgQ29ubmVjdGFibGVTdWJzY3JpYmVyLnByb3RvdHlwZS5fdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb25uZWN0YWJsZSA9IHRoaXMuY29ubmVjdGFibGU7XG4gICAgICAgIGlmIChjb25uZWN0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0YWJsZSA9IG51bGw7XG4gICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IGNvbm5lY3RhYmxlLl9jb25uZWN0aW9uO1xuICAgICAgICAgICAgY29ubmVjdGFibGUuX3JlZkNvdW50ID0gMDtcbiAgICAgICAgICAgIGNvbm5lY3RhYmxlLl9zdWJqZWN0ID0gbnVsbDtcbiAgICAgICAgICAgIGNvbm5lY3RhYmxlLl9jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQ29ubmVjdGFibGVTdWJzY3JpYmVyO1xufShTdWJqZWN0U3Vic2NyaWJlcikpO1xudmFyIFJlZkNvdW50T3BlcmF0b3IgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVmQ291bnRPcGVyYXRvcihjb25uZWN0YWJsZSkge1xuICAgICAgICB0aGlzLmNvbm5lY3RhYmxlID0gY29ubmVjdGFibGU7XG4gICAgfVxuICAgIFJlZkNvdW50T3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHZhciBjb25uZWN0YWJsZSA9IHRoaXMuY29ubmVjdGFibGU7XG4gICAgICAgIGNvbm5lY3RhYmxlLl9yZWZDb3VudCsrO1xuICAgICAgICB2YXIgcmVmQ291bnRlciA9IG5ldyBSZWZDb3VudFN1YnNjcmliZXIoc3Vic2NyaWJlciwgY29ubmVjdGFibGUpO1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gc291cmNlLnN1YnNjcmliZShyZWZDb3VudGVyKTtcbiAgICAgICAgaWYgKCFyZWZDb3VudGVyLmNsb3NlZCkge1xuICAgICAgICAgICAgcmVmQ291bnRlci5jb25uZWN0aW9uID0gY29ubmVjdGFibGUuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICByZXR1cm4gUmVmQ291bnRPcGVyYXRvcjtcbn0oKSk7XG52YXIgUmVmQ291bnRTdWJzY3JpYmVyID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKFJlZkNvdW50U3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSZWZDb3VudFN1YnNjcmliZXIoZGVzdGluYXRpb24sIGNvbm5lY3RhYmxlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jb25uZWN0YWJsZSA9IGNvbm5lY3RhYmxlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJlZkNvdW50U3Vic2NyaWJlci5wcm90b3R5cGUuX3Vuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY29ubmVjdGFibGUgPSB0aGlzLmNvbm5lY3RhYmxlO1xuICAgICAgICBpZiAoIWNvbm5lY3RhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29ubmVjdGFibGUgPSBudWxsO1xuICAgICAgICB2YXIgcmVmQ291bnQgPSBjb25uZWN0YWJsZS5fcmVmQ291bnQ7XG4gICAgICAgIGlmIChyZWZDb3VudCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbm5lY3RhYmxlLl9yZWZDb3VudCA9IHJlZkNvdW50IC0gMTtcbiAgICAgICAgaWYgKHJlZkNvdW50ID4gMSkge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXMuY29ubmVjdGlvbjtcbiAgICAgICAgdmFyIHNoYXJlZENvbm5lY3Rpb24gPSBjb25uZWN0YWJsZS5fY29ubmVjdGlvbjtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgaWYgKHNoYXJlZENvbm5lY3Rpb24gJiYgKCFjb25uZWN0aW9uIHx8IHNoYXJlZENvbm5lY3Rpb24gPT09IGNvbm5lY3Rpb24pKSB7XG4gICAgICAgICAgICBzaGFyZWRDb25uZWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBSZWZDb3VudFN1YnNjcmliZXI7XG59KFN1YnNjcmliZXIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvbm5lY3RhYmxlT2JzZXJ2YWJsZS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvQ29ubmVjdGFibGVPYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9PYnNlcnZhYmxlLF9Bc3luY1N1YmplY3QsX29wZXJhdG9yc19tYXAsX3V0aWxfaXNBcnJheSxfdXRpbF9pc1NjaGVkdWxlciBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBc3luY1N1YmplY3QgfSBmcm9tICcuLi9Bc3luY1N1YmplY3QnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAnLi4vb3BlcmF0b3JzL21hcCc7XG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vdXRpbC9pc0FycmF5JztcbmltcG9ydCB7IGlzU2NoZWR1bGVyIH0gZnJvbSAnLi4vdXRpbC9pc1NjaGVkdWxlcic7XG5leHBvcnQgZnVuY3Rpb24gYmluZENhbGxiYWNrKGNhbGxiYWNrRnVuYywgcmVzdWx0U2VsZWN0b3IsIHNjaGVkdWxlcikge1xuICAgIGlmIChyZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICBpZiAoaXNTY2hlZHVsZXIocmVzdWx0U2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBzY2hlZHVsZXIgPSByZXN1bHRTZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kQ2FsbGJhY2soY2FsbGJhY2tGdW5jLCBzY2hlZHVsZXIpLmFwcGx5KHZvaWQgMCwgYXJncykucGlwZShtYXAoZnVuY3Rpb24gKGFyZ3MpIHsgcmV0dXJuIGlzQXJyYXkoYXJncykgPyByZXN1bHRTZWxlY3Rvci5hcHBseSh2b2lkIDAsIGFyZ3MpIDogcmVzdWx0U2VsZWN0b3IoYXJncyk7IH0pKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICAgIHZhciBzdWJqZWN0O1xuICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgIHN1YmplY3Q6IHN1YmplY3QsXG4gICAgICAgICAgICBjYWxsYmFja0Z1bmM6IGNhbGxiYWNrRnVuYyxcbiAgICAgICAgICAgIHNjaGVkdWxlcjogc2NoZWR1bGVyLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIGlmICghc2NoZWR1bGVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzdWJqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3QgPSBuZXcgQXN5bmNTdWJqZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlubmVyQXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QubmV4dChpbm5lckFyZ3MubGVuZ3RoIDw9IDEgPyBpbm5lckFyZ3NbMF0gOiBpbm5lckFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tGdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MuY29uY2F0KFtoYW5kbGVyXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IGFyZ3MsIHN1YnNjcmliZXI6IHN1YnNjcmliZXIsIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaCwgMCwgc3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gZGlzcGF0Y2goc3RhdGUpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgYXJncyA9IHN0YXRlLmFyZ3MsIHN1YnNjcmliZXIgPSBzdGF0ZS5zdWJzY3JpYmVyLCBwYXJhbXMgPSBzdGF0ZS5wYXJhbXM7XG4gICAgdmFyIGNhbGxiYWNrRnVuYyA9IHBhcmFtcy5jYWxsYmFja0Z1bmMsIGNvbnRleHQgPSBwYXJhbXMuY29udGV4dCwgc2NoZWR1bGVyID0gcGFyYW1zLnNjaGVkdWxlcjtcbiAgICB2YXIgc3ViamVjdCA9IHBhcmFtcy5zdWJqZWN0O1xuICAgIGlmICghc3ViamVjdCkge1xuICAgICAgICBzdWJqZWN0ID0gcGFyYW1zLnN1YmplY3QgPSBuZXcgQXN5bmNTdWJqZWN0KCk7XG4gICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGlubmVyQXJncyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBpbm5lckFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGlubmVyQXJncy5sZW5ndGggPD0gMSA/IGlubmVyQXJnc1swXSA6IGlubmVyQXJncztcbiAgICAgICAgICAgIF90aGlzLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hOZXh0LCAwLCB7IHZhbHVlOiB2YWx1ZSwgc3ViamVjdDogc3ViamVjdCB9KSk7XG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjYWxsYmFja0Z1bmMuYXBwbHkoY29udGV4dCwgYXJncy5jb25jYXQoW2hhbmRsZXJdKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc3ViamVjdC5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuYWRkKHN1YmplY3Quc3Vic2NyaWJlKHN1YnNjcmliZXIpKTtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoTmV4dChzdGF0ZSkge1xuICAgIHZhciB2YWx1ZSA9IHN0YXRlLnZhbHVlLCBzdWJqZWN0ID0gc3RhdGUuc3ViamVjdDtcbiAgICBzdWJqZWN0Lm5leHQodmFsdWUpO1xuICAgIHN1YmplY3QuY29tcGxldGUoKTtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoRXJyb3Ioc3RhdGUpIHtcbiAgICB2YXIgZXJyID0gc3RhdGUuZXJyLCBzdWJqZWN0ID0gc3RhdGUuc3ViamVjdDtcbiAgICBzdWJqZWN0LmVycm9yKGVycik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iaW5kQ2FsbGJhY2suanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2JpbmRDYWxsYmFjay5qc1xuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfT2JzZXJ2YWJsZSxfQXN5bmNTdWJqZWN0LF9vcGVyYXRvcnNfbWFwLF91dGlsX2lzU2NoZWR1bGVyLF91dGlsX2lzQXJyYXkgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQXN5bmNTdWJqZWN0IH0gZnJvbSAnLi4vQXN5bmNTdWJqZWN0JztcbmltcG9ydCB7IG1hcCB9IGZyb20gJy4uL29wZXJhdG9ycy9tYXAnO1xuaW1wb3J0IHsgaXNTY2hlZHVsZXIgfSBmcm9tICcuLi91dGlsL2lzU2NoZWR1bGVyJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi91dGlsL2lzQXJyYXknO1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmROb2RlQ2FsbGJhY2soY2FsbGJhY2tGdW5jLCByZXN1bHRTZWxlY3Rvciwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIGlmIChpc1NjaGVkdWxlcihyZXN1bHRTZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHNjaGVkdWxlciA9IHJlc3VsdFNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmROb2RlQ2FsbGJhY2soY2FsbGJhY2tGdW5jLCBzY2hlZHVsZXIpLmFwcGx5KHZvaWQgMCwgYXJncykucGlwZShtYXAoZnVuY3Rpb24gKGFyZ3MpIHsgcmV0dXJuIGlzQXJyYXkoYXJncykgPyByZXN1bHRTZWxlY3Rvci5hcHBseSh2b2lkIDAsIGFyZ3MpIDogcmVzdWx0U2VsZWN0b3IoYXJncyk7IH0pKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgc3ViamVjdDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgYXJnczogYXJncyxcbiAgICAgICAgICAgIGNhbGxiYWNrRnVuYzogY2FsbGJhY2tGdW5jLFxuICAgICAgICAgICAgc2NoZWR1bGVyOiBzY2hlZHVsZXIsXG4gICAgICAgICAgICBjb250ZXh0OiB0aGlzLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gcGFyYW1zLmNvbnRleHQ7XG4gICAgICAgICAgICB2YXIgc3ViamVjdCA9IHBhcmFtcy5zdWJqZWN0O1xuICAgICAgICAgICAgaWYgKCFzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXN1YmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdCA9IHBhcmFtcy5zdWJqZWN0ID0gbmV3IEFzeW5jU3ViamVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbm5lckFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJBcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyID0gaW5uZXJBcmdzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdC5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QubmV4dChpbm5lckFyZ3MubGVuZ3RoIDw9IDEgPyBpbm5lckFyZ3NbMF0gOiBpbm5lckFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tGdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MuY29uY2F0KFtoYW5kbGVyXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoLCAwLCB7IHBhcmFtczogcGFyYW1zLCBzdWJzY3JpYmVyOiBzdWJzY3JpYmVyLCBjb250ZXh0OiBjb250ZXh0IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gZGlzcGF0Y2goc3RhdGUpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBwYXJhbXMgPSBzdGF0ZS5wYXJhbXMsIHN1YnNjcmliZXIgPSBzdGF0ZS5zdWJzY3JpYmVyLCBjb250ZXh0ID0gc3RhdGUuY29udGV4dDtcbiAgICB2YXIgY2FsbGJhY2tGdW5jID0gcGFyYW1zLmNhbGxiYWNrRnVuYywgYXJncyA9IHBhcmFtcy5hcmdzLCBzY2hlZHVsZXIgPSBwYXJhbXMuc2NoZWR1bGVyO1xuICAgIHZhciBzdWJqZWN0ID0gcGFyYW1zLnN1YmplY3Q7XG4gICAgaWYgKCFzdWJqZWN0KSB7XG4gICAgICAgIHN1YmplY3QgPSBwYXJhbXMuc3ViamVjdCA9IG5ldyBBc3luY1N1YmplY3QoKTtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW5uZXJBcmdzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIGlubmVyQXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGVyciA9IGlubmVyQXJncy5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIF90aGlzLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hFcnJvciwgMCwgeyBlcnI6IGVyciwgc3ViamVjdDogc3ViamVjdCB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBpbm5lckFyZ3MubGVuZ3RoIDw9IDEgPyBpbm5lckFyZ3NbMF0gOiBpbm5lckFyZ3M7XG4gICAgICAgICAgICAgICAgX3RoaXMuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaE5leHQsIDAsIHsgdmFsdWU6IHZhbHVlLCBzdWJqZWN0OiBzdWJqZWN0IH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNhbGxiYWNrRnVuYy5hcHBseShjb250ZXh0LCBhcmdzLmNvbmNhdChbaGFuZGxlcl0pKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hFcnJvciwgMCwgeyBlcnI6IGVyciwgc3ViamVjdDogc3ViamVjdCB9KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hZGQoc3ViamVjdC5zdWJzY3JpYmUoc3Vic2NyaWJlcikpO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2hOZXh0KGFyZykge1xuICAgIHZhciB2YWx1ZSA9IGFyZy52YWx1ZSwgc3ViamVjdCA9IGFyZy5zdWJqZWN0O1xuICAgIHN1YmplY3QubmV4dCh2YWx1ZSk7XG4gICAgc3ViamVjdC5jb21wbGV0ZSgpO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2hFcnJvcihhcmcpIHtcbiAgICB2YXIgZXJyID0gYXJnLmVyciwgc3ViamVjdCA9IGFyZy5zdWJqZWN0O1xuICAgIHN1YmplY3QuZXJyb3IoZXJyKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJpbmROb2RlQ2FsbGJhY2suanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2JpbmROb2RlQ2FsbGJhY2suanNcbi8vIG1vZHVsZSBpZCA9IDY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgdHNsaWIsX3V0aWxfaXNTY2hlZHVsZXIsX3V0aWxfaXNBcnJheSxfT3V0ZXJTdWJzY3JpYmVyLF91dGlsX3N1YnNjcmliZVRvUmVzdWx0LF9mcm9tQXJyYXkgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IGlzU2NoZWR1bGVyIH0gZnJvbSAnLi4vdXRpbC9pc1NjaGVkdWxlcic7XG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vdXRpbC9pc0FycmF5JztcbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuaW1wb3J0IHsgZnJvbUFycmF5IH0gZnJvbSAnLi9mcm9tQXJyYXknO1xudmFyIE5PTkUgPSB7fTtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0KCkge1xuICAgIHZhciBvYnNlcnZhYmxlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIG9ic2VydmFibGVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciByZXN1bHRTZWxlY3RvciA9IG51bGw7XG4gICAgdmFyIHNjaGVkdWxlciA9IG51bGw7XG4gICAgaWYgKGlzU2NoZWR1bGVyKG9ic2VydmFibGVzW29ic2VydmFibGVzLmxlbmd0aCAtIDFdKSkge1xuICAgICAgICBzY2hlZHVsZXIgPSBvYnNlcnZhYmxlcy5wb3AoKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYnNlcnZhYmxlc1tvYnNlcnZhYmxlcy5sZW5ndGggLSAxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXN1bHRTZWxlY3RvciA9IG9ic2VydmFibGVzLnBvcCgpO1xuICAgIH1cbiAgICBpZiAob2JzZXJ2YWJsZXMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkob2JzZXJ2YWJsZXNbMF0pKSB7XG4gICAgICAgIG9ic2VydmFibGVzID0gb2JzZXJ2YWJsZXNbMF07XG4gICAgfVxuICAgIHJldHVybiBmcm9tQXJyYXkob2JzZXJ2YWJsZXMsIHNjaGVkdWxlcikubGlmdChuZXcgQ29tYmluZUxhdGVzdE9wZXJhdG9yKHJlc3VsdFNlbGVjdG9yKSk7XG59XG52YXIgQ29tYmluZUxhdGVzdE9wZXJhdG9yID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbWJpbmVMYXRlc3RPcGVyYXRvcihyZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICB0aGlzLnJlc3VsdFNlbGVjdG9yID0gcmVzdWx0U2VsZWN0b3I7XG4gICAgfVxuICAgIENvbWJpbmVMYXRlc3RPcGVyYXRvci5wcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyLCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IENvbWJpbmVMYXRlc3RTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucmVzdWx0U2VsZWN0b3IpKTtcbiAgICB9O1xuICAgIHJldHVybiBDb21iaW5lTGF0ZXN0T3BlcmF0b3I7XG59KCkpO1xuZXhwb3J0IHsgQ29tYmluZUxhdGVzdE9wZXJhdG9yIH07XG52YXIgQ29tYmluZUxhdGVzdFN1YnNjcmliZXIgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoQ29tYmluZUxhdGVzdFN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29tYmluZUxhdGVzdFN1YnNjcmliZXIoZGVzdGluYXRpb24sIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5yZXN1bHRTZWxlY3RvciA9IHJlc3VsdFNlbGVjdG9yO1xuICAgICAgICBfdGhpcy5hY3RpdmUgPSAwO1xuICAgICAgICBfdGhpcy52YWx1ZXMgPSBbXTtcbiAgICAgICAgX3RoaXMub2JzZXJ2YWJsZXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBDb21iaW5lTGF0ZXN0U3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAob2JzZXJ2YWJsZSkge1xuICAgICAgICB0aGlzLnZhbHVlcy5wdXNoKE5PTkUpO1xuICAgICAgICB0aGlzLm9ic2VydmFibGVzLnB1c2gob2JzZXJ2YWJsZSk7XG4gICAgfTtcbiAgICBDb21iaW5lTGF0ZXN0U3Vic2NyaWJlci5wcm90b3R5cGUuX2NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZXMgPSB0aGlzLm9ic2VydmFibGVzO1xuICAgICAgICB2YXIgbGVuID0gb2JzZXJ2YWJsZXMubGVuZ3RoO1xuICAgICAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGxlbjtcbiAgICAgICAgICAgIHRoaXMudG9SZXNwb25kID0gbGVuO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBvYnNlcnZhYmxlID0gb2JzZXJ2YWJsZXNbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgb2JzZXJ2YWJsZSwgb2JzZXJ2YWJsZSwgaSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDb21iaW5lTGF0ZXN0U3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5Q29tcGxldGUgPSBmdW5jdGlvbiAodW51c2VkKSB7XG4gICAgICAgIGlmICgodGhpcy5hY3RpdmUgLT0gMSkgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29tYmluZUxhdGVzdFN1YnNjcmliZXIucHJvdG90eXBlLm5vdGlmeU5leHQgPSBmdW5jdGlvbiAob3V0ZXJWYWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCwgaW5uZXJTdWIpIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IHRoaXMudmFsdWVzO1xuICAgICAgICB2YXIgb2xkVmFsID0gdmFsdWVzW291dGVySW5kZXhdO1xuICAgICAgICB2YXIgdG9SZXNwb25kID0gIXRoaXMudG9SZXNwb25kXG4gICAgICAgICAgICA/IDBcbiAgICAgICAgICAgIDogb2xkVmFsID09PSBOT05FID8gLS10aGlzLnRvUmVzcG9uZCA6IHRoaXMudG9SZXNwb25kO1xuICAgICAgICB2YWx1ZXNbb3V0ZXJJbmRleF0gPSBpbm5lclZhbHVlO1xuICAgICAgICBpZiAodG9SZXNwb25kID09PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXN1bHRTZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyeVJlc3VsdFNlbGVjdG9yKHZhbHVlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWVzLnNsaWNlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDb21iaW5lTGF0ZXN0U3Vic2NyaWJlci5wcm90b3R5cGUuX3RyeVJlc3VsdFNlbGVjdG9yID0gZnVuY3Rpb24gKHZhbHVlcykge1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5yZXN1bHRTZWxlY3Rvci5hcHBseSh0aGlzLCB2YWx1ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQocmVzdWx0KTtcbiAgICB9O1xuICAgIHJldHVybiBDb21iaW5lTGF0ZXN0U3Vic2NyaWJlcjtcbn0oT3V0ZXJTdWJzY3JpYmVyKSk7XG5leHBvcnQgeyBDb21iaW5lTGF0ZXN0U3Vic2NyaWJlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tYmluZUxhdGVzdC5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvY29tYmluZUxhdGVzdC5qc1xuLy8gbW9kdWxlIGlkID0gNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfdXRpbF9pc1NjaGVkdWxlcixfb2YsX2Zyb20sX29wZXJhdG9yc19jb25jYXRBbGwgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgaXNTY2hlZHVsZXIgfSBmcm9tICcuLi91dGlsL2lzU2NoZWR1bGVyJztcbmltcG9ydCB7IG9mIH0gZnJvbSAnLi9vZic7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAnLi9mcm9tJztcbmltcG9ydCB7IGNvbmNhdEFsbCB9IGZyb20gJy4uL29wZXJhdG9ycy9jb25jYXRBbGwnO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdCgpIHtcbiAgICB2YXIgb2JzZXJ2YWJsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBvYnNlcnZhYmxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICBpZiAob2JzZXJ2YWJsZXMubGVuZ3RoID09PSAxIHx8IChvYnNlcnZhYmxlcy5sZW5ndGggPT09IDIgJiYgaXNTY2hlZHVsZXIob2JzZXJ2YWJsZXNbMV0pKSkge1xuICAgICAgICByZXR1cm4gZnJvbShvYnNlcnZhYmxlc1swXSk7XG4gICAgfVxuICAgIHJldHVybiBjb25jYXRBbGwoKShvZi5hcHBseSh2b2lkIDAsIG9ic2VydmFibGVzKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25jYXQuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2NvbmNhdC5qc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCB0c2xpYixfT2JzZXJ2YWJsZSxfdXRpbF9pc0FycmF5LF9lbXB0eSxfdXRpbF9zdWJzY3JpYmVUb1Jlc3VsdCxfT3V0ZXJTdWJzY3JpYmVyLF9vcGVyYXRvcnNfbWFwIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vdXRpbC9pc0FycmF5JztcbmltcG9ydCB7IEVNUFRZIH0gZnJvbSAnLi9lbXB0eSc7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJy4uL29wZXJhdG9ycy9tYXAnO1xuZXhwb3J0IGZ1bmN0aW9uIGZvcmtKb2luKCkge1xuICAgIHZhciBzb3VyY2VzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgc291cmNlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0U2VsZWN0b3I7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2VzW3NvdXJjZXMubGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVzdWx0U2VsZWN0b3IgPSBzb3VyY2VzLnBvcCgpO1xuICAgIH1cbiAgICBpZiAoc291cmNlcy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShzb3VyY2VzWzBdKSkge1xuICAgICAgICBzb3VyY2VzID0gc291cmNlc1swXTtcbiAgICB9XG4gICAgaWYgKHNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBFTVBUWTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBmb3JrSm9pbihzb3VyY2VzKS5waXBlKG1hcChmdW5jdGlvbiAoYXJncykgeyByZXR1cm4gcmVzdWx0U2VsZWN0b3IuYXBwbHkodm9pZCAwLCBhcmdzKTsgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGb3JrSm9pblN1YnNjcmliZXIoc3Vic2NyaWJlciwgc291cmNlcyk7XG4gICAgfSk7XG59XG52YXIgRm9ya0pvaW5TdWJzY3JpYmVyID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKEZvcmtKb2luU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb3JrSm9pblN1YnNjcmliZXIoZGVzdGluYXRpb24sIHNvdXJjZXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZGVzdGluYXRpb24pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICBfdGhpcy5jb21wbGV0ZWQgPSAwO1xuICAgICAgICBfdGhpcy5oYXZlVmFsdWVzID0gMDtcbiAgICAgICAgdmFyIGxlbiA9IHNvdXJjZXMubGVuZ3RoO1xuICAgICAgICBfdGhpcy52YWx1ZXMgPSBuZXcgQXJyYXkobGVuKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaV07XG4gICAgICAgICAgICB2YXIgaW5uZXJTdWJzY3JpcHRpb24gPSBzdWJzY3JpYmVUb1Jlc3VsdChfdGhpcywgc291cmNlLCBudWxsLCBpKTtcbiAgICAgICAgICAgIGlmIChpbm5lclN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgIF90aGlzLmFkZChpbm5lclN1YnNjcmlwdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBGb3JrSm9pblN1YnNjcmliZXIucHJvdG90eXBlLm5vdGlmeU5leHQgPSBmdW5jdGlvbiAob3V0ZXJWYWx1ZSwgaW5uZXJWYWx1ZSwgb3V0ZXJJbmRleCwgaW5uZXJJbmRleCwgaW5uZXJTdWIpIHtcbiAgICAgICAgdGhpcy52YWx1ZXNbb3V0ZXJJbmRleF0gPSBpbm5lclZhbHVlO1xuICAgICAgICBpZiAoIWlubmVyU3ViLl9oYXNWYWx1ZSkge1xuICAgICAgICAgICAgaW5uZXJTdWIuX2hhc1ZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaGF2ZVZhbHVlcysrO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBGb3JrSm9pblN1YnNjcmliZXIucHJvdG90eXBlLm5vdGlmeUNvbXBsZXRlID0gZnVuY3Rpb24gKGlubmVyU3ViKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGRlc3RpbmF0aW9uID0gX2EuZGVzdGluYXRpb24sIGhhdmVWYWx1ZXMgPSBfYS5oYXZlVmFsdWVzLCB2YWx1ZXMgPSBfYS52YWx1ZXM7XG4gICAgICAgIHZhciBsZW4gPSB2YWx1ZXMubGVuZ3RoO1xuICAgICAgICBpZiAoIWlubmVyU3ViLl9oYXNWYWx1ZSkge1xuICAgICAgICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbXBsZXRlZCsrO1xuICAgICAgICBpZiAodGhpcy5jb21wbGV0ZWQgIT09IGxlbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXZlVmFsdWVzID09PSBsZW4pIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLm5leHQodmFsdWVzKTtcbiAgICAgICAgfVxuICAgICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIEZvcmtKb2luU3Vic2NyaWJlcjtcbn0oT3V0ZXJTdWJzY3JpYmVyKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3JrSm9pbi5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvZm9ya0pvaW4uanNcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUsX3V0aWxfaXNBcnJheSxfdXRpbF9pc0Z1bmN0aW9uLF9vcGVyYXRvcnNfbWFwIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICcuLi9vcGVyYXRvcnMvbWFwJztcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5leHBvcnQgZnVuY3Rpb24gZnJvbUV2ZW50KHRhcmdldCwgZXZlbnROYW1lLCBvcHRpb25zLCByZXN1bHRTZWxlY3Rvcikge1xuICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgICAgIHJlc3VsdFNlbGVjdG9yID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBmcm9tRXZlbnQodGFyZ2V0LCBldmVudE5hbWUsIG9wdGlvbnMpLnBpcGUobWFwKGZ1bmN0aW9uIChhcmdzKSB7IHJldHVybiBpc0FycmF5KGFyZ3MpID8gcmVzdWx0U2VsZWN0b3IuYXBwbHkodm9pZCAwLCBhcmdzKSA6IHJlc3VsdFNlbGVjdG9yKGFyZ3MpOyB9KSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZXR1cFN1YnNjcmlwdGlvbih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlciwgc3Vic2NyaWJlciwgb3B0aW9ucyk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzZXR1cFN1YnNjcmlwdGlvbihzb3VyY2VPYmosIGV2ZW50TmFtZSwgaGFuZGxlciwgc3Vic2NyaWJlciwgb3B0aW9ucykge1xuICAgIHZhciB1bnN1YnNjcmliZTtcbiAgICBpZiAoaXNFdmVudFRhcmdldChzb3VyY2VPYmopKSB7XG4gICAgICAgIHZhciBzb3VyY2VfMSA9IHNvdXJjZU9iajtcbiAgICAgICAgc291cmNlT2JqLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzb3VyY2VfMS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgb3B0aW9ucyk7IH07XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIoc291cmNlT2JqKSkge1xuICAgICAgICB2YXIgc291cmNlXzIgPSBzb3VyY2VPYmo7XG4gICAgICAgIHNvdXJjZU9iai5vbihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICB1bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNvdXJjZV8yLm9mZihldmVudE5hbWUsIGhhbmRsZXIpOyB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChpc05vZGVTdHlsZUV2ZW50RW1pdHRlcihzb3VyY2VPYmopKSB7XG4gICAgICAgIHZhciBzb3VyY2VfMyA9IHNvdXJjZU9iajtcbiAgICAgICAgc291cmNlT2JqLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgIHVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc291cmNlXzMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTsgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc291cmNlT2JqICYmIHNvdXJjZU9iai5sZW5ndGgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNvdXJjZU9iai5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgc2V0dXBTdWJzY3JpcHRpb24oc291cmNlT2JqW2ldLCBldmVudE5hbWUsIGhhbmRsZXIsIHN1YnNjcmliZXIsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGV2ZW50IHRhcmdldCcpO1xuICAgIH1cbiAgICBzdWJzY3JpYmVyLmFkZCh1bnN1YnNjcmliZSk7XG59XG5mdW5jdGlvbiBpc05vZGVTdHlsZUV2ZW50RW1pdHRlcihzb3VyY2VPYmopIHtcbiAgICByZXR1cm4gc291cmNlT2JqICYmIHR5cGVvZiBzb3VyY2VPYmouYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZU9iai5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIoc291cmNlT2JqKSB7XG4gICAgcmV0dXJuIHNvdXJjZU9iaiAmJiB0eXBlb2Ygc291cmNlT2JqLm9uID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VPYmoub2ZmID09PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gaXNFdmVudFRhcmdldChzb3VyY2VPYmopIHtcbiAgICByZXR1cm4gc291cmNlT2JqICYmIHR5cGVvZiBzb3VyY2VPYmouYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlT2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcm9tRXZlbnQuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21FdmVudC5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfT2JzZXJ2YWJsZSxfdXRpbF9pc0FycmF5LF91dGlsX2lzRnVuY3Rpb24sX29wZXJhdG9yc19tYXAgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJy4uL3V0aWwvaXNBcnJheSc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJy4uL29wZXJhdG9ycy9tYXAnO1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21FdmVudFBhdHRlcm4oYWRkSGFuZGxlciwgcmVtb3ZlSGFuZGxlciwgcmVzdWx0U2VsZWN0b3IpIHtcbiAgICBpZiAocmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FdmVudFBhdHRlcm4oYWRkSGFuZGxlciwgcmVtb3ZlSGFuZGxlcikucGlwZShtYXAoZnVuY3Rpb24gKGFyZ3MpIHsgcmV0dXJuIGlzQXJyYXkoYXJncykgPyByZXN1bHRTZWxlY3Rvci5hcHBseSh2b2lkIDAsIGFyZ3MpIDogcmVzdWx0U2VsZWN0b3IoYXJncyk7IH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGUgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgZVtfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmliZXIubmV4dChlLmxlbmd0aCA9PT0gMSA/IGVbMF0gOiBlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJldFZhbHVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0VmFsdWUgPSBhZGRIYW5kbGVyKGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKHJlbW92ZUhhbmRsZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiByZW1vdmVIYW5kbGVyKGhhbmRsZXIsIHJldFZhbHVlKTsgfTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb21FdmVudFBhdHRlcm4uanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21FdmVudFBhdHRlcm4uanNcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUsX1N1YnNjcmlwdGlvbixfc3ltYm9sX2l0ZXJhdG9yLF91dGlsX3N1YnNjcmliZVRvSXRlcmFibGUgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IGl0ZXJhdG9yIGFzIFN5bWJvbF9pdGVyYXRvciB9IGZyb20gJy4uL3N5bWJvbC9pdGVyYXRvcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb0l0ZXJhYmxlIH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb0l0ZXJhYmxlJztcbmV4cG9ydCBmdW5jdGlvbiBmcm9tSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJdGVyYWJsZSBjYW5ub3QgYmUgbnVsbCcpO1xuICAgIH1cbiAgICBpZiAoIXNjaGVkdWxlcikge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlVG9JdGVyYWJsZShpbnB1dCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICB2YXIgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yO1xuICAgICAgICAgICAgc3ViLmFkZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZXJhdG9yICYmIHR5cGVvZiBpdGVyYXRvci5yZXR1cm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdWIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IgPSBpbnB1dFtTeW1ib2xfaXRlcmF0b3JdKCk7XG4gICAgICAgICAgICAgICAgc3ViLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkb25lO1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHJlc3VsdC5kb25lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHJldHVybiBzdWI7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb21JdGVyYWJsZS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvZnJvbUl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9PYnNlcnZhYmxlLF9TdWJzY3JpcHRpb24sX3N5bWJvbF9vYnNlcnZhYmxlLF91dGlsX3N1YnNjcmliZVRvT2JzZXJ2YWJsZSBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4uL3N5bWJvbC9vYnNlcnZhYmxlJztcbmltcG9ydCB7IHN1YnNjcmliZVRvT2JzZXJ2YWJsZSB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9PYnNlcnZhYmxlJztcbmV4cG9ydCBmdW5jdGlvbiBmcm9tT2JzZXJ2YWJsZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKCFzY2hlZHVsZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZVRvT2JzZXJ2YWJsZShpbnB1dCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICB2YXIgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgc3ViLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBvYnNlcnZhYmxlID0gaW5wdXRbU3ltYm9sX29ic2VydmFibGVdKCk7XG4gICAgICAgICAgICAgICAgc3ViLmFkZChvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyBzdWIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLm5leHQodmFsdWUpOyB9KSk7IH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7IHN1Yi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSkpOyB9LFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkgeyBzdWIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7IH0pKTsgfSxcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICByZXR1cm4gc3ViO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcm9tT2JzZXJ2YWJsZS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvZnJvbU9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUsX1N1YnNjcmlwdGlvbixfdXRpbF9zdWJzY3JpYmVUb1Byb21pc2UgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUHJvbWlzZSB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9Qcm9taXNlJztcbmV4cG9ydCBmdW5jdGlvbiBmcm9tUHJvbWlzZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgaWYgKCFzY2hlZHVsZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZVRvUHJvbWlzZShpbnB1dCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICB2YXIgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgc3ViLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dC50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzdWIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Yi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIHN1YjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbVByb21pc2UuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21Qcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9PYnNlcnZhYmxlLF91dGlsX2lkZW50aXR5LF91dGlsX2lzU2NoZWR1bGVyIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSAnLi4vdXRpbC9pZGVudGl0eSc7XG5pbXBvcnQgeyBpc1NjaGVkdWxlciB9IGZyb20gJy4uL3V0aWwvaXNTY2hlZHVsZXInO1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlKGluaXRpYWxTdGF0ZU9yT3B0aW9ucywgY29uZGl0aW9uLCBpdGVyYXRlLCByZXN1bHRTZWxlY3Rvck9yT2JzZXJ2YWJsZSwgc2NoZWR1bGVyKSB7XG4gICAgdmFyIHJlc3VsdFNlbGVjdG9yO1xuICAgIHZhciBpbml0aWFsU3RhdGU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMSkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGluaXRpYWxTdGF0ZU9yT3B0aW9ucztcbiAgICAgICAgaW5pdGlhbFN0YXRlID0gb3B0aW9ucy5pbml0aWFsU3RhdGU7XG4gICAgICAgIGNvbmRpdGlvbiA9IG9wdGlvbnMuY29uZGl0aW9uO1xuICAgICAgICBpdGVyYXRlID0gb3B0aW9ucy5pdGVyYXRlO1xuICAgICAgICByZXN1bHRTZWxlY3RvciA9IG9wdGlvbnMucmVzdWx0U2VsZWN0b3IgfHwgaWRlbnRpdHk7XG4gICAgICAgIHNjaGVkdWxlciA9IG9wdGlvbnMuc2NoZWR1bGVyO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXN1bHRTZWxlY3Rvck9yT2JzZXJ2YWJsZSA9PT0gdW5kZWZpbmVkIHx8IGlzU2NoZWR1bGVyKHJlc3VsdFNlbGVjdG9yT3JPYnNlcnZhYmxlKSkge1xuICAgICAgICBpbml0aWFsU3RhdGUgPSBpbml0aWFsU3RhdGVPck9wdGlvbnM7XG4gICAgICAgIHJlc3VsdFNlbGVjdG9yID0gaWRlbnRpdHk7XG4gICAgICAgIHNjaGVkdWxlciA9IHJlc3VsdFNlbGVjdG9yT3JPYnNlcnZhYmxlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaW5pdGlhbFN0YXRlID0gaW5pdGlhbFN0YXRlT3JPcHRpb25zO1xuICAgICAgICByZXN1bHRTZWxlY3RvciA9IHJlc3VsdFNlbGVjdG9yT3JPYnNlcnZhYmxlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgICAgICBpZiAoc2NoZWR1bGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoLCAwLCB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcjogc3Vic2NyaWJlcixcbiAgICAgICAgICAgICAgICBpdGVyYXRlOiBpdGVyYXRlLFxuICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogY29uZGl0aW9uLFxuICAgICAgICAgICAgICAgIHJlc3VsdFNlbGVjdG9yOiByZXN1bHRTZWxlY3RvcixcbiAgICAgICAgICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgY29uZGl0aW9uUmVzdWx0ID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvblJlc3VsdCA9IGNvbmRpdGlvbihzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWNvbmRpdGlvblJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHZvaWQgMDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSByZXN1bHRTZWxlY3RvcihzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gaXRlcmF0ZShzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRydWUpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2goc3RhdGUpIHtcbiAgICB2YXIgc3Vic2NyaWJlciA9IHN0YXRlLnN1YnNjcmliZXIsIGNvbmRpdGlvbiA9IHN0YXRlLmNvbmRpdGlvbjtcbiAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHN0YXRlLm5lZWRJdGVyYXRlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdGF0ZS5zdGF0ZSA9IHN0YXRlLml0ZXJhdGUoc3RhdGUuc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHN0YXRlLm5lZWRJdGVyYXRlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgICB2YXIgY29uZGl0aW9uUmVzdWx0ID0gdm9pZCAwO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uZGl0aW9uUmVzdWx0ID0gY29uZGl0aW9uKHN0YXRlLnN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29uZGl0aW9uUmVzdWx0KSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgdmFsdWU7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFsdWUgPSBzdGF0ZS5yZXN1bHRTZWxlY3RvcihzdGF0ZS5zdGF0ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc2NoZWR1bGUoc3RhdGUpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2VuZXJhdGUuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL2dlbmVyYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9kZWZlcixfZW1wdHkgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgZGVmZXIgfSBmcm9tICcuL2RlZmVyJztcbmltcG9ydCB7IEVNUFRZIH0gZnJvbSAnLi9lbXB0eSc7XG5leHBvcnQgZnVuY3Rpb24gaWlmKGNvbmRpdGlvbiwgdHJ1ZVJlc3VsdCwgZmFsc2VSZXN1bHQpIHtcbiAgICBpZiAodHJ1ZVJlc3VsdCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHRydWVSZXN1bHQgPSBFTVBUWTtcbiAgICB9XG4gICAgaWYgKGZhbHNlUmVzdWx0ID09PSB2b2lkIDApIHtcbiAgICAgICAgZmFsc2VSZXN1bHQgPSBFTVBUWTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZmVyKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbmRpdGlvbigpID8gdHJ1ZVJlc3VsdCA6IGZhbHNlUmVzdWx0OyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlpZi5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvaWlmLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9PYnNlcnZhYmxlLF9zY2hlZHVsZXJfYXN5bmMsX3V0aWxfaXNOdW1lcmljIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGFzeW5jIH0gZnJvbSAnLi4vc2NoZWR1bGVyL2FzeW5jJztcbmltcG9ydCB7IGlzTnVtZXJpYyB9IGZyb20gJy4uL3V0aWwvaXNOdW1lcmljJztcbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnZhbChwZXJpb2QsIHNjaGVkdWxlcikge1xuICAgIGlmIChwZXJpb2QgPT09IHZvaWQgMCkge1xuICAgICAgICBwZXJpb2QgPSAwO1xuICAgIH1cbiAgICBpZiAoc2NoZWR1bGVyID09PSB2b2lkIDApIHtcbiAgICAgICAgc2NoZWR1bGVyID0gYXN5bmM7XG4gICAgfVxuICAgIGlmICghaXNOdW1lcmljKHBlcmlvZCkgfHwgcGVyaW9kIDwgMCkge1xuICAgICAgICBwZXJpb2QgPSAwO1xuICAgIH1cbiAgICBpZiAoIXNjaGVkdWxlciB8fCB0eXBlb2Ygc2NoZWR1bGVyLnNjaGVkdWxlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHNjaGVkdWxlciA9IGFzeW5jO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgc3Vic2NyaWJlci5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoLCBwZXJpb2QsIHsgc3Vic2NyaWJlcjogc3Vic2NyaWJlciwgY291bnRlcjogMCwgcGVyaW9kOiBwZXJpb2QgfSkpO1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlcjtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGRpc3BhdGNoKHN0YXRlKSB7XG4gICAgdmFyIHN1YnNjcmliZXIgPSBzdGF0ZS5zdWJzY3JpYmVyLCBjb3VudGVyID0gc3RhdGUuY291bnRlciwgcGVyaW9kID0gc3RhdGUucGVyaW9kO1xuICAgIHN1YnNjcmliZXIubmV4dChjb3VudGVyKTtcbiAgICB0aGlzLnNjaGVkdWxlKHsgc3Vic2NyaWJlcjogc3Vic2NyaWJlciwgY291bnRlcjogY291bnRlciArIDEsIHBlcmlvZDogcGVyaW9kIH0sIHBlcmlvZCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcnZhbC5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvaW50ZXJ2YWwuanNcbi8vIG1vZHVsZSBpZCA9IDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUsX3V0aWxfaXNTY2hlZHVsZXIsX29wZXJhdG9yc19tZXJnZUFsbCxfZnJvbUFycmF5IFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzU2NoZWR1bGVyIH0gZnJvbSAnLi4vdXRpbC9pc1NjaGVkdWxlcic7XG5pbXBvcnQgeyBtZXJnZUFsbCB9IGZyb20gJy4uL29wZXJhdG9ycy9tZXJnZUFsbCc7XG5pbXBvcnQgeyBmcm9tQXJyYXkgfSBmcm9tICcuL2Zyb21BcnJheSc7XG5leHBvcnQgZnVuY3Rpb24gbWVyZ2UoKSB7XG4gICAgdmFyIG9ic2VydmFibGVzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgb2JzZXJ2YWJsZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIGNvbmN1cnJlbnQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgdmFyIHNjaGVkdWxlciA9IG51bGw7XG4gICAgdmFyIGxhc3QgPSBvYnNlcnZhYmxlc1tvYnNlcnZhYmxlcy5sZW5ndGggLSAxXTtcbiAgICBpZiAoaXNTY2hlZHVsZXIobGFzdCkpIHtcbiAgICAgICAgc2NoZWR1bGVyID0gb2JzZXJ2YWJsZXMucG9wKCk7XG4gICAgICAgIGlmIChvYnNlcnZhYmxlcy5sZW5ndGggPiAxICYmIHR5cGVvZiBvYnNlcnZhYmxlc1tvYnNlcnZhYmxlcy5sZW5ndGggLSAxXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbmN1cnJlbnQgPSBvYnNlcnZhYmxlcy5wb3AoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgbGFzdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uY3VycmVudCA9IG9ic2VydmFibGVzLnBvcCgpO1xuICAgIH1cbiAgICBpZiAoc2NoZWR1bGVyID09PSBudWxsICYmIG9ic2VydmFibGVzLmxlbmd0aCA9PT0gMSAmJiBvYnNlcnZhYmxlc1swXSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGVzWzBdO1xuICAgIH1cbiAgICByZXR1cm4gbWVyZ2VBbGwoY29uY3VycmVudCkoZnJvbUFycmF5KG9ic2VydmFibGVzLCBzY2hlZHVsZXIpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1lcmdlLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS9tZXJnZS5qc1xuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfT2JzZXJ2YWJsZSxfZnJvbSxfdXRpbF9pc0FycmF5LF9lbXB0eSBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAnLi9mcm9tJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHsgRU1QVFkgfSBmcm9tICcuL2VtcHR5JztcbmV4cG9ydCBmdW5jdGlvbiBvbkVycm9yUmVzdW1lTmV4dCgpIHtcbiAgICB2YXIgc291cmNlcyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHNvdXJjZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgaWYgKHNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBFTVBUWTtcbiAgICB9XG4gICAgdmFyIGZpcnN0ID0gc291cmNlc1swXSwgcmVtYWluZGVyID0gc291cmNlcy5zbGljZSgxKTtcbiAgICBpZiAoc291cmNlcy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShmaXJzdCkpIHtcbiAgICAgICAgcmV0dXJuIG9uRXJyb3JSZXN1bWVOZXh0LmFwcGx5KHZvaWQgMCwgZmlyc3QpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHN1Yk5leHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLmFkZChvbkVycm9yUmVzdW1lTmV4dC5hcHBseSh2b2lkIDAsIHJlbWFpbmRlcikuc3Vic2NyaWJlKHN1YnNjcmliZXIpKTsgfTtcbiAgICAgICAgcmV0dXJuIGZyb20oZmlyc3QpLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHsgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTsgfSxcbiAgICAgICAgICAgIGVycm9yOiBzdWJOZXh0LFxuICAgICAgICAgICAgY29tcGxldGU6IHN1Yk5leHQsXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b25FcnJvclJlc3VtZU5leHQuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL29uRXJyb3JSZXN1bWVOZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9PYnNlcnZhYmxlLF9TdWJzY3JpcHRpb24gUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmV4cG9ydCBmdW5jdGlvbiBwYWlycyhvYmosIHNjaGVkdWxlcikge1xuICAgIGlmICghc2NoZWR1bGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aCAmJiAhc3Vic2NyaWJlci5jbG9zZWQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoW2tleSwgb2JqW2tleV1dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2gsIDAsIHsga2V5czoga2V5cywgaW5kZXg6IDAsIHN1YnNjcmliZXI6IHN1YnNjcmliZXIsIHN1YnNjcmlwdGlvbjogc3Vic2NyaXB0aW9uLCBvYmo6IG9iaiB9KSk7XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2goc3RhdGUpIHtcbiAgICB2YXIga2V5cyA9IHN0YXRlLmtleXMsIGluZGV4ID0gc3RhdGUuaW5kZXgsIHN1YnNjcmliZXIgPSBzdGF0ZS5zdWJzY3JpYmVyLCBzdWJzY3JpcHRpb24gPSBzdGF0ZS5zdWJzY3JpcHRpb24sIG9iaiA9IHN0YXRlLm9iajtcbiAgICBpZiAoIXN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgIGlmIChpbmRleCA8IGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoW2tleSwgb2JqW2tleV1dKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5hZGQodGhpcy5zY2hlZHVsZSh7IGtleXM6IGtleXMsIGluZGV4OiBpbmRleCArIDEsIHN1YnNjcmliZXI6IHN1YnNjcmliZXIsIHN1YnNjcmlwdGlvbjogc3Vic2NyaXB0aW9uLCBvYmo6IG9iaiB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWlycy5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvcGFpcnMuanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgdHNsaWIsX3V0aWxfaXNBcnJheSxfZnJvbUFycmF5LF9PdXRlclN1YnNjcmliZXIsX3V0aWxfc3Vic2NyaWJlVG9SZXN1bHQgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHsgZnJvbUFycmF5IH0gZnJvbSAnLi9mcm9tQXJyYXknO1xuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5leHBvcnQgZnVuY3Rpb24gcmFjZSgpIHtcbiAgICB2YXIgb2JzZXJ2YWJsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBvYnNlcnZhYmxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICBpZiAob2JzZXJ2YWJsZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGlmIChpc0FycmF5KG9ic2VydmFibGVzWzBdKSkge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZXMgPSBvYnNlcnZhYmxlc1swXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlc1swXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnJvbUFycmF5KG9ic2VydmFibGVzLCB1bmRlZmluZWQpLmxpZnQobmV3IFJhY2VPcGVyYXRvcigpKTtcbn1cbnZhciBSYWNlT3BlcmF0b3IgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmFjZU9wZXJhdG9yKCkge1xuICAgIH1cbiAgICBSYWNlT3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBSYWNlU3Vic2NyaWJlcihzdWJzY3JpYmVyKSk7XG4gICAgfTtcbiAgICByZXR1cm4gUmFjZU9wZXJhdG9yO1xufSgpKTtcbmV4cG9ydCB7IFJhY2VPcGVyYXRvciB9O1xudmFyIFJhY2VTdWJzY3JpYmVyID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKFJhY2VTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJhY2VTdWJzY3JpYmVyKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5oYXNGaXJzdCA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5vYnNlcnZhYmxlcyA9IFtdO1xuICAgICAgICBfdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgUmFjZVN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKG9ic2VydmFibGUpIHtcbiAgICAgICAgdGhpcy5vYnNlcnZhYmxlcy5wdXNoKG9ic2VydmFibGUpO1xuICAgIH07XG4gICAgUmFjZVN1YnNjcmliZXIucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGVzID0gdGhpcy5vYnNlcnZhYmxlcztcbiAgICAgICAgdmFyIGxlbiA9IG9ic2VydmFibGVzLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW4gJiYgIXRoaXMuaGFzRmlyc3Q7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBvYnNlcnZhYmxlID0gb2JzZXJ2YWJsZXNbaV07XG4gICAgICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIG9ic2VydmFibGUsIG9ic2VydmFibGUsIGkpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub2JzZXJ2YWJsZXMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBSYWNlU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5TmV4dCA9IGZ1bmN0aW9uIChvdXRlclZhbHVlLCBpbm5lclZhbHVlLCBvdXRlckluZGV4LCBpbm5lckluZGV4LCBpbm5lclN1Yikge1xuICAgICAgICBpZiAoIXRoaXMuaGFzRmlyc3QpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzRmlyc3QgPSB0cnVlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSAhPT0gb3V0ZXJJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gdGhpcy5zdWJzY3JpcHRpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChpbm5lclZhbHVlKTtcbiAgICB9O1xuICAgIHJldHVybiBSYWNlU3Vic2NyaWJlcjtcbn0oT3V0ZXJTdWJzY3JpYmVyKSk7XG5leHBvcnQgeyBSYWNlU3Vic2NyaWJlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmFjZS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvcmFjZS5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfT2JzZXJ2YWJsZSBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5leHBvcnQgZnVuY3Rpb24gcmFuZ2Uoc3RhcnQsIGNvdW50LCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoc3RhcnQgPT09IHZvaWQgMCkge1xuICAgICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIGlmIChjb3VudCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGNvdW50ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHZhciBjdXJyZW50ID0gc3RhcnQ7XG4gICAgICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2gsIDAsIHtcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsIGNvdW50OiBjb3VudCwgc3RhcnQ6IHN0YXJ0LCBzdWJzY3JpYmVyOiBzdWJzY3JpYmVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXgrKyA+PSBjb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoY3VycmVudCsrKTtcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaChzdGF0ZSkge1xuICAgIHZhciBzdGFydCA9IHN0YXRlLnN0YXJ0LCBpbmRleCA9IHN0YXRlLmluZGV4LCBjb3VudCA9IHN0YXRlLmNvdW50LCBzdWJzY3JpYmVyID0gc3RhdGUuc3Vic2NyaWJlcjtcbiAgICBpZiAoaW5kZXggPj0gY291bnQpIHtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHN1YnNjcmliZXIubmV4dChzdGFydCk7XG4gICAgaWYgKHN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3RhdGUuaW5kZXggPSBpbmRleCArIDE7XG4gICAgc3RhdGUuc3RhcnQgPSBzdGFydCArIDE7XG4gICAgdGhpcy5zY2hlZHVsZShzdGF0ZSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yYW5nZS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvcmFuZ2UuanNcbi8vIG1vZHVsZSBpZCA9IDgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuZXhwb3J0IGZ1bmN0aW9uIHNjYWxhcih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gICAgcmVzdWx0Ll9pc1NjYWxhciA9IHRydWU7XG4gICAgcmVzdWx0LnZhbHVlID0gdmFsdWU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjYWxhci5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvc2NhbGFyLmpzXG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9PYnNlcnZhYmxlLF9zY2hlZHVsZXJfYXN5bmMsX3V0aWxfaXNOdW1lcmljLF91dGlsX2lzU2NoZWR1bGVyIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGFzeW5jIH0gZnJvbSAnLi4vc2NoZWR1bGVyL2FzeW5jJztcbmltcG9ydCB7IGlzTnVtZXJpYyB9IGZyb20gJy4uL3V0aWwvaXNOdW1lcmljJztcbmltcG9ydCB7IGlzU2NoZWR1bGVyIH0gZnJvbSAnLi4vdXRpbC9pc1NjaGVkdWxlcic7XG5leHBvcnQgZnVuY3Rpb24gdGltZXIoZHVlVGltZSwgcGVyaW9kT3JTY2hlZHVsZXIsIHNjaGVkdWxlcikge1xuICAgIGlmIChkdWVUaW1lID09PSB2b2lkIDApIHtcbiAgICAgICAgZHVlVGltZSA9IDA7XG4gICAgfVxuICAgIHZhciBwZXJpb2QgPSAtMTtcbiAgICBpZiAoaXNOdW1lcmljKHBlcmlvZE9yU2NoZWR1bGVyKSkge1xuICAgICAgICBwZXJpb2QgPSBOdW1iZXIocGVyaW9kT3JTY2hlZHVsZXIpIDwgMSAmJiAxIHx8IE51bWJlcihwZXJpb2RPclNjaGVkdWxlcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU2NoZWR1bGVyKHBlcmlvZE9yU2NoZWR1bGVyKSkge1xuICAgICAgICBzY2hlZHVsZXIgPSBwZXJpb2RPclNjaGVkdWxlcjtcbiAgICB9XG4gICAgaWYgKCFpc1NjaGVkdWxlcihzY2hlZHVsZXIpKSB7XG4gICAgICAgIHNjaGVkdWxlciA9IGFzeW5jO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIGR1ZSA9IGlzTnVtZXJpYyhkdWVUaW1lKVxuICAgICAgICAgICAgPyBkdWVUaW1lXG4gICAgICAgICAgICA6ICgrZHVlVGltZSAtIHNjaGVkdWxlci5ub3coKSk7XG4gICAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2gsIGR1ZSwge1xuICAgICAgICAgICAgaW5kZXg6IDAsIHBlcmlvZDogcGVyaW9kLCBzdWJzY3JpYmVyOiBzdWJzY3JpYmVyXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZGlzcGF0Y2goc3RhdGUpIHtcbiAgICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleCwgcGVyaW9kID0gc3RhdGUucGVyaW9kLCBzdWJzY3JpYmVyID0gc3RhdGUuc3Vic2NyaWJlcjtcbiAgICBzdWJzY3JpYmVyLm5leHQoaW5kZXgpO1xuICAgIGlmIChzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYgKHBlcmlvZCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB9XG4gICAgc3RhdGUuaW5kZXggPSBpbmRleCArIDE7XG4gICAgdGhpcy5zY2hlZHVsZShzdGF0ZSwgcGVyaW9kKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVyLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvb2JzZXJ2YWJsZS90aW1lci5qc1xuLy8gbW9kdWxlIGlkID0gODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfT2JzZXJ2YWJsZSxfZnJvbSxfZW1wdHkgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgZnJvbSB9IGZyb20gJy4vZnJvbSc7XG5pbXBvcnQgeyBFTVBUWSB9IGZyb20gJy4vZW1wdHknO1xuZXhwb3J0IGZ1bmN0aW9uIHVzaW5nKHJlc291cmNlRmFjdG9yeSwgb2JzZXJ2YWJsZUZhY3RvcnkpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHJlc291cmNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzb3VyY2UgPSByZXNvdXJjZUZhY3RvcnkoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSBvYnNlcnZhYmxlRmFjdG9yeShyZXNvdXJjZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc291cmNlID0gcmVzdWx0ID8gZnJvbShyZXN1bHQpIDogRU1QVFk7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBzb3VyY2Uuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBpZiAocmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICByZXNvdXJjZS51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNpbmcuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vYnNlcnZhYmxlL3VzaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIHRzbGliLF9mcm9tQXJyYXksX3V0aWxfaXNBcnJheSxfU3Vic2NyaWJlcixfT3V0ZXJTdWJzY3JpYmVyLF91dGlsX3N1YnNjcmliZVRvUmVzdWx0LF8uLl9pbnRlcm5hbF9zeW1ib2xfaXRlcmF0b3IgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IGZyb21BcnJheSB9IGZyb20gJy4vZnJvbUFycmF5JztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5pbXBvcnQgeyBpdGVyYXRvciBhcyBTeW1ib2xfaXRlcmF0b3IgfSBmcm9tICcuLi8uLi9pbnRlcm5hbC9zeW1ib2wvaXRlcmF0b3InO1xuZXhwb3J0IGZ1bmN0aW9uIHppcCgpIHtcbiAgICB2YXIgb2JzZXJ2YWJsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBvYnNlcnZhYmxlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0U2VsZWN0b3IgPSBvYnNlcnZhYmxlc1tvYnNlcnZhYmxlcy5sZW5ndGggLSAxXTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9ic2VydmFibGVzLnBvcCgpO1xuICAgIH1cbiAgICByZXR1cm4gZnJvbUFycmF5KG9ic2VydmFibGVzLCB1bmRlZmluZWQpLmxpZnQobmV3IFppcE9wZXJhdG9yKHJlc3VsdFNlbGVjdG9yKSk7XG59XG52YXIgWmlwT3BlcmF0b3IgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gWmlwT3BlcmF0b3IocmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRTZWxlY3RvciA9IHJlc3VsdFNlbGVjdG9yO1xuICAgIH1cbiAgICBaaXBPcGVyYXRvci5wcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyLCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IFppcFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5yZXN1bHRTZWxlY3RvcikpO1xuICAgIH07XG4gICAgcmV0dXJuIFppcE9wZXJhdG9yO1xufSgpKTtcbmV4cG9ydCB7IFppcE9wZXJhdG9yIH07XG52YXIgWmlwU3Vic2NyaWJlciA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhaaXBTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFppcFN1YnNjcmliZXIoZGVzdGluYXRpb24sIHJlc3VsdFNlbGVjdG9yLCB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5pdGVyYXRvcnMgPSBbXTtcbiAgICAgICAgX3RoaXMuYWN0aXZlID0gMDtcbiAgICAgICAgX3RoaXMucmVzdWx0U2VsZWN0b3IgPSAodHlwZW9mIHJlc3VsdFNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSA/IHJlc3VsdFNlbGVjdG9yIDogbnVsbDtcbiAgICAgICAgX3RoaXMudmFsdWVzID0gdmFsdWVzO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFppcFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBpdGVyYXRvcnMgPSB0aGlzLml0ZXJhdG9ycztcbiAgICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBpdGVyYXRvcnMucHVzaChuZXcgU3RhdGljQXJyYXlJdGVyYXRvcih2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZVtTeW1ib2xfaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpdGVyYXRvcnMucHVzaChuZXcgU3RhdGljSXRlcmF0b3IodmFsdWVbU3ltYm9sX2l0ZXJhdG9yXSgpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpdGVyYXRvcnMucHVzaChuZXcgWmlwQnVmZmVySXRlcmF0b3IodGhpcy5kZXN0aW5hdGlvbiwgdGhpcywgdmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgWmlwU3Vic2NyaWJlci5wcm90b3R5cGUuX2NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaXRlcmF0b3JzID0gdGhpcy5pdGVyYXRvcnM7XG4gICAgICAgIHZhciBsZW4gPSBpdGVyYXRvcnMubGVuZ3RoO1xuICAgICAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY3RpdmUgPSBsZW47XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yc1tpXTtcbiAgICAgICAgICAgIGlmIChpdGVyYXRvci5zdGlsbFVuc3Vic2NyaWJlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGl0ZXJhdG9yLnN1YnNjcmliZShpdGVyYXRvciwgaSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgWmlwU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5SW5hY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlLS07XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBaaXBTdWJzY3JpYmVyLnByb3RvdHlwZS5jaGVja0l0ZXJhdG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9ycyA9IHRoaXMuaXRlcmF0b3JzO1xuICAgICAgICB2YXIgbGVuID0gaXRlcmF0b3JzLmxlbmd0aDtcbiAgICAgICAgdmFyIGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JzW2ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVyYXRvci5oYXNWYWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiAhaXRlcmF0b3IuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgc2hvdWxkQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JzW2ldO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgIGlmIChpdGVyYXRvci5oYXNDb21wbGV0ZWQoKSkge1xuICAgICAgICAgICAgICAgIHNob3VsZENvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXJncy5wdXNoKHJlc3VsdC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyeXJlc3VsdFNlbGVjdG9yKGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVzdGluYXRpb24ubmV4dChhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hvdWxkQ29tcGxldGUpIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFppcFN1YnNjcmliZXIucHJvdG90eXBlLl90cnlyZXN1bHRTZWxlY3RvciA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnJlc3VsdFNlbGVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQocmVzdWx0KTtcbiAgICB9O1xuICAgIHJldHVybiBaaXBTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyKSk7XG5leHBvcnQgeyBaaXBTdWJzY3JpYmVyIH07XG52YXIgU3RhdGljSXRlcmF0b3IgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3RhdGljSXRlcmF0b3IoaXRlcmF0b3IpIHtcbiAgICAgICAgdGhpcy5pdGVyYXRvciA9IGl0ZXJhdG9yO1xuICAgICAgICB0aGlzLm5leHRSZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgfVxuICAgIFN0YXRpY0l0ZXJhdG9yLnByb3RvdHlwZS5oYXNWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBTdGF0aWNJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMubmV4dFJlc3VsdDtcbiAgICAgICAgdGhpcy5uZXh0UmVzdWx0ID0gdGhpcy5pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBTdGF0aWNJdGVyYXRvci5wcm90b3R5cGUuaGFzQ29tcGxldGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmV4dFJlc3VsdCA9IHRoaXMubmV4dFJlc3VsdDtcbiAgICAgICAgcmV0dXJuIG5leHRSZXN1bHQgJiYgbmV4dFJlc3VsdC5kb25lO1xuICAgIH07XG4gICAgcmV0dXJuIFN0YXRpY0l0ZXJhdG9yO1xufSgpKTtcbnZhciBTdGF0aWNBcnJheUl0ZXJhdG9yID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN0YXRpY0FycmF5SXRlcmF0b3IoYXJyYXkpIHtcbiAgICAgICAgdGhpcy5hcnJheSA9IGFycmF5O1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB9XG4gICAgU3RhdGljQXJyYXlJdGVyYXRvci5wcm90b3R5cGVbU3ltYm9sX2l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTdGF0aWNBcnJheUl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBpID0gdGhpcy5pbmRleCsrO1xuICAgICAgICB2YXIgYXJyYXkgPSB0aGlzLmFycmF5O1xuICAgICAgICByZXR1cm4gaSA8IHRoaXMubGVuZ3RoID8geyB2YWx1ZTogYXJyYXlbaV0sIGRvbmU6IGZhbHNlIH0gOiB7IHZhbHVlOiBudWxsLCBkb25lOiB0cnVlIH07XG4gICAgfTtcbiAgICBTdGF0aWNBcnJheUl0ZXJhdG9yLnByb3RvdHlwZS5oYXNWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXkubGVuZ3RoID4gdGhpcy5pbmRleDtcbiAgICB9O1xuICAgIFN0YXRpY0FycmF5SXRlcmF0b3IucHJvdG90eXBlLmhhc0NvbXBsZXRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXkubGVuZ3RoID09PSB0aGlzLmluZGV4O1xuICAgIH07XG4gICAgcmV0dXJuIFN0YXRpY0FycmF5SXRlcmF0b3I7XG59KCkpO1xudmFyIFppcEJ1ZmZlckl0ZXJhdG9yID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKFppcEJ1ZmZlckl0ZXJhdG9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFppcEJ1ZmZlckl0ZXJhdG9yKGRlc3RpbmF0aW9uLCBwYXJlbnQsIG9ic2VydmFibGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZGVzdGluYXRpb24pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgX3RoaXMub2JzZXJ2YWJsZSA9IG9ic2VydmFibGU7XG4gICAgICAgIF90aGlzLnN0aWxsVW5zdWJzY3JpYmVkID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMuYnVmZmVyID0gW107XG4gICAgICAgIF90aGlzLmlzQ29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBaaXBCdWZmZXJJdGVyYXRvci5wcm90b3R5cGVbU3ltYm9sX2l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBaaXBCdWZmZXJJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmlzQ29tcGxldGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBudWxsLCBkb25lOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogYnVmZmVyLnNoaWZ0KCksIGRvbmU6IGZhbHNlIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFppcEJ1ZmZlckl0ZXJhdG9yLnByb3RvdHlwZS5oYXNWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyLmxlbmd0aCA+IDA7XG4gICAgfTtcbiAgICBaaXBCdWZmZXJJdGVyYXRvci5wcm90b3R5cGUuaGFzQ29tcGxldGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5idWZmZXIubGVuZ3RoID09PSAwICYmIHRoaXMuaXNDb21wbGV0ZTtcbiAgICB9O1xuICAgIFppcEJ1ZmZlckl0ZXJhdG9yLnByb3RvdHlwZS5ub3RpZnlDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5ub3RpZnlJbmFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBaaXBCdWZmZXJJdGVyYXRvci5wcm90b3R5cGUubm90aWZ5TmV4dCA9IGZ1bmN0aW9uIChvdXRlclZhbHVlLCBpbm5lclZhbHVlLCBvdXRlckluZGV4LCBpbm5lckluZGV4LCBpbm5lclN1Yikge1xuICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKGlubmVyVmFsdWUpO1xuICAgICAgICB0aGlzLnBhcmVudC5jaGVja0l0ZXJhdG9ycygpO1xuICAgIH07XG4gICAgWmlwQnVmZmVySXRlcmF0b3IucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIHRoaXMub2JzZXJ2YWJsZSwgdGhpcywgaW5kZXgpO1xuICAgIH07XG4gICAgcmV0dXJuIFppcEJ1ZmZlckl0ZXJhdG9yO1xufShPdXRlclN1YnNjcmliZXIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXppcC5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvemlwLmpzXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9tZXJnZUFsbCBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBtZXJnZUFsbCB9IGZyb20gJy4vbWVyZ2VBbGwnO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdEFsbCgpIHtcbiAgICByZXR1cm4gbWVyZ2VBbGwoMSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25jYXRBbGwuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvY29uY2F0QWxsLmpzXG4vLyBtb2R1bGUgaWQgPSA4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIHRzbGliLF9TdWJzY3JpYmVyLF9TdWJzY3JpcHRpb24sX09ic2VydmFibGUsX1N1YmplY3QgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi4vU3ViamVjdCc7XG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBCeShrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCBkdXJhdGlvblNlbGVjdG9yLCBzdWJqZWN0U2VsZWN0b3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLmxpZnQobmV3IEdyb3VwQnlPcGVyYXRvcihrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCBkdXJhdGlvblNlbGVjdG9yLCBzdWJqZWN0U2VsZWN0b3IpKTtcbiAgICB9O1xufVxudmFyIEdyb3VwQnlPcGVyYXRvciA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHcm91cEJ5T3BlcmF0b3Ioa2V5U2VsZWN0b3IsIGVsZW1lbnRTZWxlY3RvciwgZHVyYXRpb25TZWxlY3Rvciwgc3ViamVjdFNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMua2V5U2VsZWN0b3IgPSBrZXlTZWxlY3RvcjtcbiAgICAgICAgdGhpcy5lbGVtZW50U2VsZWN0b3IgPSBlbGVtZW50U2VsZWN0b3I7XG4gICAgICAgIHRoaXMuZHVyYXRpb25TZWxlY3RvciA9IGR1cmF0aW9uU2VsZWN0b3I7XG4gICAgICAgIHRoaXMuc3ViamVjdFNlbGVjdG9yID0gc3ViamVjdFNlbGVjdG9yO1xuICAgIH1cbiAgICBHcm91cEJ5T3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBHcm91cEJ5U3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLmtleVNlbGVjdG9yLCB0aGlzLmVsZW1lbnRTZWxlY3RvciwgdGhpcy5kdXJhdGlvblNlbGVjdG9yLCB0aGlzLnN1YmplY3RTZWxlY3RvcikpO1xuICAgIH07XG4gICAgcmV0dXJuIEdyb3VwQnlPcGVyYXRvcjtcbn0oKSk7XG52YXIgR3JvdXBCeVN1YnNjcmliZXIgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoR3JvdXBCeVN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gR3JvdXBCeVN1YnNjcmliZXIoZGVzdGluYXRpb24sIGtleVNlbGVjdG9yLCBlbGVtZW50U2VsZWN0b3IsIGR1cmF0aW9uU2VsZWN0b3IsIHN1YmplY3RTZWxlY3Rvcikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMua2V5U2VsZWN0b3IgPSBrZXlTZWxlY3RvcjtcbiAgICAgICAgX3RoaXMuZWxlbWVudFNlbGVjdG9yID0gZWxlbWVudFNlbGVjdG9yO1xuICAgICAgICBfdGhpcy5kdXJhdGlvblNlbGVjdG9yID0gZHVyYXRpb25TZWxlY3RvcjtcbiAgICAgICAgX3RoaXMuc3ViamVjdFNlbGVjdG9yID0gc3ViamVjdFNlbGVjdG9yO1xuICAgICAgICBfdGhpcy5ncm91cHMgPSBudWxsO1xuICAgICAgICBfdGhpcy5hdHRlbXB0ZWRUb1Vuc3Vic2NyaWJlID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmNvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBHcm91cEJ5U3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGtleSA9IHRoaXMua2V5U2VsZWN0b3IodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ncm91cCh2YWx1ZSwga2V5KTtcbiAgICB9O1xuICAgIEdyb3VwQnlTdWJzY3JpYmVyLnByb3RvdHlwZS5fZ3JvdXAgPSBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICB2YXIgZ3JvdXBzID0gdGhpcy5ncm91cHM7XG4gICAgICAgIGlmICghZ3JvdXBzKSB7XG4gICAgICAgICAgICBncm91cHMgPSB0aGlzLmdyb3VwcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZ3JvdXAgPSBncm91cHMuZ2V0KGtleSk7XG4gICAgICAgIHZhciBlbGVtZW50O1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50U2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMuZWxlbWVudFNlbGVjdG9yKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFncm91cCkge1xuICAgICAgICAgICAgZ3JvdXAgPSAodGhpcy5zdWJqZWN0U2VsZWN0b3IgPyB0aGlzLnN1YmplY3RTZWxlY3RvcigpIDogbmV3IFN1YmplY3QoKSk7XG4gICAgICAgICAgICBncm91cHMuc2V0KGtleSwgZ3JvdXApO1xuICAgICAgICAgICAgdmFyIGdyb3VwZWRPYnNlcnZhYmxlID0gbmV3IEdyb3VwZWRPYnNlcnZhYmxlKGtleSwgZ3JvdXAsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGdyb3VwZWRPYnNlcnZhYmxlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmR1cmF0aW9uU2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgZHVyYXRpb24gPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uU2VsZWN0b3IobmV3IEdyb3VwZWRPYnNlcnZhYmxlKGtleSwgZ3JvdXApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoZHVyYXRpb24uc3Vic2NyaWJlKG5ldyBHcm91cER1cmF0aW9uU3Vic2NyaWJlcihrZXksIGdyb3VwLCB0aGlzKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghZ3JvdXAuY2xvc2VkKSB7XG4gICAgICAgICAgICBncm91cC5uZXh0KGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBHcm91cEJ5U3Vic2NyaWJlci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICB2YXIgZ3JvdXBzID0gdGhpcy5ncm91cHM7XG4gICAgICAgIGlmIChncm91cHMpIHtcbiAgICAgICAgICAgIGdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChncm91cCwga2V5KSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ3JvdXBzLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgIH07XG4gICAgR3JvdXBCeVN1YnNjcmliZXIucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdyb3VwcyA9IHRoaXMuZ3JvdXBzO1xuICAgICAgICBpZiAoZ3JvdXBzKSB7XG4gICAgICAgICAgICBncm91cHMuZm9yRWFjaChmdW5jdGlvbiAoZ3JvdXAsIGtleSkge1xuICAgICAgICAgICAgICAgIGdyb3VwLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGdyb3Vwcy5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9O1xuICAgIEdyb3VwQnlTdWJzY3JpYmVyLnByb3RvdHlwZS5yZW1vdmVHcm91cCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdGhpcy5ncm91cHMuZGVsZXRlKGtleSk7XG4gICAgfTtcbiAgICBHcm91cEJ5U3Vic2NyaWJlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYXR0ZW1wdGVkVG9VbnN1YnNjcmliZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5jb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEdyb3VwQnlTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyKSk7XG52YXIgR3JvdXBEdXJhdGlvblN1YnNjcmliZXIgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoR3JvdXBEdXJhdGlvblN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gR3JvdXBEdXJhdGlvblN1YnNjcmliZXIoa2V5LCBncm91cCwgcGFyZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGdyb3VwKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIF90aGlzLmdyb3VwID0gZ3JvdXA7XG4gICAgICAgIF90aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBHcm91cER1cmF0aW9uU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZSgpO1xuICAgIH07XG4gICAgR3JvdXBEdXJhdGlvblN1YnNjcmliZXIucHJvdG90eXBlLl91bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgcGFyZW50ID0gX2EucGFyZW50LCBrZXkgPSBfYS5rZXk7XG4gICAgICAgIHRoaXMua2V5ID0gdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBwYXJlbnQucmVtb3ZlR3JvdXAoa2V5KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEdyb3VwRHVyYXRpb25TdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyKSk7XG52YXIgR3JvdXBlZE9ic2VydmFibGUgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoR3JvdXBlZE9ic2VydmFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gR3JvdXBlZE9ic2VydmFibGUoa2V5LCBncm91cFN1YmplY3QsIHJlZkNvdW50U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmtleSA9IGtleTtcbiAgICAgICAgX3RoaXMuZ3JvdXBTdWJqZWN0ID0gZ3JvdXBTdWJqZWN0O1xuICAgICAgICBfdGhpcy5yZWZDb3VudFN1YnNjcmlwdGlvbiA9IHJlZkNvdW50U3Vic2NyaXB0aW9uO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEdyb3VwZWRPYnNlcnZhYmxlLnByb3RvdHlwZS5fc3Vic2NyaWJlID0gZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgdmFyIF9hID0gdGhpcywgcmVmQ291bnRTdWJzY3JpcHRpb24gPSBfYS5yZWZDb3VudFN1YnNjcmlwdGlvbiwgZ3JvdXBTdWJqZWN0ID0gX2EuZ3JvdXBTdWJqZWN0O1xuICAgICAgICBpZiAocmVmQ291bnRTdWJzY3JpcHRpb24gJiYgIXJlZkNvdW50U3Vic2NyaXB0aW9uLmNsb3NlZCkge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLmFkZChuZXcgSW5uZXJSZWZDb3VudFN1YnNjcmlwdGlvbihyZWZDb3VudFN1YnNjcmlwdGlvbikpO1xuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmlwdGlvbi5hZGQoZ3JvdXBTdWJqZWN0LnN1YnNjcmliZShzdWJzY3JpYmVyKSk7XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICByZXR1cm4gR3JvdXBlZE9ic2VydmFibGU7XG59KE9ic2VydmFibGUpKTtcbmV4cG9ydCB7IEdyb3VwZWRPYnNlcnZhYmxlIH07XG52YXIgSW5uZXJSZWZDb3VudFN1YnNjcmlwdGlvbiA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhJbm5lclJlZkNvdW50U3Vic2NyaXB0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIElubmVyUmVmQ291bnRTdWJzY3JpcHRpb24ocGFyZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgcGFyZW50LmNvdW50Kys7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgSW5uZXJSZWZDb3VudFN1YnNjcmlwdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgaWYgKCFwYXJlbnQuY2xvc2VkICYmICF0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgcGFyZW50LmNvdW50IC09IDE7XG4gICAgICAgICAgICBpZiAocGFyZW50LmNvdW50ID09PSAwICYmIHBhcmVudC5hdHRlbXB0ZWRUb1Vuc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBJbm5lclJlZkNvdW50U3Vic2NyaXB0aW9uO1xufShTdWJzY3JpcHRpb24pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdyb3VwQnkuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9vcGVyYXRvcnMvZ3JvdXBCeS5qc1xuLy8gbW9kdWxlIGlkID0gODlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCB0c2xpYixfdXRpbF9zdWJzY3JpYmVUb1Jlc3VsdCxfT3V0ZXJTdWJzY3JpYmVyLF9Jbm5lclN1YnNjcmliZXIsX21hcCxfb2JzZXJ2YWJsZV9mcm9tIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IElubmVyU3Vic2NyaWJlciB9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICcuL21hcCc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9mcm9tJztcbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU1hcChwcm9qZWN0LCByZXN1bHRTZWxlY3RvciwgY29uY3VycmVudCkge1xuICAgIGlmIChjb25jdXJyZW50ID09PSB2b2lkIDApIHtcbiAgICAgICAgY29uY3VycmVudCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXN1bHRTZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkgeyByZXR1cm4gc291cmNlLnBpcGUobWVyZ2VNYXAoZnVuY3Rpb24gKGEsIGkpIHsgcmV0dXJuIGZyb20ocHJvamVjdChhLCBpKSkucGlwZShtYXAoZnVuY3Rpb24gKGIsIGlpKSB7IHJldHVybiByZXN1bHRTZWxlY3RvcihhLCBiLCBpLCBpaSk7IH0pKTsgfSwgY29uY3VycmVudCkpOyB9O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgcmVzdWx0U2VsZWN0b3IgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNvbmN1cnJlbnQgPSByZXN1bHRTZWxlY3RvcjtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UpIHsgcmV0dXJuIHNvdXJjZS5saWZ0KG5ldyBNZXJnZU1hcE9wZXJhdG9yKHByb2plY3QsIGNvbmN1cnJlbnQpKTsgfTtcbn1cbnZhciBNZXJnZU1hcE9wZXJhdG9yID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1lcmdlTWFwT3BlcmF0b3IocHJvamVjdCwgY29uY3VycmVudCkge1xuICAgICAgICBpZiAoY29uY3VycmVudCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBjb25jdXJyZW50ID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIHRoaXMuY29uY3VycmVudCA9IGNvbmN1cnJlbnQ7XG4gICAgfVxuICAgIE1lcmdlTWFwT3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAob2JzZXJ2ZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgTWVyZ2VNYXBTdWJzY3JpYmVyKG9ic2VydmVyLCB0aGlzLnByb2plY3QsIHRoaXMuY29uY3VycmVudCkpO1xuICAgIH07XG4gICAgcmV0dXJuIE1lcmdlTWFwT3BlcmF0b3I7XG59KCkpO1xuZXhwb3J0IHsgTWVyZ2VNYXBPcGVyYXRvciB9O1xudmFyIE1lcmdlTWFwU3Vic2NyaWJlciA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhNZXJnZU1hcFN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWVyZ2VNYXBTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBwcm9qZWN0LCBjb25jdXJyZW50KSB7XG4gICAgICAgIGlmIChjb25jdXJyZW50ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGNvbmN1cnJlbnQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZGVzdGluYXRpb24pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgICBfdGhpcy5jb25jdXJyZW50ID0gY29uY3VycmVudDtcbiAgICAgICAgX3RoaXMuaGFzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmJ1ZmZlciA9IFtdO1xuICAgICAgICBfdGhpcy5hY3RpdmUgPSAwO1xuICAgICAgICBfdGhpcy5pbmRleCA9IDA7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgTWVyZ2VNYXBTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmUgPCB0aGlzLmNvbmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RyeU5leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5idWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1lcmdlTWFwU3Vic2NyaWJlci5wcm90b3R5cGUuX3RyeU5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleCsrO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5wcm9qZWN0KHZhbHVlLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aXZlKys7XG4gICAgICAgIHRoaXMuX2lubmVyU3ViKHJlc3VsdCwgdmFsdWUsIGluZGV4KTtcbiAgICB9O1xuICAgIE1lcmdlTWFwU3Vic2NyaWJlci5wcm90b3R5cGUuX2lubmVyU3ViID0gZnVuY3Rpb24gKGlzaCwgdmFsdWUsIGluZGV4KSB7XG4gICAgICAgIHZhciBpbm5lclN1YnNjcmliZXIgPSBuZXcgSW5uZXJTdWJzY3JpYmVyKHRoaXMsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5hZGQoaW5uZXJTdWJzY3JpYmVyKTtcbiAgICAgICAgc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgaXNoLCB2YWx1ZSwgaW5kZXgsIGlubmVyU3Vic2NyaWJlcik7XG4gICAgfTtcbiAgICBNZXJnZU1hcFN1YnNjcmliZXIucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5oYXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5hY3RpdmUgPT09IDAgJiYgdGhpcy5idWZmZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE1lcmdlTWFwU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5TmV4dCA9IGZ1bmN0aW9uIChvdXRlclZhbHVlLCBpbm5lclZhbHVlLCBvdXRlckluZGV4LCBpbm5lckluZGV4LCBpbm5lclN1Yikge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoaW5uZXJWYWx1ZSk7XG4gICAgfTtcbiAgICBNZXJnZU1hcFN1YnNjcmliZXIucHJvdG90eXBlLm5vdGlmeUNvbXBsZXRlID0gZnVuY3Rpb24gKGlubmVyU3ViKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICAgICAgdGhpcy5yZW1vdmUoaW5uZXJTdWIpO1xuICAgICAgICB0aGlzLmFjdGl2ZS0tO1xuICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX25leHQoYnVmZmVyLnNoaWZ0KCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuYWN0aXZlID09PSAwICYmIHRoaXMuaGFzQ29tcGxldGVkKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBNZXJnZU1hcFN1YnNjcmliZXI7XG59KE91dGVyU3Vic2NyaWJlcikpO1xuZXhwb3J0IHsgTWVyZ2VNYXBTdWJzY3JpYmVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tZXJnZU1hcC5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29wZXJhdG9ycy9tZXJnZU1hcC5qc1xuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCB0c2xpYixfU3Vic2NyaWJlcixfTm90aWZpY2F0aW9uIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb24gfSBmcm9tICcuLi9Ob3RpZmljYXRpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVPbihzY2hlZHVsZXIsIGRlbGF5KSB7XG4gICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHtcbiAgICAgICAgZGVsYXkgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gb2JzZXJ2ZU9uT3BlcmF0b3JGdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5saWZ0KG5ldyBPYnNlcnZlT25PcGVyYXRvcihzY2hlZHVsZXIsIGRlbGF5KSk7XG4gICAgfTtcbn1cbnZhciBPYnNlcnZlT25PcGVyYXRvciA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZlT25PcGVyYXRvcihzY2hlZHVsZXIsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBkZWxheSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcbiAgICB9XG4gICAgT2JzZXJ2ZU9uT3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBPYnNlcnZlT25TdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuc2NoZWR1bGVyLCB0aGlzLmRlbGF5KSk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2ZU9uT3BlcmF0b3I7XG59KCkpO1xuZXhwb3J0IHsgT2JzZXJ2ZU9uT3BlcmF0b3IgfTtcbnZhciBPYnNlcnZlT25TdWJzY3JpYmVyID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKE9ic2VydmVPblN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gT2JzZXJ2ZU9uU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgc2NoZWR1bGVyLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgZGVsYXkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLmRlbGF5ID0gZGVsYXk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JzZXJ2ZU9uU3Vic2NyaWJlci5kaXNwYXRjaCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IGFyZy5ub3RpZmljYXRpb24sIGRlc3RpbmF0aW9uID0gYXJnLmRlc3RpbmF0aW9uO1xuICAgICAgICBub3RpZmljYXRpb24ub2JzZXJ2ZShkZXN0aW5hdGlvbik7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIE9ic2VydmVPblN1YnNjcmliZXIucHJvdG90eXBlLnNjaGVkdWxlTWVzc2FnZSA9IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHtcbiAgICAgICAgdGhpcy5hZGQodGhpcy5zY2hlZHVsZXIuc2NoZWR1bGUoT2JzZXJ2ZU9uU3Vic2NyaWJlci5kaXNwYXRjaCwgdGhpcy5kZWxheSwgbmV3IE9ic2VydmVPbk1lc3NhZ2Uobm90aWZpY2F0aW9uLCB0aGlzLmRlc3RpbmF0aW9uKSkpO1xuICAgIH07XG4gICAgT2JzZXJ2ZU9uU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU1lc3NhZ2UoTm90aWZpY2F0aW9uLmNyZWF0ZU5leHQodmFsdWUpKTtcbiAgICB9O1xuICAgIE9ic2VydmVPblN1YnNjcmliZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU1lc3NhZ2UoTm90aWZpY2F0aW9uLmNyZWF0ZUVycm9yKGVycikpO1xuICAgIH07XG4gICAgT2JzZXJ2ZU9uU3Vic2NyaWJlci5wcm90b3R5cGUuX2NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlTWVzc2FnZShOb3RpZmljYXRpb24uY3JlYXRlQ29tcGxldGUoKSk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2ZU9uU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0IHsgT2JzZXJ2ZU9uU3Vic2NyaWJlciB9O1xudmFyIE9ic2VydmVPbk1lc3NhZ2UgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT2JzZXJ2ZU9uTWVzc2FnZShub3RpZmljYXRpb24sIGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uID0gbm90aWZpY2F0aW9uO1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgfVxuICAgIHJldHVybiBPYnNlcnZlT25NZXNzYWdlO1xufSgpKTtcbmV4cG9ydCB7IE9ic2VydmVPbk1lc3NhZ2UgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmVPbi5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29wZXJhdG9ycy9vYnNlcnZlT24uanNcbi8vIG1vZHVsZSBpZCA9IDkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgdHNsaWIsX1N1YnNjcmliZXIgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiByZWZDb3VudCgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVmQ291bnRPcGVyYXRvckZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLmxpZnQobmV3IFJlZkNvdW50T3BlcmF0b3Ioc291cmNlKSk7XG4gICAgfTtcbn1cbnZhciBSZWZDb3VudE9wZXJhdG9yID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlZkNvdW50T3BlcmF0b3IoY29ubmVjdGFibGUpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0YWJsZSA9IGNvbm5lY3RhYmxlO1xuICAgIH1cbiAgICBSZWZDb3VudE9wZXJhdG9yLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICB2YXIgY29ubmVjdGFibGUgPSB0aGlzLmNvbm5lY3RhYmxlO1xuICAgICAgICBjb25uZWN0YWJsZS5fcmVmQ291bnQrKztcbiAgICAgICAgdmFyIHJlZkNvdW50ZXIgPSBuZXcgUmVmQ291bnRTdWJzY3JpYmVyKHN1YnNjcmliZXIsIGNvbm5lY3RhYmxlKTtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHNvdXJjZS5zdWJzY3JpYmUocmVmQ291bnRlcik7XG4gICAgICAgIGlmICghcmVmQ291bnRlci5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJlZkNvdW50ZXIuY29ubmVjdGlvbiA9IGNvbm5lY3RhYmxlLmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH07XG4gICAgcmV0dXJuIFJlZkNvdW50T3BlcmF0b3I7XG59KCkpO1xudmFyIFJlZkNvdW50U3Vic2NyaWJlciA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhSZWZDb3VudFN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUmVmQ291bnRTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBjb25uZWN0YWJsZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY29ubmVjdGFibGUgPSBjb25uZWN0YWJsZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBSZWZDb3VudFN1YnNjcmliZXIucHJvdG90eXBlLl91bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbm5lY3RhYmxlID0gdGhpcy5jb25uZWN0YWJsZTtcbiAgICAgICAgaWYgKCFjb25uZWN0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbm5lY3RhYmxlID0gbnVsbDtcbiAgICAgICAgdmFyIHJlZkNvdW50ID0gY29ubmVjdGFibGUuX3JlZkNvdW50O1xuICAgICAgICBpZiAocmVmQ291bnQgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25uZWN0YWJsZS5fcmVmQ291bnQgPSByZWZDb3VudCAtIDE7XG4gICAgICAgIGlmIChyZWZDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzLmNvbm5lY3Rpb247XG4gICAgICAgIHZhciBzaGFyZWRDb25uZWN0aW9uID0gY29ubmVjdGFibGUuX2Nvbm5lY3Rpb247XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICAgIGlmIChzaGFyZWRDb25uZWN0aW9uICYmICghY29ubmVjdGlvbiB8fCBzaGFyZWRDb25uZWN0aW9uID09PSBjb25uZWN0aW9uKSkge1xuICAgICAgICAgICAgc2hhcmVkQ29ubmVjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gUmVmQ291bnRTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWZDb3VudC5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL29wZXJhdG9ycy9yZWZDb3VudC5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCB0c2xpYixfU3Vic2NyaXB0aW9uIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xudmFyIEFjdGlvbiA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhBY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQWN0aW9uKHNjaGVkdWxlciwgd29yaykge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICB9XG4gICAgQWN0aW9uLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGRlbGF5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBBY3Rpb247XG59KFN1YnNjcmlwdGlvbikpO1xuZXhwb3J0IHsgQWN0aW9uIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BY3Rpb24uanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvQWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIHRzbGliLF9Bc3luY0FjdGlvbiBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgQXN5bmNBY3Rpb24gfSBmcm9tICcuL0FzeW5jQWN0aW9uJztcbnZhciBBbmltYXRpb25GcmFtZUFjdGlvbiA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhBbmltYXRpb25GcmFtZUFjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBbmltYXRpb25GcmFtZUFjdGlvbihzY2hlZHVsZXIsIHdvcmspIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2NoZWR1bGVyLCB3b3JrKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLndvcmsgPSB3b3JrO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFuaW1hdGlvbkZyYW1lQWN0aW9uLnByb3RvdHlwZS5yZXF1ZXN0QXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgZGVsYXkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWxheSAhPT0gbnVsbCAmJiBkZWxheSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkLmNhbGwodGhpcywgc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHNjaGVkdWxlci5hY3Rpb25zLnB1c2godGhpcyk7XG4gICAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGVkIHx8IChzY2hlZHVsZXIuc2NoZWR1bGVkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVkdWxlci5mbHVzaChudWxsKTsgfSkpO1xuICAgIH07XG4gICAgQW5pbWF0aW9uRnJhbWVBY3Rpb24ucHJvdG90eXBlLnJlY3ljbGVBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBkZWxheSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChkZWxheSAhPT0gbnVsbCAmJiBkZWxheSA+IDApIHx8IChkZWxheSA9PT0gbnVsbCAmJiB0aGlzLmRlbGF5ID4gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnJlY3ljbGVBc3luY0lkLmNhbGwodGhpcywgc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY2hlZHVsZXIuYWN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKTtcbiAgICAgICAgICAgIHNjaGVkdWxlci5zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIHJldHVybiBBbmltYXRpb25GcmFtZUFjdGlvbjtcbn0oQXN5bmNBY3Rpb24pKTtcbmV4cG9ydCB7IEFuaW1hdGlvbkZyYW1lQWN0aW9uIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BbmltYXRpb25GcmFtZUFjdGlvbi5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3NjaGVkdWxlci9BbmltYXRpb25GcmFtZUFjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gOTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCB0c2xpYixfQXN5bmNTY2hlZHVsZXIgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IEFzeW5jU2NoZWR1bGVyIH0gZnJvbSAnLi9Bc3luY1NjaGVkdWxlcic7XG52YXIgQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVkID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgYWN0aW9ucyA9IHRoaXMuYWN0aW9ucztcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgdmFyIGNvdW50ID0gYWN0aW9ucy5sZW5ndGg7XG4gICAgICAgIGFjdGlvbiA9IGFjdGlvbiB8fCBhY3Rpb25zLnNoaWZ0KCk7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmIChlcnJvciA9IGFjdGlvbi5leGVjdXRlKGFjdGlvbi5zdGF0ZSwgYWN0aW9uLmRlbGF5KSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICgrK2luZGV4IDwgY291bnQgJiYgKGFjdGlvbiA9IGFjdGlvbnMuc2hpZnQoKSkpO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHdoaWxlICgrK2luZGV4IDwgY291bnQgJiYgKGFjdGlvbiA9IGFjdGlvbnMuc2hpZnQoKSkpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXI7XG59KEFzeW5jU2NoZWR1bGVyKSk7XG5leHBvcnQgeyBBbmltYXRpb25GcmFtZVNjaGVkdWxlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgdHNsaWIsX3V0aWxfSW1tZWRpYXRlLF9Bc3luY0FjdGlvbiBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgSW1tZWRpYXRlIH0gZnJvbSAnLi4vdXRpbC9JbW1lZGlhdGUnO1xuaW1wb3J0IHsgQXN5bmNBY3Rpb24gfSBmcm9tICcuL0FzeW5jQWN0aW9uJztcbnZhciBBc2FwQWN0aW9uID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKEFzYXBBY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQXNhcEFjdGlvbihzY2hlZHVsZXIsIHdvcmspIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2NoZWR1bGVyLCB3b3JrKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLndvcmsgPSB3b3JrO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFzYXBBY3Rpb24ucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBkZWxheSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlbGF5ICE9PSBudWxsICYmIGRlbGF5ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUucmVxdWVzdEFzeW5jSWQuY2FsbCh0aGlzLCBzY2hlZHVsZXIsIGlkLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgc2NoZWR1bGVyLmFjdGlvbnMucHVzaCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5zY2hlZHVsZWQgfHwgKHNjaGVkdWxlci5zY2hlZHVsZWQgPSBJbW1lZGlhdGUuc2V0SW1tZWRpYXRlKHNjaGVkdWxlci5mbHVzaC5iaW5kKHNjaGVkdWxlciwgbnVsbCkpKTtcbiAgICB9O1xuICAgIEFzYXBBY3Rpb24ucHJvdG90eXBlLnJlY3ljbGVBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBkZWxheSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChkZWxheSAhPT0gbnVsbCAmJiBkZWxheSA+IDApIHx8IChkZWxheSA9PT0gbnVsbCAmJiB0aGlzLmRlbGF5ID4gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnJlY3ljbGVBc3luY0lkLmNhbGwodGhpcywgc2NoZWR1bGVyLCBpZCwgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY2hlZHVsZXIuYWN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIEltbWVkaWF0ZS5jbGVhckltbWVkaWF0ZShpZCk7XG4gICAgICAgICAgICBzY2hlZHVsZXIuc2NoZWR1bGVkID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICByZXR1cm4gQXNhcEFjdGlvbjtcbn0oQXN5bmNBY3Rpb24pKTtcbmV4cG9ydCB7IEFzYXBBY3Rpb24gfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFzYXBBY3Rpb24uanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvQXNhcEFjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCB0c2xpYixfQXN5bmNTY2hlZHVsZXIgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IEFzeW5jU2NoZWR1bGVyIH0gZnJvbSAnLi9Bc3luY1NjaGVkdWxlcic7XG52YXIgQXNhcFNjaGVkdWxlciA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhBc2FwU2NoZWR1bGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFzYXBTY2hlZHVsZXIoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgQXNhcFNjaGVkdWxlci5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBhY3Rpb25zID0gdGhpcy5hY3Rpb25zO1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICB2YXIgY291bnQgPSBhY3Rpb25zLmxlbmd0aDtcbiAgICAgICAgYWN0aW9uID0gYWN0aW9uIHx8IGFjdGlvbnMuc2hpZnQoKTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKGVycm9yID0gYWN0aW9uLmV4ZWN1dGUoYWN0aW9uLnN0YXRlLCBhY3Rpb24uZGVsYXkpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKCsraW5kZXggPCBjb3VudCAmJiAoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSk7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgd2hpbGUgKCsraW5kZXggPCBjb3VudCAmJiAoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSkge1xuICAgICAgICAgICAgICAgIGFjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBBc2FwU2NoZWR1bGVyO1xufShBc3luY1NjaGVkdWxlcikpO1xuZXhwb3J0IHsgQXNhcFNjaGVkdWxlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXNhcFNjaGVkdWxlci5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3NjaGVkdWxlci9Bc2FwU2NoZWR1bGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA5N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIHRzbGliLF9Bc3luY0FjdGlvbiBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgQXN5bmNBY3Rpb24gfSBmcm9tICcuL0FzeW5jQWN0aW9uJztcbnZhciBRdWV1ZUFjdGlvbiA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhRdWV1ZUFjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBRdWV1ZUFjdGlvbihzY2hlZHVsZXIsIHdvcmspIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2NoZWR1bGVyLCB3b3JrKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLndvcmsgPSB3b3JrO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFF1ZXVlQWN0aW9uLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGRlbGF5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVsYXkgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5zY2hlZHVsZS5jYWxsKHRoaXMsIHN0YXRlLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWxheSA9IGRlbGF5O1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyLmZsdXNoKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFF1ZXVlQWN0aW9uLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24gKHN0YXRlLCBkZWxheSkge1xuICAgICAgICByZXR1cm4gKGRlbGF5ID4gMCB8fCB0aGlzLmNsb3NlZCkgP1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5leGVjdXRlLmNhbGwodGhpcywgc3RhdGUsIGRlbGF5KSA6XG4gICAgICAgICAgICB0aGlzLl9leGVjdXRlKHN0YXRlLCBkZWxheSk7XG4gICAgfTtcbiAgICBRdWV1ZUFjdGlvbi5wcm90b3R5cGUucmVxdWVzdEFzeW5jSWQgPSBmdW5jdGlvbiAoc2NoZWR1bGVyLCBpZCwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGRlbGF5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGRlbGF5ICE9PSBudWxsICYmIGRlbGF5ID4gMCkgfHwgKGRlbGF5ID09PSBudWxsICYmIHRoaXMuZGVsYXkgPiAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUucmVxdWVzdEFzeW5jSWQuY2FsbCh0aGlzLCBzY2hlZHVsZXIsIGlkLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNjaGVkdWxlci5mbHVzaCh0aGlzKTtcbiAgICB9O1xuICAgIHJldHVybiBRdWV1ZUFjdGlvbjtcbn0oQXN5bmNBY3Rpb24pKTtcbmV4cG9ydCB7IFF1ZXVlQWN0aW9uIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1RdWV1ZUFjdGlvbi5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3NjaGVkdWxlci9RdWV1ZUFjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gOThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCB0c2xpYixfQXN5bmNTY2hlZHVsZXIgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IEFzeW5jU2NoZWR1bGVyIH0gZnJvbSAnLi9Bc3luY1NjaGVkdWxlcic7XG52YXIgUXVldWVTY2hlZHVsZXIgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoUXVldWVTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUXVldWVTY2hlZHVsZXIoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFF1ZXVlU2NoZWR1bGVyO1xufShBc3luY1NjaGVkdWxlcikpO1xuZXhwb3J0IHsgUXVldWVTY2hlZHVsZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVF1ZXVlU2NoZWR1bGVyLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL1F1ZXVlU2NoZWR1bGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIHRzbGliLF9Bc3luY0FjdGlvbixfQXN5bmNTY2hlZHVsZXIgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCB7IEFzeW5jQWN0aW9uIH0gZnJvbSAnLi9Bc3luY0FjdGlvbic7XG5pbXBvcnQgeyBBc3luY1NjaGVkdWxlciB9IGZyb20gJy4vQXN5bmNTY2hlZHVsZXInO1xudmFyIFZpcnR1YWxUaW1lU2NoZWR1bGVyID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKFZpcnR1YWxUaW1lU2NoZWR1bGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFZpcnR1YWxUaW1lU2NoZWR1bGVyKFNjaGVkdWxlckFjdGlvbiwgbWF4RnJhbWVzKSB7XG4gICAgICAgIGlmIChTY2hlZHVsZXJBY3Rpb24gPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgU2NoZWR1bGVyQWN0aW9uID0gVmlydHVhbEFjdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4RnJhbWVzID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIG1heEZyYW1lcyA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBTY2hlZHVsZXJBY3Rpb24sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmZyYW1lOyB9KSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5tYXhGcmFtZXMgPSBtYXhGcmFtZXM7XG4gICAgICAgIF90aGlzLmZyYW1lID0gMDtcbiAgICAgICAgX3RoaXMuaW5kZXggPSAtMTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBWaXJ0dWFsVGltZVNjaGVkdWxlci5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIGFjdGlvbnMgPSBfYS5hY3Rpb25zLCBtYXhGcmFtZXMgPSBfYS5tYXhGcmFtZXM7XG4gICAgICAgIHZhciBlcnJvciwgYWN0aW9uO1xuICAgICAgICB3aGlsZSAoKGFjdGlvbiA9IGFjdGlvbnMuc2hpZnQoKSkgJiYgKHRoaXMuZnJhbWUgPSBhY3Rpb24uZGVsYXkpIDw9IG1heEZyYW1lcykge1xuICAgICAgICAgICAgaWYgKGVycm9yID0gYWN0aW9uLmV4ZWN1dGUoYWN0aW9uLnN0YXRlLCBhY3Rpb24uZGVsYXkpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB3aGlsZSAoYWN0aW9uID0gYWN0aW9ucy5zaGlmdCgpKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVmlydHVhbFRpbWVTY2hlZHVsZXIuZnJhbWVUaW1lRmFjdG9yID0gMTA7XG4gICAgcmV0dXJuIFZpcnR1YWxUaW1lU2NoZWR1bGVyO1xufShBc3luY1NjaGVkdWxlcikpO1xuZXhwb3J0IHsgVmlydHVhbFRpbWVTY2hlZHVsZXIgfTtcbnZhciBWaXJ0dWFsQWN0aW9uID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKFZpcnR1YWxBY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVmlydHVhbEFjdGlvbihzY2hlZHVsZXIsIHdvcmssIGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBpbmRleCA9IHNjaGVkdWxlci5pbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHNjaGVkdWxlciwgd29yaykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICBfdGhpcy53b3JrID0gd29yaztcbiAgICAgICAgX3RoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgX3RoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMuaW5kZXggPSBzY2hlZHVsZXIuaW5kZXggPSBpbmRleDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBWaXJ0dWFsQWN0aW9uLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGRlbGF5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLnNjaGVkdWxlLmNhbGwodGhpcywgc3RhdGUsIGRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IFZpcnR1YWxBY3Rpb24odGhpcy5zY2hlZHVsZXIsIHRoaXMud29yayk7XG4gICAgICAgIHRoaXMuYWRkKGFjdGlvbik7XG4gICAgICAgIHJldHVybiBhY3Rpb24uc2NoZWR1bGUoc3RhdGUsIGRlbGF5KTtcbiAgICB9O1xuICAgIFZpcnR1YWxBY3Rpb24ucHJvdG90eXBlLnJlcXVlc3RBc3luY0lkID0gZnVuY3Rpb24gKHNjaGVkdWxlciwgaWQsIGRlbGF5KSB7XG4gICAgICAgIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBkZWxheSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWxheSA9IHNjaGVkdWxlci5mcmFtZSArIGRlbGF5O1xuICAgICAgICB2YXIgYWN0aW9ucyA9IHNjaGVkdWxlci5hY3Rpb25zO1xuICAgICAgICBhY3Rpb25zLnB1c2godGhpcyk7XG4gICAgICAgIGFjdGlvbnMuc29ydChWaXJ0dWFsQWN0aW9uLnNvcnRBY3Rpb25zKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBWaXJ0dWFsQWN0aW9uLnByb3RvdHlwZS5yZWN5Y2xlQXN5bmNJZCA9IGZ1bmN0aW9uIChzY2hlZHVsZXIsIGlkLCBkZWxheSkge1xuICAgICAgICBpZiAoZGVsYXkgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgZGVsYXkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBWaXJ0dWFsQWN0aW9uLnByb3RvdHlwZS5fZXhlY3V0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZGVsYXkpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5fZXhlY3V0ZS5jYWxsKHRoaXMsIHN0YXRlLCBkZWxheSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFZpcnR1YWxBY3Rpb24uc29ydEFjdGlvbnMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBpZiAoYS5kZWxheSA9PT0gYi5kZWxheSkge1xuICAgICAgICAgICAgaWYgKGEuaW5kZXggPT09IGIuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGEuaW5kZXggPiBiLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYS5kZWxheSA+IGIuZGVsYXkpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gVmlydHVhbEFjdGlvbjtcbn0oQXN5bmNBY3Rpb24pKTtcbmV4cG9ydCB7IFZpcnR1YWxBY3Rpb24gfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVZpcnR1YWxUaW1lU2NoZWR1bGVyLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL1ZpcnR1YWxUaW1lU2NoZWR1bGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfQW5pbWF0aW9uRnJhbWVBY3Rpb24sX0FuaW1hdGlvbkZyYW1lU2NoZWR1bGVyIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IEFuaW1hdGlvbkZyYW1lQWN0aW9uIH0gZnJvbSAnLi9BbmltYXRpb25GcmFtZUFjdGlvbic7XG5pbXBvcnQgeyBBbmltYXRpb25GcmFtZVNjaGVkdWxlciB9IGZyb20gJy4vQW5pbWF0aW9uRnJhbWVTY2hlZHVsZXInO1xuZXhwb3J0IHZhciBhbmltYXRpb25GcmFtZSA9IC8qQF9fUFVSRV9fKi8gbmV3IEFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKEFuaW1hdGlvbkZyYW1lQWN0aW9uKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFuaW1hdGlvbkZyYW1lLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVyL2FuaW1hdGlvbkZyYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfQXNhcEFjdGlvbixfQXNhcFNjaGVkdWxlciBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBBc2FwQWN0aW9uIH0gZnJvbSAnLi9Bc2FwQWN0aW9uJztcbmltcG9ydCB7IEFzYXBTY2hlZHVsZXIgfSBmcm9tICcuL0FzYXBTY2hlZHVsZXInO1xuZXhwb3J0IHZhciBhc2FwID0gLypAX19QVVJFX18qLyBuZXcgQXNhcFNjaGVkdWxlcihBc2FwQWN0aW9uKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzYXAuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC9zY2hlZHVsZXIvYXNhcC5qc1xuLy8gbW9kdWxlIGlkID0gMTAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbmZ1bmN0aW9uIEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9ySW1wbCgpIHtcbiAgICBFcnJvci5jYWxsKHRoaXMpO1xuICAgIHRoaXMubWVzc2FnZSA9ICdhcmd1bWVudCBvdXQgb2YgcmFuZ2UnO1xuICAgIHRoaXMubmFtZSA9ICdBcmd1bWVudE91dE9mUmFuZ2VFcnJvcic7XG4gICAgcmV0dXJuIHRoaXM7XG59XG5Bcmd1bWVudE91dE9mUmFuZ2VFcnJvckltcGwucHJvdG90eXBlID0gLypAX19QVVJFX18qLyBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5leHBvcnQgdmFyIEFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yID0gQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JJbXBsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXJndW1lbnRPdXRPZlJhbmdlRXJyb3IuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCAgUFVSRV9JTVBPUlRTX0VORCAqL1xuZnVuY3Rpb24gRW1wdHlFcnJvckltcGwoKSB7XG4gICAgRXJyb3IuY2FsbCh0aGlzKTtcbiAgICB0aGlzLm1lc3NhZ2UgPSAnbm8gZWxlbWVudHMgaW4gc2VxdWVuY2UnO1xuICAgIHRoaXMubmFtZSA9ICdFbXB0eUVycm9yJztcbiAgICByZXR1cm4gdGhpcztcbn1cbkVtcHR5RXJyb3JJbXBsLnByb3RvdHlwZSA9IC8qQF9fUFVSRV9fKi8gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuZXhwb3J0IHZhciBFbXB0eUVycm9yID0gRW1wdHlFcnJvckltcGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FbXB0eUVycm9yLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9FbXB0eUVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCAgUFVSRV9JTVBPUlRTX0VORCAqL1xudmFyIG5leHRIYW5kbGUgPSAxO1xudmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbmZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICB2YXIgY2IgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgaWYgKGNiKSB7XG4gICAgICAgIGNiKCk7XG4gICAgfVxufVxuZXhwb3J0IHZhciBJbW1lZGlhdGUgPSB7XG4gICAgc2V0SW1tZWRpYXRlOiBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdmFyIGhhbmRsZSA9IG5leHRIYW5kbGUrKztcbiAgICAgICAgdGFza3NCeUhhbmRsZVtoYW5kbGVdID0gY2I7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gcnVuSWZQcmVzZW50KGhhbmRsZSk7IH0pO1xuICAgICAgICByZXR1cm4gaGFuZGxlO1xuICAgIH0sXG4gICAgY2xlYXJJbW1lZGlhdGU6IGZ1bmN0aW9uIChoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9LFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUltbWVkaWF0ZS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvSW1tZWRpYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCAgUFVSRV9JTVBPUlRTX0VORCAqL1xuZnVuY3Rpb24gVGltZW91dEVycm9ySW1wbCgpIHtcbiAgICBFcnJvci5jYWxsKHRoaXMpO1xuICAgIHRoaXMubWVzc2FnZSA9ICdUaW1lb3V0IGhhcyBvY2N1cnJlZCc7XG4gICAgdGhpcy5uYW1lID0gJ1RpbWVvdXRFcnJvcic7XG4gICAgcmV0dXJuIHRoaXM7XG59XG5UaW1lb3V0RXJyb3JJbXBsLnByb3RvdHlwZSA9IC8qQF9fUFVSRV9fKi8gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuZXhwb3J0IHZhciBUaW1lb3V0RXJyb3IgPSBUaW1lb3V0RXJyb3JJbXBsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGltZW91dEVycm9yLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9UaW1lb3V0RXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDEwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9zeW1ib2xfb2JzZXJ2YWJsZSBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBvYnNlcnZhYmxlIGFzIFN5bWJvbF9vYnNlcnZhYmxlIH0gZnJvbSAnLi4vc3ltYm9sL29ic2VydmFibGUnO1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZXJvcE9ic2VydmFibGUoaW5wdXQpIHtcbiAgICByZXR1cm4gaW5wdXQgJiYgdHlwZW9mIGlucHV0W1N5bWJvbF9vYnNlcnZhYmxlXSA9PT0gJ2Z1bmN0aW9uJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzSW50ZXJvcE9ic2VydmFibGUuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL2lzSW50ZXJvcE9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9zeW1ib2xfaXRlcmF0b3IgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgaXRlcmF0b3IgYXMgU3ltYm9sX2l0ZXJhdG9yIH0gZnJvbSAnLi4vc3ltYm9sL2l0ZXJhdG9yJztcbmV4cG9ydCBmdW5jdGlvbiBpc0l0ZXJhYmxlKGlucHV0KSB7XG4gICAgcmV0dXJuIGlucHV0ICYmIHR5cGVvZiBpbnB1dFtTeW1ib2xfaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNJdGVyYWJsZS5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvaXNJdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JzZXJ2YWJsZShvYmopIHtcbiAgICByZXR1cm4gISFvYmogJiYgKG9iaiBpbnN0YW5jZW9mIE9ic2VydmFibGUgfHwgKHR5cGVvZiBvYmoubGlmdCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNPYnNlcnZhYmxlLmpzLm1hcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9pc09ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9TdWJzY3JpYmVyLF9zeW1ib2xfcnhTdWJzY3JpYmVyLF9PYnNlcnZlciBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyByeFN1YnNjcmliZXIgYXMgcnhTdWJzY3JpYmVyU3ltYm9sIH0gZnJvbSAnLi4vc3ltYm9sL3J4U3Vic2NyaWJlcic7XG5pbXBvcnQgeyBlbXB0eSBhcyBlbXB0eU9ic2VydmVyIH0gZnJvbSAnLi4vT2JzZXJ2ZXInO1xuZXhwb3J0IGZ1bmN0aW9uIHRvU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgaWYgKG5leHRPck9ic2VydmVyKSB7XG4gICAgICAgIGlmIChuZXh0T3JPYnNlcnZlciBpbnN0YW5jZW9mIFN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0T3JPYnNlcnZlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dE9yT2JzZXJ2ZXJbcnhTdWJzY3JpYmVyU3ltYm9sXSkge1xuICAgICAgICAgICAgcmV0dXJuIG5leHRPck9ic2VydmVyW3J4U3Vic2NyaWJlclN5bWJvbF0oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW5leHRPck9ic2VydmVyICYmICFlcnJvciAmJiAhY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJzY3JpYmVyKGVtcHR5T2JzZXJ2ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFN1YnNjcmliZXIobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b1N1YnNjcmliZXIuanMubWFwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL3RvU3Vic2NyaWJlci5qc1xuLy8gbW9kdWxlIGlkID0gMTEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX2Vycm9yT2JqZWN0IFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IGVycm9yT2JqZWN0IH0gZnJvbSAnLi9lcnJvck9iamVjdCc7XG52YXIgdHJ5Q2F0Y2hUYXJnZXQ7XG5mdW5jdGlvbiB0cnlDYXRjaGVyKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB0cnlDYXRjaFRhcmdldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBlcnJvck9iamVjdC5lID0gZTtcbiAgICAgICAgcmV0dXJuIGVycm9yT2JqZWN0O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB0cnlDYXRjaChmbikge1xuICAgIHRyeUNhdGNoVGFyZ2V0ID0gZm47XG4gICAgcmV0dXJuIHRyeUNhdGNoZXI7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cnlDYXRjaC5qcy5tYXBcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yeGpzL19lc201L2ludGVybmFsL3V0aWwvdHJ5Q2F0Y2guanNcbi8vIG1vZHVsZSBpZCA9IDExMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTEyX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYW5ndWxhci9jb21tb25cIlxuLy8gbW9kdWxlIGlkID0gMTEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xMTNfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJ4anMvb3BlcmF0b3JzXCJcbi8vIG1vZHVsZSBpZCA9IDExM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9
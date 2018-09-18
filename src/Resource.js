import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { ResourceGlobalConfig, TGetParamsMappingType } from './ResourceGlobalConfig';
import { flatMap, map, publish } from 'rxjs/operators';
var Resource = /** @class */ (function () {
    function Resource(http) {
        this.http = http;
        this.$url = null;
        this.$path = null;
        this.$headers = null;
        this.$params = null;
        this.$data = null;
    }
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
        return this.$url || this.$_getUrl(methodOptions) || ResourceGlobalConfig.url || '';
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
        return this.$path || this.$_getPath(methodOptions) || ResourceGlobalConfig.path || '';
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
        return this.$headers || this.$_getHeaders(methodOptions) || ResourceGlobalConfig.headers || {};
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
        return this.$params || this.$_getParams(methodOptions) || ResourceGlobalConfig.params || {};
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
        return this.$data || this.$_getData(methodOptions) || ResourceGlobalConfig.data || {};
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
        return observable.pipe(map(function (res) { return res._body ? res.json() : null; }));
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
            shell.data = shell.data.toJSON ? shell.data.toJSON() : Resource.$cleanData(shell.data);
        }
    };
    Resource.prototype.$_fillInternal = function (shell) {
        var returnInternal = shell.returnInternal;
        var $observable = Observable.create(function (subscriber) {
            shell.mainDeferredSubscriber = subscriber;
        }).pipe(flatMap(function () { return shell.mainObservable; }));
        var $abortRequest = function () {
            returnInternal.$resolved = true;
        };
        if (!shell.options.isLazy) {
            $observable = $observable.pipe(publish());
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
                shell.mainObservable = Observable.create(function (subscriber) {
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
            var mainRequest = new Request(shell.requestOptions);
            mainRequest = shell.options.requestInterceptor ?
                shell.options.requestInterceptor(mainRequest, shell.options) :
                _this.$requestInterceptor(mainRequest, shell.options);
            if (!mainRequest) {
                shell.mainObservable = Observable.create(function (observer) {
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
                headers: new Headers(data[2] ? Object.assign({}, data[2]) : data[2]),
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
                        shell.mainObservable = Observable.create(function (observer) {
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
        if (shell.options.method === RequestMethod.Get) {
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
        shell.search = new URLSearchParams();
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
        return Observable.create(function (subscriber) {
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
            switch (ResourceGlobalConfig.getParamsMappingType) {
                case TGetParamsMappingType.Plain:
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
                case TGetParamsMappingType.Bracket:
                    /// Convert object and arrays to query params
                    for (var k in value) {
                        if (value.hasOwnProperty(k)) {
                            this.$_appendSearchParams(search, key + '[' + k + ']', value[k]);
                        }
                    }
                    break;
                case TGetParamsMappingType.JQueryParamsBracket:
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
        if (methodOptions.toPromise === undefined && ResourceGlobalConfig.toPromise !== null) {
            methodOptions.toPromise = ResourceGlobalConfig.toPromise;
        }
        if (methodOptions.toObservable === undefined && ResourceGlobalConfig.toObservable !== null) {
            methodOptions.toObservable = ResourceGlobalConfig.toObservable;
        }
        if (methodOptions.lean === undefined && ResourceGlobalConfig.lean !== null) {
            methodOptions.lean = ResourceGlobalConfig.lean;
        }
    };
    Resource.$cleanDataFields = [
        '$cleanDataFields',
        '$resolved',
        '$observable',
        '$abortRequest',
        '$resource'
    ];
    Resource.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Resource.ctorParameters = function () { return [
        { type: Http }
    ]; };
    return Resource;
}());
export { Resource };

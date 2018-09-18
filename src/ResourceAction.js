import { RequestMethod } from '@angular/http';
export function ResourceAction(methodOptions) {
    methodOptions = methodOptions || {};
    if (methodOptions.method === undefined) {
        methodOptions.method = RequestMethod.Get;
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

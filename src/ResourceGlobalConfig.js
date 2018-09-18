export var TGetParamsMappingType;
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
export { ResourceGlobalConfig };

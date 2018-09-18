export declare enum TGetParamsMappingType {
    Plain = 0,
    Bracket = 1,
    JQueryParamsBracket = 2
}
export declare class ResourceGlobalConfig {
    static url: string | Promise<string>;
    static path: string | Promise<string>;
    static headers: any | Promise<any>;
    static params: any | Promise<any>;
    static data: any | Promise<any>;
    static add2Provides: boolean;
    static lean: boolean;
    static toPromise: boolean;
    static toObservable: boolean;
    static getParamsMappingType: any;
}

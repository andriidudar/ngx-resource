import { Http, Request, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { ResourceModel } from './ResourceModel';
import { ResourceActionBase, ResourceParamsBase, ResourceResult } from './Interfaces';
export declare class Resource {
    protected http: Http;
    static $cleanDataFields: string[];
    private $url;
    private $path;
    private $headers;
    private $params;
    private $data;
    constructor(http: Http);
    static $cleanData(obj: ResourceResult<any>): any;
    static $cleanDataArray(obj: any[]): any[];
    static $cleanDataObject(obj: ResourceResult<any>): any;
    /**
     * Get main url of the resource
     * @returns {string|Promise<string>}
     */
    $getUrl(methodOptions?: ResourceActionBase): string | Promise<string>;
    /**
     * Set resource url
     * @param url
     */
    $setUrl(url: string): void;
    /**
     * Get path of the resource
     * @returns {string|Promise<string>}
     */
    $getPath(methodOptions?: ResourceActionBase): string | Promise<string>;
    /**
     * Set resource path
     * @param path
     */
    $setPath(path: string): void;
    /**
     * Get headers
     * @returns {any|Promise<any>}
     */
    $getHeaders(methodOptions?: ResourceActionBase): any | Promise<any>;
    /**
     * Set resource headers
     * @param headers
     */
    $setHeaders(headers: any): void;
    /**
     * Get default params
     * @returns {any|Promise<any>|{}}
     */
    $getParams(methodOptions?: ResourceActionBase): any | Promise<any>;
    /**
     * Set default resource params
     * @param params
     */
    $setParams(params: any): void;
    /**
     * Get default data
     * @returns {any|Promise<any>|{}}
     */
    $getData(methodOptions?: ResourceActionBase): any | Promise<any>;
    /**
     * Set default resource params
     * @param data
     */
    $setData(data: any): void;
    /**
     * Create the model
     *
     * @returns {any}
     */
    $createModel(): ResourceModel<any>;
    /**
     * Body serializer
     *
     * @param body
     * @returns {string}
     */
    $bodySerializer(body: any): string;
    /**
     * That is called before executing request
     * @param req
     */
    protected $requestInterceptor(req: Request, methodOptions?: ResourceActionBase): Request;
    /**
     * Request observable interceptor
     * @param observable
     * @returns {Observable<any>}
     */
    protected $responseInterceptor(observable: Observable<any>, req: Request, methodOptions?: ResourceActionBase): Observable<any>;
    protected $initResultObject(methodOptions?: ResourceActionBase): any;
    protected $map(item: any): any;
    protected $filter(item: any): boolean;
    protected $getResourceOptions(): ResourceParamsBase;
    protected $request(req: Request, methodOptions?: ResourceActionBase): Observable<any>;
    protected $resourceAction(data: any, params: any, callback: () => any, onError: (res: Response) => any, methodOptions: ResourceActionBase): ResourceResult<any> | ResourceModel<Resource> | Promise<any>;
    private $_createReturnData;
    private $_initResultObject;
    private $_map;
    private $_filter;
    private $_cleanData;
    private $_fillInternal;
    private $_mainRequest;
    private $_resolveMainOptions;
    private $_releaseMainDeferredSubscriber;
    private $_prepareDataParams;
    private $_prepareBody;
    private $_prepareSearch;
    private $_createRequestOptions;
    private $_createMainObservable;
    private $_setDataToObject;
    private $_getValueForPath;
    private $_isNullOrUndefined;
    private $_appendSearchParams;
    /**
     * Get url to be replaced by ResourceParamsBase
     *
     * @param methodOptions
     * @returns { any | Promise<any>}
     * @private
     */
    private $_getUrl;
    /**
     * Get get path to be replaced by ResourceParamsBase
     *
     * @param methodOptions
     * @returns { any | Promise<any>}
     * @private
     */
    private $_getPath;
    /**
     * Get headers to be replaced by ResourceParamsBase
     *
     * @param methodOptions
     * @returns { any | Promise<any>}
     * @private
     */
    private $_getHeaders;
    /**
     * Get params to be replaced by ResourceParamsBase
     *
     * @param methodOptions
     * @returns { any | Promise<any>}
     * @private
     */
    private $_getParams;
    /**
     * Get data to be replaced by ResourceParamsBase
     *
     * @param methodOptions
     * @returns { any | Promise<any>}
     * @private
     */
    private $_getData;
    private $_setGlobalsToOptions;
}

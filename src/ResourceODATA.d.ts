import { Type } from '@angular/core/src/type';
import { Resource } from './Resource';
import { ResourceMethod, ResourceParamsBase } from './Interfaces';
/**
 * A ODATA object for querying entities.
 */
export interface IResourceODATAQuery {
    $filter?: string;
    $search?: string;
    $expand?: string;
    $limit?: number;
}
/** A ODATA object for querying a single entity. */
export interface IResourceODATAQuerySingle extends IResourceODATAQuery {
    id: any;
}
/** A Resource base class for ODATA entities. To create a resource is just
 * enough to extend this class and all the base ODATA functionalities will be present.
 */
export declare abstract class ResourceODATA<R> extends Resource {
    get: ResourceMethod<IResourceODATAQuerySingle, R>;
    save: ResourceMethod<R, R>;
    search: ResourceMethod<IResourceODATAQuery, R[]>;
    $getUrl(): string | Promise<string>;
    getEntityName(): string;
    private getEntitySetName;
}
export interface ResourceODATAParamsBase extends ResourceParamsBase {
    /** The entity associated with this resource. */
    entity: any;
    /** The entity name in case it is different than the entity.
     * It is good to specify it as the entity could be minified.
     */
    name?: string;
}
/**
 * A ODATA annotation for a resource for a ODATA entity resource extending {@link ResourceODATA}.
 */
export declare function ResourceODATAParams(params: ResourceODATAParamsBase): (target: Type<Resource>) => void;

import { Observable } from 'rxjs';
export declare class ResourceModel<R> {
    $resolved: boolean;
    $observable: Observable<any>;
    $abortRequest: () => void;
    $resource: R;
    $setData(data: any): this;
    $save(): this;
    $create(): this;
    $update(): this;
    $remove(): this;
    toJSON(): any;
    protected isNew(): boolean;
    private $resource_method;
}

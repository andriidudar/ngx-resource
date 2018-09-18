import { ResourceActionBase } from './Interfaces';
import { Resource } from './Resource';
export declare function ResourceAction(methodOptions?: ResourceActionBase): (target: Resource, propertyKey: string) => void;

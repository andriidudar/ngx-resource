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
import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Resource } from './Resource';
import { ResourceAction } from './ResourceAction';
import { ResourceParams } from './ResourceParams';
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
        ResourceAction({
            path: '/{!id}'
        }),
        __metadata("design:type", Function)
    ], ResourceODATA.prototype, "get", void 0);
    __decorate([
        ResourceAction({
            method: RequestMethod.Post
        }),
        __metadata("design:type", Function)
    ], ResourceODATA.prototype, "save", void 0);
    __decorate([
        ResourceAction({
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
}(Resource));
export { ResourceODATA };
/**
 * A ODATA annotation for a resource for a ODATA entity resource extending {@link ResourceODATA}.
 */
export function ResourceODATAParams(params) {
    var injectable = Injectable();
    var zuper = ResourceParams(params);
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

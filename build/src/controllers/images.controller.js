"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const tsoa_1 = require("tsoa");
const images_services_1 = __importDefault(require("@services/images.services"));
const types_1 = __importDefault(require("../types"));
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
let ImagesController = class ImagesController extends inversify_express_utils_1.BaseHttpController {
    constructor(service) {
        super();
        this.service = service;
    }
    getImages() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.getImages();
        });
    }
    getImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    return this.badRequest();
                }
                const image = yield this.service.getImage(id);
                if (!image) {
                    return this.notFound();
                }
                return image;
            }
            catch (error) {
                return this.internalServerError();
            }
        });
    }
    createImage(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { files: { file = null } = {} } = req;
                if (!file) {
                    return this.badRequest('No image uploaded, the file key should be called file');
                }
                return this.service.createImage(file);
            }
            catch (error) {
                this.internalServerError();
            }
        });
    }
};
__decorate([
    tsoa_1.Get('/'),
    inversify_express_utils_1.httpGet('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "getImages", null);
__decorate([
    inversify_express_utils_1.httpGet('/:id'),
    __param(0, inversify_express_utils_1.requestParam('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "getImage", null);
__decorate([
    inversify_express_utils_1.httpPost('/'),
    __param(0, inversify_express_utils_1.request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "createImage", null);
ImagesController = __decorate([
    tsoa_1.Route('images'),
    inversify_express_utils_1.controller('/images'),
    __param(0, inversify_1.inject(types_1.default.ImageService)),
    __metadata("design:paramtypes", [images_services_1.default])
], ImagesController);
exports.default = ImagesController;

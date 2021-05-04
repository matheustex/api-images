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
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const commonFile_1 = require("@models/commonFile");
const thumbnail_1 = require("@models/thumbnail");
const image_1 = require("@models/image");
const images_repository_1 = require("@repositories/images.repository");
const inversify_1 = require("inversify");
const aws_sdk_1 = require("aws-sdk");
const sharp_1 = __importDefault(require("sharp"));
let ImageService = class ImageService {
    constructor() {
        this.bucketName = process.env.AWS_S3_BUCKET || 'tex-public-images';
        this.client = new aws_sdk_1.S3({
            accessKeyId: process.env.AWS_S3_ACCESS || '',
            secretAccessKey: process.env.AWS_S3_SECRET || '',
        });
    }
    getImages() {
        return __awaiter(this, void 0, void 0, function* () {
            return images_repository_1.getImages();
        });
    }
    getImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield images_repository_1.getImage(Number(id));
            return image;
        });
    }
    createImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = new image_1.Image();
            image.file = yield this.uploadFile(file);
            image.thumbnails = yield this.createAndSendThumbnails(file);
            return images_repository_1.createImage(image);
        });
    }
    createAndSendThumbnails(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstThumbNailUploaded = yield this.cutAndSend(content, 200);
            const secondThumbnailUploaded = yield this.cutAndSend(content, 300);
            return [new thumbnail_1.Thumbnail(firstThumbNailUploaded), new thumbnail_1.Thumbnail(secondThumbnailUploaded)];
        });
    }
    cutAndSend(content, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = content;
            const thumbnail = yield sharp_1.default(data).resize({ width: size, height: size, fit: 'fill' }).toBuffer();
            const uploaded = yield this.uploadFile(Object.assign(Object.assign({}, content), { name: `${content.name}_${size}`, data: thumbnail }));
            return new thumbnail_1.Thumbnail(uploaded);
        });
    }
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client
                .putObject({
                Bucket: this.bucketName,
                Key: file.name,
                ContentType: file.mimetype,
                Body: file.data,
            })
                .promise()
                .then((res) => {
                console.log(`File Uploaded: ${res.ETag}`);
            })
                .catch((err) => console.log(err));
            const fileUploaded = new commonFile_1.CommonFile(file.name, this.bucketName, file.mimetype);
            return fileUploaded;
        });
    }
};
ImageService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ImageService);
exports.default = ImageService;

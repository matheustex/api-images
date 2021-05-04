"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesBuilder = void 0;
const commonFile_1 = require("@models/commonFile");
const faker_1 = __importDefault(require("faker"));
class ImagesBuilder {
    constructor(images = []) {
        this.images = images;
    }
    listOfImages() {
        this.images = [
            {
                id: faker_1.default.datatype.number(),
                file: new commonFile_1.CommonFile('key', 'bucket', 'jpeg'),
                thumbnails: [],
                created: new Date(),
                updated: new Date(),
            },
            {
                id: faker_1.default.datatype.number(),
                file: new commonFile_1.CommonFile('key', 'bucket', 'jpeg'),
                thumbnails: [],
                created: new Date(),
                updated: new Date(),
            },
        ];
        return this;
    }
    imageBuffer() {
        const buffer = {
            name: faker_1.default.random.word(),
            size: faker_1.default.datatype.number(),
            mimetype: 'image/jpeg',
            extension: 'jpg',
            data: Buffer.from(faker_1.default.image.image()),
        };
        return buffer;
    }
    build() {
        return this.images;
    }
}
exports.ImagesBuilder = ImagesBuilder;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImage = exports.getImages = exports.getImage = void 0;
const image_1 = require("../models/image");
const typeorm_1 = require("typeorm");
const getImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const imageRepository = typeorm_1.getRepository(image_1.Image);
    const image = yield imageRepository.findOne({ id: id }, { relations: ['file', 'thumbnails'] });
    if (!image)
        return null;
    return image;
});
exports.getImage = getImage;
const getImages = () => __awaiter(void 0, void 0, void 0, function* () {
    const imageRepository = typeorm_1.getRepository(image_1.Image);
    return imageRepository.find({ relations: ['file'] });
});
exports.getImages = getImages;
const createImage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const imageRepository = typeorm_1.getRepository(image_1.Image);
    const image = new image_1.Image();
    return imageRepository.save(Object.assign(Object.assign({}, image), payload));
});
exports.createImage = createImage;

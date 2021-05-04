"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
require("reflect-metadata");
const typeorm = __importStar(require("typeorm"));
const images_builder_1 = require("./../../test/utils/images-builder");
const ImageRepository = __importStar(require("./images.repository"));
typeorm.getRepository = jest.fn();
describe('ImagesRepository', () => {
    test('test', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(true).toEqual(true);
    }));
    describe('getImages', () => {
        test('should return empty array', () => __awaiter(void 0, void 0, void 0, function* () {
            typeorm.getRepository.mockReturnValue({
                find: () => Promise.resolve([]),
            });
            const comments = yield ImageRepository.getImages();
            expect(comments).toEqual([]);
        }));
    });
    test('should return images list', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeImages = new images_builder_1.ImagesBuilder().listOfImages().build();
        typeorm.getRepository.mockReturnValue({
            find: () => Promise.resolve(fakeImages),
        });
        const images = yield ImageRepository.getImages();
        expect(images).toEqual(fakeImages);
    }));
    describe('createImage', () => {
        test('should add image to the database', () => __awaiter(void 0, void 0, void 0, function* () {
            const fakeImages = new images_builder_1.ImagesBuilder().listOfImages().build()[0];
            typeorm.getRepository.mockReturnValue({
                save: () => Promise.resolve(fakeImages),
            });
            const image = yield ImageRepository.createImage(fakeImages);
            expect(image).toMatchObject(fakeImages);
        }));
    });
    describe('getImage', () => {
        test('should return image from the database', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            const fakeImage = new images_builder_1.ImagesBuilder().listOfImages().build()[0];
            typeorm.getRepository.mockReturnValue({
                findOne: () => Promise.resolve(Object.assign(Object.assign({}, fakeImage), { id: 1 })),
            });
            const image = yield ImageRepository.getImage(id);
            expect(image).toEqual(Object.assign(Object.assign({}, fakeImage), { id: 1 }));
            expect(image === null || image === void 0 ? void 0 : image.id).toBe(id);
        }));
        test('should return null if image not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            typeorm.getRepository.mockReturnValue({
                findOne: () => Promise.resolve(null),
            });
            const image = yield ImageRepository.getImage(id);
            expect(image).toBeNull();
        }));
    });
});

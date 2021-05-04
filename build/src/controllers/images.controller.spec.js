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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_express_utils_1 = require("inversify-express-utils");
const images_builder_1 = require("./../../test/utils/images-builder");
const images_controller_1 = __importDefault(require("./images.controller"));
const images_services_1 = __importDefault(require("../services/images.services"));
describe('ImageController', () => {
    const imageService = new images_services_1.default();
    afterEach(() => {
        jest.resetAllMocks();
    });
    describe('getImages', () => {
        test('should return empty array', () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(imageService, 'getImages').mockResolvedValueOnce([]);
            const controller = new images_controller_1.default(imageService);
            const images = yield controller.getImages();
            expect(images).toEqual([]);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        }));
        test('should many images', () => __awaiter(void 0, void 0, void 0, function* () {
            const fakeImages = new images_builder_1.ImagesBuilder().listOfImages().build();
            const spy = jest.spyOn(imageService, 'getImages').mockResolvedValueOnce(fakeImages);
            const controller = new images_controller_1.default(imageService);
            const returnImages = yield controller.getImages();
            expect(fakeImages).toEqual(returnImages);
            expect(spy).toHaveBeenCalledWith();
            expect(spy).toHaveBeenCalledTimes(1);
        }));
    });
    describe('getImage', () => {
        test('should return an image', () => __awaiter(void 0, void 0, void 0, function* () {
            const fakeImages = new images_builder_1.ImagesBuilder().listOfImages().build();
            const spy = jest.spyOn(imageService, 'getImage').mockResolvedValueOnce(Object.assign(Object.assign({}, fakeImages[0]), { id: 1 }));
            const controller = new images_controller_1.default(imageService);
            const image = yield controller.getImage('1');
            expect(Object.assign(Object.assign({}, fakeImages[0]), { id: 1 })).toEqual(image);
            expect(spy).toHaveBeenCalledWith('1');
            expect(spy).toHaveBeenCalledTimes(1);
        }));
        test('should return a not found error', () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(imageService, 'getImage').mockResolvedValueOnce(null);
            const controller = new images_controller_1.default(imageService);
            const error = yield controller.getImage('1');
            expect(error).toBeInstanceOf(inversify_express_utils_1.results.NotFoundResult);
            expect(spy).toHaveBeenCalledWith('1');
            expect(spy).toHaveBeenCalledTimes(1);
        }));
        test('should return a not found error', () => __awaiter(void 0, void 0, void 0, function* () {
            const spy = jest.spyOn(imageService, 'getImage').mockRejectedValueOnce(new Error('failed'));
            const controller = new images_controller_1.default(imageService);
            const error = yield controller.getImage('1');
            expect(error).toBeInstanceOf(inversify_express_utils_1.results.InternalServerErrorResult);
            expect(spy).toHaveBeenCalledWith('1');
            expect(spy).toHaveBeenCalledTimes(1);
        }));
    });
    describe('createImage', () => {
        test('should create an image', () => __awaiter(void 0, void 0, void 0, function* () {
            const imageBuffer = new images_builder_1.ImagesBuilder().imageBuffer();
            const fakeImages = new images_builder_1.ImagesBuilder().listOfImages().build();
            const spy = jest.spyOn(imageService, 'createImage').mockResolvedValueOnce(fakeImages[0]);
            const controller = new images_controller_1.default(imageService);
            const image = yield controller.createImage({ files: { file: imageBuffer } });
            expect(fakeImages[0]).toEqual(image);
            expect(spy).toHaveBeenCalledWith(imageBuffer);
            expect(spy).toHaveBeenCalledTimes(1);
        }));
        test('should return a bad request', () => __awaiter(void 0, void 0, void 0, function* () {
            const imageBuffer = new images_builder_1.ImagesBuilder().imageBuffer();
            const fakeImages = new images_builder_1.ImagesBuilder().listOfImages().build();
            const spy = jest.spyOn(imageService, 'createImage').mockResolvedValueOnce(fakeImages[0]);
            const controller = new images_controller_1.default(imageService);
            const error = yield controller.createImage({ files: { image: imageBuffer } });
            expect(error).toBeInstanceOf(inversify_express_utils_1.results.BadRequestErrorMessageResult);
            expect(spy).toHaveBeenCalledTimes(0);
        }));
    });
});

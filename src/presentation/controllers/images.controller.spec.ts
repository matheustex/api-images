import 'reflect-metadata';
import { results } from 'inversify-express-utils';
import { ImagesBuilder } from '../../../test/utils/images-builder';
import ImagesController from './images.controller';
import ImageService from '../services/images.services';

describe('ImageController', () => {
  const imageService = new ImageService();

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getImages', () => {
    test('should return empty array', async () => {
      const spy = jest.spyOn(imageService, 'getImages').mockResolvedValueOnce([]);
      const controller = new ImagesController(imageService);
      const images = await controller.getImages();
      expect(images).toEqual([]);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should many images', async () => {
      const fakeImages = new ImagesBuilder().listOfImages().build();
      const spy = jest.spyOn(imageService, 'getImages').mockResolvedValueOnce(fakeImages);
      const controller = new ImagesController(imageService);
      const returnImages = await controller.getImages();
      expect(fakeImages).toEqual(returnImages);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getImage', () => {
    test('should return an image', async () => {
      const fakeImages = new ImagesBuilder().listOfImages().build();
      const spy = jest.spyOn(imageService, 'getImage').mockResolvedValueOnce({ ...fakeImages[0], id: 1 });
      const controller = new ImagesController(imageService);
      const image = await controller.getImage('1');
      expect({ ...fakeImages[0], id: 1 }).toEqual(image);
      expect(spy).toHaveBeenCalledWith('1');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return a not found error', async () => {
      const spy = jest.spyOn(imageService, 'getImage').mockResolvedValueOnce(null);
      const controller = new ImagesController(imageService);
      const error = await controller.getImage('1');

      expect(error).toBeInstanceOf(results.NotFoundResult);
      expect(spy).toHaveBeenCalledWith('1');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return a not found error', async () => {
      const spy = jest.spyOn(imageService, 'getImage').mockRejectedValueOnce(new Error('failed'));
      const controller = new ImagesController(imageService);
      const error = await controller.getImage('1');

      expect(error).toBeInstanceOf(results.InternalServerErrorResult);
      expect(spy).toHaveBeenCalledWith('1');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('createImage', () => {
    test('should create an image', async () => {
      const imageBuffer = new ImagesBuilder().imageBuffer();
      const fakeImages = new ImagesBuilder().listOfImages().build();
      const spy = jest.spyOn(imageService, 'createImage').mockResolvedValueOnce(fakeImages[0]);
      const controller = new ImagesController(imageService);
      const image = await controller.createImage({ files: { file: imageBuffer } });

      expect(fakeImages[0]).toEqual(image);
      expect(spy).toHaveBeenCalledWith(imageBuffer);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return a bad request', async () => {
      const imageBuffer = new ImagesBuilder().imageBuffer();
      const fakeImages = new ImagesBuilder().listOfImages().build();
      const spy = jest.spyOn(imageService, 'createImage').mockResolvedValueOnce(fakeImages[0]);
      const controller = new ImagesController(imageService);
      const error = await controller.createImage({ files: { image: imageBuffer } });

      expect(error).toBeInstanceOf(results.BadRequestErrorMessageResult);
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import * as typeorm from 'typeorm';
import { ImagesBuilder } from '../../../test/utils/images-builder';
import * as ImageRepository from './images.repository';

(typeorm as any).getRepository = jest.fn();

describe('ImagesRepository', () => {
  test('test', async () => {
    expect(true).toEqual(true);
  });
  describe('getImages', () => {
    test('should return empty array', async () => {
      (typeorm as any).getRepository.mockReturnValue({
        find: () => Promise.resolve([]),
      });
      const comments = await ImageRepository.getImages();
      expect(comments).toEqual([]);
    });
  });

  test('should return images list', async () => {
    const fakeImages = new ImagesBuilder().listOfImages().build();
    (typeorm as any).getRepository.mockReturnValue({
      find: () => Promise.resolve(fakeImages),
    });
    const images = await ImageRepository.getImages();
    expect(images).toEqual(fakeImages);
  });

  describe('createImage', () => {
    test('should add image to the database', async () => {
      const fakeImages = new ImagesBuilder().listOfImages().build()[0];
      (typeorm as any).getRepository.mockReturnValue({
        save: () => Promise.resolve(fakeImages),
      });
      const image = await ImageRepository.createImage(fakeImages);
      expect(image).toMatchObject(fakeImages);
    });
  });

  describe('getImage', () => {
    test('should return image from the database', async () => {
      const id = 1;
      const fakeImage = new ImagesBuilder().listOfImages().build()[0];
      (typeorm as any).getRepository.mockReturnValue({
        findOne: () => Promise.resolve({ ...fakeImage, id: 1 }),
      });
      const image = await ImageRepository.getImage(id);
      expect(image).toEqual({ ...fakeImage, id: 1 });
      expect(image?.id).toBe(id);
    });

    test('should return null if image not found', async () => {
      const id = 1;
      (typeorm as any).getRepository.mockReturnValue({
        findOne: () => Promise.resolve(null),
      });
      const image = await ImageRepository.getImage(id);
      expect(image).toBeNull();
    });
  });
});

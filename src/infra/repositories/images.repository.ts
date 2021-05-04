import { Image } from '../../domain/models/image';
import { getRepository } from 'typeorm';

export const getImage = async (id: number): Promise<Image | null> => {
  const imageRepository = getRepository(Image);
  const image = await imageRepository.findOne({ id: id }, { relations: ['file', 'thumbnails'] });
  if (!image) return null;
  return image;
};

export const getImages = async (): Promise<Image[]> => {
  const imageRepository = getRepository(Image);
  return imageRepository.find({ relations: ['file'] });
};

export const createImage = async (payload: Image): Promise<Image> => {
  const imageRepository = getRepository(Image);
  const image = new Image();
  return imageRepository.save({
    ...image,
    ...payload,
  });
};

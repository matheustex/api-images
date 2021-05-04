import { FileRequest } from '../../src/domain/models/fileRequest';
import { Image } from '../../src/domain/models/image';
import { CommonFile } from '../../src/domain/models/commonFile';

import faker from 'faker';

export class ImagesBuilder {
  constructor(private images: Image[] = []) {}

  listOfImages(): ImagesBuilder {
    this.images = [
      {
        id: faker.datatype.number(),
        file: new CommonFile('key', 'bucket', 'jpeg'),
        thumbnails: [],
        created: new Date(),
        updated: new Date(),
      },
      {
        id: faker.datatype.number(),
        file: new CommonFile('key', 'bucket', 'jpeg'),
        thumbnails: [],
        created: new Date(),
        updated: new Date(),
      },
    ];

    return this;
  }

  imageBuffer(): FileRequest {
    const buffer: FileRequest = {
      name: faker.random.word(),
      size: faker.datatype.number(),
      mimetype: 'image/jpeg',
      extension: 'jpg',
      data: Buffer.from(faker.image.image()),
    };

    return buffer;
  }

  build(): Image[] {
    return this.images;
  }
}

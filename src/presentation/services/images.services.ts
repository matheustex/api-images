/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonFile } from '../../domain/models/commonFile';
import { Thumbnail } from '../../domain/models/thumbnail';
import { Image } from '../../domain/models/image';
import { getImage, getImages, createImage } from '../../infra/repositories/images.repository';
import { injectable } from 'inversify';
import { S3 } from 'aws-sdk';
import sharp from 'sharp';
import { PutObjectOutput } from 'aws-sdk/clients/s3';
import fileUpload, { UploadedFile } from 'express-fileupload';

@injectable()
export default class ImageService {
  private client: S3;
  private readonly bucketName = process.env.AWS_S3_BUCKET || 'tex-public-images';

  constructor() {
    this.client = new S3({
      accessKeyId: process.env.AWS_S3_ACCESS || '',
      secretAccessKey: process.env.AWS_S3_SECRET || '',
    });
  }

  public async getImages(): Promise<Image[]> {
    return getImages();
  }

  public async getImage(id: string): Promise<Image | null> {
    const image = await getImage(Number(id));

    return image;
  }

  public async createImage(file: fileUpload.UploadedFile): Promise<Image> {
    const image = new Image();

    image.file = await this.uploadFile(file);
    image.thumbnails = await this.createAndSendThumbnails(file);

    return createImage(image);
  }

  private async createAndSendThumbnails(content: any): Promise<any> {
    const firstThumbNailUploaded = await this.cutAndSend(content, 200);
    const secondThumbnailUploaded = await this.cutAndSend(content, 300);

    return [new Thumbnail(firstThumbNailUploaded), new Thumbnail(secondThumbnailUploaded)];
  }

  private async cutAndSend(content: any, size: number): Promise<any> {
    const { data } = content;

    const thumbnail = await sharp(data).resize({ width: size, height: size, fit: 'fill' }).toBuffer();
    const uploaded = await this.uploadFile({ ...content, name: `${content.name}_${size}`, data: thumbnail });

    return new Thumbnail(uploaded);
  }

  private async uploadFile(file: UploadedFile): Promise<CommonFile> {
    await this.client
      .putObject({
        Bucket: this.bucketName,
        Key: file.name,
        ContentType: file.mimetype,
        Body: file.data,
      })
      .promise()
      .then((res: PutObjectOutput) => {
        console.log(`File Uploaded: ${res.ETag}`);
      })
      .catch((err) => console.log(err));

    const fileUploaded = new CommonFile(file.name, this.bucketName, file.mimetype);

    return fileUploaded;
  }
}

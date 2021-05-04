/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Get, Route } from 'tsoa';
import ImageService from '../services/images.services';
import TYPES from '../../types';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, httpPost, request, requestParam } from 'inversify-express-utils';

@Route('images')
@controller('/images')
export default class ImagesController extends BaseHttpController {
  private service: ImageService;

  constructor(@inject(TYPES.ImageService) service: ImageService) {
    super();
    this.service = service;
  }

  @Get('/')
  @httpGet('/')
  public async getImages() {
    return this.service.getImages();
  }

  @httpGet('/:id')
  public async getImage(@requestParam('id') id: string) {
    try {
      if (!id) {
        return this.badRequest();
      }

      const image = await this.service.getImage(id);

      if (!image) {
        return this.notFound();
      }

      return image;
    } catch (error) {
      return this.internalServerError();
    }
  }

  @httpPost('/')
  public async createImage(@request() req: any): Promise<any> {
    try {
      const { files: { file = null } = {} } = req;

      if (!file) {
        return this.badRequest('No image uploaded, the file key should be called file');
      }

      return this.service.createImage(file);
    } catch (error) {
      this.internalServerError();
    }
  }
}

export interface FileRequest {
  name: string;
  size: number;
  mimetype: string;
  extension: string;
  data: ArrayBuffer;
}

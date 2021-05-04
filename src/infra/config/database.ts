import { Image } from '../../domain/models/image';
import { CommonFile } from '../../domain/models/commonFile';
import { Thumbnail } from '../../domain/models/thumbnail';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'db',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  entities: [Image, Thumbnail, CommonFile],
  synchronize: true,
};

export default config;

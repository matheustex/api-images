"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = require("@models/image");
const commonFile_1 = require("@models/commonFile");
const thumbnail_1 = require("@models/thumbnail");
const config = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'db',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'postgres',
    entities: [image_1.Image, thumbnail_1.Thumbnail, commonFile_1.CommonFile],
    synchronize: true,
};
exports.default = config;

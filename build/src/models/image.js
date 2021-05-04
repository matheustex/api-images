"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const commonFile_1 = require("./commonFile");
const thumbnail_1 = require("./thumbnail");
const typeorm_1 = require("typeorm");
let Image = class Image {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Image.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(() => commonFile_1.CommonFile, {
        cascade: true,
        eager: true,
    }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", commonFile_1.CommonFile)
], Image.prototype, "file", void 0);
__decorate([
    typeorm_1.OneToMany((_type) => thumbnail_1.Thumbnail, (thumbnail) => thumbnail.image, { cascade: true }),
    __metadata("design:type", Array)
], Image.prototype, "thumbnails", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Image.prototype, "created", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Image.prototype, "updated", void 0);
Image = __decorate([
    typeorm_1.Entity()
], Image);
exports.Image = Image;

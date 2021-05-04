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
exports.Thumbnail = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const image_1 = require("./image");
const commonFile_1 = require("./commonFile");
const typeorm_1 = require("typeorm");
let Thumbnail = class Thumbnail {
    constructor(file) {
        this.file = file;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Thumbnail.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Thumbnail.prototype, "image_id", void 0);
__decorate([
    typeorm_1.ManyToOne((_type) => image_1.Image),
    typeorm_1.JoinColumn({ name: 'image_id', referencedColumnName: 'id' }),
    __metadata("design:type", image_1.Image)
], Thumbnail.prototype, "image", void 0);
__decorate([
    typeorm_1.OneToOne(() => commonFile_1.CommonFile),
    typeorm_1.JoinColumn(),
    __metadata("design:type", commonFile_1.CommonFile)
], Thumbnail.prototype, "file", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Thumbnail.prototype, "created", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Thumbnail.prototype, "updated", void 0);
Thumbnail = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [commonFile_1.CommonFile])
], Thumbnail);
exports.Thumbnail = Thumbnail;

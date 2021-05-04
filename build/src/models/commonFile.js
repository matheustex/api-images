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
exports.CommonFile = void 0;
const typeorm_1 = require("typeorm");
let CommonFile = class CommonFile {
    constructor(key, bucket, type) {
        this.key = key;
        this.bucket = bucket;
        this.type = type;
        this.buildPreview();
    }
    buildPreview() {
        this.preview = `${this.bucket}.s3.amazonaws.com/${this.key}`;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CommonFile.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CommonFile.prototype, "key", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CommonFile.prototype, "bucket", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CommonFile.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CommonFile.prototype, "preview", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], CommonFile.prototype, "created", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], CommonFile.prototype, "updated", void 0);
CommonFile = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, String, String])
], CommonFile);
exports.CommonFile = CommonFile;

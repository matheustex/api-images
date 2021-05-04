import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CommonFile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  key!: string;

  @Column()
  bucket!: string;

  @Column()
  type!: string;

  @Column()
  preview!: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  constructor(key: string, bucket: string, type: string) {
    this.key = key;
    this.bucket = bucket;
    this.type = type;

    this.buildPreview();
  }

  private buildPreview() {
    this.preview = `${this.bucket}.s3.amazonaws.com/${this.key}`;
  }
}

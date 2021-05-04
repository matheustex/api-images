/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFile } from './commonFile';
import { Thumbnail } from './thumbnail';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => CommonFile, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  file!: CommonFile;

  @OneToMany((_type) => Thumbnail, (thumbnail: Thumbnail) => thumbnail.image, { cascade: true })
  thumbnails!: Array<Thumbnail>;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;
}

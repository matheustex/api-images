/* eslint-disable @typescript-eslint/no-unused-vars */
import { Image } from './image';
import { CommonFile } from './commonFile';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';

@Entity()
export class Thumbnail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  image_id!: number;
  @ManyToOne((_type) => Image)
  @JoinColumn({ name: 'image_id', referencedColumnName: 'id' })
  image!: Image;

  @OneToOne(() => CommonFile)
  @JoinColumn()
  file!: CommonFile;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  constructor(file: CommonFile) {
    this.file = file;
  }
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { Thumbnail } from './thumbnail.entity';

@Entity()
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;
    
  @Column()
  SKU: string;

  @Column()
  images: string;

  @Column('decimal', { precision: 6, scale: 2 })
  price: number;

  @Column()
  stock_quantity: number;

  @Column()
  color: string;

  @Column()
  size: string;

  @Column()
  material: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Thumbnail, (thumbnail) => thumbnail.variant)
  thumbnail?: Thumbnail[];

  @ManyToOne(() => Product, (product) => product.variant)
  product?: Product
}
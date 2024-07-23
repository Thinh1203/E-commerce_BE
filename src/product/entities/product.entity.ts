import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Variant } from './variant.entity';
import { Tag } from './tag.entity';
import { OrderItem } from 'src/order/entities/orderItem.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  user_gender: string;

  @Column()
  category: string;

  @Column({ default: false })
  is_delete: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Variant, (variant) => variant.product)
  variant?: Variant[];

  // @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  // orderItem?: OrderItem[];

  @ManyToMany(() => Tag, (tags) => tags.products)
  @JoinTable({
    name: 'product_tag',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  tags: Tag[];
}
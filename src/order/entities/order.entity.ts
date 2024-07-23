import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { OrderItem } from './orderItem.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 6, scale: 2 })
  total_price: number;
  
  @Column({ default: 'pending' })
  status: string;

  @Column({ default: false })
  is_delete: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.order)
  user?: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItem?: OrderItem[];
}
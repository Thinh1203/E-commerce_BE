import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/orderItem.entity';
import { Variant } from 'src/product/entities/variant.entity';
import { User } from 'src/users/entities/user.entity';
import { EmailModule } from 'src/email/email.module';
import { QueueModule } from 'src/queue/queue.module';
import { EmailService } from 'src/email/email.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Variant, User]),
    EmailModule, QueueModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}

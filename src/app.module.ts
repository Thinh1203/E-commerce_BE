import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { Variant } from './product/entities/variant.entity';
import { Thumbnail } from './product/entities/thumbnail.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { Tag } from './product/entities/tag.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Product, Variant, Thumbnail, Tag],
    synchronize: true,
  }),
  UserModule,
  AuthModule,
  ConfigModule,
  ProductModule,
  ProductModule,
  CloudinaryModule
  ],
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}

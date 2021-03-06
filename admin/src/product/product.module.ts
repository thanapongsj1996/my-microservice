import * as dotenv from 'dotenv'
import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductController } from './product.controller'
import { Product } from './product.entity'
import { ProductService } from './product.service'

dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule { }

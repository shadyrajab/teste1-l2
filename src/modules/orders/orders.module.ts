import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from 'src/modules/orders/orders.service';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class AppModule {}

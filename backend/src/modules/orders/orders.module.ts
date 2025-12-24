import { Module } from "@nestjs/common"
import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"
// orders module
@Module({

  // controllers for orders
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

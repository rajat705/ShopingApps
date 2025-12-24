import { Module } from "@nestjs/common"
import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"
import { CartModule } from "../cart/cart.module"
// orders module
@Module({

  // controllers for orders
  imports: [CartModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

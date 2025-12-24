import { Module } from "@nestjs/common"
import { ProductsController } from "./products.controller"
import { ProductsService } from "./products.service"
// products module
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}


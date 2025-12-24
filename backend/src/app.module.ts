import { Module } from "@nestjs/common"
import { ProductsModule } from "./modules/products/products.module"
import { OrdersModule } from "./modules/orders/orders.module"
import { PrismaService } from "./prisma/prisma.service"

@Module({
  imports: [ProductsModule, OrdersModule],
  providers: [PrismaService],
})
export class AppModule {}

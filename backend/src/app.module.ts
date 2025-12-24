import { Module } from "@nestjs/common"
import { ProductsModule } from "./modules/products/products.module"
import { OrdersModule } from "./modules/orders/orders.module"
import { PrismaService } from "./prisma/prisma.service"
import { PrismaModule } from "./prisma/prisma.module"

@Module({
  imports: [PrismaModule, ProductsModule, OrdersModule],
  providers: [PrismaService],
})
export class AppModule {}

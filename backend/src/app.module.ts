import { Module } from "@nestjs/common"
import { ProductsModule } from "./modules/products/products.module"
import { OrdersModule } from "./modules/orders/orders.module"
import { PrismaService } from "./prisma/prisma.service"
import { PrismaModule } from "./prisma/prisma.module"
import { AppController } from "./app.controller"
// import { AppService } from "./app.service"
import { CartModule } from "./modules/cart/cart.module"

@Module({
  imports: [PrismaModule, ProductsModule, CartModule, OrdersModule, CartModule],
  providers: [PrismaService],
  controllers: [AppController],
})
export class AppModule {}

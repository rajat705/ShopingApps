import { BadRequestException, Injectable } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { CartService } from "../cart/cart.service";
// service for handling orders
@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService, private readonly cartService: CartService) {}
// checkout method to create an order
  async checkout(
    shippingInfo: { name: string; email: string; address: string; },
    items: { productId: string; quantity: number; }[],
    userId: string,
  ) {
    if (!items.length) {
      throw new BadRequestException("Cart is empty")
    }
// transaction to create order and order items
    const order = await this.prisma.$transaction(async tx => {
      const order = await tx.order.create({
        data: { userId },
      })
// create order items
      await tx.orderItem.createMany({
        data: items.map(i => ({
          orderId: order.id,
          productId: i.productId,
          quantity: i.quantity,
        })),
      })

      return order
    })

    await this.cartService.clearCart(userId)

    return order
  }
}

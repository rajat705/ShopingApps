import { BadRequestException, Injectable } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
// service for handling orders
@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
// checkout method to create an order
  async checkout(
    userId: string,
    items: { productId: string; quantity: number }[],
  ) {
    if (!items.length) {
      throw new BadRequestException("Cart is empty")
    }
// transaction to create order and order items
    return this.prisma.$transaction(async tx => {
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
  }
}

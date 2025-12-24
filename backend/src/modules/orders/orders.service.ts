import { BadRequestException, Injectable } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async checkout(
    userId: string,
    items: { productId: string; quantity: number }[],
  ) {
    if (!items.length) {
      throw new BadRequestException("Cart is empty")
    }

    return this.prisma.$transaction(async tx => {
      const order = await tx.order.create({
        data: { userId },
      })

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

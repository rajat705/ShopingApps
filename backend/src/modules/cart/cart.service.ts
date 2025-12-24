import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { AddToCartDto } from "./dto/add-to-cart.dto"

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId: string) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    })
  }

  async addToCart(userId: string, dto: AddToCartDto) {
    const existing = await this.prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: dto.productId,
        },
      },
    })

    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + dto.quantity,
        },
      })
    }

    return this.prisma.cartItem.create({
      data: {
        userId,
        productId: dto.productId,
        quantity: dto.quantity,
      },
    })
  }

  async removeFromCart(userId: string, productId: string) {
    return this.prisma.cartItem.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    })
  }

  async clearCart(userId: string) {
    await this.prisma.cartItem.deleteMany({
      where: { userId },
    })
  }
}

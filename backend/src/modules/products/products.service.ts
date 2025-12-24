import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
// service for handling products
@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
// method to find all products with optional search and sort
  findAll(search?: string, sort?: "asc" | "desc") {
    return this.prisma.product.findMany({
      where: search
        ? { name: { contains: search, mode: "insensitive" } }
        : undefined,
      orderBy: sort ? { price: sort } : undefined,
    })
  }
// method to find a single product by id
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      throw new NotFoundException("Product not found")
    }

    return product
  }
}

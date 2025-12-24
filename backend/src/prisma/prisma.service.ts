import { Injectable, OnModuleInit } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
// Prisma service to manage database connection
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit {
  cartItem: any

  async onModuleInit() {
    await this.$connect()
  }
}

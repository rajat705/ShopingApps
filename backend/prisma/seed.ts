import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: { email: "test@example.com" },
  })

  await prisma.product.createMany({
    data: [
      { name: "Headphones", price: 1999 },
      { name: "Keyboard", price: 2999 },
    ],
  })
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })

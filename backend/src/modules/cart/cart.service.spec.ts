import { CartService } from "./cart.service"
import { BadRequestException } from "@nestjs/common"

describe("CartService", () => {
  let service: CartService

  const prismaMock = {
    cartItem: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
  }

  beforeEach(() => {
    service = new CartService(prismaMock as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should return cart items for user", async () => {
    prismaMock.cartItem.findMany.mockResolvedValue([
      { id: "1", quantity: 1 },
    ])

    const result = await service.getCart("user_1")

    expect(prismaMock.cartItem.findMany).toHaveBeenCalledWith({
      where: { userId: "user_1" },
      include: { product: true },
    })
    expect(result.length).toBe(1)
  })

  it("should add item to cart if not exists", async () => {
    prismaMock.cartItem.findUnique.mockResolvedValue(null)
    prismaMock.cartItem.create.mockResolvedValue({
      id: "1",
      quantity: 2,
    })

    const result = await service.addToCart("user_1", {
      productId: "p1",
      quantity: 2,
    })

    expect(prismaMock.cartItem.create).toHaveBeenCalled()
    expect(result.quantity).toBe(2)
  })

  it("should update quantity if item already exists", async () => {
    prismaMock.cartItem.findUnique.mockResolvedValue({
      id: "1",
      quantity: 1,
    })

    prismaMock.cartItem.update.mockResolvedValue({
      id: "1",
      quantity: 3,
    })

    const result = await service.addToCart("user_1", {
      productId: "p1",
      quantity: 2,
    })

    expect(prismaMock.cartItem.update).toHaveBeenCalled()
    expect(result.quantity).toBe(3)
  })

  it("should remove item from cart", async () => {
    prismaMock.cartItem.delete.mockResolvedValue({})

    await service.removeFromCart("user_1", "p1")

    expect(prismaMock.cartItem.delete).toHaveBeenCalled()
  })

  it("should clear cart", async () => {
    prismaMock.cartItem.deleteMany.mockResolvedValue({ count: 2 })

    await service.clearCart("user_1")

    expect(prismaMock.cartItem.deleteMany).toHaveBeenCalledWith({
      where: { userId: "user_1" },
    })
  })
})

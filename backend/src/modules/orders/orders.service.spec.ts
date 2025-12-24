import { OrdersService } from "./orders.service"
import { BadRequestException } from "@nestjs/common"

describe("OrdersService", () => {
  let service: OrdersService

  const prismaMock = {
    order: {
      create: jest.fn(),
    },
    orderItem: {
      createMany: jest.fn(),
    },
    $transaction: jest.fn(),
  }

  const cartServiceMock = {
    clearCart: jest.fn(),
  }

  beforeEach(() => {
    service = new OrdersService(
      prismaMock as any,
      cartServiceMock as any,
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should create order and order items in a transaction", async () => {
    prismaMock.$transaction.mockImplementation(async (cb) =>
      cb(prismaMock),
    )

    prismaMock.order.create.mockResolvedValue({
      id: "order_1",
    })

    prismaMock.orderItem.createMany.mockResolvedValue({ count: 1 })

    const result = await service.checkout(
      {
        name: "Rajat",
        email: "rajat@test.com",
        address: "Delhi",
      },
      [{ productId: "p1", quantity: 1 }],
      "user_1",
    )

    expect(prismaMock.$transaction).toHaveBeenCalled()
    expect(prismaMock.order.create).toHaveBeenCalled()
    expect(prismaMock.orderItem.createMany).toHaveBeenCalled()
    expect(cartServiceMock.clearCart).toHaveBeenCalledWith("user_1")
    expect(result.id).toBe("order_1")
  })

  it("should throw error if cart is empty", async () => {
    await expect(
      service.checkout(
        {
          name: "Rajat",
          email: "rajat@test.com",
          address: "Delhi",
        },
        [],
        "user_1",
      ),
    ).rejects.toThrow(BadRequestException)
  })
})

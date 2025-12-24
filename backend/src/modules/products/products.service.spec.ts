import { ProductsService } from "./products.service"
import { NotFoundException } from "@nestjs/common"
// tests for ProductsService
describe("ProductsService", () => {
  let service: ProductsService

  const prismaMock = {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  }
// set up service before each test
  beforeEach(() => {
    service = new ProductsService(prismaMock as any)
  })
// clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks()
  })
// tests for findAll and findOne methods
  describe("findAll", () => {
    it("should return all products", async () => {
      prismaMock.product.findMany.mockResolvedValue([
        { id: "1", name: "Phone", price: 1000 },
      ])

      const result = await service.findAll(undefined, undefined)

      expect(prismaMock.product.findMany).toHaveBeenCalled()
      expect(result.length).toBe(1)
      expect(result[0].name).toBe("Phone")
    })
// test for search functionality
    it("should apply sorting when sort is provided", async () => {
      prismaMock.product.findMany.mockResolvedValue([])

      await service.findAll(undefined, "asc")

      expect(prismaMock.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { price: "asc" },
        }),
      )
    })
  })
// tests for findOne method
  describe("findOne", () => {
    it("should return a product if found", async () => {
      prismaMock.product.findUnique.mockResolvedValue({
        id: "1",
        name: "Laptop",
        price: 50000,
      })

      const result = await service.findOne("1")

      expect(prismaMock.product.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      })
      expect(result.name).toBe("Laptop")
    })
// test for not found scenario
    it("should throw NotFoundException if product not found", async () => {
      prismaMock.product.findUnique.mockResolvedValue(null)

      await expect(service.findOne("999")).rejects.toThrow(
        NotFoundException,
      )
    })
  })
})

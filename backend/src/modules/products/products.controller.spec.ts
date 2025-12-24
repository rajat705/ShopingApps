import { Test } from "@nestjs/testing"
import { ProductsController } from "./products.controller"
import { ProductsService } from "./products.service"
// unit tests for ProductsController
describe("ProductsController", () => {
  let controller: ProductsController
  let service: ProductsService
// mock ProductsService
  const mockProductsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  }
// set up testing module
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile()

    controller = moduleRef.get<ProductsController>(ProductsController)
    service = moduleRef.get<ProductsService>(ProductsService)
  })
// clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks()
  })
// tests for getProducts and getProduct methods
  describe("getProducts", () => {
    it("should return list of products", async () => {
      mockProductsService.findAll.mockResolvedValue([
        { id: "1", name: "Phone", price: 1000 },
      ])

      const result = await controller.getProducts(undefined, undefined)

      expect(service.findAll).toHaveBeenCalled()
      expect(result.length).toBe(1)
    })
  })
// tests for getProduct method
  describe("getProduct", () => {
    it("should return a single product", async () => {
      mockProductsService.findOne.mockResolvedValue({
        id: "1",
        name: "Laptop",
        price: 50000,
      })

      const result = await controller.getProduct("1")

      expect(service.findOne).toHaveBeenCalledWith("1")
      expect(result.name).toBe("Laptop")
    })
  })
})

import { Controller, Get, Param, Query } from "@nestjs/common"
import { ProductsService } from "./products.service"
// controller for products
@Controller("products")
export class ProductsController {
  constructor(private service: ProductsService) {}
// endpoint to get products with optional search and sort
  @Get()
  getProducts(
    @Query("search") search?: string,
    @Query("sort") sort?: "asc" | "desc",
  ) {
    return this.service.findAll(search, sort)
  }
// endpoint to get a single product by id
  @Get(":id")
  getProduct(@Param("id") id: string) {
    return this.service.findOne(id)
  }
}

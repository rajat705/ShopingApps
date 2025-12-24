import { Controller, Get, Param, Query } from "@nestjs/common"
import { ProductsService } from "./products.service"

@Controller("products")
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  getProducts(
    @Query("search") search?: string,
    @Query("sort") sort?: "asc" | "desc",
  ) {
    return this.service.findAll(search, sort)
  }

  @Get(":id")
  getProduct(@Param("id") id: string) {
    return this.service.findOne(id)
  }
}

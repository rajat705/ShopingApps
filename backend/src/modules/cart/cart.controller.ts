import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common"
import { CartService } from "./cart.service"
import { AddToCartDto } from "./dto/add-to-cart.dto"
import { AuthGuard } from "../../common/guards/auth.guard"

@Controller("cart")
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Req() req: any) {
    return this.cartService.getCart(req.user.id)
  }

  @Post()
  addToCart(@Req() req: any, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, dto)
  }

  @Delete(":productId")
  removeFromCart(@Req() req: any, @Param("productId") productId: string) {
    return this.cartService.removeFromCart(req.user.id, productId)
  }
}

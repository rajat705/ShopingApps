import { Controller, Post, Req, UseGuards } from "@nestjs/common"
import { AuthGuard } from "../auth/guards/auth.guard"
// orders controller
@Controller("orders")
@UseGuards(AuthGuard)

// controller for orders
export class OrdersController {
  @Post("checkout")
  checkout(@Req() req) {
    const user = req.user
    // place order logic here
    return {
      message: "Order placed",
      user,
    }
  }
}

import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common"
import { OrdersService } from "./orders.service"
import { AuthGuard, AuthUser } from "../../common/guards/auth.guard"
import { CheckoutDto } from "./dto/checkout.dto"

interface RequestWithUser extends Request {
  user: AuthUser
}

@Controller("orders")
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private service: OrdersService) {}

  @Post("checkout")
  checkout(
    @Req() req: RequestWithUser,
    @Body() dto: CheckoutDto,
  ) {
    return this.service.checkout(req.user.id, dto.items)
  }
}

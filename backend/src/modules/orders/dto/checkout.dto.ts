import { IsArray, IsInt, IsString, Min } from "class-validator"

export class CheckoutItemDto {
  @IsString()
  productId: string

  @IsInt()
  @Min(1)
  quantity: number
}

export class CheckoutDto {
  @IsArray()
  items: CheckoutItemDto[]
}

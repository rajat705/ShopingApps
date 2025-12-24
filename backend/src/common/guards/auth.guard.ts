import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"

export interface AuthUser {
  id: string
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    const authHeader = request.headers.authorization
    if (!authHeader) {
      throw new UnauthorizedException("Unauthorized")
    }

    request.user = { id: "test-user-id" } satisfies AuthUser
    return true
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    // Fake auth check (normally JWT)
    const authHeader = request.headers["authorization"]

    if (!authHeader) {
      throw new UnauthorizedException("Missing authorization header")
    }

    // Attach user context to request
    request.user = {
      id: "user_1",
      email: "test@test.com",
    }

    return true
  }
}

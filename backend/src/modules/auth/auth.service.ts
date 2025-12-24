import { Injectable, UnauthorizedException } from "@nestjs/common"

@Injectable()
export class AuthService {
  async login(email: string, password: string) {
    // Fake login logic
    if (!email || !password) {
      throw new UnauthorizedException("Invalid credentials")
    }

    // Return fake user context
    return {
      id: "user_1",
      email,
      name: "Test User",
    }
  }
}

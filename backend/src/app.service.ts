import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    return "Hello Backend is running";
  }
}

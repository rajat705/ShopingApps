import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
// endpoint to get a hello message
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

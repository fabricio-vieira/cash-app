import { Injectable } from '@nestjs/common';
import somar from '@cash-app/shared';
import multiplicar from '@cash-app/auth';
@Injectable()
export class AppService {
  getHello(): string {
    return `A soma é ${somar(4, 5)} e o produto é ${multiplicar(4, 5)}`;
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { join } from 'node:path';

@Injectable()
export class AppService {
  getHello(): string {
    Logger.debug(join(__dirname, '..', 'static-file'));
    return 'Hello World!';
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
      UsersModule,
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      OrdersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, OrdersService],
})
export class AppModule {}

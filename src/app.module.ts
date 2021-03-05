import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import {AuthController} from "./auth/auth.controller";

@Module({
  imports: [
      UsersModule,
      ConfigModule.forRoot({
          isGlobal: true,
      }),
      AuthModule,
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService],
})
export class AppModule {}
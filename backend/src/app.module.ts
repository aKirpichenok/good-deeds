import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { DeedModule } from "./deeds/deed.module";
import { CreateMiddleware } from "./middlewares/createMiddleware";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.7jhtpqa.mongodb.net/good-deeds?retryWrites=true&w=majority'),
    UserModule,
    DeedModule,
    AuthModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CreateMiddleware).forRoutes('*')
  }
}
import { forwardRef, Module } from '@nestjs/common'
import { UserService } from './user.service';
import { UserController } from './user.controler';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]

})
export class UserModule { }
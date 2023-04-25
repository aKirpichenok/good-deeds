import { Module } from '@nestjs/common'
import { MongooseModule } from "@nestjs/mongoose";
import { DeedService } from './deeds.service';
import { DeedController } from './deeds.controler';
import { Deed, DeedSchema } from './schemas/deeds.schemas';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Deed.name, schema: DeedSchema },
      { name: User.name, schema: UserSchema }
    ]),
    UserModule
  ],
  controllers: [DeedController],
  providers: [DeedService]

})
export class DeedModule { }
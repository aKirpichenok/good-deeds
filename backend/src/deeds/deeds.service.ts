import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Deed, DeedDocument } from './schemas/deeds.schemas';
import { Model, ObjectId } from 'mongoose';
import { CreateDeedDto } from './dto/create-deed.dto';
import { User, UserDocument } from 'src/user/schemas/user.schema';


@Injectable()
export class DeedService {

  constructor(
    @InjectModel(Deed.name) private deedModel: Model<DeedDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async create(dto: CreateDeedDto): Promise<Deed> {
    const createdDeed: any = await this.deedModel.create({ ...dto, date: new Date() })
    const user: any = await this.userModel.findOne({
      nickname: { $regex: new RegExp(dto.nickname) }
    })
    user.deeds.push(createdDeed._id)
    await user.save()
    return createdDeed
  }

  async getAll(count = 20, offset = 0): Promise<Deed[]> {
    const users = await this.deedModel.find().skip(Number(offset)).limit(Number(count));
    return users
  }

  async getSelect(id: ObjectId): Promise<Deed> {
    const user = await this.deedModel.findById(id);
    return user
  }

  async delete(id: ObjectId): Promise<Deed> {
    const deed = await this.deedModel.findByIdAndDelete(id);
    return deed
  }

  async search(query: string): Promise<Deed[]> {
    const deeds = await this.deedModel.find({
      title: { $regex: new RegExp(query, 'i') }
    })
    return deeds
  }
}

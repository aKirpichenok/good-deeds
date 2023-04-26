import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnProps } from 'src/auth/auth.service';

interface UserWithId extends User {
  _id: string
}


@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) { }

  async create(dto: CreateUserDto): Promise<User> {
    const isUserExist = await this.userModel.findOne({
      nickname: { $regex: new RegExp(dto.nickname) }
    })
    if (isUserExist) {
      throw new ConflictException('Nickname занят')
    }
    const createdUser = await this.userModel.create({ ...dto, deeds: [], friends: [] });
    await createdUser.save();
    return createdUser
  }

  async getAll(count = 10, offset = 0): Promise<User[]> {
    const users = await this.userModel.find().skip(Number(offset)).limit(Number(count));
    return users
  }

  async getSelect(id: ObjectId): Promise<User> {
    const user = await this.userModel.findById(id).populate(['deeds', 'friends']);
    return user
  }


  async delete(id: ObjectId): Promise<ObjectId> {
    const user = await this.userModel.findByIdAndDelete(id);
    return user._id

  }

  async deleteFriend(nickname: string, friendNickname: string): Promise<ObjectId> {
    const user: any = await this.userModel.findOne({
      nickname: { $regex: new RegExp(nickname) }
    });
    const friend: any = await this.userModel.findOne({
      nickname: { $regex: new RegExp(friendNickname) }
    });
    const friendId = user.friends.indexOf(friend._id)

    user.friends.splice(friendId, 1)

    await user.save()

    return friend._id
  }

  async addFriend(nickname: string, friendNickname: string): Promise<User> {
    const user: any = await this.userModel.findOne({
      nickname: { $regex: new RegExp(nickname) }
    });
    const friend: any = await this.userModel.findOne({
      nickname: { $regex: new RegExp(friendNickname) }
    });
    if (!user || !friend) {
      throw new ConflictException('User or friend not found');
    }
    if (user.friends.includes(friend._id)) {
      throw new ConflictException(`${friend.nickname} уже в друзьях`)
    }
    user.friends.push(friend._id);
    await user.save();

    return user;
  }

  async changeProfile(dto: Partial<UserWithId>): Promise<ReturnProps> {
    let user = await this.userModel.findByIdAndUpdate(
      dto._id,
      { nickname: dto.nickname, name: dto.name, female: dto.female },
      { new: true }
    );
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    await user.save()
    return {
      token: this.jwtService.sign({ ...user }),
      id: user['_id'],
      nickname: user.nickname,
      friends: user.friends.length
    }
  }

  async getFriends(nickname): Promise<User[]> {
    const user: any = await this.userModel.findOne({
      nickname: { $regex: new RegExp(nickname) }
    }).populate('friends')
    return user.friends
  }

  async searchFriends(nickname = 'nothing', count = 10, offset = 0): Promise<User[]> {
    const users: any = await this.userModel.find({
      nickname: { $regex: new RegExp('^' + nickname, 'i') }
    }).skip(Number(offset)).limit(Number(count))
    return users
  }

  async findByNickname(nickname: string): Promise<User> {
    const user: any = await this.userModel.findOne({
      nickname: { $regex: new RegExp(nickname) },
    })
    return user
  }

}
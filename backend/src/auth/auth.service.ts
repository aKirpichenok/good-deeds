import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt/dist';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/user/schemas/user.schema';
import { ObjectId } from 'mongoose';

export interface ReturnProps {
  token: string,
  id: ObjectId,
  nickname: string
  friends: number;
}


@Injectable()
export class AuthService {

  constructor(private userService: UserService,
    private jwtService: JwtService) { }

  async login(userDto: CreateUserDto) {
    const user: any = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.findByNickname(userDto.nickname)
    if (candidate) {
      throw new HttpException('Пользователь с таким никнеймом уже существует', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.create({ ...userDto, password: hashPassword })
    return this.generateToken(user)
  }

  private async generateToken(user: User): Promise<ReturnProps> {
    const payload = { name: user.name, nickname: user.nickname, deeds: [], friend: [], female: user.female }
    return {
      token: this.jwtService.sign(payload),
      id: user['_id'],
      nickname: user.nickname,
      friends: user.friends.length
    }
  }

  private async validateUser(userDto: User): Promise<User> {
    const user = await this.userService.findByNickname(userDto.nickname)
    const passwordEquals = await bcrypt.compare(userDto.password, user?.password || '')
    if (user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({ message: 'Некорректный nickname либо пароль' })
  }


}

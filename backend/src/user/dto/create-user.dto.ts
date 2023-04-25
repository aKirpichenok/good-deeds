import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Андрей', description: 'Имя пользователя' })
  name: string;

  @ApiProperty({ example: 'Кирпиченок', description: 'Фамилия пользователя' })
  female: string;

  @ApiProperty({ example: 'qwe123', description: 'Пароль пользователя' })
  password: string;

  friends: string[];

  deeds: string[];

  @ApiProperty({ example: 'aKirpichenok', description: 'Уникальный nickname' })
  nickname: string;
}
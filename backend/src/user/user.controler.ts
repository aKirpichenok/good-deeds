import { Body, Controller, Delete, Get, Param, Post, UseGuards, Req, Query, Res } from '@nestjs/common'
import { UserService } from './user.service'
import { ObjectId } from 'mongoose';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-guard.auth';
import { User } from './schemas/user.schema';

@ApiTags('Работа с пользователями')
@Controller('/users')
export class UserController {

  constructor(private userService: UserService) { }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: Array })
  @Get('/all')
  getAll(@Query('count') count: number,
    @Query('offset') offset: number) {
    return this.userService.getAll(count, offset)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getSelect(@Param('id') id: ObjectId) {
    return this.userService.getSelect(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add/friend')
  addFriend(@Req() request,
    @Body() dto: { friendNickname: string }) {
    console.log(dto.friendNickname, request.user.nickname)
    return this.userService.addFriend(request.user.nickname, dto.friendNickname)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change/profile')
  changeProfile(
    @Body() dto: Partial<User>) {
    return this.userService.changeProfile(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete/friend')
  deleteFriend(@Req() request,
    @Body() dto: { friendNickname: string }) {
    return this.userService.deleteFriend(request.user.nickname, dto.friendNickname)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get/friends')
  getFriends(@Req() req) {
    return this.userService.getFriends(req.user.nickname)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get/friends/deeds')
  getFriendsDeeds(@Req() req) {
    return this.userService.getFriendsDeeds(req.user.nickname)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/search/friends')
  searchFriends(@Query('nickname') nickname: string, @Query('count') count: number,
    @Query('offset') offset: number) {
    return this.userService.searchFriends(nickname, count, offset)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.userService.delete(id)
  }
}
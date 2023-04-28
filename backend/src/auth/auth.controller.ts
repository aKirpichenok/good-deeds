import { Body, Controller, Get, Headers, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';


@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('/login')
  async login(@Body() userDto: CreateUserDto, @Res() res, @Req() req) {
    const user: any = await this.authService.login(userDto)
    res.cookie('token', user.token, {
      maxAge: 3600,
      secure: true,
      httpOnly: true,
    })
    res.status(200).send(user)
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }

  @Get('/removeCookie')
  removeCookie(@Headers('cookie') cookie: string, @Res() res, @Req() req) {
    const cookies = cookie.split(';');
    const cookieName = 'token';
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${cookieName}=`)) {
        const parts = cookie.split('=');
        const name = parts.shift();
        const value = parts.join('=');
        res.clearCookie(name, {
          path: '/',
          httpOnly: true,
          maxAge: 0,
        });
      }
    }
    res.status(204).send('Cookie is deleted');
  }

  @Get('/setCookie')
  setCookie(@Res() res, @Req() req) {
    const [BEARER, cookieValue] = req.headers.authorization.split(' ')
    res.cookie('token', cookieValue, {
      maxAge: 3600,
      secure: true,
      httpOnly: true,
    });
    res.send('Cookie is set');
  }

}

import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { ObjectId } from 'mongoose';
import { CreateDeedDto } from './dto/create-deed.dto';
import { DeedService } from './deeds.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Работы с добрыми делами')
@Controller('/deeds')
export class DeedController {

  constructor(private deedService: DeedService) { }
  @Post('/create')
  create(@Body() dto: CreateDeedDto) {
    return this.deedService.create(dto);
  }

  @Get()
  getAll(@Query('count') count: number,
    @Query('offset') offset: number) {
    return this.deedService.getAll(count, offset)
  }

  @Get(':id')
  getSelect(@Param('id') id: ObjectId) {
    return this.deedService.getSelect(id)
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.deedService.search(query)
  }


  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.deedService.delete(id)
  }


}
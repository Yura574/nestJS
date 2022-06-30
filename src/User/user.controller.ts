import { Body, Controller, Get, Header, HttpCode, Post, Redirect, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserDto } from './dto/userDto';


@Controller('user')

export class UserController{
  constructor(private userService: UserService) {
  }

  @Get()
  getAllUsers(){
    return this.userService.getAllUser()
  }
  @Post()
  createUser(@Body() dto: UserDto){
    return this.userService.createUser(dto)
  }
}
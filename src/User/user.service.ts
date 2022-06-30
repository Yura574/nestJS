import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entityModels/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/userDto';


@Injectable()

export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  getAllUser(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getOneUser(id: number): Promise<User>{
    return this.usersRepository.findOneBy({id})
  }

 async createUser(dto: UserDto){
   console.log(dto);
   const user = await this.usersRepository.save(dto)
   return user
  }
}
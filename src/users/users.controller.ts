import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  // Con : Promise<User[]> se indica que este método devuelve una promesa que a su vez devuelve un array con entidades de tipo User
  // Recordar que estamos en una clase por lo que this. se usa para indicar el uso de parámetros del constructor en el mimso método
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<User> {
    return this.usersService.createUser(newUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(Number(id));
  }
}

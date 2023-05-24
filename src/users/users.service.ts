import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  // @InjectRepository sirve para importar entities en un "Repository" para comunicarse con la db
  // A la derecha del decorador va el nombre del repositorio
  // A la derecha del nombre el tipo de dato (recordar que se está usando typescript)
  // entre <> se indica que el repositorio contiene un tipo de dato que en este caso es el usuario que hemos importado (entity)
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  // Recordar que estamos en una clase por lo que this. se usa para indicar el uso de parámetros del constructor en el mimso método
  createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  getUserById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
}

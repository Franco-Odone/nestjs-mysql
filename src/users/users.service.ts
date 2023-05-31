import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
  // @InjectRepository sirve para importar entities en un "Repository" para comunicarse con la db
  // A la derecha del decorador va el nombre del repositorio
  // A la derecha del nombre el tipo de dato (recordar que se está usando typescript)
  // entre <> se indica que el repositorio contiene un tipo de dato que en este caso es el usuario que hemos importado (entity)
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}
  // Recordar que estamos en una clase por lo que this. se usa para indicar el uso de parámetros del constructor en el mimso método
  async getUsers() {
    // La función "find" incluye la propiedad "relations" con el valor ["profile"], lo que indica que se debe incluir la propiedad
    // relacionada en la respuesta.
    return await this.userRepository.find({ relations: ['profile'] });
  }

  async getUserById(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    return !userFound
      ? new HttpException('Usuario no encontrado...', HttpStatus.NOT_FOUND)
      : userFound;
  }

  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });

    const newUser = this.userRepository.create(user);

    return userFound
      ? new HttpException('Nombre de usuario ya existe...', HttpStatus.CONFLICT)
      : this.userRepository.save(newUser);
  }

  async deleteUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    return !userFound
      ? new HttpException('Usuario no encontrado...', HttpStatus.NOT_FOUND)
      : await this.userRepository.delete({ id });
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    return userFound.username === user.username
      ? new HttpException('Nombre de usuario ya existe...', HttpStatus.CONFLICT)
      : await this.userRepository.update({ id }, user);
  }

  async createProfile(id: number, profile: CreateProfileDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    const newProfile = this.profileRepository.create(profile);
    const savedProfile = await this.profileRepository.save(newProfile);
    userFound.profile = savedProfile;

    return !userFound
      ? new HttpException('User not found', HttpStatus.NOT_FOUND)
      : this.userRepository.save(userFound);
  }
}

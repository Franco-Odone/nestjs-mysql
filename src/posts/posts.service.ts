import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UsersService,
  ) {}

  getPosts() {
    return this.postRepository.find({ relations: ['author'] });
  }

  async createPost(post: CreatePostDto) {
    const allUsers = await this.userService.getUsers();
    const userFound = allUsers.find((user) => user.id === post.authorId);
    const newPost = this.postRepository.create(post);

    return userFound !== undefined
      ? await this.postRepository.save(newPost)
      : new HttpException('Usuario no encontrado...', HttpStatus.NOT_FOUND);
  }
}

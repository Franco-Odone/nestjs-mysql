import { Controller, Get, Post as Create, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(): Promise<Post[]> {
    return this.postsService.getPosts();
  }

  @Create()
  createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }
}

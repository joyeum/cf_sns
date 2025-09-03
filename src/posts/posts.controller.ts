import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

/**
 * authr: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */
interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getPost(): Post {
    return {
      author: 'newjeans_official',
      title: '뉴진스 민지',
      content: '베이비복스랑 콜라보하는 민지',
      likeCount: 1000000,
      commentCount: 5000,
    };
  }
}

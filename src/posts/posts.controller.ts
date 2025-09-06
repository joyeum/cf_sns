import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { title } from 'process';

/**
 * authr: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */
interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}
let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '베이비복스랑 콜라보하는 민지',
    likeCount: 1000000,
    commentCount: 5000,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 하니',
    content: '하니는 맏언니',
    likeCount: 900000,
    commentCount: 4000,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '블랙핑크 제니',
    content: '제니는 솔로 앨범도 내고',
    likeCount: 2000000,
    commentCount: 6000,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  @Get()
  getPosts(): PostModel[] {
    return posts;
  }

  // 2) GET /posts/:id
  @Get(':id')
  getPost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id); // undefined , PostModel
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  // 3) POST /posts
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };
    posts = [...posts, post];
    return post;
  }

  // 4) PATCH /posts/:id
  @Patch(':id')
  patchPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }
    if (author) {
      post.author = author;
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    posts = posts.map((prevPost) => (prevPost.id === +id ? post : prevPost));
    return post;
  }

  // 5) DELETE /posts/:id
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }
    posts = posts.filter((post) => post.id !== +id);
    return post.id;
  }
}

import { Body, Controller, Get, Query } from '@nestjs/common';
import { QueryNewsDto } from './dto/query-news.dto';
import { NewsService } from './news.service';

@Controller('api')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('news/search')
  searchNews(@Query() querynewsDto: QueryNewsDto, @Body('auth') auth) {
    return this.newsService.searchNews(querynewsDto, auth);
  }
}

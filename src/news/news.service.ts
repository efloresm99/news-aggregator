import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, forkJoin, of, map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { QueryNewsDto } from './dto/query-news.dto';
import { INewsElement } from './interfaces/newselement.interface';
import { unauthorizedObject } from './errors/unautorized-error';
import { notFoundObject } from './errors/notfound-error';

@Injectable()
export class NewsService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  searchNews(
    querynewsDto: QueryNewsDto,
    auth: boolean,
  ): Observable<INewsElement[]> {
    const { q: query, source, page } = querynewsDto;
    const newYorkTimesKey = this.configService.get<string>('NYT_KEY');
    const theGuardianKey = this.configService.get<string>('THG_KEY');
    const canNotAccessToNYT = !auth;

    if (source === 'nytimes') {
      if (canNotAccessToNYT)
        throw new UnauthorizedException(unauthorizedObject);

      const newYorkTimesUrl = getNewYorkTimesUrl(query, page, newYorkTimesKey);
      const newYorkTimesResponse = this.getNewYorkTimesData(newYorkTimesUrl);
      return newYorkTimesResponse.pipe(
        map((data) => {
          const thereIsNoData = data.length === 0;
          if (thereIsNoData) {
            throw new NotFoundException(notFoundObject);
          }
          return data;
        }),
      );
    } else if (source === 'thguard') {
      const theGuardianUrl = getTheGuardianUrl(query, page, theGuardianKey);
      const theGuardianResponse = this.getTheGuardianData(theGuardianUrl);
      return theGuardianResponse.pipe(
        map((data) => {
          const thereIsNoData = data.length === 0;
          if (thereIsNoData) {
            throw new NotFoundException(notFoundObject);
          }
          return data;
        }),
      );
    } else {
      const canAccessNyt = auth;
      const emptyObservable = of([]);

      const newYorkTimesUrl = getNewYorkTimesUrl(query, page, newYorkTimesKey);
      const newYorkTimesResponse = canAccessNyt
        ? this.getNewYorkTimesData(newYorkTimesUrl)
        : emptyObservable;

      const theGuardianUrl = getTheGuardianUrl(query, page, theGuardianKey);
      const theGuardianResponse = this.getTheGuardianData(theGuardianUrl);

      const completeResponse = forkJoin([
        newYorkTimesResponse,
        theGuardianResponse,
      ]).pipe(
        map(([arrayNewYorkTimes, arrayTheGuardian]) => {
          return [...arrayNewYorkTimes, ...arrayTheGuardian];
        }),
      );
      return completeResponse.pipe(
        tap((data) => {
          const dataNotError = !(data instanceof Error);
          const dataIsEmpty = data.length === 0;

          if (dataNotError && dataIsEmpty) {
            throw new NotFoundException(notFoundObject);
          }
        }),
      );
    }
  }

  private getNewYorkTimesData(nytUrl: string): Observable<INewsElement[]> {
    const nytNews = this.httpService.get(nytUrl);
    const nytNewsData = nytNews.pipe(
      map((response) => {
        return response.data.response.docs;
      }),
    );
    const builtData = nytNewsData.pipe(
      map((curr) => {
        const responseObj = curr.map((result) => {
          const newsObject = {
            id: result.uri,
            type: result.document_type,
            publication_date: result.pub_date,
            title: result.headline.main,
            abstract: result.abstract,
            byline: result.byline.original,
            web_url: result.web_url,
            source: result.source,
          };
          return newsObject;
        });
        return responseObj;
      }),
    );
    return builtData;
  }

  private getTheGuardianData(thGuardUrl: string): Observable<INewsElement[]> {
    const thGuardNews = this.httpService.get(thGuardUrl);
    const tgNewsData = thGuardNews.pipe(
      map((response) => {
        return response.data.response.results;
      }),
      catchError(() => of([])),
    );
    const tgBuiltData = tgNewsData.pipe(
      map((curr) => {
        const responseObj = curr.map((result) => {
          const newsObject = {
            id: result.id,
            type: result.type,
            publication_date: result.fields.firstPublicationDate,
            title: result.webtitle,
            abstract: result.fields.trailText,
            byline: result.byline,
            web_url: result.webUrl,
            source: result.fields.publication,
          };
          return newsObject;
        });
        return responseObj;
      }),
      catchError(() => of([])),
    );
    return tgBuiltData;
  }
}

function getNewYorkTimesUrl(query: string, page = '0', key: string): string {
  const baseUrl = new URL(
    'https://api.nytimes.com/svc/search/v2/articlesearch.json',
  );
  const newPage = page === '0' ? '0' : (parseInt(page) - 1).toString();
  baseUrl.searchParams.append('q', query);
  baseUrl.searchParams.append('page', newPage);
  baseUrl.searchParams.append('api-key', key);

  return baseUrl.toString();
}

function getTheGuardianUrl(query: string, page = '1', key: string): string {
  const baseURL = new URL('https://content.guardianapis.com/search');
  baseURL.searchParams.append('q', query);
  baseURL.searchParams.append('show-fields', 'all');
  baseURL.searchParams.append('page', page);
  baseURL.searchParams.append('api-key', key);

  return baseURL.toString();
}

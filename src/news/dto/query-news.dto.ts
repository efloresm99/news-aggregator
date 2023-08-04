import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class QueryNewsDto {
  @IsString()
  @Length(2, 40)
  readonly q: string;

  @IsOptional()
  @IsString()
  @IsIn(['nytimes', 'thguard', 'all'])
  readonly source?: string = 'all';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  readonly page?: string;
}

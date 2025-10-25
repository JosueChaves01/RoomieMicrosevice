import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsBoolean, IsString, Min, Max, IsIn } from 'class-validator';

export class GetRoomiesQueryDTO {
  @IsOptional()
  @Transform(({ value }) => {
    const num = parseInt(value);
    return isNaN(num) ? 1 : Math.max(1, num);
  })
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => {
    const num = parseInt(value);
    return isNaN(num) ? 10 : Math.max(1, Math.min(100, num));
  })
  @IsNumber()
  @Min(1)
  @Max(100)
  pageSize?: number = 10;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = parseInt(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  @Min(0)
  minBudget?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = parseInt(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  @Min(0)
  maxBudget?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = parseInt(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  @Min(18)
  @Max(99)
  minAge?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = parseInt(value);
    return isNaN(num) ? undefined : num;
  })
  @IsNumber()
  @Min(18)
  @Max(99)
  maxAge?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  @IsBoolean()
  verified?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = parseInt(value);
    return isNaN(num) ? undefined : Math.max(1, Math.min(5, num));
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  minCleanliness?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const num = parseInt(value);
    return isNaN(num) ? undefined : Math.max(1, Math.min(5, num));
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  minSocial?: number;

  @IsOptional()
  @Transform(({ value }) => value || 'recent')
  @IsString()
  @IsIn(['recent', 'rating', 'age', 'budget'])
  sort?: 'recent' | 'rating' | 'age' | 'budget' = 'recent';

  @IsOptional()
  @Transform(({ value }) => value || undefined)
  @IsString()
  search?: string;
}

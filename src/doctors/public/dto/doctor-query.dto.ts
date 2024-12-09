import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class DoctorQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @Min(1)
  @IsInt()
  @IsOptional()
  page?: number;

  @Min(1)
  @IsInt()
  @IsOptional()
  limit?: number;
}

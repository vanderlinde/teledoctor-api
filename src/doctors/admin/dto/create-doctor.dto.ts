import { IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class CreateDoctorDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Matches(/^[a-z0-9-]+$/, {
    message: 'slug must contain only lowercase letters and numbers',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  position: string;

  @MaxLength(1500)
  @IsString()
  @IsNotEmpty()
  about: string;

  @MaxLength(15)
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}

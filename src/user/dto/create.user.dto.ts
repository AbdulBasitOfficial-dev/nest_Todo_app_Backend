import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  @IsString()
  @IsIn(['user', 'admin'], { message: 'Role must be either user or admin' })
  role?: string = 'user';
}

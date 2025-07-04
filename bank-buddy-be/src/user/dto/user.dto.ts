export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly type?: string;
}

export class UpdateUserDto {
  readonly username?: string;
  readonly password?: string;
  readonly email?: string;
  readonly type?: string;
}

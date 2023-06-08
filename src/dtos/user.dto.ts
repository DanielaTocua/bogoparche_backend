import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserEmailDTO {
	@IsNotEmpty()
	@IsEmail()
	@Expose()
	email: string;
}
export class UserLoginDTO extends UserEmailDTO {
	@IsNotEmpty()
	@IsString()
	@Expose()
	password: string;
}
export class UserAuthDTO extends UserEmailDTO {
	@IsNotEmpty()
	@IsString()
	@Exclude({ toPlainOnly: true })
	password: string;
}
export class UserPublicDTO extends UserEmailDTO {
	@IsNotEmpty()
	@IsString()
	@Expose()
	username: string;

	@Expose()
	isAdmin: boolean;
}

export class UserRegisterDTO extends UserPublicDTO {
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@Expose({ toClassOnly: true })
	password: string;
}

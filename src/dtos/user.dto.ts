import { Exclude, Expose } from "class-transformer";
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength,
	ValidateIf,
} from "class-validator";

export class UserEmailDTO {
	@IsNotEmpty()
	@IsEmail()
	@Expose()
	email: string;
}

export class UserLoginDTO {
	@IsOptional()
	@Expose()
	@ValidateIf((o) => o.email && !o.username)
	@IsEmail()
	email: string;

	@IsOptional()
	@IsString()
	@Expose()
	@ValidateIf((o) => !o.email && o.username)
	username: string;

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

export class UserRegisterDTO extends UserEmailDTO {
	@IsNotEmpty()
	@IsString()
	@Expose()
	username: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@Expose({ toClassOnly: true })
	password: string;
}

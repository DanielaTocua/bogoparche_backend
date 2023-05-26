import { Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class TokenDTO {
	@IsNotEmpty()
	@IsString()
	@Expose()
	access: string;

	@IsNotEmpty()
	@IsString()
	@Expose()
	refresh: string;
}

export class UserAndTokenDTO extends TokenDTO {
	@IsNotEmpty()
	@IsString()
	@Expose()
	username: string;

	@IsNotEmpty()
	@IsBoolean()
	@Expose()
	isAdmin: boolean;
}

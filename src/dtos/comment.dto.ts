import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CommentDTO {
	@IsNotEmpty()
	@IsNumber()
	@Expose()
	id_actividad: number;

	@IsNotEmpty()
	@IsNumber()
	@Expose()
	id_usuario: number;

	@IsNotEmpty()
	@IsString()
	@Expose()
	texto_comentario: string;
}

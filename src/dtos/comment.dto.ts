import { Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CommentDTO {
	@IsNotEmpty()
	@IsNumber()
	@Expose()
	id_actividad: number;

	@IsNotEmpty()
	@IsString()
	@Expose()
	texto_comentario: string;

	@IsNotEmpty()
	@IsBoolean()
	@Expose()
	es_plan: boolean;

	@IsNotEmpty()
	@IsNumber()
	@Expose()
	calificacion: string;
}

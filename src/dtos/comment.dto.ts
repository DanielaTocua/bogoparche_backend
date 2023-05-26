import { Expose } from "class-transformer";
import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsString,
	Max,
	Min,
} from "class-validator";

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
	@IsInt()
	@Min(1)
	@Max(5)
	@Expose()
	calificacion: number;
}

import { Exclude, Expose } from "class-transformer";
import {
	IsBoolean,
	IsDateString,
	IsEnum,
	IsMilitaryTime,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from "class-validator";

import { RANGE_PRICES } from "../utils/constants";

export class NewActivityEntryDTO {
	@Expose()
	id_usuario: number;

	@IsNotEmpty()
	@IsString()
	@Expose()
	titulo_actividad: string;

	@IsString()
	@Expose()
	@IsOptional()
	@MaxLength(600000)
	image: string|undefined;

	@IsNotEmpty()
	@IsString()
	@Expose()
	ubicacion: string;

	@IsNotEmpty()
	@IsEnum(RANGE_PRICES)
	@Expose()
	rango_precio: RANGE_PRICES;

	@IsString()
	@Expose()
	descripcion: string;

	@IsNotEmpty()
	@IsBoolean()
	@Expose()
	restriccion_edad: boolean;

	@IsNotEmpty()
	@IsString()
	@Expose()
	medio_contacto: string;

	@Expose()
	es_privada: boolean;

	@IsNumber()
	@IsNotEmpty()
	@Expose()
	id_categoria: number;

	@Expose()
	es_plan: boolean;

	@Expose()
	es_aprobado: boolean;

	@Expose()
	@IsOptional()
	id_related_public_activity: number;

	@Expose()
	@IsOptional()
	users: string[] ;	
}

export class ActivityUpdateDTO {
	@IsString()
	@Expose()
	@IsOptional()
	titulo_actividad: string;

	@IsString()
	@Expose()
	@IsOptional()
	ubicacion: string;

	@IsString()
	@Expose()
	@IsOptional()
	image: string|undefined;

	@IsEnum(RANGE_PRICES)
	@Expose()
	@IsOptional()
	rango_precio: RANGE_PRICES;

	@IsString()
	@Expose()
	@IsOptional()
	descripcion: string;

	@IsBoolean()
	@Expose()
	@IsOptional()
	restriccion_edad: boolean;

	@IsString()
	@Expose()
	@IsOptional()
	medio_contacto: string;

	@IsBoolean()
	@Expose()
	@IsOptional()
	es_privada: boolean;

	@IsNumber()
	@Expose()
	@IsOptional()
	id_categoria: number;

	@Exclude()
	@IsOptional()
	es_plan: boolean;

	@Exclude()
	@IsOptional()
	@IsBoolean()
	es_aprobado: boolean;

	@IsString({each: true})
	@Exclude({toPlainOnly: true})
	@IsOptional()
	users: string[];
}

export class NewEventEntryDTO extends NewActivityEntryDTO {
	@IsDateString()
	@IsNotEmpty()
	@Expose()
	fecha_inicio: Date;

	@IsDateString()
	@IsNotEmpty()
	@Expose()
	fecha_fin: Date;

	@IsMilitaryTime()
	@IsNotEmpty()
	@Expose()
	hora_inicio: Date;

	@IsMilitaryTime()
	@IsNotEmpty()
	@Expose()
	hora_fin: Date;
}

export class EventUpdateDTO extends ActivityUpdateDTO {
	@IsDateString()
	@Expose()
	@IsOptional()
	fecha_inicio: Date;

	@IsDateString()
	@Expose()
	@IsOptional()
	fecha_fin: Date;

	@IsMilitaryTime()
	@Expose()
	@IsOptional()
	hora_inicio: Date;

	@IsMilitaryTime()
	@Expose()
	@IsOptional()
	hora_fin: Date;
}

export class idActividadDTO {
	@IsNumber()
	@IsNotEmpty()
	@Expose()
	id_actividad: number;
}

export class EventUpdateFORMDTO {
	es_plan: boolean;
}

export class NewPlanEntryDTO extends NewActivityEntryDTO {
	@IsString()
	@IsNotEmpty()
	@Expose()
	horario_plan: string;
}

export class PlanUpdateDTO extends ActivityUpdateDTO {
	@IsString()
	@Expose()
	@IsOptional()
	horario_plan: string;
}

export class UserListDTO {
	@IsString({ each: true })
	@Expose()
	users: string[];
}

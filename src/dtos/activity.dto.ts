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
} from "class-validator";

import { RANGE_PRICES } from "../utils/constants";

export class NewActivityEntryDTO {
	@IsNotEmpty()
	@IsString()
	@Expose()
	titulo_actividad: string;

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

	@IsNotEmpty()
	@IsBoolean()
	@Expose()
	es_privada: boolean;

	@IsNumber()
	@IsNotEmpty()
	@Expose()
	id_categoria: number;


	@Exclude()
	es_plan: boolean;


    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    es_aprobado: boolean
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

export class NewFavoriteEntryDTO {
	@IsNumber()
	@IsNotEmpty()
	@Expose()
	id_actividad: number

	@IsString()
	@IsNotEmpty()
	@Expose()
	username: string

	@IsBoolean()
	@IsNotEmpty()
	@Expose()
	es_plan: boolean
}
export class EventUpdateFORMDTO{
    
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

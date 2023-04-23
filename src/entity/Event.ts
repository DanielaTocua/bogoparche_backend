import { Column, Entity } from "typeorm";

import { Activity } from "./Activity";

@Entity("event")
export class Event extends Activity {
	@Column("date")
	fecha_inicio: Date;

	@Column("date")
	fecha_fin: Date;

	@Column("time")
	hora_inicio: Date;

	@Column("time")
	hora_fin: Date;
}

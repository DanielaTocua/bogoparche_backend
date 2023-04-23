import { Column, Entity } from "typeorm";

import { Activity } from "./Activity";

@Entity("event")
export class Event extends Activity {
	@Column()
	fecha_inicio: Date;

	@Column()
	fecha_fin: Date;

	@Column()
	hora_inicio: Date;

	@Column()
	hora_fin: Date;
}

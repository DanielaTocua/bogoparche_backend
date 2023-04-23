import { Column, Entity } from "typeorm";

import { Activity } from "./Activity";

@Entity("plan")
export class Plan extends Activity {
	@Column("varchar", { length: 100 })
	horario_plan: string;
}

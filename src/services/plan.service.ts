import { instanceToPlain } from "class-transformer";
import { validate } from "class-validator";
import { NewPlanEntryDTO, PlanUpdateDTO } from "@/dtos/activity.dto";
import { Plan } from "../entity/Plan";
import { ServerError } from "../errors/server.error";
import { STATUS_CODES } from "../utils/constants";
import { Activity } from "../entity/Activity";
import dataSource from "../database/dataSource.";

class PlanService {
	// Find Plan by Id
	async findPlanById(id: number): Promise<any> {
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		try {
			const plan = await Plan.findOneOrFail({ where: { id: id } });
			const planWithEsPlan = { ...plan, es_plan: true };
			return planWithEsPlan;
		} catch {
			throw new ServerError(
				`The plan id: ${id} does not exist`,
				STATUS_CODES.BAD_REQUEST,
			);
		}
	}

	// Adds the id to the json
	async addPlan(newPlanEntry: NewPlanEntryDTO): Promise<Plan> {
		console.log(newPlanEntry);
		console.log(instanceToPlain(newPlanEntry));

		// Looks for errors in newPlanEntry
		const inputErrors = await validate(newPlanEntry);
		if (inputErrors.length > 0) {
			throw new ServerError("Invalid form", STATUS_CODES.BAD_REQUEST);
		}

		// Adds the plan
		const newPlan = Plan.create(instanceToPlain(newPlanEntry));
		return await newPlan.save();
	}

	// Edits Plan
	async editPlan(id: number, planEntry: PlanUpdateDTO): Promise<Plan> {
		// Finds plan
		await this.findPlanById(id);
		if (typeof id != "number") {
			throw new ServerError("Invalid id", STATUS_CODES.BAD_REQUEST);
		}
		// create a new query runner
		const queryRunner = dataSource.createQueryRunner()

		// establish real database connection
		await queryRunner.connect()

		// open a new transaction:
		await queryRunner.startTransaction()

		try {
			await Activity.update(id, instanceToPlain(planEntry));
			await Plan.update(id, instanceToPlain(planEntry));

			// commit transaction 
			await queryRunner.commitTransaction()
		} catch (err) {
			// rollback changes we made
			await queryRunner.rollbackTransaction()
		} finally {
			// release query runner
			await queryRunner.release()
		}
		
		return await Plan.findOneOrFail({ where: { id } });
	}

	// Deletes plan
	async deletePlan(id: number): Promise<Plan> {
		// Finds Event
		const plan = await this.findPlanById(id);

		// create a new query runner
		const queryRunner = dataSource.createQueryRunner()

		// establish real database connection
		await queryRunner.connect()

		// open a new transaction:
		await queryRunner.startTransaction()

		try {
			Plan.remove(plan);
			// commit transaction 
			await queryRunner.commitTransaction()
		} catch(err){
			// rollback changes we made
			await queryRunner.rollbackTransaction()
		} finally {
			// release query runner
			await queryRunner.release()
		}
		
		return plan
	}
}

export default new PlanService();

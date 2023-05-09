import { Request, Response } from "express";

import attendanceFacade from "../facades/attendance.facade";
import { STATUS_CODES } from "../utils/constants";

class AttendanceController {
	async addAttendance(req: Request, res: Response): Promise<void> {
		// Retrieves plan info
		const result = await attendanceFacade.addAttendance(
			req.userId as number,
			req.body.id_actividad,
		);
		res.send(result).status(STATUS_CODES.OK);
	}

	async getAttendanceByActivityId(req: Request, res: Response): Promise<void> {
		const attendance = await attendanceFacade.getAttendanceByActivityId(
			req.userId as number,
			parseInt(req.params.id),
		);
		res.json(attendance);
	}

	async deleteAttendance(req: Request, res: Response): Promise<void> {
		await attendanceFacade.deleteAttendance(
			req.userId as number,
			parseInt(req.params.id),
		);
		res.json({ msg: "Attendance succesfully deleted" });
	}
}
export default new AttendanceController();

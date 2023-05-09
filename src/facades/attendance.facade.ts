import { ServerError } from "../errors/server.error";
import activityService from "../services/activity.service";
import attendanceService from "../services/attendance.service";
import { STATUS_CODES } from "../utils/constants";

class AttendanceFacade {
	async addAttendance(
		id_usuario: number,
		id_actividad: number,
	): Promise<{ msg: string }> {
		await activityService.findActivityById(id_actividad);
		if (await attendanceService.findAttendanceById(id_usuario, id_actividad)) {
			return { msg: "This attendance already exists" };
		}
		attendanceService.addAttendance(id_usuario, id_actividad);

		return { msg: "Attendance succesfully added" };
	}

	async deleteAttendance(
		id_usuario: number,
		id_actividad: number,
	): Promise<void> {
		const attendance = await attendanceService.findAttendanceById(
			id_usuario,
			id_actividad,
		);
		if (attendance === null) {
			throw new ServerError(
				"This attendance does not exist",
				STATUS_CODES.BAD_REQUEST,
			);
		}
		attendanceService.deleteAttendance(attendance);
	}

	async getAttendanceByActivityId(
		id_usuario: number,
		id_actividad: number,
	): Promise<{ exists: boolean }> {
		await activityService.findActivityById(id_actividad);
		const foundAttendance = await attendanceService.findAttendanceById(
			id_usuario,
			id_actividad,
		);
		return { exists: foundAttendance === null ? false : true };
	}
}

export default new AttendanceFacade();

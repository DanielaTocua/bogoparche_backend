import { Attendance } from "../entity/Attendance";

class AttendanceService {
	async addAttendance(id_usuario: number, id_actividad: number): Promise<void> {
		const newAttendance = Attendance.create({ id_usuario, id_actividad });
		await newAttendance.save();
	}

	async findAttendanceById(id_usuario: number, id_actividad: number) {
		const attendance = await Attendance.findOneBy({ id_usuario, id_actividad });
		return attendance;
	}

	async deleteAttendance(attendance: Attendance): Promise<void> {
		Attendance.remove(attendance);
	}
}
export default new AttendanceService();

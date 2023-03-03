import { STATUS_CODES } from "../utils/constants";

export class ServerError extends Error {
	private readonly _code: STATUS_CODES;
	constructor(message: string, code: STATUS_CODES) {
		super(message);
		this._code = code;
	}

	public get code(): number {
		return this._code;
	}
}

import { HttpException } from "./http.exception";

export class ConflictException extends HttpException {

    public statusCode = 409;
    public statusName = "Conflict";

    constructor(message: string) {
        super(message);
    }

}

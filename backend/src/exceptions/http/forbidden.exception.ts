import { HttpException } from "./http.exception";

export class ForbiddenException extends HttpException {

    public statusCode = 403;
    public statusName = "Forbidden";

    constructor(message: string) {
        super(message);
    }

}

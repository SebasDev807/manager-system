import { HttpException } from "./http.exception";

export class UnauthorizedException extends HttpException {

    public statusCode = 401;
    public statusName = "Unauthorized";

    constructor(message: string) {
        super(message);
    }

}

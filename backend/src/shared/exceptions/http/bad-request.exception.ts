import { HttpException } from "./http.exception";

export class BadRequestException extends HttpException {

    public statusCode = 400;
    public statusName = "Bad Request";

    constructor(message: string) {
        super(message);
    }

}

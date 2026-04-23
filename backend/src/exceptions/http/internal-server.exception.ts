import { HttpException } from "./http.exception";

export class InternalServerException extends HttpException {

    public statusCode = 500;
    public statusName = "Internal Server Error";

    constructor(message: string) {
        super(message);
    }

}

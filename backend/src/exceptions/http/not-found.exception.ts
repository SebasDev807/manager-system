import { HttpException } from "./http.exception";

export class NotFoundException extends HttpException {

    public statusCode = 404;
    public statusName = "Not Found";
    
    constructor(message: string) {
        super(message);
    }

}

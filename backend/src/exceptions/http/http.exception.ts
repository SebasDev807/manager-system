// Excepcion para errores HTTP personalizados

export abstract class HttpException extends Error {
    
    abstract statusCode: number;
    abstract statusName: string;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

}
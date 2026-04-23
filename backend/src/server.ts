import express, { Application, Router } from 'express';
import { envs, scalarOptions } from './config';
import 'dotenv/config';
import { Logger } from './shared/utils';
import appRouter from './shared/routes';
import morgan from 'morgan';
import { apiReference } from '@scalar/express-api-reference';
import { errorHandler } from './shared';

class Server {

    private app: Application;
    private port: number;
    private router: Router;

    constructor() {
        this.app = express();
        this.router = appRouter;
        this.port = envs.PORT;
        this.middlewares();
        this.routes();
        this.errorHandler();
    }

    private middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
    }

    private routes() {
        this.app.use("/api-docs", apiReference(scalarOptions))
        this.app.use("/api/v1", this.router);
    }

    private errorHandler() {
        this.app.use(errorHandler);
    }

    public start() {

        if (envs.NODE_ENV === 'development') {
            console.clear();
        }

        this.app.listen(this.port, () => {
            Logger.log(`Server is running on port ${this.port} in ${envs.NODE_ENV} mode`);
        });
    }

}

export default Server;
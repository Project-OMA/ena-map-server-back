import express from 'express';
import cors from 'cors';

import https from 'https';
import http from 'http';
import morgan from 'morgan';

import helmet from 'helmet';
import compression from 'compression';
import methodOverride from 'method-override';

import routes_v1 from "./routes/v1/index"
import errorHandler from './middlewares/ErrorHandler';

export default class Server {
  public express: express.Application;

  constructor () {
    this.express = express();
    this.middlewares();
    this.routeTest();
    this.routes();
  }

  public startHttps (port: number): void {
    const httpsOptions = {
      cert: '',
      key: ''
    };
    const server = https.createServer(httpsOptions, this.express);
    server.listen(port, () => {
      console.log('Servidor iniciado na porta ' + port);
    });
  }

  public async connectDB (): Promise<any> {
    console.log('Iniciando a Conexão com o banco de dados');
  }

  public startHttp (port: number): void {
    const server = http.createServer(this.express);
    server.listen(port, () => {
      console.log('Server is running :', port);
    });
  }

  private middlewares (): void {
    this.express.use(helmet());
    this.express.use(express.json({ limit: '10mb' }));
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(compression());
    this.express.use(methodOverride('X-HTTP-Method-Override'));
    this.express.use(cors());
    this.express.use(morgan('tiny'));
  }

  private routes (): void {
    this.express.use("/v1", routes_v1);
    this.express.use(errorHandler);
  }

  private routeTest (): void {
    this.express.get('/', (req, res) => {
      res.send('Hello World');
    });
  }
}

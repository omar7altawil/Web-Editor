// NPM imports
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Http from 'http';
import httpProxy from 'http-proxy';
import jwt from 'jsonwebtoken';

// Application imports
import config from './config';
// import loggerFactory from './utils/logging';
import initialize from './initializer';
import questionsRoute from './routes/questions.route';

// Routes ...
// import meRoute from './routes/me.route';


// Intializations
// const logger = loggerFactory.getLogger();
const app = express();
const http = Http.createServer(app);
const apiProxy = httpProxy.createProxyServer();

// logger
// app.use(
//   loggerFactory.connectLogger(loggerFactory.getLogger('http'), {
//     level: 'auto'
//   })
// );

app.all('/*', (req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header(
    'Access-Control-Allow-Headers',
    'Content-type,Accept,X-Access-Token,X-Key'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// To avoid client to know about express
app.disable('x-powered-by');

// To avoid 304 content not modified status.
app.disable('etag');

initialize(
  () => {
    app.get('/healthcheck', (req, res) => {
      res.json('OK');
    });

    // jwt-decode application/json
    app.use((req: any, res, next) => {
      let token = '';
      try {
        if (req.headers) token = (req.headers.authorization + '').split(' ')[1];
        if (!token || token === '') if (next) return next();
        const decoded: any = jwt.decode(token);
        req.user = decoded;
        return next();
      } catch (e) {
        // logger.log(e);
        return next();
      }
    });

    // parse application/json
    app.use(bodyParser.json());

    app.use('/questions', questionsRoute());

    app.use((err: any, req: Request, res: Response, next: (err?: any) => void) => {
      if (!err) return next();
      if (err.data) err = err.data;
      else if (err.message) err = err.message;
      console.trace('[ERROR]: ', err);
      return res.status(400).json({ error: err });
    });

    exports.server = http.listen(config.port, () => {
      console.info(`Started on port ${config.port}`);
    });
  },
  config
);

import { createServer, Server } from 'http';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes';
import { login } from './utils/login';
const swaggerDocument = require('./swagger.json');
import './controllers';

const app: express.Express = express();
const server: Server = createServer(app);

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log
app.use(morgan('dev'));

// Documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Login User
app.post('/api/login', async (req, res) => {
    const token = await login(req.body.email, req.body.password);
    if (token) {
        res.send(token);
    } else {
        res.sendStatus(401);
    }
});

// API
RegisterRoutes(app);

// Frontend
app.use(express.static(path.join(__dirname, 'frontend')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

// Error Handling
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const status = err.statusCode || err.status || 500;
    res.status(status).send(err);
});

// Set server, In heroku we listen to a unix sock
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Running on localhost:${port}`));

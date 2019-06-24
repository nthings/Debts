import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import { useSocketServer } from 'socket-controllers';
import { RegisterRoutes } from './routes';
import './controllers';

const app: express.Express = express();
const server: Server = createServer(app);
let io: SocketIO.Server;

// CORS HEADERS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
    if ('OPTIONS' === req.method) {
        res.sendStatus(204);
    } else {
        next();
    }
});

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Log
app.use(morgan('dev'));

// Mongoose
mongoose.connect(process.env.MONGODB_URI)
    .then(
        // Connection successfull
        () => {
            // Login User
            app.post('/login', (req, res) => {
                // const user = JSON.parse(userString);
                // const token = jwt.sign({user: user._id}, process.env.SESSION_SECRET); // , { expiresIn: 10 } seconds
                // res.status(200).json({user, token});
                res.status(200);
            });

            RegisterRoutes(app);

            // Error Handling
            app.use((err, req, res, next) => {
                console.error('im here');
                if (res.headersSent) {
                    return next(err);
                }
                const status = err.statusCode || err.status || 500;
                res.status(status).send(err);
            });

            // Set server, In heroku we listen to a unix sock
            const port = process.env.PORT || 3000;
            server.listen(port, () => console.log(`Running on localhost:${port}`));

            // Start Socket.IO (Realtime)
            io = socketIo(server);
            io.use((socket: any, next: Function) => {
                next();
            });
            useSocketServer(io);
        },
        // Error
        err => {
            console.log(err);
        }
    );


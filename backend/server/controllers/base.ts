import { Paths } from '../utils/interfaces/Paths';
import { ConnectedSocket, SocketIO, SocketController, MessageBody, OnConnect, OnMessage } from 'socket-controllers';

@SocketController()
abstract class BaseCtrl {

    abstract model: any;

    // Get all
    getAll = async () => {
        return await this.model.find({});
    }

    getAllPopulate = async (paths: Array<Paths>) => {
        return await this.model.find({}).populate(paths);
    }

    getPopulate = async (id, paths: Array<Paths>) => {
        return await this.model.findOne({ _id: id }).populate(paths);
    }

    // Count all
    count = async () => {
        return await this.model.count();
    }

    // Insert
    insert = async (body) => {
        try {
            const obj = new this.model(body);
            return await obj.save();
        } catch (err) {
            this.checkErrors(err);
        }
    }

    // Get by id
    get = async (id) => {
        return await this.model.findOne({ _id: id });
    }

    // Update by id
    update = async (id, body) => {
        try {
            const obj = await this.model.findOne({ _id: id });
            for (const k of Object.keys(body)) {
                obj[k] = body[k];
            }
            return await obj.save();
        } catch (err) {
            this.checkErrors(err);
        }
    }

    // Delete by id
    delete = async (id) => {
        try {
            const obj = await this.model.findOne({ _id: id });
            return await obj.remove();
        } catch (err) {
            this.checkErrors(err);
        }
    }

    // ------- Socket.IO -------
    // Join to room
    @OnConnect()
    connect(@ConnectedSocket() socket: any) {
        socket.join(socket.handshake.query.room);
    }

    // Event for refreshing page
    @OnMessage('updated')
    updated(@SocketIO() io: any, @ConnectedSocket() socket: any, @MessageBody() message: any) {
        io.to(Object.keys(socket.rooms)[1]).emit('updated', message);
    }

    // Event for locking edit dialog to other users
    @OnMessage('updating')
    updating(@SocketIO() io: any, @ConnectedSocket() socket: any, @MessageBody() message: any) {
        io.to(Object.keys(socket.rooms)[1]).emit('updating', message);
    }

    // Event for freeing up the edit dialog to other users
    @OnMessage('doneUpdating')
    doneUpdating(@SocketIO() io: any, @ConnectedSocket() socket: any, @MessageBody() message: any) {
        io.to(Object.keys(socket.rooms)[1]).emit('doneUpdating', message);
    }


    // ------- Util Methods -------
    checkErrors = (err) => {
        // 11000 is the code for duplicate key error
        if (err && err.code === 11000) {
            err.status = 400;
            throw err;
        }
    }

}

export default BaseCtrl;

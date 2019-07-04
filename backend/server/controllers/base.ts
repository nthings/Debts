import { ConnectedSocket, SocketIO, SocketController, MessageBody, OnConnect, OnMessage } from 'socket-controllers';
import { Op } from 'sequelize';

@SocketController()
abstract class BaseCtrl<IModel> {

    abstract model: any;

    // Get all
    getAll = async () => {
        return await this.model.findAll();
    }

    // Count all
    count = async () => {
        return await this.model.count();
    }

    // Insert
    insert = async (body: IModel) => {
        const obj = new this.model(body);
        return await obj.save();
    }

    // Get by id
    get = async (id) => {
        return await this.model.findByPk(id);
    }

    // Update by id
    update = async (id, body: IModel) => {
        return await this.model.update(body, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
    }

    // Delete by id
    delete = async (id) => {
        return await this.model.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
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

}

export default BaseCtrl;

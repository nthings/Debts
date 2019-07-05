import { Op } from 'sequelize';

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
}

export default BaseCtrl;

import { Op } from 'sequelize';

abstract class BaseCtrl<IModel> {

    abstract model: any;
    include = null;

    // Get all
    getAll = async () => {
        return await this.model.findAll(this.include);
    }

    // Count all
    count = async () => {
        return await this.model.count();
    }

    // Insert
    insert = async (body: IModel) => {
        try {
            const obj = new this.model(body);
            return await obj.save();
        } catch (err) {
            console.error(err);
        }
    }

    // Insert in Batch
    insert_batch = async (body: IModel[]) => {
        const promises = [];
        for (const element of body) {
            try {
                const obj = new this.model(element);
                promises.push(obj.save());
            } catch (err) {
                console.error(err);
            }
        }
        return await Promise.all(promises);
    }

    // Get by id
    get = async (id) => {
        return await this.model.findByPk(id);
    }

    // Update by id
    update = async (id, body: IModel) => {
        try {
            return await this.model.update(body, {
                where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    // Delete by id
    delete = async (id) => {
        try {
            return await this.model.destroy({
                where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
}

export default BaseCtrl;

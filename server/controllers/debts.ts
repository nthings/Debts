import {Route, Get, Post, Body, Put, Delete, Security} from 'tsoa';
import { Debt, IDebt, People, Period } from '../models';
import BaseCtrl from './base';
import { Op } from 'sequelize';

@Route('/debts')
export class DebtsCtrl extends BaseCtrl<IDebt> {
    model = Debt;
    include = {include: [People, Period]};

    @Get()
    @Security('jwt')
    public async _getAll(): Promise<any> {
        return this.getAll();
    }

    @Post('duplicates')
    @Security('jwt')
    public async clean(@Body() debts: IDebt[]): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const clean = [];
            for (const debt of debts) {
                const where: any = {
                    amount: debt.amount,
                    description: {
                        [Op.like]: debt.description.replace(/ .*/, '%')
                    }
                };

                const obj = await this.model.findOne({where, ...this.include});
                if (!obj) {
                    clean.push(debt);
                } else {
                    clean.push(obj);
                }
            }
            resolve(clean);
        });
    }

    @Put()
    @Security('jwt')
    public async _insert(@Body() debt: IDebt): Promise<any> {
        return this.insert(debt);
    }

    @Put('batch')
    @Security('jwt')
    public async _insert_batch(@Body() debts: IDebt[]): Promise<any> {
        return this.insert_batch(debts);
    }

    @Post('{id}')
    @Security('jwt')
    public async _update(id: any, @Body() debt: IDebt): Promise<any> {
        return this.update(id, debt);
    }


    @Get('{id}')
    @Security('jwt')
    public async _get(id: any): Promise<any> {
        return this.get(id);
    }

    @Get('getByOwnerPeriod/{ownerId}/{periodId}')
    @Security('jwt')
    public async getByOwner(ownerId: any, periodId: any): Promise<any> {
        return await this.model.findAll({
            where: {
                ownerId,
                periodId
            },
            ...this.include
        });
    }

    @Delete('{id}')
    @Security('jwt')
    public async _delete(id: any): Promise<any> {
        return this.delete(id);
    }
}

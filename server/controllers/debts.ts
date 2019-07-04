import {Route, Get, Post, Body, Put, Delete, Security} from 'tsoa';
import { Debt, IDebt } from '../models';
import BaseCtrl from './base';

@Route('/debts')
export class DebtsCtrl extends BaseCtrl<IDebt> {
    model = Debt;

    @Get()
    @Security('jwt')
    public async _getAll(): Promise<any> {
        return this.getAll();
    }

    @Put()
    @Security('jwt')
    public async _insert(@Body() debt: IDebt): Promise<any> {
        return this.insert(debt);
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

    @Delete('{id}')
    @Security('jwt')
    public async _delete(id: any): Promise<any> {
        return this.delete(id);
    }
}

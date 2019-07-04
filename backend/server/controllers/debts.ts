import {Route, Get, Post, Body, Put, Delete} from 'tsoa';
import { Debt, IDebt } from '../models';
import BaseCtrl from './base';

@Route('/debts')
export class DebtsCtrl extends BaseCtrl<IDebt> {
    model = Debt;

    @Get()
    public async _getAll(): Promise<any> {
        return this.getAll();
    }

    @Put()
    public async _insert(@Body() debt: IDebt): Promise<any> {
        return this.insert(debt);
    }

    @Post('{id}')
    public async _update(id: any, @Body() debt: IDebt): Promise<any> {
        return this.update(id, debt);
    }

    @Get('{id}')
    public async _get(id: any): Promise<any> {
        return this.get(id);
    }

    @Delete('{id}')
    public async _delete(id: any): Promise<any> {
        return this.delete(id);
    }
}

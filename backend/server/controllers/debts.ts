import {Route, Get, Post, Body, Put} from 'tsoa';
import { DebtsModel, Debt } from '../models';
import BaseCtrl from './base';

@Route('/debts')
export class DebtsCtrl extends BaseCtrl {
    model = DebtsModel;

    @Get()
    public async _getAll(): Promise<any> {
        return this.getAll();
    }

    @Put()
    public async _insert(@Body() debt: Debt): Promise<any> {
        return this.insert(debt);
    }

    @Post('{id}')
    public async _update(id: any, @Body() debt: Debt): Promise<any> {
        return this.update(id, debt);
    }

    @Get('{id}')
    public async _get(id: any): Promise<any> {
        return this.get(id);
    }
}

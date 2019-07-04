import {Route, Get, Post, Body, Put, Delete, Security} from 'tsoa';
import { Period, IPeriod } from '../models';
import BaseCtrl from './base';

@Route('/periods')
export class PeriodsCtrl extends BaseCtrl<IPeriod> {
    model = Period;

    @Get()
    @Security('jwt')
    public async _getAll(): Promise<any> {
        return this.getAll();
    }

    @Put()
    @Security('jwt')
    public async _insert(@Body() period: IPeriod): Promise<any> {
        return this.insert(period);
    }

    @Post('{id}')
    @Security('jwt')
    public async _update(id: any, @Body() period: IPeriod): Promise<any> {
        return this.update(id, period);
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

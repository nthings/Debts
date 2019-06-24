import {Route, Get, Post, Body, Put} from 'tsoa';
import { PeopleModel, People } from '../models';
import BaseCtrl from './base';

@Route('/people')
export class CellarCtrl extends BaseCtrl {
    model = PeopleModel;

    @Get()
    public async _getAll(): Promise<any> {
        return this.getAll();
    }

    @Put()
    public async _insert(@Body() people: People): Promise<any> {
        return this.insert(people);
    }

    @Post('{id}')
    public async _update(id: any, @Body() people: People): Promise<any> {
        return this.update(id, people);
    }

    @Get('{id}')
    public async _get(id: any): Promise<any> {
        return this.get(id);
    }
}

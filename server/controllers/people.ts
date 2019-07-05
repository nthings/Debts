import {Route, Get, Post, Body, Put, Delete, Security} from 'tsoa';
import { People, IPeople } from '../models';
import BaseCtrl from './base';
import {hashPassword} from '../utils/login';

@Route('/people')
export class PeopleCtrl extends BaseCtrl<IPeople> {
    model = People;

    @Get()
    @Security('jwt')
    public async _getAll(): Promise<any> {
        return this.getAll();
    }

    @Put()
    @Security('jwt')
    public async _insert(@Body() people: IPeople): Promise<any> {
        people.password = hashPassword(people.password);
        return this.insert(people);
    }

    @Post('{id}')
    @Security('jwt')
    public async _update(id: any, @Body() people: IPeople): Promise<any> {
        if (people.password.length) {
            people.password = hashPassword(people.password);
        } else {
            delete people.password;
        }
        return this.update(id, people);
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

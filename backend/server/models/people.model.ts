import { Table, Column, Model } from 'sequelize-typescript';

export interface IPeople {
    name: string;
    color: string;
}

@Table
export class People extends Model<People> implements IPeople {
    @Column
    name: string;

    @Column
    color: string;

    @Column
    username?: string;

    @Column
    password?: string;
}

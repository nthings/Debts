import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class People extends Model<People> {
    @Column
    name: string;

    @Column
    color: string;
}

import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Debt } from './Debt.model';

export interface IPeople {
    name: string;
    color: string;
    email?: string;
    password?: string;
}

@Table({
    timestamps: true,
    tableName: 'people'
})
export class People extends Model<People> implements IPeople {
    @Column
    name: string;

    @Column
    color: string;

    @Column
    email?: string;

    @Column
    password?: string;

    @HasMany(() => Debt, 'ownerId')
    debts: Debt[];
}

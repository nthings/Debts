import { People } from './people.model';
import { Table, Column, Model, HasOne } from 'sequelize-typescript';
import { Period } from './period.model';

@Table
export class Debt extends Model<Debt> {
    @Column
    date: Date;

    @Column
    description: string;

    @Column
    custom_description: string;

    @Column
    amount: number;

    @HasOne(() => People)
    owner: People;

    @HasOne(() => Period)
    period: Period;
}

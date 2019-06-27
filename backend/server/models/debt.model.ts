import { People, IPeople } from './people.model';
import { Table, Column, Model, HasOne } from 'sequelize-typescript';
import { Period, IPeriod } from './period.model';

export interface IDebt {
    date: Date;
    description: string;
    custom_description: string;
    amount: number;
    owner: IPeople;
    period: IPeriod;
}

@Table
export class Debt extends Model<Debt> implements IDebt {
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

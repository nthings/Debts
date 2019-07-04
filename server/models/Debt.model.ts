import { People, IPeople } from './People.model';
import { Table, Column, Model, BelongsTo } from 'sequelize-typescript';
import { Period, IPeriod } from './Period.model';

export interface IDebt {
    date: Date;
    description: string;
    custom_description: string;
    amount: number;
    monthly_instalment: number;
    recurrent: boolean;
    payed: boolean;
    date_payed: Date;
    owner: IPeople;
    period: IPeriod;
}

@Table({
    timestamps: true,
    tableName: 'debts'
})
export class Debt extends Model<Debt> implements IDebt {
    @Column
    date: Date;

    @Column
    description: string;

    @Column
    custom_description: string;

    @Column
    amount: number;

    @Column
    monthly_instalment: number;

    @Column
    recurrent: boolean;

    @Column
    payed: boolean;

    @Column
    date_payed: Date;

    @BelongsTo(() => People, 'ownerId')
    owner: People;

    @BelongsTo(() => Period, 'periodId')
    period: Period;
}

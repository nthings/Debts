import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Debt } from './Debt.model';

export interface IPeriod {
    start_date: Date;
    end_date: Date;
    amount_no_interests: number;
}

@Table({
    timestamps: true,
    tableName: 'periods'
})
export class Period extends Model<Period> implements IPeriod {
    @Column
    start_date: Date;

    @Column
    end_date: Date;

    @Column
    amount_no_interests: number;

    @HasMany(() => Debt, 'periodId')
    debts?: Debt[];
}

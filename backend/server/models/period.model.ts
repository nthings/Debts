import { Table, Column, Model } from 'sequelize-typescript';

export interface IPeriod {
    date: Date;
    amount_no_interests: number;
}

@Table
export class Period extends Model<Period> implements IPeriod {
    @Column
    date: Date;

    @Column
    amount_no_interests: number;
}

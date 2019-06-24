import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Period extends Model<Period> {
    @Column
    date: Date;

    @Column
    amount_no_interests: number;
}

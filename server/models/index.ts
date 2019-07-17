import { Sequelize } from 'sequelize-typescript';
import { People } from './People.model';
import { Debt } from './Debt.model';
import { Period } from './Period.model';
import { hashPassword } from '../utils/login';

export * from './People.model';
export * from './Debt.model';
export * from './Period.model';

const host = process.env.MYSQL_HOST || 'localhost';
const port = +process.env.MYSQL_PORT || 4000;
const username = process.env.MYSQL_USERNAME || 'root';
const password = process.env.MYSQL_PASSWORD || '';

export const sequelize = new Sequelize({
    host,
    dialect: 'mysql',
    port,
    define: {
        paranoid: true
    },
    database: 'debts',
    username,
    password,
});

(async () => {
    sequelize.addModels([
        People,
        Debt,
        Period,
    ]);

    if (!process.env.MYSQL_HOST) {
        await sequelize.sync({force: true});
        const people = new People({
            name: 'Mauricio Martinez',
            color: '#000000',
            email: 'n_othing@hotmail.com',
            password: hashPassword('12345'),
        });
        const people_id = (await people.save()).id;

        const period = new Period({
            start_date: new Date(),
            end_date: new Date(),
            amount_no_interests: 10000,
        });
        const period_id = (await period.save()).id;

        const debt = new Debt({
            date: new Date(),
            description: 'test',
            amount: 10000,
            ownerId: people_id,
            periodId: period_id,
        });
        debt.save();
    } else {
        sequelize.sync();
    }

})();

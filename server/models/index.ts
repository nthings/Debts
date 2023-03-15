import { Sequelize } from 'sequelize-typescript';
import { People } from './People.model';
import { Debt } from './Debt.model';
import { Period } from './Period.model';
import { hashPassword } from '../utils/login';

export * from './People.model';
export * from './Debt.model';
export * from './Period.model';

const host = process.env.MYSQL_HOST || 'localhost';
const port = +process.env.MYSQL_PORT || 3306;
const username = process.env.MYSQL_USERNAME || 'user';
const password = process.env.MYSQL_PASSWORD || 'password';

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

    sequelize.sync();

    const adminUser = await People.findOne({
        where: {
            name: 'admin',
        },
    });

    if (!adminUser) {
        console.log('Creating admin user...')
        People.create({
            name: 'admin',
            color: '#000000',
            email: 'nthings.m@gmail.com',
            password: hashPassword(process.env.ADMIN_PASSWORD || 'admin'),
        });
    }
})();

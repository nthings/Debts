import { Sequelize } from 'sequelize-typescript';
import { People } from './People.model';
import { Debt } from './Debt.model';
import { Period } from './Period.model';

export * from './People.model';
export * from './Debt.model';
export * from './Period.model';

export const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    port: 4000,
    define: {
        paranoid: true
    },
    database: 'debts',
    username: 'root',
    password: '',
});

(async () => {
    console.log(await sequelize.databaseVersion());

    sequelize.addModels([
        People,
        Debt,
        Period,
    ]);

    sequelize.sync();
})();

import {Sequelize} from 'sequelize-typescript';

export * from './people.model';
export * from './debt.model';
export * from './period.model';

export const sequelize =  new Sequelize({
        database: 'debts',
        dialect: 'mysql',
        username: 'root',
        password: '',
        modelPaths: [__dirname + '/**/*.model.ts']
});

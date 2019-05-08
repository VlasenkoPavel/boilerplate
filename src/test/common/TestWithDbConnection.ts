// test
// import { getConnection, EntityManager } from 'typeorm';
// import { Class } from 'bin/testDb/types';
// import { TestDataLoader } from './TestDataLoader';
// import { redisClient } from '@components/redis';
// import { DbConnectorWithEntitiesLoading, Connector, IDbConnector } from '@components/db-connector';
// import { ConfigType, Config } from '@components/config';
// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// export abstract class TestWithDbConnection {
//     protected connector: IDbConnector;

//     protected async connect() {
//         this.connector = new DbConnectorWithEntitiesLoading(Connector.getInstance());
//         await this.connector.getConnection(<PostgresConnectionOptions>Config.getInstance().getConfig(ConfigType.Db));
//     }

//     protected async close() {
//         redisClient.disconnect();
//         await this.connector.closeConnection();
//     }

//     protected async end() {
//         await this.connector.closeConnection();
//     }

//     protected startTransaction() {
//         return getConnection().query('BEGIN;');
//     }

//     protected rollbackTransaction() {
//         return getConnection().query('ROLLBACK;');
//     }

//     protected setTableIncrement(tableName: string, value: number) {
//         return getConnection().query(`ALTER SEQUENCE ${tableName}_id_seq RESTART WITH ${value}`);
//     }

//     protected clearTableAndCount(tableName: string, seqName?: string) {
//         const seq = seqName || `${tableName}_id_seq`;

//         return getConnection().query(`DELETE FROM ${tableName}; ALTER SEQUENCE ${seq} RESTART WITH 1`);
//     }

//     protected async clearTable(tableName: string, manager?: EntityManager) {
//         return manager
//             ? manager.query(`DELETE FROM ${tableName};`)
//             : getConnection().query(`DELETE FROM ${tableName};`);
//     }

//     protected addData<T, P extends keyof T>(params: {
//         dbModelClass: Class<T>;
//         models: { [key: string]: T };
//         manager: EntityManager;
//         consistentlySortedBy?: P;
//     }) {
//         return new TestDataLoader().loadToDb(params);
//     }
// }

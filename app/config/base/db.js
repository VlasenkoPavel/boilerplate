module.exports = {
    type: "postgres",
    host: "127.0.0.1",
    logging: true,
    database: process.env.SM_DB_B_NAME || "test",
    username: process.env.SM_DB_USERNAME || "gorod",
    password: process.env.SM_DB_PASSWORD || "123qwe",
    migrations: ['./dist/main/infrastructure/migrations/*.js'],
    entities: ['./main/infrastructure/**/models/*.js']
};

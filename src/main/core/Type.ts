export const enum Environment {
    Development = 'dev',
    QA = 'qa',
    Test = 'test',
    Production = 'prod'
}

export const Type = {
    App: Symbol.for('App'),
    LoggerProvider: Symbol('LoggerProvider'),
    LoggerFactoryProvider: Symbol('Provider<LoggerFactory>'),
    ServerProvider: Symbol('Provider<ExpressServer>'),
    DbConfigProvider: Symbol.for('Provider<AppDbConfig>'),
    ServerConfigProvider: Symbol.for('Provider<ServerConfig>'),
    LogConfigProvider: Symbol.for('Provider<LogConfig>'),
    ConfigFactory: Symbol.for('ConfigFactory'),
    UserModel: Symbol.for('ObjectType<UserModel>'),
    IUserRepositoryFactory: Symbol.for('IRepositoryFactory<User, UserModel>'),
    IUserRepository: Symbol.for('IUserRepository'),
    ApplicationProvider: Symbol.for('ApplicationProvider'),
    Logger: Symbol.for('Logger'),
    ProvideConnector: Symbol.for('Provider<IConnector>'),
    UserRepositoryFactory: Symbol.for('IRepositoryFactory<User, UserModel>'),
    CreateAddUserCommand: Symbol.for('Factory<AddUserCommand>')
};

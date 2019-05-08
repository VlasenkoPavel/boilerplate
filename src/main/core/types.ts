export interface IRunable {
    run(): void | Promise<void>;
}

export interface IConnector {
    connect(): Promise<void>;
    closeConnection(): Promise<void> ;
}

export interface IRunnable {
    run(): void | Promise<void>;
}

export interface IConnector {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}

export interface Env {
    NODE_ENV: "production" | "development" | "test";
    API_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_PORT: number;
    DB_HOST: string;
    DB_DRIVER: string;
    DB_NAME: string;
    DB_DIALECT: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";
}

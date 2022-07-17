import * as mysql from 'mysql';
declare type SQL = string;
declare type SQLResult<T extends SQL> = string;
export declare class Pool {
    pool: mysql.Connection;
    constructor();
    query(query: SQL, params: Array<any>): Promise<Array<SQLResult<SQL>>>;
}
export {};

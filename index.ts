// import Parser for all databases
import { Parser }  from 'node-sql-parser/build/mysql';
import * as mysql from 'mysql'
const parser = new Parser();

type SQL = string;
type SQLResult<T extends SQL> = InstanceType<() => keyof parser.columnList(T)>

const queryTest:SQL = 'SELECT a1, a2 FROM select'

export class Pool {
    pool: mysql.Connection;
    constructor() {
        this.pool = mysql.createConnection({})
    }
    query(query: SQL, params: Array<any>): Promise<Array<SQLResult<SQL>>> {
        return new Promise((resolve, reject) => {
            this.pool.query(query, params, (error, results, fields) => {
                if(error) reject(error)
                resolve(results)
            })
        })
    }
}


const data = parser.columnList('SELECT id as ecartId, cod FROM client_orders', {
    database: 'mysql'
});

import { registerAs } from "@nestjs/config";
import * as path from 'path';
import { TypeormNamingStrategy } from "strategies/typeorm-naming.strategy";

export default registerAs('database', () => ({
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || 'nest_js',
    entities: [path.resolve(__dirname, '..', '**/*.entity.{js, ts}')],
    synchronize: process.env.DB_SYNCHRONIZE === 'true', // note: set it to false on production

    /**
     * @description MIGRATIONS CONFIGURATIONS
     * @see https://github.com/typeorm/typeorm/blob/master/docs/migrations.md
     * 
     * @summary
     * - migrationsRun          : Auto run migrations on every application launch
     * - migrationsTableName    : Table in the database which is going to contain information about executed migrations.
     * - migrations             : Migrations to be loaded and used for this connection
     * - cli.entitiesDir        : Directory where entities should be created by default by CLI.
     * - cli.migrationsDir      : Directory where migrations should be created by default by CLI.
     * - cli.subscribersDir     : Directory where subscribers should be created by default by CLI.
     * - namingStrategy         : Naming strategy to be used to name tables and columns in the database
     */
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true', // auto run migrations on every application launch
    migrationsTableName: "migrations",
    migrations: [path.resolve(__dirname, '..', 'migrations/**/*.{js, ts}')],
    cli: {
        // entitiesDir: 'entities',
        migrationDir: 'migrations',
        // subscribersDir: 'subscribers',
    },
    namingStrategy: new TypeormNamingStrategy(),

    /**
     * @description LOGGING CONFIGURATION
     * @see https://github.com/typeorm/typeorm/blob/master/docs/logging.md
     * 
     * @summary
     * logging options: "string" or [options1, option2, option3]
     * - "all"  : enable all logging
     * - query  : logs all queries.
     * - error  : logs all failed queries and errors.
     * - schema : logs the schema build process.
     * - warn   : logs internal orm warnings.
     * - info   : logs internal orm informative messages.
     * - log    : logs internal orm log messages.
     * 
     * logger options:
     * - advanced-console   : default logger which logs all messages into the console
     *                        using color and sql syntax highlighting
     * - simple-console     : exactly the same as the advanced logger, but it does not use any color highlighting
     * - file               : writes all logs into ormlogs.log in the root folder
     * - debug              : this logger uses debug package,
     *                        to turn on logging set your env variable DEBUG=typeorm:*
     *                        (note logging option has no effect on this logger).
     */
    logging: 'all',
    logger: 'advanced-console',
    maxQueryExecutionTime: 1000, // log queries that take too much time to execute
}))

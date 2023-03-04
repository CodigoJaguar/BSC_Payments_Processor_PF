"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.createDataSource = void 0;
const core_1 = require("@foal/core");
const typeorm_1 = require("typeorm");
function createDataSource() {
    const Source = new typeorm_1.DataSource({
        //type: Config.getOrThrow('database.type', 'string') as any,
        type: 'postgres',
        //url: Config.get('database.url', 'string'), 
        url: 'postgres://cankvfix:KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE@mahmud.db.elephantsql.com/cankvfix',
        //host: Config.get('database.host', 'string'),
        host: 'mahmud.db.elephantsql.com',
        //port: Config.get('database.port', 'number'),
        port: 5432,
        //username: Config.get('database.username', 'string'),
        username: 'cankvfix',
        //password: Config.get('database.password', 'string'),
        password: 'KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE',
        //database: Config.get('database.database', 'string'),
        database: 'cankvfix',
        dropSchema: core_1.Config.get('database.dropSchema', 'boolean', false),
        synchronize: core_1.Config.get('database.synchronize', 'boolean', false),
        entities: ['build/app/**/*.entity.js'],
        migrations: ['build/migrations/*.js'],
    });
    return Source;
}
exports.createDataSource = createDataSource;
exports.dataSource = createDataSource();
//# sourceMappingURL=db.js.map
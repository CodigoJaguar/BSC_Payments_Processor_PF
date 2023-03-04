"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.createDataSource = void 0;
const core_1 = require("@foal/core");
const typeorm_1 = require("typeorm");
function createDataSource() {
    const Source = new typeorm_1.DataSource({
        type: core_1.Config.getOrThrow('database.type', 'string'),
        //type: 'postgres',
        url: core_1.Config.get('database.url', 'string'),
        //url:'postgres://cankvfix:KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE@mahmud.db.elephantsql.com/cankvfix',
        host: core_1.Config.get('database.host', 'string'),
        //host: 'mahmud.db.elephantsql.com',
        port: core_1.Config.get('database.port', 'number'),
        //port : 5432,
        username: core_1.Config.get('database.username', 'string'),
        //username: 'cankvfix',
        password: core_1.Config.get('database.password', 'string'),
        //password: 'KB4cnm-mIFHfmYPFeyKtPXxq4NZ9J3EE',
        database: core_1.Config.get('database.database', 'string'),
        //database: 'cankvfix',
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
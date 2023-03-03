"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.createDataSource = void 0;
const core_1 = require("@foal/core");
const typeorm_1 = require("typeorm");
function createDataSource() {
    return new typeorm_1.DataSource({
        type: core_1.Config.getOrThrow('database.type', 'string'),
        url: core_1.Config.get('database.url', 'string'),
        host: core_1.Config.get('database.host', 'string'),
        port: core_1.Config.get('database.port', 'number'),
        username: core_1.Config.get('database.username', 'string'),
        password: core_1.Config.get('database.password', 'string'),
        database: core_1.Config.get('database.database', 'string'),
        dropSchema: core_1.Config.get('database.dropSchema', 'boolean', false),
        synchronize: core_1.Config.get('database.synchronize', 'boolean', false),
        entities: ['build/app/**/*.entity.js'],
        migrations: ['build/migrations/*.js'],
    });
}
exports.createDataSource = createDataSource;
exports.dataSource = createDataSource();
//# sourceMappingURL=db.js.map
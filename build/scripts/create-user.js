"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.schema = void 0;
// App
const entities_1 = require("../app/entities");
const db_1 = require("../db");
exports.schema = {
    additionalProperties: false,
    properties: {},
    required: [],
    type: 'object',
};
async function main() {
    await db_1.dataSource.initialize();
    try {
        const user = new entities_1.User();
        console.log(await user.save());
    }
    catch (error) {
        console.error(error.message);
    }
    finally {
        await db_1.dataSource.destroy();
    }
}
exports.main = main;
//# sourceMappingURL=create-user.js.map
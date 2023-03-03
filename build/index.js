"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
// 3p
const core_1 = require("@foal/core");
// App
const app_controller_1 = require("./app/app.controller");
const db_1 = require("./db");
async function main() {
    await db_1.dataSource.initialize();
    const app = await (0, core_1.createApp)(app_controller_1.AppController);
    const port = core_1.Config.get('port', 'number', 3001);
    app.listen(port, () => (0, core_1.displayServerURL)(port));
}
main()
    .catch(err => { console.error(err.stack); process.exit(1); });
//# sourceMappingURL=index.js.map


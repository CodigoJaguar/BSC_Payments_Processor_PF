"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const core_1 = require("@foal/core");
const controllers_1 = require("./controllers");
class AppController {
    constructor() {
        this.subControllers = [
            (0, core_1.controller)('/api', controllers_1.ApiController),
        ];
    }
}
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map
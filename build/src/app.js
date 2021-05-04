"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const database_1 = __importDefault(require("./config/database"));
const types_1 = __importDefault(require("./types"));
const images_services_1 = __importDefault(require("./services/images.services"));
require("./controllers/images.controller");
const container = new inversify_1.Container();
container.bind(types_1.default.ImageService).to(images_services_1.default);
const PORT = process.env.PORT || 8000;
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use(express_fileupload_1.default());
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: '/swagger.json',
    },
}));
const server = new inversify_express_utils_1.InversifyExpressServer(container, null, { rootPath: '/api' }, app);
const appConfigured = server.build();
typeorm_1.createConnection(database_1.default)
    .then((_connection) => {
    appConfigured.listen(PORT, () => {
        console.log('Server is running on port', PORT);
    });
})
    .catch((err) => {
    console.log('Unable to connect to db', err);
    process.exit(1);
});

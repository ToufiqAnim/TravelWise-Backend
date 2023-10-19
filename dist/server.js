"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const logger_1 = require("./shared/logger");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default
            .connect(config_1.default.database_url)
            .then(() => console.log('Database connceted successfully ✅'))
            .catch(err => console.log(`Unable to connect MongoDB ❌ ${err}`));
        const server = app_1.default.listen(config_1.default.port, () => {
            logger_1.logger.info(`Server running on port ${config_1.default.port}`);
        });
        const exitHandler = () => {
            if (server) {
                server.close(() => {
                    logger_1.logger.info('Server closed');
                });
            }
            process.exit(1);
        };
        const unexpectedErrorHandler = (error) => {
            logger_1.errorlogger.error(error);
            exitHandler();
        };
        process.on('uncaughtException', unexpectedErrorHandler);
        process.on('unhandledRejection', unexpectedErrorHandler);
        process.on('SIGTERM', () => {
            logger_1.logger.info('SIGTERM received');
            if (server) {
                server.close();
            }
        });
    });
}
bootstrap();

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducerService = void 0;
const common_1 = require("@nestjs/common");
const amqp_connection_manager_1 = require("amqp-connection-manager");
let ProducerService = class ProducerService {
    constructor() {
        const connection = amqp_connection_manager_1.default.connect(['amqp://localhost']);
        this.channelWrapper = connection.createChannel({
            setup: (channel) => {
                return channel.assertQueue('emailQueue', { durable: true });
            },
        });
    }
    async addToEmailQueue(mail) {
        try {
            await this.channelWrapper.sendToQueue('emailQueue', Buffer.from(JSON.stringify(mail)), {
                persistent: true,
            });
            common_1.Logger.log('Sent To Queue');
        }
        catch (error) {
            throw new common_1.HttpException('Error adding mail to queue', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProducerService = ProducerService;
exports.ProducerService = ProducerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ProducerService);
//# sourceMappingURL=producer.service.js.map
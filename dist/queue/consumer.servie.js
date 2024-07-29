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
var ConsumerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerService = void 0;
const common_1 = require("@nestjs/common");
const amqp_connection_manager_1 = require("amqp-connection-manager");
const email_service_1 = require("../email/email.service");
let ConsumerService = ConsumerService_1 = class ConsumerService {
    constructor(emailService) {
        this.emailService = emailService;
        this.logger = new common_1.Logger(ConsumerService_1.name);
        const connection = amqp_connection_manager_1.default.connect(['amqp://localhost']);
        this.channelWrapper = connection.createChannel();
    }
    async onModuleInit() {
        try {
            await this.channelWrapper.addSetup(async (channel) => {
                await channel.assertQueue('emailQueue', { durable: true });
                await channel.consume('emailQueue', async (message) => {
                    if (message) {
                        const content = JSON.parse(message.content.toString());
                        this.logger.log('Received message:', content);
                        await this.emailService.sendEmail(content);
                        channel.ack(message);
                    }
                });
            });
            this.logger.log('Consumer service started and listening for messages.');
        }
        catch (err) {
            this.logger.error('Error starting the consumer:', err);
        }
    }
};
exports.ConsumerService = ConsumerService;
exports.ConsumerService = ConsumerService = ConsumerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], ConsumerService);
//# sourceMappingURL=consumer.servie.js.map
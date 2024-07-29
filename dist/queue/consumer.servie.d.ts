import { OnModuleInit } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
export declare class ConsumerService implements OnModuleInit {
    private emailService;
    private channelWrapper;
    private readonly logger;
    constructor(emailService: EmailService);
    onModuleInit(): Promise<void>;
}

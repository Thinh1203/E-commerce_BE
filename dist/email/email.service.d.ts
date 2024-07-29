import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendEmail(options: {
        email: string;
        subject: string;
        html: string;
    }): Promise<SentMessageInfo>;
}

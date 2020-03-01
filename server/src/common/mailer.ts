import { createTransport } from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
    mail: Mail;
    constructor(
        private readonly configService: ConfigService,
    ) {
        const newTransport: SMTPTransport.Options = {
            host: this.configService.get<string>('mailer.host'),
            port: this.configService.get<number>('mailer.port'),
            secure: this.configService.get<boolean>('mailer.secure'),
            auth: {
                user: this.configService.get<string>('mailer.user'),
                pass: this.configService.get<string>('mailer.password'),
            },
        };

        const defaultsMailOpts: SMTPTransport.Options = {
            from: this.configService.get<string>('mailer.from'),
        };

        this.mail = createTransport(newTransport, defaultsMailOpts);
    }

}
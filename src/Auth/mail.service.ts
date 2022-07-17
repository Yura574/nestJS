import * as nodemailer from 'nodemailer'


export class MailService {
    // private transporter: any;
    constructor() {

        // @ts-ignore
        this.transporter = nodemailer.createTransport({
            
        })
    }
}
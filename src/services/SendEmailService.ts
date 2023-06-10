import transporter from '../connections/email_connections';

export class SendEmailServices {
	async sendEmail(message: object) {
		await transporter.sendMail(message);
	}
}

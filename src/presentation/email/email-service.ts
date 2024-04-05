// Archivo que construye el envio de emails

// ! Paquetes de terceros
import nodemailer from "nodemailer";

// ? Paquetes propios
import { envs } from "../../config/plugins/envs-plugin";
// import { LogRepository } from '../../domain/repository/log-repository';
// import { LogEntity, logSeverityLevel } from "../../domain/entities/logs.entity";

// Interfaz con el tipo de archivo a enviar
export interface Attachment {
	filename: string;
	path: string;
}

// Interfaz con los datos que necesitamos para enviar un email
export interface SendMailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachments?: Attachment[],
}

// Clase principal que crea el objeto para enviar un email
export class EmailService {

	// Constante que crea nodemailer para enviar correo
	private transporter = nodemailer.createTransport({
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.MAILER_EMAIL,
			pass: envs.MAILER_SECRET_KEY
		}
	});

	constructor(){}

	// Funcion que envia un email usando nodemailer
	async sendEmail( options: SendMailOptions ): Promise< boolean >{

		// const origin = "email-service.ts";

		const { to, subject, htmlBody, attachments = [] } = options;

		try {

			const sentInformation = await this.transporter.sendMail({
				to: to,
				subject: subject,
				html: htmlBody,
				attachments: attachments,
			});

			sentInformation;

			// const log = new LogEntity({
			// 	level: logSeverityLevel.low,
			// 	message: "Email enviado correctamente",
			// 	origin: origin
			// });
			
			return true;

		} catch (error) {
		
			// const log = new LogEntity({
			// 	level: logSeverityLevel.high,
			// 	message: `Error al enviar el email ${ error }`,
			// 	origin: origin
			// });

			return false;
		}
	}

	async sendEmailWithFileSystemLogs( to: string | string[] ) {

		const subject = "Logs del Servidor";
		const htmlBody = `<h1>Logs del servidor</h1>`;

		const attachments: Attachment[] = [
			{ filename: "logs-all-log", path: "./logs/logs-all.log" },
			{ filename: "logs-high-log", path: "./logs/logs-high.log" },
			{ filename: "logs-medium-log", path: "./logs/logs-medium.log" },
		];

		return this.sendEmail({ to, subject, htmlBody, attachments });
	}
}
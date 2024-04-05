// Archivo que envia emails de los logs a los destinatarios

// ? Paquetes propios
import { EmailService } from '../../../presentation/email/email-service';
import { LogEntity, logSeverityLevel } from '../../entities/logs.entity';
import { LogRepository } from '../../repository/log-repository';

// Interfaz con la funcion prototipo de envio de emails
interface SendLogEmailUseCase {
	execute: ( to: string | string[] ) => Promise< boolean >;
}

// Clase principal que envia los emails
export class SendEmailLogs implements SendLogEmailUseCase {

	// Constructor con la inyeccion de dependencias del emailService y del
	// Log repository
	constructor(
		private readonly emailService: EmailService,
		private readonly logRepository: LogRepository,
	){}
	
	// Metodo que ejecuta el metodo para enviar un mail
	async execute( to: string | string[] ) {

		const origin = "send-email-logs-service.ts";
		
		try {
			
			const sent = await this.emailService.sendEmailWithFileSystemLogs( to );

			if ( !sent ) throw new Error( "Email no se pudo enviar" );

			const log = new LogEntity({
				message: `Email enviado exitosamente`,
				level: logSeverityLevel.low,
				origin: origin
			});
			
			this.logRepository.saveLog( log );

			return true;

		} catch (error) {

			const log = new LogEntity({
				message: `${ error }`,
				level: logSeverityLevel.high,
				origin: origin
			});
			
			this.logRepository.saveLog( log );

			return false;
		}
	}
}
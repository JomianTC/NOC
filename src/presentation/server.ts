// Archivo que administra la aplicacion

// ? Paquetes de propios

// * Paquetes de Cron
// import { CronService } from "./cron/cron-service";

// * Paquetes de Entidades
// import { logSeverityLevel } from "../domain/entities/logs.entity";

// * Paquetes de Use Cases
// import { CheckService } from "../domain/use-cases/checks/check-service";
// import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

// * Paquetes patron repositorio
// import { logRepositoryImpl } from "../infrastructure/repositories/log-repository-impl";

// * Paquetes de Datasource
// import { FileSystemDatasource } from "../infrastructure/datasources/file-system-datasource";
// import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log-datasource";
// import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log-datasource";

// * Paquetes de NodeMailer
// import { EmailService } from "./email/email-service";
// import { SendEmailLogs } from "../	domain/use-cases/email/send-email-logs-service";

// const fsLogRepository = new logRepositoryImpl( 
// 	new FileSystemDatasource(),
// );

// const mongoLogRepository = new logRepositoryImpl( 
// 	new MongoLogDatasource(),
// );

// const postgresLogRepository = new logRepositoryImpl( 
// 	new PostgresLogDatasource(),
// );

// const emailService = new EmailService();
		
// Clase que administra nuestra aplicacion
export class Server {

	public static async start() {

		console.log( "Servidor Iniciado..." );

		// * Codigo para enviar un email con nodeMailer y FileSystem
		// new SendEmailLogs( emailService, fsLogRepository )
		// .execute( "jomiantoca2011@gmail.com" );

		// * Codigo para enviar un email con nodeMailer y Mongo
		// new SendEmailLogs( emailService, mongoLogRepository )
		// .execute( "jomiantoca2011@gmail.com" );
		
		// * Codigo para enviar un email con nodeMailer y Postgres
		// new SendEmailLogs( emailService, postgresLogRepository )
		// .execute( "jomiantoca2011@gmail.com" );
		
		// emailService.sendEmailWithFileSystemLogs(
		// 	"jomiantoca2011@gmail.com"
		// );

		// * Mostrar Logs de FileSystem
		// const logs = await fsLogRepository.getLogs( logSeverityLevel.low );

		// * Mostrar Logs de Mongo
		// const logs = await mongoLogRepository.getLogs( logSeverityLevel.low );
		
		// * Mostrar Logs de Postgres
		// const logs = await postgresLogRepository.getLogs( logSeverityLevel.low );
		
		// console.log( logs );		

		// * Codigo del Cron para verificar un unico Servicio
		// CronService.createJob(
		// 	"*/3 * * * * *",
		// 	() => {

		// 		const url = "http://localhost:3000/posts";

		// 		new CheckService(
		// 			fsLogRepository,
		// 			() => console.log( `${ url } is OK` ),
		// 			( error ) => console.log( error )					
		// 		).execute( url );
		// 	}
		// );

		// * Codigo del Cron para verificar multiples Servicios
		// CronService.createJob(
		// 	"*/3 * * * * *",
		// 	() => {

		// 		const url = "http://localhost:3000/posts";

		// 		new CheckServiceMultiple(
		// 			[ fsLogRepository, mongoLogRepository, postgresLogRepository ],
		// 			() => console.log( `${ url } is OK` ),
		// 			( error ) => console.log( error )					
		// 		).execute( url );
		// 	}
		// );
	}
}
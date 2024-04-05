// Archivo con la logica del repositorio para los logs

// ? Paquetes propios
import { LogEntity, logSeverityLevel } from "../../domain/entities/logs.entity";
import { LogRepository } from "../../domain/repository/log-repository";
import { LogDatasource } from '../../domain/datasources/log-datasource';

// Clase que implementa la logica del repositorio para logs
export class logRepositoryImpl implements LogRepository {

	// Constructor que recibe nuestro datasource, puede ser cualquier datasource
	constructor(
		private readonly logDatasource: LogDatasource,
	){}

	async saveLog( log: LogEntity ): Promise< void > {
		return this.logDatasource.saveLog( log );
	}

	async getLogs( severityLevel: logSeverityLevel ): Promise< LogEntity[] > {
		return this.logDatasource.getLogs( severityLevel );
	}

}
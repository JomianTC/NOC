// Archivo con la implementacion del repository de los logs

// ? Paquetes Propios
import { LogEntity, logSeverityLevel } from '../entities/logs.entity';

// Si quieren implementar los logs lo deben hacer de esta manera
export abstract class LogRepository {
	abstract saveLog( log: LogEntity ): Promise< void >;
	abstract getLogs( severityLevel: logSeverityLevel ): Promise< LogEntity[] >;
}
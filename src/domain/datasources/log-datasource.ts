// Archivo con la implementacion del datasource de los logs

// ? Paquetes Propios
import { LogEntity, logSeverityLevel } from '../entities/logs.entity';

// Los repositorios que quieran implementar los logs lo deben hacer de esta manera
export abstract class LogDatasource {
	abstract saveLog( log: LogEntity ): Promise< void >;
	abstract getLogs( severityLevel: logSeverityLevel ): Promise< LogEntity[] >;
}
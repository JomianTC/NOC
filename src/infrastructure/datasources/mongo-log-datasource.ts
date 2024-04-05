// Archivo con la logica del Datasource

// ? Paquetes propios
import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log-datasource";
import { LogEntity, logSeverityLevel } from "../../domain/entities/logs.entity";

// Clase con la logica para leer y guardar los logs en Mongo
export class MongoLogDatasource implements LogDatasource {

	// Metodo que guarda un log en la BD
	async saveLog( log: LogEntity ): Promise< void > {

		const newLog = await LogModel.create( log );
		console.log( "Mongo Log Creado", newLog.id );		
	}

	// Metodo que lee los logs por serveridad de Mongo
	async getLogs( severityLevel: logSeverityLevel ): Promise< LogEntity[] > {

		const logs = await LogModel.find({
			level: severityLevel,
		});

		return logs.map( LogEntity.fromObject );
	}
}
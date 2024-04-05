// Archivo con la logica del Datasource para PostgreSQL

// ? Paquetes propios
import { LogDatasource } from "../../domain/datasources/log-datasource";
import { LogEntity, logSeverityLevel } from "../../domain/entities/logs.entity";
import { PrismaClient, SeverityLevel } from '@prisma/client';

// Constante que se encarga de la conexion de Postgres con Prisma
const prismaClient = new PrismaClient()

// Creamos la constante para asignar niveles de severidad entre la App y Prisma
const severityEnum = {
	low: SeverityLevel.LOW,
	medium: SeverityLevel.MEDIUM,
	high: SeverityLevel.HIGH,
};

// Clase con la logica para leer y guardar los logs en Postgres
export class PostgresLogDatasource implements LogDatasource {

	// Metodo que guarda un log en la BD
	async saveLog( log: LogEntity ): Promise< void > {

		const level = severityEnum[ log.level ];

		const newLog = await prismaClient.logModel.create({
			data: {
				...log,
				level: level,
			}
		});
		
		console.log( "Postgres Log Creado", newLog.id );		
	}

	// Metodo que lee los logs por serveridad de Postgres
	async getLogs( severityLevel: logSeverityLevel ): Promise< LogEntity[] > {

		const level = severityEnum[ severityLevel ];

		const logs = await prismaClient.logModel.findMany({
			where: {
				level: level
			}
		});

		return logs.map( LogEntity.fromObject );
	}
}

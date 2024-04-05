// Archivo con la logica del datasource para el filesystem

import fs, { readFileSync } from "node:fs";

// ? Paquetes propios
import { LogDatasource } from "../../domain/datasources/log-datasource";
import { LogEntity, logSeverityLevel } from "../../domain/entities/logs.entity";

export class FileSystemDatasource implements LogDatasource {

	private readonly logPath = "logs/"
	private readonly allLogsPath 	= "logs/logs-all.log"
	private readonly mediumLogsPath = "logs/logs-medium.log"
	private readonly highLogsPath 	= "logs/logs-high.log"

	constructor(){
		this.createLogsFiles();
	}

	private createLogsFiles = () => {

		if ( !fs.existsSync( this.logPath ) )
			fs.mkdirSync( this.logPath )

		const filePaths = [
			this.allLogsPath,
			this.mediumLogsPath,
			this.highLogsPath,
		]
		
		filePaths.forEach( path => {

			if ( fs.existsSync( path ) ) return;
			fs.writeFileSync( path, "" );
		});
	}

	async saveLog( newlog: LogEntity ): Promise< void > {

		const logAsJson = `${ JSON.stringify( newlog )}\n`;
		
		fs.appendFileSync( this.allLogsPath, logAsJson );

		if ( newlog.level === logSeverityLevel.low ) return;

		if ( newlog.level === logSeverityLevel.medium ) 
			fs.appendFileSync( this.mediumLogsPath, logAsJson );
		else 
			fs.appendFileSync( this.highLogsPath, logAsJson );

	}

	private getLogsFromFile = ( path: string ): LogEntity[] => {

		const content = readFileSync( path, { encoding: "utf-8" } );
		
		if ( content === "" ) return [];
		
		const logs = content.split( "\n" ).map( log => LogEntity.fromJson( log ) );
	
		// * Version alternativa menos legible pero funcinal
		// const stringLogs = content.split( "\n" ).map( LogEntity.fromJson );
	
		return logs;
	}
	
	async getLogs( severityLevel: logSeverityLevel ): Promise< LogEntity[] > {
		
		switch ( severityLevel ) {

			case logSeverityLevel.low:
			return this.getLogsFromFile( this.allLogsPath );
			
			case logSeverityLevel.medium:
				return this.getLogsFromFile( this.mediumLogsPath );
				
			case logSeverityLevel.high:
				return this.getLogsFromFile( this.highLogsPath );
		
			default: throw new Error( `${ severityLevel } no implementado` );
		}
	}
}
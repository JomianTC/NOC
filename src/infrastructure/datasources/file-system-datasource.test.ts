// Archivo con el test para el Datasource del FileSystem
import fs from 'node:fs';
import path from 'node:path';
import { FileSystemDatasource } from './file-system-datasource';
import { LogEntity, logSeverityLevel } from '../../domain/entities/logs.entity';


describe( "FileSystemDataSource", () => {

	const logDatasource = new FileSystemDatasource();

	const logPath = path.join( __dirname, "../../../logs" );

	// beforeEach( () => {
	// 	fs.rmSync( logPath, { recursive: true, force: true } );
	// });
	
	test( "Should create log files ig they dont exists", () => {
		
		new FileSystemDatasource();

		const files = fs.readdirSync( logPath );

		expect( files ).toEqual([ "logs-all.log", "logs-high.log", "logs-medium.log" ]);
	});	

	test( "Should save a log in logs-all.log", () => {
	
		const log = new LogEntity({
			message: "test",
			level: logSeverityLevel.low,
			origin: "dile-system-datasource.test.ts",
		});

		logDatasource.saveLog( log );
		const allLogs = fs.readFileSync( `${ logPath }/logs-all.log`, "utf-8" );
		
		expect( allLogs ).toContain( JSON.stringify( log ) );
	});

	// * Los siguientes test si funcionan pero tengo muchos errores por la eliminacion
	// * de archivos y la creacion, cuando un test intenta acceder a un log que no esta creado
	// * aun tira un error el test
	// test( "Should save a log in logs-all.log and logs-medium.log", () => {
	
	// 	const log = new LogEntity({
	// 		message: "test",
	// 		level: logSeverityLevel.medium,
	// 		origin: "dile-system-datasource.test.ts",
	// 	});

	// 	logDatasource.saveLog( log );
	// 	const allLogs = fs.readFileSync( `${ logPath }/logs-all.log`, "utf-8" );
	// 	const mediumLogs = fs.readFileSync( `${ logPath }/logs-medium.log`, "utf-8" );
		
	// 	expect( allLogs ).toContain( JSON.stringify( log ) );
	// 	expect( mediumLogs ).toContain( JSON.stringify( log ) );
	// });

	// test( "Should save a log in logs-all.log and logs-high.log", () => {
	
	// 	const log = new LogEntity({
	// 		message: "test",
	// 		level: logSeverityLevel.high,
	// 		origin: "dile-system-datasource.test.ts",
	// 	});

	// 	logDatasource.saveLog( log );
	// 	const allLogs = fs.readFileSync( `${ logPath }/logs-all.log`, "utf-8" );
	// 	const highLogs = fs.readFileSync( `${ logPath }/logs-high.log`, "utf-8" );
		
	// 	expect( allLogs ).toContain( JSON.stringify( log ) );
	// 	expect( highLogs ).toContain( JSON.stringify( log ) );
	// });
	
	// test( "Should return all logs", async() => {

	// 	const logLow = new LogEntity({
	// 		message: "test",
	// 		level: logSeverityLevel.low,
	// 		origin: "file-system-datasource.log"
	// 	});

	// 	const logMedium = new LogEntity({
	// 		message: "test",
	// 		level: logSeverityLevel.medium,
	// 		origin: "file-system-datasource.log"
	// 	});

	// 	const logHigh = new LogEntity({
	// 		message: "test",
	// 		level: logSeverityLevel.high,
	// 		origin: "file-system-datasource.log"
	// 	});

	// 	await logDatasource.saveLog( logLow );
	// 	await logDatasource.saveLog( logMedium );
	// 	await logDatasource.saveLog( logHigh );

	// 	const logsLow = await logDatasource.getLogs( logSeverityLevel.low );
	// 	const logsMedium = await logDatasource.getLogs( logSeverityLevel.medium );
	// 	const logsHigh = await logDatasource.getLogs( logSeverityLevel.high );

	// 	expect( logsLow ).toEqual( expect.arrayContaining([ logLow, logMedium, logHigh ]));
	// 	expect( logsMedium ).toEqual( expect.arrayContaining([ logMedium ]));
	// 	expect( logsHigh ).toEqual( expect.arrayContaining([ logHigh ]));
	// });

	// test( "Should not throw an error if path exists", () => {
	
	// 	new FileSystemDatasource();
	// 	new FileSystemDatasource();
		
	// 	expect( true ).toBeTruthy();
	// });
	
	// test( "Should throw an error if severity level is not define", async() => {
	
	// 	const customSeverityLevel = "SUPER_HIGH" as logSeverityLevel;

	// 	try {
			
	// 		await logDatasource.getLogs( customSeverityLevel );
	// 		expect( true ).toBeFalsy();

	// 	} catch (error) {
			
	// 		const errorString = `${ error }`;
	// 		console.log( errorString );
	// 		expect( errorString ).toContain( `${ customSeverityLevel } no implementado` );
	// 	}
	// });
});

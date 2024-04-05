// Archivo para el test del datasource de Mongo
import { MongoDatabase } from '../../data/mongo/init';
import { envs } from '../../config/plugins/envs-plugin';
import mongoose from 'mongoose';
import { MongoLogDatasource } from './mongo-log-datasource';
import { LogEntity, logSeverityLevel } from '../../domain/entities/logs.entity';
import { LogModel } from '../../data/mongo';

describe( "Mongo Log Datasource", () => {
	
	const logDataSource = new MongoLogDatasource();

	const log = new LogEntity({
		level: logSeverityLevel.low,
		message: "test message",
		origin: "mongo-log-datasource.test.ts"
	});

	beforeAll( async() => {
		await MongoDatabase.connect({
			dbName: envs.MONGO_DB_NAME,
			mongoUrl: envs.MONGO_URL,
		})
	});

	afterEach( async() => {
		await LogModel.deleteMany();
	});
	
	afterAll( () => {
		mongoose.connection.close();
	});

	test( "Should create a log", async() => {

		const logSpy = jest.spyOn( console, "log" );

		await logDataSource.saveLog( log );

		expect( logSpy ).toHaveBeenCalled();
		expect( logSpy ).toHaveBeenCalledWith( "Mongo Log Creado", expect.any( String ) );
	});

	test( "Should get logs", async() => {
	
		await logDataSource.saveLog( log );
		const logs = await logDataSource.getLogs( logSeverityLevel.low );
		
		expect( logs.length ).toBe( 1 );
		expect( logs[0].level ).toBe( logSeverityLevel.low );
	});	
});

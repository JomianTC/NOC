// Archivo de pruebas para las clases abstractas del DataSource
import { LogEntity, logSeverityLevel } from '../entities/logs.entity';
import { LogDatasource } from './log-datasource';

describe( "log-datasource-ts LogDataSource", () => {
	
	const newLog = new LogEntity({
		origin: "log-datasource.test.ts",
		message: "test-message",
		level: logSeverityLevel.low
	});

	class MockLogDatasource implements LogDatasource {
		async saveLog( _log: LogEntity ): Promise<void> { return; }
		async getLogs( _severityLevel: logSeverityLevel ): Promise<LogEntity[]> { return [ newLog ]; }
	}

	test("Should test the abstract class", async() => {

		// * 1. Arrage
		const mockLogDatasource = new MockLogDatasource();
	
		// * 3. Assert
		expect( mockLogDatasource ).toBeInstanceOf( MockLogDatasource );

		expect( mockLogDatasource ).toBeInstanceOf( MockLogDatasource );
		expect( typeof mockLogDatasource.saveLog ).toBe( "function" );
		expect( typeof mockLogDatasource.getLogs ).toBe( "function" );

	
		// * 2. Act	
		await mockLogDatasource.saveLog( newLog );
		const logs = await mockLogDatasource.getLogs( logSeverityLevel.low );
		
		// * 3. Assert
		expect( logs ).toHaveLength( 1 );
		expect( logs[0] ).toBeInstanceOf( LogEntity );
		
	});
});
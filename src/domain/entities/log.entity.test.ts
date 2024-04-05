// Archivo de pruebas para la entidad de Log
import { LogEntity, logSeverityLevel } from './logs.entity';

describe( "LogEntity", () => {
	
	const dataObj = {
		message: "Hola Mundo",
		level: logSeverityLevel.low,
		origin: "log.entity.test.ts"
	}

	test("Should create a LogEntity instance", () => {

		// * 1. Arrage
		const log = new LogEntity( dataObj );

		// * 2. Act	
		
		// * 3. Assert
		expect( log ).toBeInstanceOf( LogEntity );
		expect( log.message ).toBe( dataObj.message );
		expect( log.level ).toBe( dataObj.level );
		expect( log.origin ).toBe( dataObj.origin );
		expect( log.createdAt ).toBeInstanceOf( Date );
	});

	test( "Should create a LogEntity instance from json", () => {

		const json = `{"message":"http://localhost:3000/posts is not OK, TypeError: fetch failed","level":"high","createdAt":"2023-10-29T03:33:12.036Z","origin":"check-service.ts"}`;
		const log = LogEntity.fromJson( json );

		expect( log ).toBeInstanceOf( LogEntity );
		expect( log.message ).toBe( "http://localhost:3000/posts is not OK, TypeError: fetch failed" );
		expect( log.level ).toBe( logSeverityLevel.high );
		expect( log.origin ).toBe( "check-service.ts" );
		expect( log.createdAt ).toBeInstanceOf( Date );
	});

	test( "Should create a LogEntity instance from Object", () => {

		const log = LogEntity.fromObject( dataObj );

		expect( log ).toBeInstanceOf( LogEntity );
		expect( log.message ).toBe( dataObj.message );
		expect( log.level ).toBe( dataObj.level );
		expect( log.origin ).toBe( dataObj.origin );
		expect( log.createdAt ).toBeInstanceOf( Date );
	});
});
// Archivo con los test para la implementacion del repositorio
import { LogEntity, logSeverityLevel } from '../../domain/entities/logs.entity';
import { logRepositoryImpl } from './log-repository-impl';

describe( "LogrepositoryImpl", () => {

	const mockLogDataSource = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	}

	const logRepository = new logRepositoryImpl( mockLogDataSource );

	beforeEach( () => {
		jest.clearAllMocks();
	});
	

	test( "SaveLog should call the dtasoure with arguments", async() => {
	
		const log = { level: "", message: "", origin: "" } as LogEntity;
		await logRepository.saveLog( log );

		expect( mockLogDataSource.saveLog ).toHaveBeenCalledWith( log );
	});

	test( "getLogs should call the dtasource with arguments", async() => {
	
		await logRepository.getLogs( logSeverityLevel.low );

		expect( mockLogDataSource.getLogs ).toHaveBeenCalledWith( logSeverityLevel.low );
	});
});

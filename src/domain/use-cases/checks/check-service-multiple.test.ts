// Archivo de testing para el Check del servicio para multiples repositorios
import { LogEntity } from '../../entities/logs.entity';
import { CheckServiceMultiple } from './check-service-multiple';

describe( "CheckServiceMultiple UseCase", () => {

	const mockRepositoryA = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	}

	const mockRepositoryB = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	}

	const mockRepositoryC = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	}

	const successCallback = jest.fn();
	const errorCallback = jest.fn();

	const checkService = new CheckServiceMultiple(
		[ mockRepositoryA, mockRepositoryB, mockRepositoryC ],
		successCallback,
		errorCallback
	);

	beforeEach( () => { jest.clearAllMocks(); });

	test( "Should call successCallback when fetch return true", async() => {
		
		const wasOK = await checkService.execute( "https://google.com" );

		expect( wasOK ).toBeTruthy();

		expect( successCallback ).toHaveBeenCalled();
		expect( errorCallback ).not.toHaveBeenCalled();
	
		expect( mockRepositoryA.saveLog ).toBeCalledWith( expect.any( LogEntity ) );
		expect( mockRepositoryB.saveLog ).toBeCalledWith( expect.any( LogEntity ) );
		expect( mockRepositoryC.saveLog ).toBeCalledWith( expect.any( LogEntity ) );
	});

	test( "Should call errorCallback when fetch return false", async() => {
		
		const wasOK = await checkService.execute( "https://qwerrtyggdfbv.com" );

		expect( wasOK ).toBeFalsy();

		expect( successCallback ).not.toHaveBeenCalled();
		expect( errorCallback ).toHaveBeenCalled();
	
		expect( mockRepositoryA.saveLog ).toBeCalledWith( expect.any( LogEntity ) );
		expect( mockRepositoryB.saveLog ).toBeCalledWith( expect.any( LogEntity ) );
		expect( mockRepositoryC.saveLog ).toBeCalledWith( expect.any( LogEntity ) );
	});
});

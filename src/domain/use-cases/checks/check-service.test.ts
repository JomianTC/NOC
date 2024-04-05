// Archivo de testing para el Check del servicio 
import { LogEntity } from '../../entities/logs.entity';
import { CheckService } from './check-service';

describe( "CheckService UseCase", () => {

	const mockRepository = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	}

	const successCallback = jest.fn();
	const errorCallback = jest.fn();

	const checkService = new CheckService(
		mockRepository,
		successCallback,
		errorCallback
	);

	beforeEach( () => { jest.clearAllMocks(); });

	test( "Should call successCallback when fetch return true", async() => {
		
		const wasOK = await checkService.execute( "https://google.com" );

		expect( wasOK ).toBeTruthy();

		expect( successCallback ).toHaveBeenCalled();
		expect( errorCallback ).not.toHaveBeenCalled();
	
		expect( mockRepository.saveLog ).toBeCalledWith(
			expect.any( LogEntity )
		);
	});

	test( "Should call errorCallback when fetch return false", async() => {
		
		const wasOK = await checkService.execute( "https://qwerrtyggdfbv.com" );

		expect( wasOK ).toBeFalsy();

		expect( successCallback ).not.toHaveBeenCalled();
		expect( errorCallback ).toHaveBeenCalled();
	
		expect( mockRepository.saveLog ).toBeCalledWith(
			expect.any( LogEntity )
		);
	});
});

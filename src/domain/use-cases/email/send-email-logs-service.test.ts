// Archivo de test para el envio de emails
import { LogEntity } from '../../entities/logs.entity';
import { LogRepository } from '../../repository/log-repository';
import { SendEmailLogs } from './send-email-logs-service';

describe( "SendEmailLogs", () => {

	const mockEmailService = {
		sendEmailWithFileSystemLogs: jest.fn().mockReturnValue( true ),
	}

	const mockLogRepository: LogRepository = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	}

	const sendEmailLogs = new SendEmailLogs(
		mockEmailService as any,
		mockLogRepository
	);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test( "Should call sendEmail and saveLog", async() => {

		const result = await sendEmailLogs.execute( "jomiantoca-2011@gmail.com" )
		
		expect( result ).toBeTruthy();
		expect( mockEmailService.sendEmailWithFileSystemLogs ).toBeCalledTimes( 1 );
		expect( mockLogRepository.saveLog ).toBeCalledWith( expect.any( LogEntity ) );
		expect( mockLogRepository.saveLog ).toBeCalledWith({
			createdAt: expect.any( Date ),
			level: "low",
			message: "Email enviado exitosamente",
			origin: "send-email-logs-service.ts",
		});
	});	

	test( "Should Log in case of error", async() => {

		mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue( false );

		const result = await sendEmailLogs.execute( "jomiantoca-2011@gmail.com" )
		
		expect( result ).toBeFalsy();
		expect( mockEmailService.sendEmailWithFileSystemLogs ).toBeCalledTimes( 1 );
		expect( mockLogRepository.saveLog ).toBeCalledWith( expect.any( LogEntity ) );
		expect( mockLogRepository.saveLog ).toBeCalledWith({
			createdAt: expect.any( Date ),
			level: "high",
			message: "Error: Email no se pudo enviar",
			origin: "send-email-logs-service.ts",
		});
	});	
});

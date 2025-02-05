import { CronService } from './cron-service';
// Archivo para hacer test del paquete de Cron

describe( "CronService", () => {

	const mockTick = jest.fn();

	test( "Should create a job", ( done ) => {
	
		const job = CronService.createJob( "* * * * * *", mockTick );

		setTimeout(() => {
			
			expect( mockTick ).toHaveBeenCalledTimes( 2 );
			job.stop();
			done();
		}, 2000);
	});
});

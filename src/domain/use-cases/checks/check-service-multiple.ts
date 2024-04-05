// Archivo del caso de uso de comprobar servicio de Fetch

// ? Paquetes propios
import { LogEntity, logSeverityLevel } from "../../entities/logs.entity";
import { LogRepository } from "../../repository/log-repository";

// Interfaz que implementa el metodo que tendra el caso de uso
interface CheckServiceMultipleUseCase {
	execute( url: string ): Promise<boolean>;
}

// Tipos para manejar los callbacks de Exito y de Error
type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

// Clase con la logica de ejecucion del caso de uso
export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

	// * CASO DE USO <- REPOSITORIO <- DATASOURCE * //

	// Constructor de la aplicacion
	constructor(
		private readonly logRepository: LogRepository[],
		private readonly successCallback: SuccessCallback,
		private readonly errorCallback: ErrorCallback
	){}

	// Metodo que se envarga de guardar los logs en cada uno de los datasource
	private callLogs( log: LogEntity ){

		this.logRepository.forEach( logRepository => {
			logRepository.saveLog( log )
		});
	}

	// Metodo que inicializa ejecuta el caso de uso
	async execute( url: string ): Promise<boolean> {

		const origin = "check-service.ts"

		try {
		
			const req = await fetch( url );

			if ( !req.ok ) 
				throw new Error( `Error en CheckService ${ url }` );

			const log = new LogEntity({
				message: `Service ${ url } funcionando`, 
				level: logSeverityLevel.low, 
				origin: origin
			});
			
			this.callLogs( log );
			this.successCallback && this.successCallback();
			
			return true;
		} catch ( error ) { 
			
			const errorMessage = `${ url } is not OK, ${ error }`
			const log = new LogEntity({
				message: errorMessage, 
				level: logSeverityLevel.high,
				origin: origin
			});
			
			this.callLogs( log );
			this.errorCallback && this.errorCallback( errorMessage ); 
			
			return false; 
		}
	}
}
// Archivo del caso de uso de comprobar servicio de Fetch

// ? Paquetes propios
import { LogEntity, logSeverityLevel } from "../../entities/logs.entity";
import { LogRepository } from "../../repository/log-repository";

// Interfaz que implementa el metodo que tendra el caso de uso
interface CheckServiceUseCase {
	execute( url: string ): Promise<boolean>;
}

// Tipos para manejar los callbacks de Exito y de Error
type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

// Clase con la logica de ejecucion del caso de uso
export class CheckService implements CheckServiceUseCase {

	// * CASO DE USO <- REPOSITORIO <- DATASOURCE * //

	// Constructor de la aplicacion
	constructor(
		private readonly logRepository: LogRepository,
		private readonly successCallback: SuccessCallback,
		private readonly errorCallback: ErrorCallback
	){}

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
			
			this.logRepository.saveLog( log );
			
			// * Opcion alternativa si no queremos hacer un if verificando la existencia
			// * de la funcion de succesCallback
			this.successCallback && this.successCallback();
			
			return true;
		} catch ( error ) { 
			
			const errorMessage = `${ url } is not OK, ${ error }`
			const log = new LogEntity({
				message: errorMessage, 
				level: logSeverityLevel.high,
				origin: origin
			});
			
			this.logRepository.saveLog( log );
			
			// * Lo mismo que succesCallback
			this.errorCallback && this.errorCallback( errorMessage ); 
			
			return false; 
		}
	}
}
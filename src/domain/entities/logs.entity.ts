// Archivo para la entidad de nuestra aplicacion

// Enumeracion del nivel de severidad del Log
export enum logSeverityLevel {
	low = "low",
	medium = "medium",
	high = "high",
}

// Interfaz para la creacion de logs por archivo/caso de uso
export interface LogEntityOptions {
	level: logSeverityLevel;
	message: string;
	origin: string;
	createdAt?: Date;
}

// Clase con la entidad o con los valores que tendremos que usar
// para mandarlos al repositorio
export class LogEntity {

	public level: string;
	public message: string;
	public createdAt: Date;
	public origin: string;

	constructor( options: LogEntityOptions ){

		const { message, level, origin, createdAt = new Date() } = options;
		
		this.message = message;
		this.level = level;
		this.createdAt = createdAt;
		this.origin = origin;
	}

	// Factory constructor, creamos un constructor que retorna una instancia
	// de la clase con los datos
	static fromJson = ( json: string = "{}" ): LogEntity => {

		json = ( json === "" ) ? "{}" : json;
		
		const { message, level, createdAt, origin } = JSON.parse( json );

		const log = new LogEntity({
			message,
			level,
			origin,
			createdAt: new Date( createdAt ),
		});

		return log;
	}

	// Metodo que recibe un objeto de una BD y lo transforma en un LogEntity
	static fromObject = ( object: { [ key: string] : any } ): LogEntity => {

		const { message, level, createdAt, origin } = object;
		return new LogEntity({ message, level, createdAt, origin });	 
	}
}
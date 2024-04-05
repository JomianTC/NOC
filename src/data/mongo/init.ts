// Archivo que se encarga de la conexion de Mongo

// ! Paquetes de terceros
import mongoose from "mongoose";

// Interfaz para los datos de conexion de mongo
interface ConnectionOptions {
	mongoUrl: string;
	dbName: string;
}

// Clase que se encarga de la conexion con la BD
export class MongoDatabase {

	static async connect( options: ConnectionOptions ) {

		const { mongoUrl, dbName } = options;

		try {
			
			await mongoose.connect( mongoUrl, {
				dbName: dbName,
			});

			return true;

		} catch ( error ) { throw error; }
	}
}
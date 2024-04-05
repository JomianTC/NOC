// Archivo que crea la entidad o modelo para los logs en Mongo

// ! Paquetes de terceros
import mongoose from "mongoose";

// Clase que declara el Schema para la BD
const logSchema = new mongoose.Schema({
	
	message: {
		type: String,
		required: true
	},
	origin: {
		type: String,
	},
	level: {
		type: String,
		enum: [ "low", "medium", "high" ],
		default: "low"
	},
	createdAt: {
		type: Date,
		default: new Date()
	}
});

// Exportamos el modelo de moongose para su uso
export const LogModel = mongoose.model( "log", logSchema );

// Archivo de testing para la conexion con mongo DB
import mongoose from 'mongoose';
import { MongoDatabase } from './init';

describe( "init MongoDB", () => {

	afterAll( () => {
		mongoose.connection.close();
	});

	test( "Should connect to Mongo DB", async() => {

		// * 1. Arrage
		const connected = await MongoDatabase.connect({
			dbName: process.env.MONGO_DB_NAME!,
			mongoUrl: process.env.MONGO_URL!, 
		});
		// * 2. Act
		// * 3. Assert
		expect( connected ).toBe( true );
	});
	
	test( "Should throw an error", async() => {
		
		// * 1. Arrage
		try {
			
			// * 2. Act
			const connected = await MongoDatabase.connect({
				dbName: process.env.MONGO_DB_NAME!,
				mongoUrl: "process.env.MONGO_URL!",
			}); 
			
			// * 3. Assert
			connected;
			expect( true ).toBe( false );
		
		} catch( error ){}
	});
});


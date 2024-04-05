// Archivo de testing para las variables de entorno
import { envs } from './envs-plugin';

describe( "envs-plugin.ts", () => {

	test( "Should return env options", () => {

		// * 1. Arrage
		// * 2. Act

		// * 3. Assert
		expect( envs ).toEqual({
			PORT: 3000,
			MAILER_SERVICE: 'gmail',
			MAILER_EMAIL: 'basurerotc2909@gmail.com',
			MAILER_SECRET_KEY: 'esmaobgckbfkheli',
			MONGO_URL: 'mongodb://miguel:123456@localhost:27017',
			MONGO_DB_NAME: 'NOC',
			MONGO_USER: 'miguel',
			MONGO_PASS: '123456'
		});
	});

	test( "Should return error if not found env", async() => {

		// * 1. Arrage
		jest.resetModules();
		process.env.PORT = "ABC";

		// * 2. Act
		try {
			await import( "./envs-plugin" );

			// * 3. Assert
			expect( true ).toBe( false );
		} catch ( error ) {
			
			// * 3. Assert				
			expect( `${ error }` ).toContain( `"PORT" should be a valid integer` );
		}
	});

	// ! Se podrian incluir pruebas en cada uno de los envs
});


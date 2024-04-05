// Archivo de testing para el modelo de MongoDB
import mongoose from 'mongoose';
import { MongoDatabase } from '../init';
import { LogModel } from './log-model';

describe("Modelo de MongoDB", () => {

	beforeAll(async () => {
		const connected = await MongoDatabase.connect({
			dbName: process.env.MONGO_DB_NAME!,
			mongoUrl: process.env.MONGO_URL!,
		});
		connected;
	});

	afterAll(async () => {
		mongoose.connection.close();
	});

	test("Should return LogModel", async () => {

		// * 1. Arrage
		const logData = {
			origin: "log-model.test.ts",
			message: "test-message",
			level: "low",
		}

		// * 2. Act
		const log = await LogModel.create(logData);

		// * 3. Assert
		expect(log).toEqual(expect.objectContaining({

			...logData,
			createdAt: expect.any(Date),
			id: expect.any(String),
		}));

		await LogModel.findByIdAndDelete( log.id );
	});

	test("Should return the Schema Object", async () => {

		// * 1. Arrage
		const schema = LogModel.schema.obj;

		// * 2. Act
		// * 3. Assert
		expect( schema ).toEqual( expect.objectContaining({
			message: { type: expect.any( Function ), required: true },
			origin: { type: expect.any( Function ) },
			level: {
				type: expect.any( Function ),
				enum: ['low', 'medium', 'high'],
				default: 'low'
			},
			createdAt: expect.any( Object )
		}));
	});
});

// Archivo principal de la aplicacion

// ! Paquetes de terceros
import "dotenv/config";

// ? Paquetes propios
import { Server } from "./presentation/server";
import { MongoDatabase } from "./data/mongo";
import { envs } from "./config/plugins/envs-plugin";
// import { PrismaClient } from "@prisma/client";

( async() => {
	main();
})();

async function main() {
	
	await MongoDatabase.connect({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME
	});

	// const prisma = new PrismaClient();
	// const logs = await prisma.logModel.findMany();
	// console.log( logs );

	Server.start();
}


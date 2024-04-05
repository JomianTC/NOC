// Archivo de dependencia de Cron

// ! Paquetes de terceros
import { CronJob } from "cron";

// Tipos de datos para argumentos
type CronTime = string | Date;
type OnTick = () => void;

// Clase que implementa Cron
export class CronService {

	static createJob( cronTime: CronTime, onTick: OnTick ): CronJob {

		const job = new CronJob( cronTime, onTick );

		job.start();

		return job;
	}
}
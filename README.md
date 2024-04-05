# Aplicación de monitoreo - NOC

Esta aplicación sirve para monitorear un servidor creando logs cada x tiempo, almacenando los logs en distintos medios como lo son fileSystem, PostgreSQL y MongoDB

## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. Inicializar las bases de datos mediante el docker-compose ejecutando el comando `docker compose up -d`
4. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo

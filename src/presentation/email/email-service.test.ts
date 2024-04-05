// Archivo que se encarga del test NodeMailer
import { EmailService, SendMailOptions } from './email-service';
import nodemailer from 'nodemailer';

describe( "EmailService", () => {

	const mockSendMail = jest.fn();

	// Mock create tranport
	nodemailer.createTransport = jest.fn().mockReturnValue({
		sendMail: mockSendMail,
	});

	const emailService = new EmailService();

	test( "Should send email", async() => {
	

		const options: SendMailOptions = {
			to: "jomiantoca2011@gamil.com",
			subject: "Test",
			htmlBody: "<h1>Test</h1>"
		}
		
		await emailService.sendEmail( options )
		
		expect( mockSendMail ).toHaveBeenCalledWith({
			attachments: expect.any( Array ), 
			html: "<h1>Test</h1>", 
			subject: "Test", 
			to: "jomiantoca2011@gamil.com"}
		);	
	});

	test( "SendEmail with attachments", async() => {
		
		await emailService.sendEmailWithFileSystemLogs( "jomiantoca2011@gmail.com" );
		expect( mockSendMail ).toHaveBeenCalledWith({
			attachments: expect.arrayContaining([
				{ "filename": "logs-all-log", "path": "./logs/logs-all.log" }, 
				{ "filename": "logs-high-log", "path": "./logs/logs-high.log" }, 
				{ "filename": "logs-medium-log",  "path": "./logs/logs-medium.log" }
			]), 
			html: "<h1>Logs del servidor</h1>", 
			subject: "Logs del Servidor", 
			to: "jomiantoca2011@gmail.com"
		});
	});
	
});

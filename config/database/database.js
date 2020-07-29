const mysql = require('mysql2');
const { Client } = require('ssh2');

const dbServer = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
};

const tunnelConfig = {
	host: process.env.SSH_HOST,
	port: process.env.SSH_PORT,
	username: process.env.SSH_USERNAME,
	password: process.env.SSH_PASSWORD,
};

const forwardConfig = {
	srcHost: '127.0.0.1',
	srcPort: '3306',
	dstHost: dbServer.host,
	dstPort: dbServer.port,
};

const sshClient = new Client();

const SSHConnection = new Promise((resolve, reject) => {
	sshClient
		.on('ready', () => {
			sshClient.forwardOut(
				forwardConfig.srcHost,
				forwardConfig.srcPort,
				forwardConfig.dstHost,
				forwardConfig.dstPort,
				(error, stream) => {
					if (error) throw error;

					const updatedDbServer = {
						...dbServer,
						stream,
					};

					const connection = mysql.createConnection(updatedDbServer);
					connection.connect((error) => {
						if (error) reject(error);

						resolve(connection);
					});
				}
			);
		})
		.connect(tunnelConfig);
});

module.exports = SSHConnection;

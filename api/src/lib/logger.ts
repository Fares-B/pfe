import { createLogger, transports, format, Logger } from "winston";
import LokiTransport from "winston-loki";

let loggerLocal: Logger;

const initializeLogger = () => {
	if (loggerLocal) return;
  console.log("initializeLogger");
  console.log("Grafana Loki URL: ", process.env.GRAFANA_URL);
  console.log("Grafana Loki Auth: ", process.env.GRAFANA_AUTH);
	loggerLocal = createLogger({
		transports: [
			new LokiTransport({
				host: process.env.GRAFANA_URL,
				labels: { app: "api" },
				basicAuth: process.env.GRAFANA_AUTH,
				json: true,
				// @ts-ignore
				format: format.json(),
				// interval: 10,
				// timeout: 6000,
				replaceTimestamp: true,
				onConnectionError: (err) => console.error(err),
			}),
			new transports.Console({
				format: format.combine(format.simple(), format.colorize()),
			}),
		],
	});
};

// logger
const getLogger = () => {
	initializeLogger();
	return loggerLocal;
};

export const logResponseTime = (req: any, res: any, time: any) => {
	const logger = getLogger();
	const method = req.method;
	const url = req.url;
	const status = res.statusCode;

	console.log("------------------");
	console.log("status", status, "method", method, "url", url, "time", time);
	console.log("------------------");

	logger.info({
		message: `method=${method} url=${url} status=${status} duration=${time}ms`,
		labels: { origin: "api" },
	});
};

export const logError = (err: any, req: any, res: any, next: any) => {
	const method = req.method;
	const url = req.url;
	const status = res.statusCode;

	const logger = getLogger();

	console.log("------------------");
	console.log("err", err);
	console.log("------------------");

	logger.error({
		message: `method=${method} url=${url} status=${status} error=${err.stack}`,
		labels: { origin: "api" },
	});
	next();
};

export default () => getLogger();

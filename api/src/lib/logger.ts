import { Logger } from "tslog";

const logger = new Logger({
    displayFilePath: "hideNodeModulesOnly",
    // displayFunctionName: false,
    // displayInstanceName: false,
    displayTypes: true,
    // displayRequestId: false,
    // displayDateTime: true,
    // dateTimeTimezone: "Europe/Paris",
    // dateTimePattern: "HH:mm:ss",
    // displayLoggerName: false,
    // displayRequestId: false,
    // displaySeparator: true,
    displayLogLevel: true,
});

export default logger;

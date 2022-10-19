import { format, createLogger, transports, addColors } from "winston";
const { printf, timestamp, combine, colorize, json } = format;

const myCustomLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    },
    colors: {
        error: "red",
        warn: "yellow",
        info: "cyan",
        http: "magenta",
        verbose: "white",
        debug: "white",
        silly: "white",
    }
};

addColors(myCustomLevels.colors)

const myFormat = printf(({ level, message, label, timestamp, json }) => {
    return `${timestamp} [${level}]: ${message.replace(new RegExp('\n$'), '')}`;
});

const logger = createLogger({
    level: "http",
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' })
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(new transports.Console({
        format: combine(
            timestamp(),
            colorize(),
            myFormat
        )
    }));
}

export default logger;
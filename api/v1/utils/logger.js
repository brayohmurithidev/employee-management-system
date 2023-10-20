import { format, transports, createLogger } from "winston";
import "winston-daily-rotate-file";
import ip from "ip";

const { combine, timestamp, label, printf } = format;

// Create a custom log format function
const customFormat = printf(
  ({ level, message, label, timestamp, method, url }) => {
    const host = ip.address();
    return `${timestamp} [${label}] ${level}: ${host} ${method} ${url} - ${message}`;
  }
);

// SETUP A DAILY ROTATE FUNC
const transport1 = new transports.DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD", //date format to be used for rotating
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d", //deletes after 14 days
});
const transport2 = new transports.DailyRotateFile({
  level: "error",
  filename: "logs/errors-%DATE%.log",
  datePattern: "YYYY-MM-DD", //date format to be used for rotating
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d", //deletes after 14 days
});

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: "Fazilabs" }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    customFormat
  ),
  transports: [transport1, transport2],
});

export default logger;

// {
//     "level": "debug",
//     "label": "winston custom format",
//     "timestamp": "Jul-10-2022 02:02:08"
//     "host": "192.168.0.1",
//     "pid": "11111",
//     "message": "This is the home '/' route.",
//     }

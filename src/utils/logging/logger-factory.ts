import { FileLogger, type FileLoggerOptions } from "./file.js";
import type { Logger } from "./logger.js";

type FileCfg = { type: "file" } & FileLoggerOptions;
export type LoggerConfig = FileCfg;
export function createLogger(cfg: LoggerConfig): Logger {
	switch (cfg.type) {
		case "file":
			return new FileLogger(cfg);
	}
}

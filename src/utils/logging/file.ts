import type { LogLevel } from "./logger.js";
import { StreamLogger } from "./stream.js";
import fs from "node:fs";

export interface FileLoggerOptions {
	path: string;
	level?: LogLevel;
	flags?: string;
}

export class FileLogger extends StreamLogger {
	constructor(opts: FileLoggerOptions) {
		const stream = fs.createWriteStream(opts.path, {
			flags: opts.flags ?? "a",
		});
		
		super({
			stream,
			level: opts.level,
		});
	}

	public async dispose(): Promise<void> {
		return new Promise((res, rej) => {
			const stream = this['stream'] as fs.WriteStream;
			stream.end((err) => (err ? rej(err) : res()));
		});
	}
}

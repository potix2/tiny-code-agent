import type { Writable } from "node:stream";
import type { LogLevel, Logger } from "./logger.js";
import { LogLevelPriority } from "./logger.js";

export interface StreamLoggerOptions {
	stream: Writable;
	level?: LogLevel;
}

export class StreamLogger implements Logger {
	protected stream: Writable;
	public level: LogLevel;

	constructor(opts: StreamLoggerOptions) {
		this.level = opts.level ?? "info";
		this.stream = opts.stream;
	}

	private shouldLog(level: LogLevel): boolean {
		return LogLevelPriority[level] >= LogLevelPriority[this.level];
	}

	private write(level: LogLevel, args: unknown[]) {
		if (!this.shouldLog(level)) {
			return;
		}

		const timestamp = new Date().toISOString();
		const logLevel = level.toUpperCase();
		const line = `${timestamp} [${logLevel}] ${args.map(String).join(" ")}\n`;
		this.stream.write(line);
	}

	public debug(...args: unknown[]) {
		this.write("debug", args);
	}

	public info(...args: unknown[]) {
		this.write("info", args);
	}

	public warn(...args: unknown[]) {
		this.write("warn", args);
	}

	public error(...args: unknown[]) {
		this.write("error", args);
	}

	public setLevel(level: LogLevel) {
		this.level = level;
	}

	public dispose(): void {
		if ("end" in this.stream && typeof this.stream.end === "function") {
			this.stream.end();
		}
	}
}

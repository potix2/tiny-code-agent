export type LogLevel = "info" | "debug" | "warn" | "error";
export const LogLevelPriority: Record<LogLevel, number> = {
	debug: 10,
	info: 20,
	warn: 30,
	error: 40,
};

export interface Logger {
	level: LogLevel;
	debug(...args: unknown[]): void;
	info(...args: unknown[]): void;
	warn(...args: unknown[]): void;
	error(...args: unknown[]): void;
	setLevel(level: LogLevel): void;
	dispose(): void | Promise<void>;
}

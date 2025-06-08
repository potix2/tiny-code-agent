import { Writable } from "node:stream";
import { beforeEach, describe, expect, it } from "vitest";
import { StreamLogger } from "./stream.js";

class MemoryStream extends Writable {
	public lines: string[] = [];

	_write(
		chunk: Buffer | string,
		_encoding: string,
		callback: (error?: Error | null) => void,
	): void {
		this.lines.push(chunk.toString());
		callback();
	}

	clear() {
		this.lines = [];
	}
}

describe("StreamLogger", () => {
	let memoryStream: MemoryStream;
	let logger: StreamLogger;

	beforeEach(() => {
		memoryStream = new MemoryStream();
		logger = new StreamLogger({
			stream: memoryStream,
			level: "info",
		});
	});

	describe("Basic logging", () => {
		it("should log info messages to stream", () => {
			logger.info("Test info message");

			expect(memoryStream.lines).toHaveLength(1);
			expect(memoryStream.lines[0]).toMatch(/\[INFO\] Test info message/);
		});

		it("should log error messages to stream", () => {
			logger.error("Test error message");

			expect(memoryStream.lines).toHaveLength(1);
			expect(memoryStream.lines[0]).toMatch(/\[ERROR\] Test error message/);
		});

		it("should log multiple arguments", () => {
			logger.info("Multiple", "arguments", 123);

			expect(memoryStream.lines).toHaveLength(1);
			expect(memoryStream.lines[0]).toMatch(/\[INFO\] Multiple arguments 123/);
		});

		it("should include timestamp in ISO format", () => {
			logger.info("Test message");

			const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
			expect(memoryStream.lines[0]).toMatch(isoDateRegex);
		});
	});

	describe("Log levels", () => {
		it("should not log debug messages when log level is INFO", () => {
			logger.debug("This should not appear");

			expect(memoryStream.lines).toHaveLength(0);
		});

		it("should log info messages when log level is INFO", () => {
			logger.info("This should appear");

			expect(memoryStream.lines).toHaveLength(1);
		});

		it("should log all messages when log level is DEBUG", () => {
			logger.setLevel("debug");

			logger.debug("Debug message");
			logger.info("Info message");
			logger.warn("Warn message");
			logger.error("Error message");

			expect(memoryStream.lines).toHaveLength(4);
		});

		it("should only log error messages when log level is ERROR", () => {
			logger.setLevel("error");

			logger.debug("Debug message");
			logger.info("Info message");
			logger.warn("Warn message");
			logger.error("Error message");

			expect(memoryStream.lines).toHaveLength(1);
			expect(memoryStream.lines[0]).toMatch(/\[ERROR\]/);
		});
	});

	describe("dispose", () => {
		it("should call end on stream if available", () => {
			let endCalled = false;
			const mockStream = new Writable({
				write() {},
			});
			mockStream.end = (() => {
				endCalled = true;
				return mockStream;
				// biome-ignore lint/suspicious/noExplicitAny: Mock for testing
			}) as any;

			const logger = new StreamLogger({ stream: mockStream });
			logger.dispose();

			expect(endCalled).toBe(true);
		});
	});
});

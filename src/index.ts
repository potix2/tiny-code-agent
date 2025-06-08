import { Command } from "commander";
import pkg from "../package.json" with { type: "json" };

const program = new Command();

program
	.name("tiny-code")
	.description("Tiny coding agent playground")
	.version(pkg.version);

program
	.command("greet")
	.argument("<name>", "your name")
	.option("-l, --loud", "shout it out")
	.action((name: string, opts: { loud?: boolean }) => {
		const msg = `Hello, ${name}!`;
		console.log(opts.loud ? msg.toUpperCase() : msg);
	});

program.parse();

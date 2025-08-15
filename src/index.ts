import { Command } from "commander";
import pkg from "../package.json" with { type: "json" };
import { main } from "./cli.js";

const program = new Command();

program
	.name("tiny-code")
	.description("Tiny coding agent playground")
	.version(pkg.version)
	.action((name, options, command) => {
		main(name, options);
	});

program.parse();

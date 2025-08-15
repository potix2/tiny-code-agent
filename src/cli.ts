import readline, { type ReadLine } from "node:readline";

type CLIOptions = {
	verbose: boolean;
};

type NextAction = "continue" | "exit";

// define EvalResult
type EvalResult = {
	nextAction: NextAction;
	message: string;
};

const readInput = (rl: ReadLine) =>
	new Promise<string>((resolve) =>
		rl.question("> ", (userInput) => resolve(userInput)),
	);

async function evalInput(input: string): Promise<EvalResult> {
	if (input === "/quit" || input === "/exit") {
		return {
			nextAction: "exit",
			message: "Bye!",
		};
	}

	return {
		nextAction: "continue",
		message: `eval reulst: ${input}`,
	};
}

async function printResult(result: string) {
	console.log(result);
}

export async function main(name: string, options: CLIOptions) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	while (true) {
		const input = await readInput(rl);
		const result = await evalInput(input);
		printResult(result.message);

		if (result.nextAction === "exit") {
			rl.close();
			break;
		}
	}
}

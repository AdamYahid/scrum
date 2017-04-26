#!/usr/bin/env node

const init = require('./commands/init.js');
const update = require('./commands/update');
const print = require('./commands/print');

function argParser(args) {
	if (!Array.isArray(args) || args.length < 2) {
		console.log('Invalid args passed');
	}
	return { command: args[2], params: args.slice(3) };
}

function unknownCommand(params, cb) {
	console.log('unkown command');
	cb(1);
}

const commandHash = {
	init,
	update,
	print
};

function commandRunner(cmd, params) {
	const commandCb = (exitCode) => {
		console.log(`exit with code ${exitCode}`);
		process.exit(exitCode);
	};
	const method = commandHash[cmd] || unknownCommand;
	method(params, commandCb);
}

const cmd = argParser(process.argv);
const exitCode = commandRunner(cmd.command, cmd.params);

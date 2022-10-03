const yargs = require("yargs");
const { addNote, getList, removeNote, getById } = require("./controllers");

const package = require("./package.json");
yargs.version(package.version);

// node index add --title="Title text" --description="Description text"

yargs.command({
	command: "add",
	describe: "Add a new note",
	builder: {
		title: { type: "string", demandOption: true, describe: "Note title" },
		description: {
			type: "string",
			demandOption: true,
			describe: "Note description",
		},
	},
	handler({ title, description }) {
		addNote(title, description);
		console.log("Adding a new note!");
	},
});

// node index list

yargs.command({
	command: "list",
	describe: "Show all notes",

	async handler() {
		const notes = await getList();
		console.log("Your notes:", notes);
	},
});

// node index remove --id=1

yargs.command({
	command: "remove",
	describe: "Delete a note",
	builder: {
		id: { type: "number", demandOption: true, describe: "Remove note by id" },
	},
	async handler({ id }) {
		const note = await removeNote(id);
		console.log("Item deleted", note);
	},
});

// node index id --id=1

yargs.command({
	command: "id",
	describe: "Get a note by id",
	builder: {
		id: { type: "number", demandOption: true, describe: "Note id" },
	},
	async handler({ id }) {
		const note = await getById(id);
		console.log("item by id", note);
	},
});

yargs.parse();

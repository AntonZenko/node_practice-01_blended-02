const fs = require("fs").promises;
const path = require("path");

const notePath = path.join(__dirname, "notes.json");

const updateNotes = async (data) => {
	await fs.writeFile(notePath, JSON.stringify(data, null, 2));
};

const addNote = async (title, description) => {
	const noteList = await getList();
	if (noteList.length === 0) {
		await updateNotes([{ id: 1, title, description }]);
		return;
	}
	let noteId = noteList.length + 1;
	const note = {
		id: noteId,
		title,
		description,
	};
	noteList.push(note);
	await updateNotes(noteList);
};

const getList = async () => {
	const notes = await fs.readFile(notePath, "utf-8");
	if (!notes) {
		return [];
	}
	return JSON.parse(notes);
};

const removeNote = async (id) => {
	const noteList = await getList();
	const index = noteList.findIndex((item) => item.id === id);
	if (index === -1) {
		return null;
	}
	const [result] = noteList.splice(index, 1);
	await updateNotes(noteList);
	return result;
};

const getById = async (id) => {
	const noteList = await getList();
	const noteById = noteList.find((item) => item.id === id);
	if (!noteById) {
		return null;
	}
	return noteById;
};

module.exports = {
	addNote,
	getList,
	removeNote,
	getById,
};

export class Note {
    constructor(id, type, title, description) {
        if (!id || !type || !title || !description) {
            throw new Error("All fields (id, type, title, description) are required and cannot be empty.");
        }
        this.id = id;
        this.type = type;
        this.title = title;
        this.description = description;
    }
}

export class Notes {
    constructor(existingNotes = []) {
        this.type = Note;
        this.data = existingNotes;
    }

    addNote(note) {
        if (!(note instanceof Note)) {
            throw new Error("Invalid Note");
        }
        this.data.push(note);
        setNotesToLocalStorage('myNotes', this.data); // Sync to local storage
    }

    deleteById(id) {
        if (!id) {
            throw new Error("Please enter an ID");
        }
        const index = this.findIndex(id);
        if (index !== -1) {
            this.deleteByIndex(index);
        } else {
            throw new Error("Invalid ID.");
        }
    }

    deleteByIndex(index) {
        if (index < 0 || index >= this.data.length) {
            throw new Error("Index out of bounds");
        }
        this.data.splice(index, 1);
        setNotesToLocalStorage('myNotes', this.data); // Sync to local storage
    }

    isExist(id) {
        return this.data.some((element) => element.id == id);
    }

    findIndex(id) {
        const index = this.data.findIndex((element) => element.id == id);
        if (index !== -1) {
            return index;
        } else {
            throw new Error("Invalid ID.");
        }
    }

    update(id, note) {
        if (this.isExist(id) && note instanceof Note) {
            const index = this.findIndex(id);
            this.data[index] = note;
            setNotesToLocalStorage('myNotes', this.data); // Sync to local storage
        } else {
            throw new Error("ID not matched or invalid Note instance.");
        }
    }
}

function setNotesToLocalStorage(name, data) {
    data = JSON.stringify(data);
    try {
        localStorage.setItem(name, data);
    } catch (error) {
        console.log("Failed to set data to local storage", error);
    }
}

function getNotesFromLocalStorage(name) {
    try {
        const response = localStorage.getItem(name);
        return response ? JSON.parse(response) : []; // Return empty array if no data
    } catch (error) {
        console.log("Can't get data from local storage", error);
        return []; // Return empty array on error
    }
}

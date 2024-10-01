// JavaScript for notes app with filtering and type-specific backgrounds

class Note {
    constructor(id, type, title, description) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.description = description;
    }
}

class NotesManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    }

    addNote(note) {
        this.notes.push(note);
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    deleteNoteById(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    editNote(id, updatedNote) {
        const index = this.notes.findIndex(note => note.id === id);
        if (index !== -1) {
            this.notes[index] = updatedNote;
            localStorage.setItem('notes', JSON.stringify(this.notes));
        }
    }
    getNotes() {
        return this.notes;
    }
}

const notes = new NotesManager();
const notesContainer = document.getElementById('notesContainer');
const noteForm = document.getElementById('noteForm');
const noteTypeDropdown = document.getElementById('noteTypeDropdown');
const noteTitle = document.getElementById('noteTitle');
const noteText = document.getElementById('noteText');
const noteIdField = document.getElementById('noteId');
const notesFormContainer = document.getElementById('notesFormContainer');
const showFormBtn = document.getElementById('showFormBtn');

// Display notes based on filter
function displayNotes(filterType = 'All') {
    notesContainer.innerHTML = '';

    let filteredNotes = notes.getNotes();
    if (filterType !== 'All') {
        filteredNotes = filteredNotes.filter(note => note.type === filterType);
    }

    filteredNotes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note', note.type);
        noteDiv.innerHTML = `
            <h3 class="title">${note.title}</h3>
            <div class="note-desc">${note.description}</div>
            <div class="note-controls">
                <button onclick="editNote('${note.id}')"><i class='bx bxs-edit'></i></button>
                <button onclick="deleteNote('${note.id}')"><i class='bx bxs-trash' ></i></button>
            </div>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

// Edit note function
function editNote(id) {
    const note = notes.getNotes().find(note => note.id === id);
    if (note) {
        noteIdField.value = note.id;
        noteTypeDropdown.value = note.type;
        noteTitle.value = note.title;
        noteText.value = note.description;
        notesFormContainer.style.display = 'flex';
    }
}

// Delete note function
function deleteNote(id) {
    notes.deleteNoteById(id);
    displayNotes();
}

// Add or Edit note
noteForm.addEventListener('submit', e => {
    e.preventDefault();
    const id = noteIdField.value || Date.now().toString();
    const newNote = new Note(
        id,
        noteTypeDropdown.value,
        noteTitle.value,
        noteText.value
    );

    if (noteIdField.value) {
        notes.editNote(id, newNote);
    } else {
        notes.addNote(newNote);
    }

    noteForm.reset();
    notesFormContainer.style.display = 'none';
    displayNotes();
});

// Show form
showFormBtn.addEventListener('click', () => {
    notesFormContainer.style.display = 'flex';
});

// Hide form
document.querySelector('.hide-note-container').addEventListener('click', () => {
    notesFormContainer.style.display = 'none';
});

// Sidebar filter logic
document.querySelectorAll('.sidebar ul li').forEach(filterBtn => {
    filterBtn.addEventListener('click', () => {
        const filterType = filterBtn.getAttribute('data-filter');
        displayNotes(filterType);
    });
});

// Initial display of all notes
displayNotes();
document.querySelector('.hide-note-container').addEventListener('click', () => {
    notesFormContainer.style.display = 'none';
    noteForm.reset();  // Clear the form when it's closed
});
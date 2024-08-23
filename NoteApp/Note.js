window.addEventListener("DOMContentLoaded", () => {
    // Select Buttons
    const openNoteForm = document.getElementById("open-note-form-btn");
    const closeNoteForm = document.getElementById("close-note-form-btn");
    const addNoteBtn = document.getElementById("add-note-btn");
    const closeModaleBtn = document.getElementById("close-modale-btn");

    // Select Containers
    const noteFormContainer = document.getElementById("note-form-container");
    const noteInputContainer = document.getElementById("note-text-field");
    const modaleContainer = document.getElementById("empty-input-modale");
    const mainNoteContainer = document.getElementById("main-notes-container");

    // Load Notes from Local Storage
    const Notes = JSON.parse(localStorage.getItem("notes")) || [];
    renderNotes(Notes);

    // Event Listeners
    openNoteForm.addEventListener("click", () => {
        noteFormContainer.style.display = "flex";
    });

    closeNoteForm.addEventListener("click", () => {
        noteFormContainer.style.display = "none";
    });

    closeModaleBtn.addEventListener("click", () => {
        modaleContainer.style.display = "none";
    });

    addNoteBtn.addEventListener("click", () => {
        const textNote = noteInputContainer.value.trim();

        if (textNote === "") {
            modaleContainer.style.display = "flex";
        } else {
            const note = new Notepad(
                generateRandomNumber(1400000),
                textNote,
                generateRandomColor(),
                generatePosition()
            );
            Notes.push(note);
            saveNotesToLocalStorage();
            noteInputContainer.value = ''; // Clear the input field
            noteFormContainer.style.display = "none";
        }
    });

    // Note Class
    class Notepad {
        constructor(Id, Note, Background, Position) {
            this.Id = Id;
            this.Note = Note;
            this.Background = Background;
            this.Position = Position;
        }
    }

    // Functions
    function saveNotesToLocalStorage() {
        localStorage.setItem("notes", JSON.stringify(Notes));
        renderNotes(Notes);
    }

    function renderNotes(notes) {
        mainNoteContainer.innerHTML = ""; // Clear existing notes
        notes.forEach(note => createNoteElement(note));
    }

    function createNoteElement(note) {
        const noteContainer = document.createElement("div");
        noteContainer.id = `note-Container-${note.Id}`;
        noteContainer.className = "note-Container";
        noteContainer.draggable = true;
        noteContainer.style.background = note.Background;
        noteContainer.style.position = "absolute";
        noteContainer.style.top = `${note.Position.y}px`;
        noteContainer.style.left = `${note.Position.x}px`;

        const noteText = document.createElement("p");
        noteText.id = "note-Text";
        noteText.innerText = `📌 ${note.Note}`;

        const noteControls = document.createElement("div");
        noteControls.id = "noteControls";

        const deleteNoteBtn = document.createElement("button");
        deleteNoteBtn.id = "delete-note-btn";
        deleteNoteBtn.innerText = "🪣";
        deleteNoteBtn.addEventListener("click", () => {
            deleteNoteById(note.Id);
        });

        // Drag and Drop Events
        noteContainer.addEventListener("dragstart", handleDragStart);
        mainNoteContainer.addEventListener("dragover", handleDragOver);
        mainNoteContainer.addEventListener("drop", handleDrop);

        noteContainer.addEventListener("click",() => {
            document.querySelectorAll("#note-Container").forEach((container) => {
                container.style.zIndex = "-10"
            })
            noteContainer.style.zIndex =  "10"
        })

        noteControls.append(deleteNoteBtn);
        noteContainer.append(noteControls, noteText);
        mainNoteContainer.appendChild(noteContainer);
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
        event.dataTransfer.effectAllowed = "move";
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const noteId = event.dataTransfer.getData("text/plain");
        const draggingElement = document.getElementById(noteId);

        if (draggingElement) {
            const containerRect = mainNoteContainer.getBoundingClientRect();
            const elementRect = draggingElement.getBoundingClientRect();
            const x = event.clientX - containerRect.left - elementRect.width / 2;
            const y = event.clientY - containerRect.top - elementRect.height / 2;

            draggingElement.style.left = `${x}px`;
            draggingElement.style.top = `${y}px`;

            const draggedNote = Notes.find(note => note.Id == noteId.split('-').slice(-1));
            if (draggedNote) {
                draggedNote.Position = { x, y };
                saveNotesToLocalStorage();
            }
        }
    }

    function deleteNoteById(noteId) {
        const noteIndex = Notes.findIndex(note => note.Id === noteId);
        if (noteIndex > -1) {
            Notes.splice(noteIndex, 1);
            saveNotesToLocalStorage();
        }
    }

    function generatePosition() {
        const x = generateRandomNumber(mainNoteContainer.clientWidth);
        const y = generateRandomNumber(mainNoteContainer.clientHeight);
        return { x, y };
    }

    function generateRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }
});

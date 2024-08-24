window.addEventListener("DOMContentLoaded", () => {
    const close = document.getElementById("close");
    const open = document.getElementById("open");
    const notesContainer = document.getElementById("notesContainer");
    const addNote = document.getElementById("addNote");
    const noteForm = document.querySelector(".noteForm");
    const noteText = document.getElementById("notes");
    const emptyNoteModaleBox = document.getElementById("emptyNoteModaleBox");
    const closeModaleButton = document.getElementById("closeEmptyModale");

    class Note {
        constructor(Id, Text, Position, Background) {
            this.Id = Id;
            this.Text = Text;
            this.Position = Position;
            this.Background = Background;
        }
    }

    closeModaleButton.addEventListener("click", () => {
        emptyNoteModaleBox.style.display = "none";
    });

    const Notes = JSON.parse(localStorage.getItem("notes")) || [];

    function saveNotesToLocalStorage() {
        localStorage.setItem("notes", JSON.stringify(Notes));
    }

    close.addEventListener("click", () => {
        noteForm.style.display = "none";
    });
    open.addEventListener("click", () => {
        noteForm.style.display = "flex";
        noteText.focus()
    });
    addNote.addEventListener("click", () => {
        noteForm.style.display = "none";
        if (noteText.value === "") {
            emptyNoteModaleBox.style.display = "flex";
        } else {
            const Text = noteText.value;
            const Position = generatePosition();
            const Background = generateRandomColor();
            const Id = generateRandomNumber(140000);
            const note = new Note(Id, Text, Position, Background);
            noteText.value = "";
            Notes.push(note);
            saveNotesToLocalStorage();
            PlayingWithNotes(Notes);
        }
    });

    const generateRandomNumber = (Number) => Math.floor(Math.random() * Number);

    const generateRandomColor = () => {
        const HexArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
        let HexColor = "#";
        for (let index = 0; index < 6; index++) {
            HexColor += HexArray[generateRandomNumber(HexArray.length)];
        }
        return HexColor;
    };

    const generatePosition = () => {
        const x = generateRandomNumber(notesContainer.clientWidth);
        const y = generateRandomNumber(notesContainer.clientHeight);
        return { x, y };
    };

    const PlayingWithNotes = (Notes) => {
        notesContainer.innerHTML = ''; // Clear existing notes
        Notes.forEach((element) => {
            const NoteContainer = document.createElement("p");
            NoteContainer.className = "notesText";
            NoteContainer.id = `note-${element.Id}`; 
            NoteContainer.draggable = true;

            NoteContainer.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("text/plain", event.target.id);
                event.dataTransfer.effectAllowed = "move";
            });

            NoteContainer.addEventListener("dragend", (event) => {
                event.preventDefault();
            });

            notesContainer.addEventListener("dragover", (event) => {
                event.preventDefault();
            });

            notesContainer.addEventListener("drop", (event) => {
                event.preventDefault();
                const noteId = event.dataTransfer.getData("text/plain");
                const draggingElement = document.getElementById(noteId);

                if (draggingElement) {
                    const containerRect = notesContainer.getBoundingClientRect();
                    const x = event.clientX - containerRect.left;
                    const y = event.clientY - containerRect.top;

                    draggingElement.style.position = 'absolute';
                    draggingElement.style.left = `${x}px`;
                    draggingElement.style.top = `${y}px`;

                    // Update the position of the note in the Notes array
                    const note = Notes.find(note => note.Id == noteId.split('-')[1]);
                    if (note) {
                        note.Position = { x, y };
                        saveNotesToLocalStorage();
                    }
                }
            });

            const deleteNoteButton = document.createElement("button");
            deleteNoteButton.id = `deleteNoteButton-${element.Id}`;
            deleteNoteButton.innerText = "❌";
            deleteNoteButton.addEventListener("click", () => {
                deleteNote(Notes.indexOf(element), Notes);
            });

            const textSpan = document.createElement("span");
            textSpan.innerText = `📌${element.Text}`;

            NoteContainer.append(textSpan, deleteNoteButton);
            NoteContainer.style.top = `${element.Position.y}px`;
            NoteContainer.style.left = `${element.Position.x}px`;
            NoteContainer.style.background = `${element.Background}`;
            notesContainer.appendChild(NoteContainer);
        });
    };

    function deleteNote(index, Notes) {
        Notes.splice(index, 1);
        saveNotesToLocalStorage();
        PlayingWithNotes(Notes);
    }

    // Load notes from localStorage when the page is loaded
    PlayingWithNotes(Notes);
});

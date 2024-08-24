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
    })

    const Notes = []
    close.addEventListener("click", () => {
        noteForm.style.display = "none";
    })
    open.addEventListener("click", () => {
        noteForm.style.display = "flex";
    })
    addNote.addEventListener("click", () => {
        noteForm.style.display = "none";
        if (noteText.value === "") {
            emptyNoteModaleBox.style.display = "flex";
        }
        else {
            const Text = noteText.value;
            const Position = generatePosition();
            const Background = generateRandomColor();
            const Id = generateRandomNumber(140000);
            const note = new Note(Id, Text, Position, Background);
            noteText.value = "";
            Notes.push(note);
            PlayingWithNotes(Notes);
        }
    })
    const generateRandomNumber = (Number) => Math.floor(Math.random() * Number);
    
    const generateRandomColor = () => {
        const HexArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F",];
        let HexColor = "#";
        for (let index = 0; index < 6; index++) {
            HexColor += HexArray[generateRandomNumber(HexArray.length)];
        }
        return HexColor;
    }
    const generatePosition = () => {
        const x = generateRandomNumber(notesContainer.clientWidth);
        const y = generateRandomNumber(notesContainer.clientHeight);
        return { x, y }
    }
    const PlayingWithNotes = (Notes) => {
        if (!Notes) {
            notesContainer.innerText = ""
        }
        Notes.forEach((element) => {
            const noteIndex = Notes.indexOf(element)
            const NoteContainer = document.createElement("p")
            NoteContainer.className = "notesText";
            NoteContainer.Id = `note-${element.id}`
            
            const pen = document.createElement("span")
            pen.innerText = "📌";
            NoteContainer.addEventListener("click", () => {
                const allNotes = document.querySelectorAll(".notesText")
                allNotes.forEach(notes => {
                    notes.style.zIndex = "0"
                })
                NoteContainer.style.zIndex = "100"
            })
            NoteContainer.draggable = true;
            NoteContainer.addEventListener("dragstart", (event) => {
                event.dataTransfer("text/plain", event.target.id)
                event.dataTransfer.effectAllowed = "move";
            })
            NoteContainer.addEventListener("dragend", (event) => {
                event.preventDefault();
            })
            NoteContainer.addEventListener("dragover", (event) => {
                event.preventDefault();
            })
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
                }
            });
            const deleteNoteButton = document.createElement("Button")
            deleteNoteButton.Id = "deleteNoteButton"
            deleteNoteButton.innerText = "❌"
            deleteNoteButton.addEventListener("click", () => {
                deleteNote(noteIndex, Notes)
            })
            const textSpan = document.createElement("span")
            textSpan.innerText = element.Text
            NoteContainer.append(pen, textSpan, deleteNoteButton)
            NoteContainer.style.top = `${element.Position.x}px`
            NoteContainer.style.left = `${element.Position.y}px`
            NoteContainer.style.background = `${element.Background}`
            notesContainer.appendChild(NoteContainer)
        });
    }
    function deleteNote(index, Notes) {
        notesContainer.innerHTML = ''
        Notes.splice(index, 1)
        PlayingWithNotes(Notes)
    }
})

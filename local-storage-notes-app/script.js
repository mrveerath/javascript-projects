import { Notes } from "./utilsFunc"
//notes-form-control
const showNoteBtn = document.querySelector(".visible-note-btn")
const notesContainer = document.querySelector(".notes-form-container")
const hideNoteBtn = document.querySelector(".hide-note-container")
const noteForm = document.querySelector(".notes-form form")
showNoteBtn.addEventListener("click",() => {
    notesContainer.style.display = "flex"
})
hideNoteBtn.addEventListener("click",() => {
    notesContainer.style.display = "none"
    noteForm.reset()
})

const storedNotes = localStorage.getItem('myNotes')
const myNotes = storedNotes ? new Notes(...JSON.parse(storedNotes)) : new Notes();
console.log(myNotes)
//handling-forms
noteForm.addEventListener("submit",(evnet) => {
    event.preventDefault()
    console.log(event.target)
})
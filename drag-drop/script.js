window.addEventListener("DOMContentLoaded", () => {
    let dummyElement = null;

    // Form Handling
    const inputForm = document.querySelector(".input-form");
    inputForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = inputForm.querySelector(".text-input").value;
        const type = inputForm.querySelector("#text-type").value;

        if (!text || !type) {
            alert("Please Provide Complete Data");
            return;
        }
        const data = {
            text: text,
            textType: type
        };
        sendData(data);
        inputForm.reset();
    });

    // Drop Zone Logic
    const dropZones = document.querySelectorAll(".task-board, .quote-board, .joke-board");

    dropZones.forEach((dropZone) => {
        dropZone.addEventListener("dragenter", (event) => {
            if (event.currentTarget === dropZone) {
                dropZone.style.background = "#c2c2c2";
                dropZone.style.transform = "scale(1.1)";
                dropZone.style.border = "2px solid orangered";
            }
        });

        dropZone.addEventListener("dragleave", (event) => {
            if (event.currentTarget === dropZone) {
                if (dummyElement) {
                    dummyElement.remove();
                    dummyElement = null;
                }
                dropZone.style.background = "aliceblue";
                dropZone.style.border = "none";
                dropZone.style.transform = "scale(1)";
            }
        });

        dropZone.addEventListener("dragover", (event) => {
            event.preventDefault();

            if (!dummyElement) {
                dummyElement = document.createElement("div");
                dummyElement.className = "dummyElement";
                dummyElement.style.height = "50px";
                dummyElement.style.backgroundColor = "lightgrey";
                dummyElement.style.border = "2px dashed #ccc";
                dummyElement.style.margin = "10px 0";
            }

            const children = Array.from(dropZone.children).filter(child => child !== dummyElement);
            let insertBefore = null;

            for (let child of children) {
                const childRect = child.getBoundingClientRect();
                const dropY = event.clientY;
                if (dropY < childRect.top + childRect.height / 2) {
                    insertBefore = child;
                    break;
                }
            }

            if (insertBefore && !dropZone.contains(dummyElement)) {
                dropZone.insertBefore(dummyElement, insertBefore);
            } else if (!dropZone.contains(dummyElement)) {
                dropZone.appendChild(dummyElement);
            }
        });

        dropZone.addEventListener("dragend", (event) => {
            if (dummyElement) {
                dummyElement.remove();
                dummyElement = null;
            }
            dropZone.style.background = "aliceblue";
            dropZone.style.border = "none";
            dropZone.style.transform = "scale(1)";
        });

        dropZone.addEventListener("drop", (event) => {
            event.preventDefault();

            const elementId = event.dataTransfer.getData("text");
            const draggableElement = document.getElementById(elementId);

            // Ensure dummyElement is removed before dropping
            if (dummyElement) {
                dummyElement.remove();
                dummyElement = null;
            }

            if (draggableElement && event.currentTarget === dropZone) {
                const children = Array.from(dropZone.children).filter(child => child !== dummyElement);
                let insertBeforeElement = null;

                for (let child of children) {
                    const childRect = child.getBoundingClientRect();
                    const dropY = event.clientY;
                    if (dropY < childRect.top + childRect.height / 2) {
                        insertBeforeElement = child;
                        break;
                    }
                }

                if (insertBeforeElement) {
                    dropZone.insertBefore(draggableElement, insertBeforeElement);
                } else {
                    dropZone.appendChild(draggableElement);
                }
            }

            dropZone.style.background = "aliceblue";
            dropZone.style.border = "none";
            dropZone.style.transform = "scale(1)";
        });
    });

    // Function to send data and create draggable elements
    function sendData(data) {
        const taskContainer = document.querySelector(".task-board");
        const quoteContainer = document.querySelector(".quote-board");
        const jokeContainer = document.querySelector(".joke-board");

        const dataToRepresent = document.createElement("h1");
        dataToRepresent.className = data.textType;
        dataToRepresent.innerText = data.text;
        dataToRepresent.id = "draggable-" + Date.now();
        dataToRepresent.draggable = true;

        dataToRepresent.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", event.target.id);
        });

        // Append new elements to the correct container
        if (data.textType === "task") {
            taskContainer.append(dataToRepresent);
        } else if (data.textType === "quote") {
            quoteContainer.append(dataToRepresent);
        } else {
            jokeContainer.append(dataToRepresent);
        }
    }
});

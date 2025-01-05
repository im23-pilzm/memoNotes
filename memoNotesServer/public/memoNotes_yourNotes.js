const logo = document.getElementById("logo")

logo.addEventListener("click", ()=>{
    window.location.href = "memoNotes_landingpage.html"
})



//create new TODO-Element
const addTODOButton = document.getElementById("add_TODO_button")
const TODOlist = document.getElementById("yourNotes_Notes_TODO_list")


function createNewTODO(text = "Neue Aufgabe") {
    const container = document.createElement("div");
    container.classList.add("todo_container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "todo_done"

    const TODOtext = document.createElement("span");
    TODOtext.classList.add("todo-text");
    TODOtext.textContent = text;

    const DeleteTODOButton = document.createElement("button");
    DeleteTODOButton.classList.add("fa-solid", "fa-trash-can")
    DeleteTODOButton.classList.add("TODOdeleteButton")

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "todo_text[]";
    hiddenInput.value = TODOtext.textContent;

    TODOtext.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = TODOtext.textContent;
        input.classList.add("TitleInput")

        container.replaceChild(input, TODOtext)

        const saveChanges = () => {
            const updatedTODOtext = input.value || "Unbenannte Aufgabe";
            TODOtext.textContent = updatedTODOtext;
            hiddenInput.value = updatedTODOtext;
            container.replaceChild(TODOtext, input);
        };

        input.addEventListener("blur", saveChanges);
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                saveChanges()
            }
        });

        input.focus();
    });

    DeleteTODOButton.addEventListener("click", () => {
        container.remove()
    })

    container.appendChild(checkbox);
    container.appendChild(TODOtext);
    container.appendChild(DeleteTODOButton)
    container.appendChild(hiddenInput);

    TODOlist.appendChild(container)
}

addTODOButton.addEventListener("click", (event) => {
    event.preventDefault();
    createNewTODO();
});


const notesContainer = document.getElementById("yourNotes_Notes_allNotes");
const addNoteButton = document.getElementById("add_Note_button");

function updateButtonPosition() {
    const notes = notesContainer.querySelectorAll('.note_container');

    if (notes.length === 0) {
        addNoteButton.style.position = "relative";
        addNoteButton.style.marginTop = "20px";
        addNoteButton.style.marginLeft = "20px";
        addNoteButton.style.top = "auto";
        addNoteButton.style.left = "0";
    } else {
        addNoteButton.style.position = "absolute";
        addNoteButton.style.display = "block";
        addNoteButton.style.marginTop = "10px";
        addNoteButton.style.marginLeft = "10px";

        const lastNote = notes[notes.length - 1];
        const lastNoteRect = lastNote.getBoundingClientRect();
        const containerRect = notesContainer.getBoundingClientRect();

        addNoteButton.style.top = `${lastNoteRect.bottom - containerRect.top - 40}px`;
        addNoteButton.style.left = `${lastNoteRect.right - containerRect.left + 20}px`;
    }
}

updateButtonPosition();

notesContainer.addEventListener("input", updateButtonPosition);
notesContainer.addEventListener("DOMNodeInserted", updateButtonPosition);
notesContainer.addEventListener("DOMNodeRemoved", updateButtonPosition);


window.addEventListener("resize", updateButtonPosition);

const NoteList = document.getElementById("yourNotes_Notes_allNotes_list")

let NoteColorOptions = ["#fff36b", "#76ff5a", "#3cffff", "#fc83ff"]

let notesContent = {};

function closeNote() {
    const noteTextArea = document.getElementById("note_text");
    if (noteTextArea) {
        const noteID = noteTextArea.getAttribute("data_note_id")
        notesContent[noteID] = noteTextArea.value.trim();
    }

    const popupContainer = document.getElementById("popupContainer");
    if (popupContainer) {
        popupContainer.remove();
    }
}

//create new Note-Element
function createNewNote(title = "Titel...") {
    const NoteContainer = document.createElement("div");
    NoteContainer.classList.add("note_container");

    const NoteTitle = document.createElement("span");
    NoteTitle.classList.add("noteTitle");
    NoteTitle.textContent = title;

    const NoteOptionsButton = document.createElement("button")
    NoteOptionsButton.classList.add("fa-solid", "fa-ellipsis")
    NoteOptionsButton.classList.add("NoteOptionsButton")
    NoteOptionsButton.setAttribute("aria-label", "Optionen anzeigen")
    NoteOptionsButton.setAttribute("aria-hidden", "false")

    const NoteOptionsContainer = document.createElement("div")
    NoteOptionsContainer.classList.add("NoteOptionsContainer")

    const ColorButton = document.createElement("button")
    ColorButton.classList.add("ColorButton")
    ColorButton.innerText = "Farbe auswählen..."

    const AlterNoteButton = document.createElement("button")
    AlterNoteButton.classList.add("AlterNoteButton")
    AlterNoteButton.innerText = "Notiz bearbeiten"

    const DeleteNoteButton = document.createElement("button")
    DeleteNoteButton.classList.add("DeleteNoteButton")
    DeleteNoteButton.innerText = "Notiz löschen"

    const hiddenNoteInput = document.createElement("input");
    hiddenNoteInput.type = "hidden";
    hiddenNoteInput.name = "note_title[]";
    hiddenNoteInput.value = NoteTitle.textContent;

    const noteID = `note_${Date.now()}`
    notesContent[noteID] = ""

    NoteTitle.addEventListener("click", () => {
        const NoteInput = document.createElement("textarea");
        NoteInput.value = NoteTitle.textContent;
        NoteInput.classList.add("NoteInput")

        NoteContainer.replaceChild(NoteInput, NoteTitle);

        NoteInput.style.backgroundColor = NoteContainer.style.backgroundColor;

        const saveChanges = () => {
            const updatedNoteTitle = NoteInput.value.trim()
            if (updatedNoteTitle) {
                NoteTitle.textContent = updatedNoteTitle;
                notesContent[noteID] = updatedNoteTitle
                hiddenNoteInput.value = updatedNoteTitle;
                NoteContainer.replaceChild(NoteTitle, NoteInput);
                NoteTitle.style.backgroundColor = NoteContainer.style.backgroundColor;
                NoteTitle.innerHTML = NoteInput.value.trim().replace(/\n/g, "<br>");
            }
        };

        NoteInput.addEventListener("blur", saveChanges);
        NoteInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                saveChanges();
            }
        });

        NoteInput.focus();
    });

    document.addEventListener("click", (event) => {
        const ClickInside = NoteOptionsButton.contains(event.target) || NoteOptionsContainer.contains(event.target);
        if (!ClickInside) {
            NoteOptionsContainer.style.display = "none";
        }
    })

    NoteOptionsButton.addEventListener("click", (event) => {
        event.preventDefault();
        const isVisible = NoteOptionsContainer.style.display === "block";
        NoteOptionsContainer.style.display = isVisible ? "none" : "block";
        event.stopPropagation()
    });

    DeleteNoteButton.addEventListener("click", (event) => {
        event.preventDefault();
        NoteContainer.remove();
        updateButtonPosition()
    })

    AlterNoteButton.addEventListener("click", (event) => {
        event.preventDefault()

        if (document.getElementById("popupContainer")) return;


        const popupContainer = document.createElement("div");

        const currentNoteContent = notesContent[noteID] || ""

        popupContainer.innerHTML = `
        <div id="popupContainer">
            <h1>${NoteTitle.textContent}</h1>
            <textarea id="note_text" data-note-id="${noteID}" placeholder="Enter your note...">${currentNoteContent}</textarea>
            <div>
                <buton id="CloseNote" class="fa-solid fa-xmark"></buton>
            </div>
        </div> 
        `;
        document.body.appendChild(popupContainer)

        document.getElementById("CloseNote").addEventListener("click", () => {
            const noteTextArea = document.getElementById("note_text")
            if (noteTextArea) {
                const noteID = noteTextArea.getAttribute("data-note-id");
                notesContent[noteID] = noteTextArea.value.trim();
            }

            popupContainer.remove();
        })
    })


    ColorButton.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("ColorButton wurde geklickt!");


        const existingColorContainer = ColorButton.querySelector(".colorContainer");
        if (existingColorContainer) {
            existingColorContainer.remove();
            ColorButton.innerText = "Farbe auswählen..."
            ColorButton.style.display = "block"
            return;
        }

        const colorContainer = document.createElement("div");
        colorContainer.classList.add("colorContainer");

        NoteColorOptions.forEach(color => {
            const colorElement = document.createElement("div");
            colorElement.style.backgroundColor = color;
            colorElement.classList.add("colorOption");

            colorElement.addEventListener("click", () => {
                NoteContainer.style.backgroundColor = color;
                const NoteInput = NoteContainer.querySelector("textarea")
                if (NoteInput) {
                NoteInput.style.backgroundColor = color;
                }

                const NoteTitle = NoteContainer.querySelector(".noteTitle");
                if (NoteTitle) {
                    NoteTitle.style.backgroundColor = color;
                }
            })

            colorContainer.appendChild(colorElement);
        });

        ColorButton.appendChild(colorContainer);
    });

    NoteContainer.appendChild(NoteTitle);
    NoteContainer.appendChild(hiddenNoteInput);
    NoteContainer.appendChild(NoteOptionsButton);
    NoteContainer.appendChild(NoteOptionsContainer);
    NoteOptionsContainer.appendChild(ColorButton);
    NoteOptionsContainer.appendChild(AlterNoteButton)
    NoteOptionsContainer.appendChild(DeleteNoteButton);
    NoteList.appendChild(NoteContainer);
}

addNoteButton.addEventListener("click", (event) => {
    event.preventDefault();
    createNewNote();
    updateButtonPosition();
});

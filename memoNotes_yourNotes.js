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

//create new Note-Element
function createNewNote(title = "Titel") {
    const NoteContainer = document.createElement("div");
    NoteContainer.classList.add("note_container");

    const NoteTitle = document.createElement("span");
    NoteTitle.classList.add("noteTitle");
    NoteTitle.textContent = title;

    const hiddenNoteInput = document.createElement("input");
    hiddenNoteInput.type = "hidden";
    hiddenNoteInput.name = "note_title[]";
    hiddenNoteInput.value = NoteTitle.textContent;

    NoteTitle.addEventListener("click", () => {
        const NoteInput = document.createElement("textarea");
        NoteInput.value = NoteTitle.textContent;
        NoteInput.classList.add("NoteInput")

        NoteContainer.replaceChild(NoteInput, NoteTitle);


        const saveChanges = () => {
            const updatedNoteTitle = NoteInput.value || "Titel";
            NoteTitle.textContent = updatedNoteTitle;
            hiddenNoteInput.value = updatedNoteTitle;
            NoteContainer.replaceChild(NoteTitle, NoteInput);
            NoteTitle.innerHTML = NoteInput.value.trim().replace(/\n/g, "<br>")
        };

        NoteInput.addEventListener("blur", saveChanges);
        NoteInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                saveChanges();
            }
        });

        NoteInput.focus();
    });

    NoteContainer.appendChild(NoteTitle);
    NoteContainer.appendChild(hiddenNoteInput);

    NoteList.appendChild(NoteContainer)
}

addNoteButton.addEventListener("click", (event) => {
    event.preventDefault();
    createNewNote();
    updateButtonPosition();
});








































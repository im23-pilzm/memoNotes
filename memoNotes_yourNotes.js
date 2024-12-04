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


//calculate positioning of the addNoteButton
const notesContainer = document.getElementById("yourNotes_Notes_allNotes");
const addNoteButton = document.getElementById("add_Note_button");

function updateButtonPosition() {
    const notes = notesContainer.querySelectorAll('input[type="text"]');

    if (notes.length === 0) {
        // Keine Notizen: Button bleibt unter dem Titel
        addNoteButton.style.position = 'relative';
        addNoteButton.style.marginTop = '70px';
        addNoteButton.style.marginLeft = '15px'
        addNoteButton.style.top = 'auto';
        addNoteButton.style.left = '0';
    } else {
        // Mindestens eine Notiz: Button dynamisch platzieren
        addNoteButton.style.position = 'absolute';
        addNoteButton.style.display = 'block';

        const lastNote = notes[notes.length - 1];
        const lastNoteRect = lastNote.getBoundingClientRect();
        const containerRect = notesContainer.getBoundingClientRect();

        addNoteButton.style.top = `${lastNoteRect.top - containerRect.top + lastNoteRect.height + 10}px`;
        addNoteButton.style.left = `${lastNoteRect.left - containerRect.left + lastNoteRect.width + 10}px`;
    }
}

// Initialer Aufruf und bei Änderungen im Container
notesContainer.addEventListener('input', updateButtonPosition);
notesContainer.addEventListener('DOMNodeInserted', updateButtonPosition);
notesContainer.addEventListener('DOMNodeRemoved', updateButtonPosition);

// Initialisierung
updateButtonPosition();

// Bei Fenstergröße-Änderung erneut berechnen
window.addEventListener('resize', updateButtonPosition);

const NoteList = document.getElementById("yourNotes_Notes_allNotes_list")

//create new Note-Element
function createNewNote(title = "Titel") {
    const NoteContainer = document.createElement("div");
    NoteContainer.classList.add("note_container");

    const NoteTitle = document.createElement("span");
    NoteTitle.classList.add("note-title");
    NoteTitle.textContent = title;

    const hiddenNoteInput = document.createElement("input");
    hiddenNoteInput.type = "hidden";
    hiddenNoteInput.name = "note_title[]";
    hiddenNoteInput.value = NoteTitle.textContent;

    NoteTitle.addEventListener("click", () => {
        const NoteInput = document.createElement("input");
        NoteInput.type = "text";
        NoteInput.value = NoteTitle.textContent;

        NoteContainer.replaceChild(NoteInput, NoteTitle);

        const saveChanges = () => {
            const updatedNoteTitle = NoteInput.value || "Titel";
            NoteTitle.textContent = updatedNoteTitle;
            hiddenNoteInput.value = updatedNoteTitle;
            NoteContainer.replaceChild(NoteTitle, NoteInput);
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

    NoteList.appendChild(NoteContainer);
}

// Event-Listener für den Button
addNoteButton.addEventListener("click", (event) => {
    event.preventDefault();
    createNewNote();
});














































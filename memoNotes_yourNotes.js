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


//create new Note-Element















































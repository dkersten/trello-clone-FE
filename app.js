/* Add a Card Modal */
//
/* DOM Variables */
let modalOpenIcon = document.querySelector('.modal-add'); //Add a card plus button
let modalAddCard = document.querySelector('#add-card-modal'); //Add a card modal
let modalAddCardClose = document.querySelector('#close-add-card-modal'); //Modal close icon
let upNextCont = document.querySelector('.up-next-cards');
let inProgressCont = document.querySelector('.in-progress-cards');
let completedCont = document.querySelector('.completed-cards');
let cardContainer = document.querySelector('.card-container');

//Open modal
modalOpenIcon.addEventListener("click", () => {
    modalAddCard.style.display = "block";
});

//Close modal when close icon is clicked
modalAddCardClose.addEventListener("click", () => {
    modalAddCard.style.display = "none";
});

/* Add a Card Form */
/* DOM Variables from form*/
let addCardForm = document.querySelector('#add-card-form');
let newTaskName = addCardForm.querySelector('#task-name');
let newTaskDescription = addCardForm.querySelector('#task-description');
let newTaskDueDate = addCardForm.querySelector('#taskDueDate');
let newTeamAssignment = addCardForm.querySelector('#team-select');
let newTaskProgress = addCardForm.querySelector('#status');

//Create HTML Elements for card compenent
let cardElement;
let taskHeadingElement;
let taskNameElement;
let dueDateLabelElement;
let dueDateElement;
let taskDescriptionElement;
let statusContainerElement;
let teamIconElement;
let teamNumber;
let editContainerElement;
let moveContainerElement;
let cardEditContainerElement;
let moveNextElement;
let moveProgressElement;
let moveCompletedElement;
let cardEditBtnElement;
let cardDeleteBtnElement;

//Edit card HTML elements
let editTaskNameElement;
let editDueDateElement;
let editTaskDescriptionElement;
let cardSaveBtnElement;
let editTeamElement;

addCardForm.addEventListener('submit', (e) => {

    //Create HTML Elements for card compenent
    cardElement = document.createElement('DIV');
    taskHeadingElement = document.createElement('DIV');
    taskNameElement = document.createElement('H3');
    dueDateLabelElement = document.createElement('SPAN');
    dueDateElement = document.createElement('SPAN');
    taskDescriptionElement = document.createElement('P');
    statusContainerElement = document.createElement('DIV');
    teamIconElement = document.createElement('DIV');
    editContainerElement = document.createElement('DIV');
    moveContainerElement = document.createElement('SPAN');
    cardEditContainerElement = document.createElement('DIV');

    e.preventDefault(); //Prevents page from reloading on submission

    //Build up card component
    createCardElement(); //Create a card div and appends it to Up Next
    createTaskHeading(); //Create div.task-heading
    createTaskName(); //Create h3 and add form input to value
    createStatusContainer(); //Add div.status-container to card
    createTeamStatusIcon(); //Add div.team-icon to card based on correct team in card
    createDueDateLabel(); //Create due date label span
    createDueDate(); //Create due date span, add date from form
    createTaskDescription(); //Create p.task-description, add form value
    createEditingContainer(); //Create p.card-editing-container
    createMoveContainer(); //Create span.card-move-container
    createCardEditContainer(); //Create div.card-editing-container

    //Clear form fields on submission (need to fix this)
    newTaskName.value = '';
    newTaskDescription.value = '';
    newTaskDueDate.value = '';
    newTeamAssignment.value = '';
    newTaskProgress.value = '';

    //Close modal on submission
    modalAddCard.style.display = "none";
});

//Create Card Div
function createCardElement() {
    cardElement.classList.add('card');
    //Logic for what column to place card
    if (newTaskProgress.value === "Up Next") {
        upNextCont.appendChild(cardElement);
    } else if (newTaskProgress.value === "In Progress") {
        inProgressCont.appendChild(cardElement);
    } else if (newTaskProgress.value === "Completed") {
        completedCont.appendChild(cardElement);
    } else {
        cardElement.style.display = "none";
    }
};

//Create Task Heading Div, append to card div
function createTaskHeading() {
    taskHeadingElement.classList.add('task-heading');
    cardElement.appendChild(taskHeadingElement);
};

//Create Task name, fill with form value, add to task heading div
function createTaskName() {
    taskNameElement.classList.add('task-name');
    taskHeadingElement.appendChild(taskNameElement);
    taskNameElement.textContent = newTaskName.value;
};

//Create status container div, add to task heading div
function createStatusContainer() {
    statusContainerElement.classList.add('status-container');
    taskHeadingElement.appendChild(statusContainerElement);
};

//Create team status icon, pull correct value from form, add to status container div
function createTeamStatusIcon() {
    teamIconElement.classList.add('status-icon');
    teamIconElement.classList.add('team-icon');
    statusContainerElement.appendChild(teamIconElement);

    // alert(newTeamAssignment.value);
    //Logic for team icon color
    if (newTeamAssignment.value === "1") {
        teamIconElement.style.backgroundColor = "#1437d2";
        teamIconElement.setAttribute('title', "Team 1");
    } else if (newTeamAssignment.value === "2") {
        teamIconElement.style.backgroundColor = "#7c167e";
        teamIconElement.setAttribute('title', "Team 2");
    } else if (newTeamAssignment.value === "3") {
        teamIconElement.style.backgroundColor = "#AC1D4B";
        teamIconElement.setAttribute('title', "Team 3");
    } else {
        teamIconElement.style.display = "none";
    }
};

//Create due date label, add to card div
function createDueDateLabel() {
    dueDateLabelElement.classList.add('due-date-label');
    cardElement.appendChild(dueDateLabelElement);
    dueDateLabelElement.textContent = 'Due:';
};

//Create due date element, pull value from form, add to card element
function createDueDate() {
    dueDateElement.classList.add('due-date');
    cardElement.appendChild(dueDateElement);
    dueDateElement.textContent = newTaskDueDate.value; //Edit this to accept date from form
};

//Create task description, pull value from form, add to card element
function createTaskDescription() {
    taskDescriptionElement.classList.add('task-description');
    cardElement.appendChild(taskDescriptionElement);
    taskDescriptionElement.textContent = newTaskDescription.value;
}

//Add editing div container to card
function createEditingContainer() {
    editContainerElement.classList.add('card-edit-container');
    cardElement.appendChild(editContainerElement);
    createDeleteBtn();
    createEditBtn();
}

//Adds span for move links to card editing container
function createMoveContainer() {
    moveContainerElement.classList.add('card-move-container');
    editContainerElement.appendChild(moveContainerElement);
    moveContainerElement.textContent = "Move to: ";
    createMoveLinks();
}

//Create Card Move Links
function createMoveLinks() {

    //Create Elements
    moveNextElement = document.createElement('span');
    moveProgressElement = document.createElement('span');
    moveCompletedElement = document.createElement('span');

    // Add .btn-move class
    moveNextElement.classList.add('btn-move');
    moveProgressElement.classList.add('btn-move');
    moveCompletedElement.classList.add('btn-move');

    //Add btn specific class
    moveNextElement.classList.add('btn-move-next');
    moveProgressElement.classList.add('btn-move-progress');
    moveCompletedElement.classList.add('btn-move-completed');

    //Add text content to btns
    moveNextElement.textContent = "Up Next";
    moveProgressElement.textContent = "In Progress";
    moveCompletedElement.textContent = "Completed";

    //Append elements to .card-edit-container
    moveContainerElement.appendChild(moveNextElement);
    moveContainerElement.appendChild(moveProgressElement);
    moveContainerElement.appendChild(moveCompletedElement);

    //Logic for btns to display based on new card form
    if (newTaskProgress.value === "Up Next") {
        moveNextElement.style.display = "none";
    } else if (newTaskProgress.value === "In Progress") {
        moveProgressElement.style.display = "none";
    } else if (newTaskProgress.value === "Completed") {
        moveCompletedElement.style.display = "none";
    } else {
        
    }
}

function createCardEditContainer() {
    cardEditContainerElement.classList.add('card-editing-container');
    editContainerElement.appendChild(cardEditContainerElement);

}

function createEditBtn() {
    cardEditBtnElement = document.createElement('SPAN');
    cardEditBtnElement.classList.add('btn-edit-card');
    cardEditBtnElement.classList.add('btn-move');
    cardEditContainerElement.appendChild(cardEditBtnElement);
    cardEditBtnElement.textContent = "Edit Card";
}

function createSaveBtn() {
    cardSaveBtnElement = document.createElement('SPAN');
    cardSaveBtnElement.classList.add('btn-edit-card');
    cardSaveBtnElement.classList.add('btn-move');
    cardSaveBtnElement.classList.add('btn-save-card');
    cardEditContainerElement.appendChild(cardSaveBtnElement);
    cardSaveBtnElement.textContent = "Save";
}

function createDeleteBtn() {
    cardDeleteBtnElement = document.createElement('SPAN');
    cardDeleteBtnElement.classList.add('btn-edit-card');
    cardDeleteBtnElement.classList.add('btn-move');
    cardDeleteBtnElement.classList.add('btn-delete-card');
    cardEditContainerElement.appendChild(cardDeleteBtnElement);
    cardDeleteBtnElement.textContent = 'Delete Card'
}

//Event handler for edit button
cardContainer.addEventListener('click', (e) => {
    if (e.target.textContent === "Edit Card") {
        // let
        let btnEdit = e.target;
        // alert("testing");
        editCardName();
        editCardDate();
        editCardDescription();
        editCardTeam();

        //change button to save state
        cardEditContainerElement.removeChild(btnEdit);
        //Hide Delete button
        cardDeleteBtnElement.style.display = 'none';
        //Add save button
        createSaveBtn();
    }
});

//Event handler for save button
cardContainer.addEventListener('click', (e) => {
    if (e.target.textContent === "Save") {
        let btnSave = e.target;
        saveCardName();
        saveCardDescription();
        saveCardDate();
        saveCardTeam();
        cardEditContainerElement.removeChild(btnSave);
        //Show delete button
        cardDeleteBtnElement.style.display = 'inline-block';
        createEditBtn();
        
    }
});

//Event Handler for delete button
cardContainer.addEventListener('click', (e) => {
    if (e.target.textContent === "Delete Card") {
        let btnDelete = e.target;
        let currentCardDel = btnDelete.parentNode.parentNode.parentNode;
        let currentCardParent = currentCardDel.parentNode;
        currentCardParent.removeChild(currentCardDel);
    }
}) 

//Edit card: edit task name fuction
function editCardName() {
    editTaskNameElement = document.createElement('INPUT');
    editTaskNameElement.type = 'text';
    editTaskNameElement.classList.add('task-name-input')
    editTaskNameElement.value = taskNameElement.textContent;
    //Append to card
    taskHeadingElement.insertBefore(editTaskNameElement, taskNameElement);
    taskHeadingElement.removeChild(taskNameElement);
}

//Save card: save edited name function
function saveCardName() {
    taskNameElement.classList.add('task-name');
    taskHeadingElement.appendChild(taskNameElement);
    taskHeadingElement.insertBefore(taskNameElement, taskHeadingElement.childNodes[0]);
    taskNameElement.textContent = editTaskNameElement.value;
    taskHeadingElement.removeChild(editTaskNameElement);
};

//Edit card: edit task due date function
function editCardDate() {
    editDueDateElement = document.createElement('INPUT');
    editDueDateElement.type = 'date';
    editDueDateElement.classList.add('task-date-input')
    editDueDateElement.value = dueDateElement.textContent;
    //Append to card
    cardElement.insertBefore(editDueDateElement, dueDateElement);
    cardElement.removeChild(dueDateElement);
}

//Save card: save edited name function
function saveCardDate() {
    dueDateElement.classList.add('due-date');
    cardElement.appendChild(dueDateElement);
    dueDateElement.textContent = editDueDateElement.value;
    cardElement.insertBefore(dueDateElement, taskDescriptionElement);
    cardElement.removeChild(editDueDateElement);
};

//Edit card: edit task description function
function editCardDescription() {
    editTaskDescriptionElement = document.createElement('TEXTAREA');
    editTaskDescriptionElement.classList.add('task-description-input')
    editTaskDescriptionElement.textContent = taskDescriptionElement.textContent;
    //Append to card
    cardElement.insertBefore(editTaskDescriptionElement, taskDescriptionElement);
    cardElement.removeChild(taskDescriptionElement);
}

//Save card: save edited name function
function saveCardDescription() {
    taskDescriptionElement.classList.add('task-description');
    taskDescriptionElement.textContent = editTaskDescriptionElement.value;
    cardElement.insertBefore(taskDescriptionElement, editContainerElement); //this needs to be fixed
    cardElement.removeChild(editTaskDescriptionElement);
};

//Edit card: edit team function
function editCardTeam() {
    let array = ["Team 1", "Team 2", "Team 3"];
    editTeamElement = document.createElement("SELECT");
    editTeamElement.classList.add('edit-team-select');
    cardElement.insertBefore(editTeamElement, editContainerElement);

    for (let i = 0; i < array.length; i++) {
        let option = document.createElement("OPTION");
        option.value = array[i];
        option.text = array[i];
        editTeamElement.appendChild(option);
    }
}

//Save card: save new team
function saveCardTeam() {
    if (editTeamElement.value === "Team 1") {
        teamIconElement.style.backgroundColor = "#1437d2";
        teamIconElement.setAttribute('title', "Team 1");
    } else if (editTeamElement.value === "Team 2") {
        teamIconElement.style.backgroundColor = "#7c167e";
        teamIconElement.setAttribute('title', "Team 2");
    } else if (editTeamElement.value === "Team 3") {
        teamIconElement.style.backgroundColor = "#AC1D4B";
        teamIconElement.setAttribute('title', "Team 3");
    } else {
        teamIconElement.style.display = "none";
    }

    cardElement.removeChild(editTeamElement);
}

//Event handler for moving card to various columns
cardContainer.addEventListener('click', (e) => {
    let button = e.target;
    let currentCard;
    if (button.textContent === "In Progress") {
        //move to in progress column, hide in progress button, display other 2 buttons
        //append child to in progress
        currentCard = button.parentNode.parentNode.parentNode;
        inProgressCont.appendChild(currentCard);

        moveProgressElement.style.display = "none";
        moveNextElement.style.display = "inline";
        moveCompletedElement.style.display = "inline";
    } else if (button.textContent === "Completed") {
        //move to completed column, hide completed button, display other 2 buttons
        currentCard = button.parentNode.parentNode.parentNode;
        completedCont.appendChild(currentCard);


        moveProgressElement.style.display = "inline";
        moveNextElement.style.display = "inline";
        moveCompletedElement.style.display = "none";
    } else if (button.textContent === "Up Next") {
        //move to up next column, hide up next button, display other 2 buttons
        currentCard = button.parentNode.parentNode.parentNode;
        upNextCont.appendChild(currentCard);

        moveProgressElement.style.display = "inline";
        moveNextElement.style.display = "none";
        moveCompletedElement.style.display = "inline";
    }
});
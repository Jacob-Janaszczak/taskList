{
    const deleteAllButton = document.querySelector(".button_deleteAll");
    deleteAllButton.style.display = 'none';
    let hideShowTasks = false;

    let tasks = [];

    const removeAllDone = () => {
        let tasks2 = tasks;

        if (hideShowTasks === true) {
           
            alert(`Masz ukryte zadania! Kliknij w "Pokaż ukończone zadania"`);
           
        } else {
            tasks2 = tasks.filter(task => !task.done);
            tasks = tasks2;
            render();
        };

    };
   
   
    const markAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        
        render();
    };

    const hideShowAllTasks = () => {
        hideShowTasks = !hideShowTasks;
        render();
    };


    const addNewTask = (newTaskContent) => {
        if (newTaskContent === "") {
            return;
        }
        tasks = [...tasks, { content: newTaskContent, done: false }];
        render();
    };
    const removeTask = (removeIndex) => {
        tasks = [...tasks.slice(0, removeIndex), ...tasks.slice(removeIndex + 1)];
        render();
    };

    const toggleTaskDone = (toggleIndex) => {
        tasks = [
            ...tasks.slice(0, toggleIndex),
            {
                ...tasks[toggleIndex],
                done: !tasks[toggleIndex].done,
            },
            ...tasks.slice(toggleIndex + 1),
        ];
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li  class="list__item ${task.done && hideShowTasks ? " hiddenButton--hidden" : ""} ">
            <button class="button__done js-done ">${task.done ? "✔" : ""}</button> 
            <span class="list__content${task.done ? " list__item--done" : ""}">${task.content} </span>
            <button class="button__remove js-remove">🗑</button>
           
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        if (tasks.length === 0) {
            deleteAllButton.style.display = 'none';
        };

    };


    const bindButtonsEvents = () => {
        const markAllButton = document.querySelector(".js-doneAllTask");

        if (markAllButton) {
            markAllButton.addEventListener("click", markAllTasks);

        }
        const hideShowButton = document.querySelector(".js-hideShowButton");

        if (hideShowButton) {
            hideShowButton.addEventListener("click", hideShowAllTasks);

        }

    };




    const renderButtons = () => {
        let newButtons = "";

        newButtons += tasks.length === 0 ? "" :
            `<button class="hiddenButton1 js-doneAllTask" ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie zadania</button>
          <button class="hiddenButton2 js-hideShowButton" ${tasks.every(({ done }) => !done) ? "disabled" : ""}>${hideShowTasks ? "Pokaż ukończone zadania" : "Ukryj ukończone zadania"}</button>`;

        newButtons = document.querySelector(".js-hiddenButtons").innerHTML = newButtons;


    };


    const render = () => {
        renderTasks();
        bindEvents();
        renderButtons();
        bindButtonsEvents();


    };

    


    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            clear();
            return;
        }
        addNewTask(newTaskContent);
        deleteAllButton.style.display = 'inline';
        clear();
    };


    const clear = () => {
        const clearTask = document.querySelector(".js-newTask");
        clearTask.focus();
        clearTask.value = "";

    }

    const init = () => {

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
        deleteAllButton.addEventListener("click", removeAllDone);

    };

    init();

}